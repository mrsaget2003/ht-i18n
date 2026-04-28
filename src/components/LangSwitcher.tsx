import { Lang, langLabels, useTranslation } from "@/lib/i18n";

const langs: Lang[] = ["ht", "fr", "en"];
const flags: Record<Lang, string> = { ht: "🇭🇹", fr: "🇫🇷", en: "🇬🇧" };

export const LangSwitcher = ({ className = "" }: { className?: string }) => {
  const { lang, setLang } = useTranslation();
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1 ${className}`}
      role="tablist"
      aria-label="Language switcher"
    >
      {langs.map((l) => (
        <button
          key={l}
          role="tab"
          aria-selected={lang === l}
          onClick={() => setLang(l)}
          style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "6px 12px",
            borderRadius: "9999px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
            background: lang === l ? "#F1F1F1" : "transparent",
            color: lang === l ? "#171719" : "#b5b5b3",
            fontWeight: lang === l ? 600 : 400,
          }}
        >
          <span style={{ marginRight: "5px" }}>{flags[l]}</span>
          {l}
        </button>
      ))}
    </div>
  );
};
