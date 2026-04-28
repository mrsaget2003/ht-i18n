import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { detectLang, detectBrowserLang, isValidLang } from '../src/detector';

// ─── detectLang ──────────────────────────────────────────────────────────────

describe('detectLang', () => {
  it('detects "ht" from "ht"', () => expect(detectLang('ht')).toBe('ht'));
  it('detects "ht" from "ht-HT"', () => expect(detectLang('ht-HT')).toBe('ht'));
  it('detects "fr" from "fr"', () => expect(detectLang('fr')).toBe('fr'));
  it('detects "fr" from "fr-HT"', () => expect(detectLang('fr-HT')).toBe('fr'));
  it('detects "fr" from "fr-FR"', () => expect(detectLang('fr-FR')).toBe('fr'));
  it('detects "en" from "en"', () => expect(detectLang('en')).toBe('en'));
  it('detects "en" from "en-US"', () => expect(detectLang('en-US')).toBe('en'));
  it('detects "en" from "en-GB"', () => expect(detectLang('en-GB')).toBe('en'));
  it('returns null for unknown locale', () => expect(detectLang('de')).toBeNull());
  it('returns null for empty string', () => expect(detectLang('')).toBeNull());
  it('is case-insensitive', () => expect(detectLang('FR-FR')).toBe('fr'));
});

// ─── detectBrowserLang ───────────────────────────────────────────────────────

describe('detectBrowserLang', () => {
  const originalNavigator = globalThis.navigator;

  afterEach(() => {
    Object.defineProperty(globalThis, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });

  it('returns null in non-browser env', () => {
    const nav = globalThis.navigator;
    // @ts-expect-error — simulate SSR
    delete globalThis.navigator;
    expect(detectBrowserLang()).toBeNull();
    Object.defineProperty(globalThis, 'navigator', { value: nav, configurable: true });
  });

  it('detects from navigator.language', () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: { language: 'ht', languages: [] },
      configurable: true,
    });
    expect(detectBrowserLang()).toBe('ht');
  });

  it('falls back to navigator.languages', () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: { language: 'de', languages: ['de', 'fr-FR'] },
      configurable: true,
    });
    expect(detectBrowserLang()).toBe('fr');
  });

  it('returns null when no supported lang found', () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: { language: 'de', languages: ['de', 'es'] },
      configurable: true,
    });
    expect(detectBrowserLang()).toBeNull();
  });
});

// ─── isValidLang ─────────────────────────────────────────────────────────────

describe('isValidLang', () => {
  it('returns true for "ht"', () => expect(isValidLang('ht')).toBe(true));
  it('returns true for "fr"', () => expect(isValidLang('fr')).toBe(true));
  it('returns true for "en"', () => expect(isValidLang('en')).toBe(true));
  it('returns false for "de"', () => expect(isValidLang('de')).toBe(false));
  it('returns false for number', () => expect(isValidLang(42)).toBe(false));
  it('returns false for null', () => expect(isValidLang(null)).toBe(false));
});
