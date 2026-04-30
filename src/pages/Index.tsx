import { useEffect, useMemo, useState } from "react";
import { I18nContext, Lang, translate, useTranslation } from "@/lib/i18n";
import { LangSwitcher } from "@/components/LangSwitcher";
import { CodeBlock } from "@/components/CodeBlock";

/* ─── helpers ─── */
const S = {
  bg: "#171719",
  surface: "#1e1e20",
  surface2: "#26262a",
  border: "#2e2e33",
  borderMid: "#3a3a3e",
  text: "#F1F1F1",
  muted: "#b5b5b3",
  dimmed: "#6a6a6e",
};

const installCode = `npm install ht-i18n`;

const providerCode = `import { I18nProvider } from 'ht-i18n';
import { App } from './App';

export default function Root() {
  return (
    <I18nProvider defaultLang="ht" fallback={['fr', 'en']}>
      <App />
    </I18nProvider>
  );
}`;

const usageCode = `import { useTranslation } from 'ht-i18n';

export function Greeting({ name }) {
  const { t, lang, setLang } = useTranslation();
  return (
    <div>
      <h1>{t('greeting', { name })}</h1>
      <button onClick={() => setLang('ht')}>
        {t('btn.save')} — {lang}
      </button>
    </div>
  );
}`;

/* ─── Demo section ─── */
function DemoBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: S.surface,
      border: `1px solid ${S.border}`,
      borderRadius: "12px",
      padding: "20px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: S.dimmed }}>
          {label}
        </span>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: S.muted, display: "inline-block", animation: "pulse-dot 2.5s ease-in-out infinite" }} />
      </div>
      {children}
    </div>
  );
}

function InteractiveDemo() {
  const { t } = useTranslation();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
      <DemoBlock label={t("demo.buttons")}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {[
            { key: "btn.save", bg: S.text, color: S.bg },
            { key: "btn.cancel", bg: "transparent", color: S.muted, border: `1px solid ${S.borderMid}` },
            { key: "btn.delete", bg: "#3a1a1a", color: "#ff6b6b", border: "1px solid #5a2a2a" },
          ].map(({ key, bg, color, border }) => (
            <button key={key} style={{
              background: bg, color, border: border ?? "none",
              borderRadius: "6px", padding: "7px 14px",
              fontSize: "13px", fontFamily: '"Space Grotesk", sans-serif',
              cursor: "pointer", fontWeight: 500, transition: "opacity 0.2s",
            }}>{t(key)}</button>
          ))}
        </div>
        <code style={{ display: "block", marginTop: "14px", fontSize: "11px", fontFamily: '"JetBrains Mono", monospace', color: S.dimmed }}>
          t('btn.save')
        </code>
      </DemoBlock>

      <DemoBlock label={t("demo.errors")}>
        <div style={{
          background: "#2a1515", border: "1px solid #4a2020",
          borderRadius: "8px", padding: "12px 14px",
          fontSize: "13px", color: "#ff8a8a",
        }}>
          ⚠ {t("err.required")}
        </div>
        <code style={{ display: "block", marginTop: "14px", fontSize: "11px", fontFamily: '"JetBrains Mono", monospace', color: S.dimmed }}>
          t('err.required')
        </code>
      </DemoBlock>

      <DemoBlock label={t("demo.interpolation")}>
        <p style={{ fontSize: "18px", fontFamily: '"Orbitron", sans-serif', fontWeight: 700, color: S.text, margin: 0 }}>
          {t("greeting", { name: "Marie" })}
        </p>
        <code style={{ display: "block", marginTop: "14px", fontSize: "11px", fontFamily: '"JetBrains Mono", monospace', color: S.dimmed }}>
          t('greeting', {`{ name: 'Marie' }`})
        </code>
      </DemoBlock>
    </div>
  );
}

