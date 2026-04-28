// ─── Public API ──────────────────────────────────────────────────────────────
//
//  import { I18nProvider, useTranslation } from 'ht-i18n';
//  import type { Lang, Locales } from 'ht-i18n';
//
// ─────────────────────────────────────────────────────────────────────────────

// React components & hooks
export { I18nProvider, I18nContext } from './provider';
export { useTranslation } from './hook';

// Core utilities (framework-agnostic)
export { translate, interpolate, buildDictChain } from './translate';
export { detectBrowserLang, detectLang, isValidLang, SUPPORTED } from './detector';

// Types
export type {
  Lang,
  Locales,
  TranslationDict,
  InterpolationVars,
  I18nContextValue,
  I18nProviderProps,
  UseTranslationReturn,
} from './types';

// Built-in locale data (for inspection / extension)
export { default as htLocale } from './locales/ht.json';
export { default as frLocale } from './locales/fr.json';
export { default as enLocale } from './locales/en.json';
