import type { Lang } from './types';

/** All supported language codes */
const SUPPORTED: Lang[] = ['ht', 'fr', 'en'];

/**
 * Maps browser locale strings → supported Lang.
 * Handles regional variants like 'fr-HT', 'fr-FR', 'en-US', etc.
 */
const LOCALE_MAP: Record<string, Lang> = {
  // Haitian Creole variants
  ht: 'ht',
  'ht-ht': 'ht',
  'ht-latn': 'ht',
  cpf: 'ht',      // ISO 639-3 for French-based creoles
  // French variants
  fr: 'fr',
  'fr-ht': 'fr',  // French as spoken in Haiti
  'fr-fr': 'fr',
  'fr-be': 'fr',
  'fr-ch': 'fr',
  'fr-ca': 'fr',
  'fr-lu': 'fr',
  // English variants
  en: 'en',
  'en-us': 'en',
  'en-gb': 'en',
  'en-ca': 'en',
  'en-au': 'en',
  'en-nz': 'en',
  'en-in': 'en',
};

/**
 * Detects the best matching supported language from a locale string.
 * Tries exact match first, then base language match.
 */
export function detectLang(locale: string): Lang | null {
  const normalized = locale.toLowerCase().trim();
  // exact match
  if (LOCALE_MAP[normalized]) return LOCALE_MAP[normalized];
  // base language only (e.g. 'fr' from 'fr-CA')
  const base = normalized.split(/[-_]/)[0];
  if (LOCALE_MAP[base]) return LOCALE_MAP[base];
  return null;
}

/**
 * Auto-detects language from navigator.language (and fallback list).
 * Returns null in SSR / non-browser environments.
 */
export function detectBrowserLang(): Lang | null {
  if (typeof navigator === 'undefined') return null;

  const candidates: string[] = [
    navigator.language,
    ...(navigator.languages ?? []),
  ].filter(Boolean);

  for (const locale of candidates) {
    const lang = detectLang(locale);
    if (lang) return lang;
  }

  return null;
}

/** Type guard: is a string a valid Lang? */
export function isValidLang(value: unknown): value is Lang {
  return typeof value === 'string' && (SUPPORTED as string[]).includes(value);
}

/** All supported languages */
export { SUPPORTED };
