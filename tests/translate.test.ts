import { describe, it, expect } from 'vitest';
import { interpolate, translate, buildDictChain, resolvePluralKey } from '../src/translate';
import type { TranslationDict } from '../src/types';

const ht: TranslationDict = {
  'btn.save': 'Sove',
  'greeting': 'Bonjou, {{name}}!',
  'items_one': '{{count}} atik',
  'items_other': '{{count}} atik yo',
  'nested.key': 'Valè niché',
};

const fr: TranslationDict = {
  'btn.save': 'Enregistrer',
  'btn.cancel': 'Annuler',
  'greeting': 'Bonjour, {{name}} !',
};

const en: TranslationDict = {
  'btn.save': 'Save',
  'btn.cancel': 'Cancel',
  'greeting': 'Hello, {{name}}!',
  'only.en': 'Only in English',
};

// ─── interpolate ─────────────────────────────────────────────────────────────

describe('interpolate', () => {
  it('replaces a single variable', () => {
    expect(interpolate('Bonjou, {{name}}!', { name: 'Marie' })).toBe('Bonjou, Marie!');
  });

  it('replaces multiple variables', () => {
    expect(interpolate('{{a}} + {{b}} = {{c}}', { a: 1, b: 2, c: 3 })).toBe('1 + 2 = 3');
  });

  it('handles spaces inside braces', () => {
    expect(interpolate('{{ name }}', { name: 'Jean' })).toBe('Jean');
  });

  it('leaves unknown variables as-is', () => {
    expect(interpolate('Hello {{unknown}}', {})).toBe('Hello {{unknown}}');
  });

  it('returns string unchanged when no vars', () => {
    expect(interpolate('plain text', {})).toBe('plain text');
  });
});

// ─── resolvePluralKey ────────────────────────────────────────────────────────

describe('resolvePluralKey', () => {
  it('returns _one form for count === 1', () => {
    expect(resolvePluralKey('items', 1, ht)).toBe('{{count}} atik');
  });

  it('returns _other form for count > 1', () => {
    expect(resolvePluralKey('items', 5, ht)).toBe('{{count}} atik yo');
  });

  it('returns _other form for count === 0', () => {
    expect(resolvePluralKey('items', 0, ht)).toBe('{{count}} atik yo');
  });

  it('returns undefined when no plural keys exist', () => {
    expect(resolvePluralKey('btn.save', 1, ht)).toBeUndefined();
  });
});

// ─── translate ───────────────────────────────────────────────────────────────

describe('translate', () => {
  it('returns translation from primary dict', () => {
    expect(translate('btn.save', [ht, fr, en])).toBe('Sove');
  });

  it('falls back to next dict when key is missing', () => {
    expect(translate('btn.cancel', [ht, fr, en])).toBe('Annuler');
  });

  it('falls back to en when missing in ht and fr', () => {
    expect(translate('only.en', [ht, fr, en])).toBe('Only in English');
  });

  it('returns key itself when missing everywhere', () => {
    expect(translate('nonexistent.key', [ht, fr, en])).toBe('nonexistent.key');
  });

  it('interpolates variables', () => {
    expect(translate('greeting', [ht], { name: 'Marie' })).toBe('Bonjou, Marie!');
  });

  it('resolves plural with count=1', () => {
    expect(translate('items', [ht], { count: 1 })).toBe('1 atik');
  });

  it('resolves plural with count=5', () => {
    expect(translate('items', [ht], { count: 5 })).toBe('5 atik yo');
  });

  it('works with empty dicts array', () => {
    expect(translate('btn.save', [])).toBe('btn.save');
  });
});

// ─── buildDictChain ──────────────────────────────────────────────────────────

describe('buildDictChain', () => {
  const locales = { ht, fr, en };

  it('puts current lang first', () => {
    const chain = buildDictChain(locales, 'ht', ['fr', 'en']);
    expect(chain[0]).toBe(ht);
  });

  it('excludes current lang from fallback', () => {
    const chain = buildDictChain(locales, 'fr', ['ht', 'fr', 'en']);
    // fr should not appear twice
    expect(chain.filter((d) => d === fr).length).toBe(1);
  });

  it('handles missing lang gracefully', () => {
    const chain = buildDictChain(locales, 'ht', ['fr', 'en']);
    expect(chain).toHaveLength(3);
  });
});
