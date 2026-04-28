import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type {
  I18nContextValue,
  I18nProviderProps,
  InterpolationVars,
  Lang,
  Locales,
  TranslationDict,
} from './types';

import { detectBrowserLang } from './detector';
import { buildDictChain, translate } from './translate';

// ─── Built-in locales (imported at build time) ────────────────────────────────
import htBuiltin from './locales/ht.json';
import frBuiltin from './locales/fr.json';
import enBuiltin from './locales/en.json';

const BUILTINS: Locales = {
  ht: Object.fromEntries(
    Object.entries(htBuiltin).filter(([key]) => key !== '_meta')
  ) as TranslationDict,
  fr: Object.fromEntries(
    Object.entries(frBuiltin).filter(([key]) => key !== '_meta')
  ) as TranslationDict,
  en: Object.fromEntries(
    Object.entries(enBuiltin).filter(([key]) => key !== '_meta')
  ) as TranslationDict,
};

// ─── Context ──────────────────────────────────────────────────────────────────

export const I18nContext = createContext<I18nContextValue>({
  lang: 'ht',
  setLang: () => {},
  t: (key) => key,
  locales: BUILTINS,
});

// ─── Provider ─────────────────────────────────────────────────────────────────

/**
 * `I18nProvider` — wrap your app with this to enable translations.
 *
 * @example
 * ```tsx
 * <I18nProvider defaultLang="ht" fallback={['fr', 'en']}>
 *   <App />
 * </I18nProvider>
 * ```
 */
export function I18nProvider({
  children,
  defaultLang = 'ht',
  locales: customLocales,
  fallback = ['fr', 'en'],
  autoDetect = true,
}: I18nProviderProps) {
  const [lang, setLangState] = useState<Lang>(defaultLang);

  // Merge built-ins with custom locales (custom keys override built-ins)
  const mergedLocales = useMemo<Locales>(() => {
    if (!customLocales) return BUILTINS;
    return {
      ht: { ...BUILTINS.ht, ...(customLocales.ht ?? {}) },
      fr: { ...BUILTINS.fr, ...(customLocales.fr ?? {}) },
      en: { ...BUILTINS.en, ...(customLocales.en ?? {}) },
    };
  }, [customLocales]);

  // Auto-detect browser language on mount
  useEffect(() => {
    if (!autoDetect) return;
    const detected = detectBrowserLang();
    if (detected && detected !== defaultLang) {
      setLangState(detected);
    }
  }, [autoDetect, defaultLang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    // Optionally persist to localStorage for return visits
    try {
      localStorage.setItem('ht-i18n-lang', l);
    } catch {
      // ignore SSR / private browsing
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: InterpolationVars): string => {
      const chain = buildDictChain(mergedLocales, lang, fallback);
      return translate(key, chain, vars);
    },
    [mergedLocales, lang, fallback]
  );

  const value = useMemo<I18nContextValue>(
    () => ({ lang, setLang, t, locales: mergedLocales }),
    [lang, setLang, t, mergedLocales]
  );

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}
