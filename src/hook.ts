import { useContext } from 'react';
import { I18nContext } from './provider';
import type { UseTranslationReturn } from './types';

/**
 * `useTranslation` — access translations in any component.
 *
 * Must be used inside `<I18nProvider>`.
 *
 * @example
 * ```tsx
 * const { t, lang, setLang, has, keys } = useTranslation();
 *
 * t('btn.save')                        // → "Sove" (ht)
 * t('greeting', { name: 'Marie' })     // → "Bonjou, Marie!"
 * t('items', { count: 3 })             // → "3 atik" (plural)
 * has('btn.save')                      // → true
 * ```
 */
export function useTranslation(): UseTranslationReturn {
  const ctx = useContext(I18nContext);

  if (!ctx) {
    throw new Error(
      '[ht-i18n] useTranslation() must be used inside <I18nProvider>.\n' +
        'Wrap your app: <I18nProvider defaultLang="ht"><App /></I18nProvider>'
    );
  }

  const has = (key: string): boolean => {
    const dict = ctx.locales[ctx.lang];
    return key in dict;
  };

  const keys = (): string[] => {
    return Object.keys(ctx.locales[ctx.lang]).filter(
      (k) => !k.startsWith('_')
    );
  };

  return {
    t: ctx.t,
    lang: ctx.lang,
    setLang: ctx.setLang,
    has,
    keys,
  };
}
