import { describe, it, expect } from 'vitest';
import ht from '../src/locales/ht.json';
import fr from '../src/locales/fr.json';
import en from '../src/locales/en.json';

const ALL = { ht, fr, en } as Record<string, Record<string, string>>;
const CONTENT_KEYS = (obj: Record<string, string>) =>
  Object.keys(obj).filter((k) => !k.startsWith('_'));

describe('locale files', () => {
  it('all have at least 200 content keys in ht', () => {
    expect(CONTENT_KEYS(ht).length).toBeGreaterThanOrEqual(200);
  });

  it('all locales have the same content keys', () => {
    const htKeys = new Set(CONTENT_KEYS(ht));
    const frKeys = new Set(CONTENT_KEYS(fr));
    const enKeys = new Set(CONTENT_KEYS(en));

    htKeys.forEach((key) => {
      expect(frKeys.has(key), `fr missing key: "${key}"`).toBe(true);
      expect(enKeys.has(key), `en missing key: "${key}"`).toBe(true);
    });
  });

  it('all values are non-empty strings', () => {
    for (const [lang, dict] of Object.entries(ALL)) {
      CONTENT_KEYS(dict).forEach((key) => {
        const val = dict[key];
        expect(typeof val, `${lang}["${key}"] should be a string`).toBe('string');
        expect(val.trim().length, `${lang}["${key}"] should not be empty`).toBeGreaterThan(0);
      });
    }
  });

  it('interpolation placeholders are balanced {{}}', () => {
    for (const [lang, dict] of Object.entries(ALL)) {
      CONTENT_KEYS(dict).forEach((key) => {
        const val = dict[key];
        const opens = (val.match(/\{\{/g) ?? []).length;
        const closes = (val.match(/\}\}/g) ?? []).length;
        expect(opens, `${lang}["${key}"] has unbalanced {{`).toBe(closes);
      });
    }
  });
});
