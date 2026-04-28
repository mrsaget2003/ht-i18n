// ─── Core types ───────────────────────────────────────────────────────────────

/** Supported languages */
export type Lang = 'ht' | 'fr' | 'en';

/** A flat dictionary of translation keys → values */
export type TranslationDict = Record<string, string>;

/** Full locale map: one dict per language */
export type Locales = Record<Lang, TranslationDict>;

/** Variables for interpolation: t('key', { name: 'Marie', count: 3 }) */
export type InterpolationVars = Record<string, string | number>;

// ─── Context ──────────────────────────────────────────────────────────────────

export interface I18nContextValue {
  /** Current active language */
  lang: Lang;
  /** Switch language */
  setLang: (lang: Lang) => void;
  /** Translate a key with optional interpolation */
  t: (key: string, vars?: InterpolationVars) => string;
  /** All available locales (merged built-in + custom) */
  locales: Locales;
}

// ─── Provider props ───────────────────────────────────────────────────────────

export interface I18nProviderProps {
  children: React.ReactNode;
  /**
   * Initial language.
   * @default 'ht'
   */
  defaultLang?: Lang;
  /**
   * Custom locales — merged on top of built-in keys.
   * Your keys override built-in keys with the same name.
   */
  locales?: Partial<Locales>;
  /**
   * Fallback chain: if a key is missing in current lang,
   * tries each lang in order.
   * @default ['fr', 'en']
   */
  fallback?: Lang[];
  /**
   * Auto-detect language from navigator.language on mount.
   * @default true
   */
  autoDetect?: boolean;
}

// ─── Hook return ──────────────────────────────────────────────────────────────

export interface UseTranslationReturn {
  t: (key: string, vars?: InterpolationVars) => string;
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Check if a key exists in the current language */
  has: (key: string) => boolean;
  /** Get all keys available in current language */
  keys: () => string[];
}