/* ─── Features ─── */
const features = [
  { icon: "fa-globe", title: "Auto-detection", desc: "Detects navigator.language on mount, maps to ht | fr | en." },
  { icon: "fa-code-branch", title: "Fallback chain", desc: "ht → fr → en configurable per provider instance." },
  { icon: "fa-at", title: "Interpolation", desc: "t('key', { name }) resolves {{name}} tokens in strings." },
  { icon: "fa-hashtag", title: "Plurals", desc: "items_one / items_other resolved automatically from count." },
  { icon: "fa-book", title: "200+ keys", desc: "Buttons, errors, navigation pre-translated in Kreyòl." },
  { icon: "fa-feather", title: "< 3KB gzip", desc: "Zero heavy dependencies. Tree-shakeable. Edge-ready." },
];

/* ─── Nav ─── */
function Nav() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      borderBottom: `1px solid ${scrolled ? S.border : "transparent"}`,
      background: scrolled ? "rgba(23,23,25,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      transition: "all 0.3s",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{
            width: 34, height: 34, borderRadius: "8px",
            background: S.text, display: "grid", placeItems: "center",
          }}>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "12px", fontWeight: 700, color: S.bg }}>ht</span>
          </div>
          <span style={{ fontFamily: '"Orbitron", sans-serif', fontSize: "14px", fontWeight: 700, color: S.text, letterSpacing: "0.05em" }}>ht-i18n</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <LangSwitcher />
          <a href="https://github.com/mrsaget2003/ht-i18n" target="_blank" rel="noreferrer"
            style={{ color: S.muted, textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontFamily: '"Space Grotesk", sans-serif', transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = S.text)}
            onMouseLeave={e => (e.currentTarget.style.color = S.muted)}
          >
            <i className="fa-brands fa-github" /> GitHub
          </a>
          <a href="#credits"
            style={{ color: S.muted, textDecoration: "none", fontSize: "14px", fontFamily: '"Space Grotesk", sans-serif', transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = S.text)}
            onMouseLeave={e => (e.currentTarget.style.color = S.muted)}
          >
            {t("nav.credits")}
          </a>
        </div>
      </div>
    </header>
  );
}

