import { useState } from "react";

type Token = { text: string; color?: string };

function highlight(code: string, lang: "bash" | "tsx"): Token[] {
  if (lang === "bash") {
    return code.split(/(\s+)/).map((part, i) => {
      if (i === 0) return { text: part, color: "#b5b5b3" };
      if (/^(install|add|run|init)$/.test(part)) return { text: part, color: "#F1F1F1" };
      if (part.startsWith("-")) return { text: part, color: "#888" };
      return { text: part, color: "#e0e0e0" };
    });
  }
  const tokens: Token[] = [];
  const re =
    /(\/\/[^\n]*)|(`[^`]*`|'[^']*'|"[^"]*")|(\b(?:import|from|export|const|let|return|function|default|if|else|type)\b)|(\b(?:I18nProvider|useTranslation|App|React)\b)|(\b[A-Za-z_$][\w$]*)(?=\s*\()|(\b[A-Z][\w$]*)|(\{|\}|\(|\)|\[|\]|=>|=|;|,|<|>|\/)|(\s+)|([^\s]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code))) {
    if (m[1]) tokens.push({ text: m[1], color: "#666" });
    else if (m[2]) tokens.push({ text: m[2], color: "#a5d6a7" });
    else if (m[3]) tokens.push({ text: m[3], color: "#c792ea" });
    else if (m[4]) tokens.push({ text: m[4], color: "#82aaff" });
    else if (m[5]) tokens.push({ text: m[5], color: "#82aaff" });
    else if (m[6]) tokens.push({ text: m[6], color: "#ffcb6b" });
    else if (m[7]) tokens.push({ text: m[7], color: "#89ddff" });
    else if (m[8]) tokens.push({ text: m[8], color: "#eee" });
    else tokens.push({ text: m[9] ?? m[0], color: "#ccc" });
  }
  return tokens;
}

interface Props {
  code: string;
  lang?: "bash" | "tsx";
  filename?: string;
}

export const CodeBlock = ({ code, lang = "tsx", filename }: Props) => {
  const [copied, setCopied] = useState(false);
  const tokens = highlight(code, lang);

  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div style={{
      borderRadius: "12px",
      border: "1px solid #2a2a2e",
      background: "#0d0d0f",
      overflow: "hidden",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        borderBottom: "1px solid #2a2a2e",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
          {filename && (
            <span style={{ marginLeft: "8px", fontSize: "12px", fontFamily: '"JetBrains Mono", monospace', color: "#b5b5b3" }}>
              {filename}
            </span>
          )}
        </div>
        <button
          onClick={onCopy}
          style={{
            background: "none",
            border: "1px solid #3a3a3e",
            borderRadius: "6px",
            padding: "3px 10px",
            cursor: "pointer",
            color: copied ? "#a5d6a7" : "#b5b5b3",
            fontSize: "11px",
            fontFamily: '"Space Grotesk", sans-serif',
            transition: "all 0.2s",
          }}
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre style={{
        overflowX: "auto",
        padding: "20px",
        margin: 0,
        fontSize: "13px",
        lineHeight: "1.7",
        fontFamily: '"JetBrains Mono", monospace',
      }}>
        <code>
          {tokens.map((t, i) => (
            <span key={i} style={{ color: t.color }}>{t.text}</span>
          ))}
        </code>
      </pre>
    </div>
  );
};
