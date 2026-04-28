import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nProvider } from '../src/provider';
import { useTranslation } from '../src/hook';

function TestComponent() {
  const { t, lang, setLang, has } = useTranslation();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="save">{t('btn.save')}</span>
      <span data-testid="greeting">{t('greeting', { name: 'Marie' })}</span>
      <span data-testid="plural-1">{t('items', { count: 1 })}</span>
      <span data-testid="plural-5">{t('items', { count: 5 })}</span>
      <span data-testid="missing">{t('no.such.key')}</span>
      <span data-testid="has-save">{String(has('btn.save'))}</span>
      <span data-testid="has-none">{String(has('nonexistent'))}</span>
      <button data-testid="to-fr" onClick={() => setLang('fr')}>FR</button>
      <button data-testid="to-en" onClick={() => setLang('en')}>EN</button>
    </div>
  );
}

describe('I18nProvider', () => {
  it('renders children', () => {
    render(<I18nProvider defaultLang="ht"><div data-testid="child">hello</div></I18nProvider>);
    expect(screen.getByTestId('child')).toBeTruthy();
  });

  it('provides defaultLang ht', () => {
    render(<I18nProvider defaultLang="ht" autoDetect={false}><TestComponent /></I18nProvider>);
    expect(screen.getByTestId('lang').textContent).toBe('ht');
  });

  it('translates btn.save in ht', () => {
    render(<I18nProvider defaultLang="ht" autoDetect={false}><TestComponent /></I18nProvider>);
    expect(screen.getByTestId('save').textContent).toBe('Sove');
  });

  it('translates btn.save in fr', () => {
    render(<I18nProvider defaultLang="fr" autoDetect={false}><TestComponent /></I18nProvider>);
    expect(screen.getByTestId('save').textContent).toBe('Enregistrer');
  });

  it('translates btn.save in en', () => {
    render(<I18nProvider defaultLang="en" autoDetect={false}><TestComponent /></I18nProvider>);
    expect(screen.getByTestId('save').textContent).toBe('Save');
  });

  it('interpolates greeting with name', () => {
    render(<I18nProvider defaultLang="ht" autoDetect={false}><TestComponent /></I18nProvider>);
    expect(screen.getByTestId('greeting').textContent).toBe('Bonjou, Marie!');
  });

  it('resolves plural _one', () => {
    render(<I18nProvider defaultLang="ht" autoDetect={false}><TestComponent /></I18nProvider>);
    expect(screen.getByTestId('plural-1').textContent).toBe('1 atik');
  });

  it('resolves plural _other', () => {
    render(<I18nProvider defaultLang="ht" autoDetect={false}><TestComponent /></I18nProvider>);
    expect(screen.getByTestId('plural-5').textContent).toBe('5 atik yo');
  });

  it('returns key for missing translation', () => {
    render(<I18nProvider defaultLang="ht" autoDetect={false}><TestComponent /></I18nProvider>);
    expect(screen.getByTestId('missing').textContent).toBe('no.such.key');
  });

  it('switches to fr on setLang', () => {
    render(<I18nProvider defaultLang="ht" autoDetect={false}><TestComponent /></I18nProvider>);
    fireEvent.click(screen.getByTestId('to-fr'));
    expect(screen.getByTestId('lang').textContent).toBe('fr');
    expect(screen.getByTestId('save').textContent).toBe('Enregistrer');
  });

  it('switches to en on setLang', () => {
    render(<I18nProvider defaultLang="ht" autoDetect={false}><TestComponent /></I18nProvider>);
    fireEvent.click(screen.getByTestId('to-en'));
    expect(screen.getByTestId('save').textContent).toBe('Save');
  });

  it('merges custom locales over built-ins', () => {
    const customLocales = { ht: { 'btn.save': 'Anrejistre' } };
    render(<I18nProvider defaultLang="ht" locales={customLocales} autoDetect={false}><TestComponent /></I18nProvider>);
    expect(screen.getByTestId('save').textContent).toBe('Anrejistre');
  });

  it('has() returns true for existing key', () => {
    render(<I18nProvider defaultLang="ht" autoDetect={false}><TestComponent /></I18nProvider>);
    expect(screen.getByTestId('has-save').textContent).toBe('true');
  });

  it('has() returns false for missing key', () => {
    render(<I18nProvider defaultLang="ht" autoDetect={false}><TestComponent /></I18nProvider>);
    expect(screen.getByTestId('has-none').textContent).toBe('false');
  });

  it('context default lang is ht when no provider (graceful)', () => {
    // With default context, lang = 'ht' and t returns the key
    function Bare() {
      const { lang } = useTranslation();
      return <span data-testid="bare-lang">{lang}</span>;
    }
    render(<Bare />);
    expect(screen.getByTestId('bare-lang').textContent).toBe('ht');
  });
});