/* ─── Hero ─── */
function Hero() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText("npm install ht-i18n");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section style={{ padding: "100px 32px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(${S.border} 1px, transparent 1px), linear-gradient(90deg, ${S.border} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)",
        opacity: 0.35,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto" }}>
        {/* Badges */}
        <div className="animate-fade-in" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", marginBottom: "28px" }}>
          {[
            { label: "npm v1.0.0", icon: "fa-box" },
            { label: "< 3KB gzip", icon: "fa-bolt" },
            { label: "MIT License", icon: "fa-scale-balanced" },
            { label: "TypeScript", icon: "fa-code" },
          ].map(({ label, icon }) => (
            <span key={label} style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "5px 14px", borderRadius: "9999px",
              border: `1px solid ${S.borderMid}`,
              background: S.surface, color: S.muted,
              fontSize: "12px", fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 500,
            }}>
              <i className={`fa-solid ${icon}`} style={{ fontSize: "10px" }} /> {label}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="animate-fade-up" style={{
          fontFamily: '"Orbitron", sans-serif',
          fontSize: "clamp(28px, 5vw, 58px)",
          fontWeight: 900, lineHeight: 1.1,
          letterSpacing: "-0.02em",
          animationDelay: "0.1s", opacity: 0,
          margin: "0 0 20px",
        }}>
          <span style={{
            background: "linear-gradient(90deg, #F1F1F1 0%, #b5b5b3 40%, #F1F1F1 60%, #b5b5b3 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 4s linear infinite",
          }}>
            ht-i18n
          </span>
        </h1>

        <p className="animate-fade-up" style={{
          fontFamily: '"Orbitron", sans-serif',
          fontSize: "clamp(13px, 2vw, 18px)", fontWeight: 400,
          color: S.muted, lineHeight: 1.6,
          animationDelay: "0.2s", opacity: 0,
          margin: "0 0 14px",
        }}>
          {t("hero.title").split("ht-i18n — ").pop()}
        </p>

        <p className="animate-fade-up" style={{
          fontSize: "16px", color: S.dimmed,
          fontFamily: '"Space Grotesk", sans-serif',
          maxWidth: "560px", margin: "0 auto 44px",
          lineHeight: 1.7, animationDelay: "0.25s", opacity: 0,
        }}>
          {t("hero.subtitle")}
        </p>

        {/* CTAs */}
        <div className="animate-fade-up" style={{
          display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px",
          animationDelay: "0.35s", opacity: 0,
        }}>
          <a href="https://github.com/mrsaget2003/ht-i18n" target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "12px 28px", borderRadius: "8px",
            background: S.text, color: S.bg,
            fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: "14px",
            textDecoration: "none", transition: "opacity 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            <i className="fa-brands fa-github" /> View on GitHub
            <i className="fa-solid fa-arrow-right" style={{ fontSize: "11px" }} />
          </a>
          <button onClick={onCopy} style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "12px 24px", borderRadius: "8px",
            border: `1px solid ${S.borderMid}`, background: S.surface,
            color: S.text, fontFamily: '"JetBrains Mono", monospace', fontSize: "13px",
            cursor: "pointer", transition: "border-color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = S.muted)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = S.borderMid)}
          >
            <i className="fa-solid fa-terminal" style={{ color: S.muted, fontSize: "11px" }} />
            <span style={{ color: S.dimmed }}>$</span> npm install ht-i18n
            <span style={{ fontSize: "11px", color: copied ? "#a5d6a7" : S.dimmed }}>
              {copied ? "✓" : <i className="fa-regular fa-copy" />}
            </span>
          </button>
        </div>

        {/* Live demo strip */}
        <div className="animate-fade-up" style={{
          marginTop: "64px", animationDelay: "0.45s", opacity: 0,
          border: `1px solid ${S.border}`, borderRadius: "16px",
          background: "rgba(30,30,32,0.6)", backdropFilter: "blur(8px)",
          padding: "24px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: S.dimmed }}>
              live preview
            </span>
            <LangSwitcher />
          </div>
          <InteractiveDemo />
        </div>
      </div>
    </section>
  );
}

/* ─── Features Grid ─── */
function Features() {
  const { t } = useTranslation();
  return (
    <section data-reveal style={{ padding: "80px 32px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "56px" }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.14em", color: S.dimmed }}>
          capabilities
        </span>
        <h2 style={{ fontFamily: '"Orbitron", sans-serif', fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, margin: "12px 0 16px", color: S.text }}>
          {t("features.title")}
        </h2>
        <p style={{ color: S.muted, fontSize: "15px", maxWidth: "520px", margin: "0 auto", lineHeight: 1.6 }}>
          {t("features.subtitle")}
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
        {features.map((f) => (
          <div key={f.icon} style={{
            background: S.surface, border: `1px solid ${S.border}`,
            borderRadius: "12px", padding: "24px",
            transition: "border-color 0.2s, background 0.2s",
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = S.borderMid;
              (e.currentTarget as HTMLDivElement).style.background = S.surface2;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = S.border;
              (e.currentTarget as HTMLDivElement).style.background = S.surface;
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: "8px",
              background: S.surface2, border: `1px solid ${S.border}`,
              display: "grid", placeItems: "center", marginBottom: "16px",
            }}>
              <i className={`fa-solid ${f.icon}`} style={{ fontSize: "15px", color: S.muted }} />
            </div>
            <h3 style={{ fontFamily: '"Orbitron", sans-serif', fontSize: "13px", fontWeight: 700, color: S.text, margin: "0 0 8px", letterSpacing: "0.04em" }}>
              {f.title}
            </h3>
            <p style={{ color: S.muted, fontSize: "13px", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Code Examples ─── */
function CodeSection() {
  const { t } = useTranslation();
  const steps = [
    { num: "01", label: "Install", code: installCode, lang: "bash" as const, filename: "terminal" },
    { num: "02", label: "Setup provider", code: providerCode, lang: "tsx" as const, filename: "root.tsx" },
    { num: "03", label: "Use the hook", code: usageCode, lang: "tsx" as const, filename: "Greeting.tsx" },
  ];
  return (
    <section data-reveal style={{ padding: "80px 32px", borderTop: `1px solid ${S.border}`, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "56px" }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.14em", color: S.dimmed }}>
          quick start
        </span>
        <h2 style={{ fontFamily: '"Orbitron", sans-serif', fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, margin: "12px 0 0", color: S.text }}>
          {t("code.title")}
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        {steps.map(({ num, label, code, lang, filename }) => (
          <div key={num}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{
                fontFamily: '"Orbitron", sans-serif', fontSize: "11px", fontWeight: 700,
                color: S.dimmed, border: `1px solid ${S.border}`,
                borderRadius: "6px", padding: "2px 8px",
              }}>{num}</span>
              <span style={{ fontSize: "14px", fontFamily: '"Space Grotesk", sans-serif', fontWeight: 500, color: S.muted }}>{label}</span>
            </div>
            <CodeBlock code={code} lang={lang} filename={filename} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Credits page ─── */
const socials = [
  { icon: "fa-github", label: "GitHub", href: "https://github.com/mrsaget2003", username: "mrsaget2003" },
  { icon: "fa-instagram", label: "Instagram", href: "https://instagram.com/mrsaget2003", username: "@mrsaget2003" },
  { icon: "fa-facebook", label: "Facebook", href: "https://facebook.com/mrsaget2003", username: "mrsaget2003" },
  { icon: "fa-linkedin", label: "LinkedIn", href: "https://linkedin.com/in/mrsaget2003", username: "mrsaget2003" },
  { icon: "fa-reddit", label: "Reddit", href: "https://reddit.com/u/mrsaget2003", username: "u/mrsaget2003" },
  { icon: "fa-telegram", label: "Telegram", href: "https://t.me/mrsaget2003", username: "@mrsaget2003" },
];

function Credits() {
  return (
    <section id="credits" data-reveal style={{
      padding: "100px 32px",
      borderTop: `1px solid ${S.border}`,
      maxWidth: 1200, margin: "0 auto",
      textAlign: "center",
    }}>
      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.14em", color: S.dimmed }}>
        built by
      </span>

      {/* Avatar ring */}
      <div style={{
        width: 100, height: 100, borderRadius: "50%",
        border: `1px solid ${S.borderMid}`,
        background: S.surface, margin: "24px auto 20px",
        display: "grid", placeItems: "center",
        overflow: "hidden",
      }}>
        <img src="https://raw.githubusercontent.com/mrsaget2003/ht-i18n/land/public/PFP.jpg" alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <h2 style={{
        fontFamily: '"Orbitron", sans-serif', fontSize: "clamp(20px, 3vw, 32px)",
        fontWeight: 900, color: S.text, margin: "0 0 8px", letterSpacing: "0.04em",
      }}>
        mrsaget2003
      </h2>
      <p style={{ color: S.muted, fontSize: "15px", margin: "0 0 12px", fontFamily: '"Space Grotesk", sans-serif' }}>
        Haïti 🇭🇹 · Open Source Developer
      </p>
      <p style={{ color: S.dimmed, fontSize: "13px", maxWidth: "460px", margin: "0 auto 48px", lineHeight: 1.7 }}>
        Creator of <strong style={{ color: S.muted }}>ht-i18n</strong> — the first npm library with native Kreyòl Ayisyen support.
        Making Haitian Creole a first-class citizen in the open source ecosystem.
      </p>

      {/* Social grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "12px",
        maxWidth: 700,
        margin: "0 auto 60px",
      }}>
        {socials.map(({ icon, label, href, username }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
            padding: "20px 16px",
            background: S.surface, border: `1px solid ${S.border}`,
            borderRadius: "12px", textDecoration: "none",
            transition: "border-color 0.2s, background 0.2s",
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = S.muted;
              (e.currentTarget as HTMLAnchorElement).style.background = S.surface2;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = S.border;
              (e.currentTarget as HTMLAnchorElement).style.background = S.surface;
            }}
          >
            <i className={`fa-brands ${icon}`} style={{ fontSize: "22px", color: S.muted }} />
            <div>
              <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: "13px", color: S.text }}>{label}</div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "11px", color: S.dimmed, marginTop: "2px" }}>{username}</div>
            </div>
          </a>
        ))}
      </div>

      {/* Contribution CTA */}
      <div style={{
        maxWidth: 560, margin: "0 auto",
        padding: "28px 32px",
        background: S.surface, border: `1px solid ${S.border}`,
        borderRadius: "16px",
      }}>
        <h3 style={{ fontFamily: '"Orbitron", sans-serif', fontSize: "14px", fontWeight: 700, color: S.text, margin: "0 0 10px" }}>
          Kontribye / Contribuer / Contribute
        </h3>
        <p style={{ color: S.muted, fontSize: "13px", lineHeight: 1.7, margin: "0 0 20px" }}>
          This project is open source. Pull requests, translations, and issues are welcome.
          Help make Kreyòl Ayisyen thrive in tech.
        </p>
        <a href="https://github.com/mrsaget2003/ht-i18n" target="_blank" rel="noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "10px 22px", borderRadius: "8px",
          background: S.text, color: S.bg,
          fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: "13px",
          textDecoration: "none",
        }}>
          <i className="fa-brands fa-github" /> Star on GitHub
        </a>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  const { t } = useTranslation();
  return (
    <footer style={{ borderTop: `1px solid ${S.border}`, padding: "32px", }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", flexWrap: "wrap",
        alignItems: "center", justifyContent: "space-between", gap: "16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: 28, height: 28, borderRadius: "6px", background: S.text, display: "grid", placeItems: "center" }}>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "11px", fontWeight: 700, color: S.bg }}>ht</span>
          </div>
          <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: "13px", color: S.muted }}>
            ht-i18n · {t("footer.made")} 🇭🇹
          </span>
        </div>
        <nav style={{ display: "flex", gap: "24px" }}>
          {[
            { label: "GitHub", href: "https://github.com/mrsaget2003/ht-i18n", icon: "fa-brands fa-github" },
            { label: "npm", href: "https://npmjs.com/package/ht-i18n", icon: "fa-brands fa-npm" },
            { label: "MIT License", href: "#", icon: "fa-solid fa-scale-balanced" },
          ].map(({ label, href, icon }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              style={{ color: S.muted, textDecoration: "none", fontSize: "13px", fontFamily: '"Space Grotesk", sans-serif', display: "flex", alignItems: "center", gap: "6px", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = S.text)}
              onMouseLeave={e => (e.currentTarget.style.color = S.muted)}
            >
              <i className={icon} style={{ fontSize: "12px" }} /> {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

/* ─── Root ─── */
export default function Index() {
  const [lang, setLang] = useState<Lang>("ht");
  const value = useMemo(() => ({
    lang,
    setLang,
    t: (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars),
  }), [lang]);

  useEffect(() => {
    // scroll reveal
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-reveal]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <I18nContext.Provider value={value}>
      <div className="noise" style={{ minHeight: "100vh", background: S.bg }}>
        <Nav />
        <Hero />
        <div style={{ borderTop: `1px solid ${S.border}` }}>
          <Features />
        </div>
        <CodeSection />
        <Credits />
        <Footer />
      </div>
    </I18nContext.Provider>
  );
}
