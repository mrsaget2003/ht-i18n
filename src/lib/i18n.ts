import { createContext, useContext } from "react";

export type Lang = "ht" | "fr" | "en";

export const translations: Record<Lang, Record<string, string>> = {
  ht: {
    "hero.title": "ht-i18n — i18n React ak sipò natif Kreyòl Ayisyen",
    "hero.subtitle": "Premye libreri npm ak Kreyòl Ayisyen entegre. Lejè < 3KB gzip.",
    "demo.title": "Demo entèaktif",
    "demo.subtitle": "Chanje lang nan epi gade tout bagay aktyalize an tan reyèl.",
    "demo.buttons": "Bouton UI",
    "demo.errors": "Mesaj erè",
    "demo.interpolation": "Entèpolasyon",
    "btn.save": "Sove",
    "btn.cancel": "Anile",
    "btn.delete": "Efase",
    "err.required": "Enfòmasyon sa obligatwa",
    "greeting": "Bonjou, {{name}}!",
    "features.title": "Karakteristik",
    "features.subtitle": "Tout sa ou bezwen pou entènasyonalize aplikasyon React ou.",
    "code.title": "Kòmanse nan 30 segond",
    "footer.made": "Fèt ann Ayiti",
    "nav.credits": "Kreyatè",
    "nav.docs": "Dok",
  },
  fr: {
    "hero.title": "ht-i18n — i18n React avec support natif du Kreyòl Ayisyen",
    "hero.subtitle": "La première librairie npm avec créole haïtien intégré. Léger < 3KB gzip.",
    "demo.title": "Démo interactive",
    "demo.subtitle": "Changez la langue et voyez tout se mettre à jour en temps réel.",
    "demo.buttons": "Boutons UI",
    "demo.errors": "Messages d'erreur",
    "demo.interpolation": "Interpolation",
    "btn.save": "Sauvegarder",
    "btn.cancel": "Annuler",
    "btn.delete": "Supprimer",
    "err.required": "Ce champ est requis",
    "greeting": "Bonjour, {{name}}!",
    "features.title": "Fonctionnalités",
    "features.subtitle": "Tout ce dont vous avez besoin pour internationaliser votre app React.",
    "code.title": "Démarrez en 30 secondes",
    "footer.made": "Créé en Haïti",
    "nav.credits": "Créateur",
    "nav.docs": "Docs",
  },
  en: {
    "hero.title": "ht-i18n — i18n React with native Kreyòl Ayisyen support",
    "hero.subtitle": "The first npm library with built-in Haitian Creole. Lightweight < 3KB gzip.",
    "demo.title": "Interactive demo",
    "demo.subtitle": "Switch the language and watch everything update in real time.",
    "demo.buttons": "UI Buttons",
    "demo.errors": "Error messages",
    "demo.interpolation": "Interpolation",
    "btn.save": "Save",
    "btn.cancel": "Cancel",
    "btn.delete": "Delete",
    "err.required": "This field is required",
    "greeting": "Hello, {{name}}!",
    "features.title": "Features",
    "features.subtitle": "Everything you need to internationalize your React app.",
    "code.title": "Get started in 30 seconds",
    "footer.made": "Made in Haiti",
    "nav.credits": "Creator",
    "nav.docs": "Docs",
  },
};

export const langLabels: Record<Lang, string> = {
  ht: "Kreyòl",
  fr: "Français",
  en: "English",
};

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

export const I18nContext = createContext<I18nCtx>({
  lang: "ht",
  setLang: () => {},
  t: (k) => k,
});

export const useTranslation = () => useContext(I18nContext);

export function translate(lang: Lang, key: string, vars?: Record<string, string | number>) {
  let str = translations[lang][key] ?? translations.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(new RegExp(`{{\\s*${k}\\s*}}`, "g"), String(v));
    }
  }
  return str;
}
