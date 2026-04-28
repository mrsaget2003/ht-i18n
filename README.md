<div align="center">

<br/>

# `ht-i18n`

<!-- Typing animation -->
<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Orbitron&weight=700&size=20&pause=2000&color=004F9F&background=00000000&center=true&vCenter=true&width=650&height=50&lines=The+first+Kreyol+Ayisyen+i18n+library.;React+%C2%B7+TypeScript+%C2%B7+%3C+3KB+gzip.;ht+%F0%9F%87%AD%F0%9F%87%B9+%C2%B7+fr+%F0%9F%87%AB%F0%9F%87%B7+%C2%B7+en+%F0%9F%87%AC%F0%9F%87%A7" alt="Typing SVG" />
</a>

<br/><br/>

[![npm](https://img.shields.io/npm/v/ht-i18n?style=flat-square&logo=npm&logoColor=white&color=CB3837&label=npm)](https://www.npmjs.com/package/ht-i18n)
[![Bundle size](https://img.shields.io/badge/bundle-<_3KB_gzip-22C55E?style=flat-square&logo=webpack&logoColor=white)](https://bundlephobia.com/package/ht-i18n)
[![TypeScript](https://img.shields.io/badge/TypeScript-first-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React_%E2%89%A517-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Made in Haiti](https://img.shields.io/badge/Made%20in-Haiti%20%F0%9F%87%AD%F0%9F%87%B9-004F9F?style=flat-square)](https://github.com/mrsaget2003)
[![Open Source](https://img.shields.io/badge/Open-Source-F97316?style=flat-square&logo=opensourceinitiative&logoColor=white)](https://github.com/mrsaget2003/ht-i18n)

<br/>

**The first npm library with native Kreyòl Ayisyen support.**  
Lightweight React i18n — zero dependencies — TypeScript-first.

<br/>

</div>

---

## 📋 Table of Contents

| # | Section |
|:---:|:---|
| 1 | [Why ht-i18n?](#-why-ht-i18n) |
| 2 | [Installation](#-installation) |
| 3 | [Quick Start](#-quick-start) |
| 4 | [API Reference](#-api-reference) |
| 5 | [200+ Built-in Keys](#-200-built-in-keys) |
| 6 | [Troubleshooting](#-troubleshooting) |
| 7 | [FAQ](#-faq) |
| 8 | [Contributing](#-contributing) |
| 9 | [Credits](#-credits) |

---

## ✦ Why ht-i18n?

Haiti has **11+ million Kreyòl speakers** — yet Kreyòl Ayisyen is virtually absent from open-source tooling. Every i18n library ships French, Spanish, Arabic, sometimes Swahili — but never Kreyòl.

`ht-i18n` fixes that. It ships 200+ pre-translated keys for Kreyòl, French, and English — covering the most common UI patterns out of the box — with a developer experience that stays out of your way.

- **< 3KB** gzip · zero runtime dependencies
- **TypeScript-first** — full type safety, autocomplete on keys
- **React Context** based — compatible with React Native
- **Fallback chain** — graceful degradation across languages
- **Auto-detection** from `navigator.language`

<br/>

[↑ Back to top](#-table-of-contents)

---

## ✦ Installation

```bash
# npm
npm install ht-i18n

# yarn
yarn add ht-i18n

# pnpm
pnpm add ht-i18n
```

**Requirements:** React ≥ 17 · Node.js ≥ 18

<br/>

[↑ Back to top](#-table-of-contents)

---

## ✦ Quick Start

### 1. Wrap your app with `I18nProvider`

```tsx
// root.tsx or main.tsx
import { I18nProvider } from 'ht-i18n';
import { App } from './App';

export default function Root() {
  return (
    <I18nProvider defaultLang="ht" fallback={['fr', 'en']}>
      <App />
    </I18nProvider>
  );
}
```

### 2. Translate in any component

```tsx
import { useTranslation } from 'ht-i18n';

export function Greeting({ name }: { name: string }) {
  const { t, lang, setLang } = useTranslation();

  return (
    <div>
      <h1>{t('greeting', { name })}</h1>
      {/* → "Bonjou, Marie!" in Kreyòl */}

      <button onClick={() => setLang('ht')}>🇭🇹 Kreyòl</button>
      <button onClick={() => setLang('fr')}>🇫🇷 Français</button>
      <button onClick={() => setLang('en')}>🇬🇧 English</button>
    </div>
  );
}
```

### 3. Add custom translations

```tsx
import { I18nProvider } from 'ht-i18n';

const myLocales = {
  ht: { 'app.title': 'Aplikasyon mwen' },
  fr: { 'app.title': 'Mon application' },
  en: { 'app.title': 'My application' },
};

function Root() {
  return (
    <I18nProvider locales={myLocales} defaultLang="ht">
      <App />
    </I18nProvider>
  );
}
```

> Custom locales are **merged** with built-ins — your keys override, everything else stays available.

<br/>

[↑ Back to top](#-table-of-contents)

---

## ✦ API Reference

### `<I18nProvider>`

<div align="center">

| Prop | Type | Default | Description |
|:---|:---|:---:|:---|
| `defaultLang` | `'ht' \| 'fr' \| 'en'` | `'ht'` | Initial language |
| `locales` | `Record<Lang, Record<string, string>>` | built-in | Custom translations (merged) |
| `fallback` | `Lang[]` | `['fr', 'en']` | Fallback chain when a key is missing |
| `autoDetect` | `boolean` | `true` | Auto-detect from `navigator.language` |

</div>

---

### `useTranslation()`

```tsx
const { t, lang, setLang } = useTranslation();
```

<div align="center">

| Return | Type | Description |
|:---|:---|:---|
| `t(key, vars?)` | `(key: string, vars?: Record<string, string \| number>) => string` | Translate a key with optional interpolation |
| `lang` | `'ht' \| 'fr' \| 'en'` | Current active language |
| `setLang` | `(lang: Lang) => void` | Switch language |

</div>

---

### Interpolation

Keys support `{{variable}}` placeholders:

```json
{ "greeting": "Bonjou, {{name}}!" }
```

```tsx
t('greeting', { name: 'Marie' })
// → "Bonjou, Marie!"
```

---

### Plurals

Use `_one` and `_other` suffixes:

```json
{
  "items_one": "{{count}} atik",
  "items_other": "{{count}} atik"
}
```

```tsx
t('items', { count: 1 })  // → "1 atik"
t('items', { count: 5 })  // → "5 atik"
```

<br/>

[↑ Back to top](#-table-of-contents)

---

## ✦ 200+ Built-in Keys

`ht-i18n` ships with ~200 pre-translated keys covering the most common UI patterns — in Kreyòl, French, and English.

```
# Actions
btn.save       btn.cancel     btn.delete     btn.confirm
btn.edit       btn.close      btn.back       btn.next

# Errors
err.required   err.invalid    err.network    err.notfound

# Navigation
nav.home       nav.about      nav.contact    nav.settings

# Auth
auth.login     auth.logout    auth.signup    auth.password

# Status
status.loading   status.success   status.error   status.empty
```

View the full list → [`src/locales/ht.json`](src/locales/ht.json)

<br/>

[↑ Back to top](#-table-of-contents)

---

## ✦ Troubleshooting

### `Cannot find module 'ht-i18n'`

```bash
rm -rf node_modules package-lock.json
npm install
```

If still failing:
```bash
npm install ht-i18n --save
```

---

### `useTranslation must be used within an I18nProvider`

Your component is outside the provider tree:

```tsx
// ❌ Wrong
function App() {
  return <MyComponent />;
}

// ✅ Correct
function App() {
  return (
    <I18nProvider defaultLang="ht">
      <MyComponent />
    </I18nProvider>
  );
}
```

---

### Translation key returns itself (e.g. `"btn.save"`)

The key isn't found in your locale. Check:
1. Spelling is exact — keys are case-sensitive
2. The key exists in your `locales` object
3. Your fallback chain includes a language that has the key

```tsx
// Quick debug
const { t } = useTranslation();
console.log(t('btn.save')); // Should NOT return "btn.save"
```

---

### TypeScript: `Type 'string' is not assignable to type 'Lang'`

```tsx
// ❌ Wrong
const lang = 'ht';

// ✅ Correct
import type { Lang } from 'ht-i18n';
const lang: Lang = 'ht';
```

---

### Language detection not working

`navigator.language` may return `'fr-HT'` instead of `'ht'`. You can disable auto-detection and handle it manually:

```tsx
<I18nProvider defaultLang="ht" autoDetect={false}>
```

Or normalize on mount:

```tsx
useEffect(() => {
  const nav = navigator.language.split('-')[0] as Lang;
  if (['ht', 'fr', 'en'].includes(nav)) setLang(nav);
}, []);
```

---

### SSR / Next.js: `ReferenceError: navigator is not defined`

```tsx
<I18nProvider defaultLang="ht" autoDetect={false}>
```

Then detect language client-side inside a `useEffect`.

---

### Bundle larger than expected

Use named imports only — they're tree-shakeable:

```tsx
// ✅ Tree-shakeable
import { useTranslation } from 'ht-i18n';

// ❌ Avoid — pulls everything in
import ht from 'ht-i18n';
```

<br/>

[↑ Back to top](#-table-of-contents)

---

## ✦ FAQ

**Q: Poukisa Kreyòl Ayisyen kòm lang prensipal?**  
A: Ayiti gen plis pase 11 milyon moun ki pale Kreyòl. Se lang manman majorite Ayisyen yo — men li prèske absan nan zouti open-source yo. Pwojè sa a chanje sa.

**Q: Can I use `ht-i18n` without React?**  
A: The core `translate()` function is framework-agnostic. The React-specific parts (`I18nProvider`, `useTranslation`) require React 17+.

**Q: Does it support RTL languages?**  
A: Not natively. You can combine it with CSS `dir="rtl"` on your own elements.

**Q: How do I add a language beyond ht / fr / en?**

```tsx
const locales = {
  ht: { ... },
  fr: { ... },
  en: { ... },
  es: { 'btn.save': 'Guardar' },
};
<I18nProvider locales={locales} defaultLang="ht">
```

**Q: Are the Kreyòl translations validated by native speakers?**  
A: The initial 200 keys were reviewed carefully. Contributions from native Kreyòl speakers are actively welcome — open an issue or PR anytime.

**Q: Does it work with React Native?**  
A: Yes — it only uses React Context. Tested with React Native 0.73+.

<br/>

[↑ Back to top](#-table-of-contents)

---

## ✦ Contributing

Contributions are what make open source thrive.

- 🐛 **Bug reports** → [Open an issue](https://github.com/mrsaget2003/ht-i18n/issues)
- 🌍 **Translation improvements** → Edit `src/locales/*.json`
- ✨ **New features** → Open a PR with a clear description
- 📖 **Docs** → Always welcome

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/ht-i18n.git
cd ht-i18n

# Install
npm install

# Develop
npm run dev

# Test
npm test

# Build
npm run build
```

<br/>

[↑ Back to top](#-table-of-contents)

---

## ✦ Credits

<div align="center">

<br/>

**Designed, built & maintained by**

<br/>

[![mrsaget2003](https://img.shields.io/badge/mrsaget2003-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mrsaget2003)

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-mrsaget2003-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/mrsaget2003)
[![npm](https://img.shields.io/badge/npm-ht--i18n-CB3837?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/ht-i18n)
[![Made in Haiti](https://img.shields.io/badge/Made%20in-Haiti%20%F0%9F%87%AD%F0%9F%87%B9-004F9F?style=flat-square)](https://github.com/mrsaget2003)

<br/>

*MIT License · © 2026 mrsaget2003*

<br/>

> *For Haiti's 11 million Kreyòl speakers — and every developer who builds for them.*

<br/>

</div>

[↑ Back to top](#-table-of-contents)
