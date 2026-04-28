import type { Lang, TranslationDict, InterpolationVars } from './types';

/** Interpolate {{var}} placeholders in a string */
export function interpolate(str: string, vars: InterpolationVars): string {
  return str.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key) => {
    const val = vars[key];
    return val !== undefined ? String(val) : `{{${key}}}`;
  });
}

/**
 * Resolve plural form.
 * Checks for `key_one` / `key_other` suffixes.
 * Rules: count === 1 → _one, else → _other
 */
export function resolvePluralKey(
  key: string,
  count: number,
  dict: TranslationDict
): string | undefined {
  const suffix = count === 1 ? '_one' : '_other';
  const pluralKey = `${key}${suffix}`;
  return dict[pluralKey];
}

/**
 * Core translate function — no React dependency.
 * Can be used standalone in any JS/TS project.
 *
 * @param key       Translation key
 * @param dicts     Language dictionaries in fallback order
 * @param vars      Optional interpolation variables
 */
export function translate(
  key: string,
  dicts: TranslationDict[],
  vars?: InterpolationVars
): string {
  const count = vars?.count !== undefined ? Number(vars.count) : undefined;

  for (const dict of dicts) {
    // plural resolution first
    if (count !== undefined) {
      const pluralVal = resolvePluralKey(key, count, dict);
      if (pluralVal !== undefined) {
        return interpolate(pluralVal, vars ?? {});
      }
    }
    // regular key
    const val = dict[key];
    if (val !== undefined) {
      return interpolate(val, vars ?? {});
    }
  }

  // no match in any fallback — return key itself
  return key;
}

/**
 * Build an ordered array of dicts from merged locales + fallback chain.
 */
export function buildDictChain(
  mergedLocales: Record<Lang, TranslationDict>,
  lang: Lang,
  fallback: Lang[]
): TranslationDict[] {
  const chain: Lang[] = [lang, ...fallback.filter((l) => l !== lang)];
  return chain.map((l) => mergedLocales[l] ?? {});
}
