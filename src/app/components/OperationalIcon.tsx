import type { ReactNode } from "react";

export type OperationalIconKind =
  | "control-system"
  | "operational-data"
  | "execution-system"
  | "people-authority"
  | "signal"
  | "context"
  | "flow"
  | "command"
  | "evidence"
  | "decision"
  | "work"
  | "verification"
  | "resource"
  | "security"
  | "production";

export function OperationalIcon({ kind, label, className = "", size = "medium" }: { kind: OperationalIconKind; label?: string; className?: string; size?: "small" | "medium" | "large" }) {
  return <span className={("lm-operational-icon lm-operational-icon--" + kind + " lm-operational-icon--" + size + " " + className).trim()} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : "true"}>
    <svg viewBox="0 0 112 112" focusable="false">
      <defs>
        <linearGradient id={`icon-shell-${kind}`} x1="18" y1="10" x2="94" y2="102" gradientUnits="userSpaceOnUse"><stop stopColor="#FFFFFF" /><stop offset=".5" stopColor="#E7EDF3" /><stop offset="1" stopColor="#A8BCCB" /></linearGradient>
        <linearGradient id={`icon-core-${kind}`} x1="32" y1="29" x2="80" y2="84" gradientUnits="userSpaceOnUse"><stop stopColor="#8BB4CF" /><stop offset="1" stopColor="#315F91" /></linearGradient>
        <filter id={`icon-shadow-${kind}`} x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#263244" floodOpacity=".18" /></filter>
      </defs>
      <path className="lm-operational-icon__shadow" d="M24 13h64l11 11v64L88 99H24L13 88V24z" />
      <path className="lm-operational-icon__shell" d="M24 10h64l14 14v64l-14 14H24L10 88V24z" fill={`url(#icon-shell-${kind})`} filter={`url(#icon-shadow-${kind})`} />
      <path className="lm-operational-icon__bezel" d="M29 19h54l10 10v54l-10 10H29L19 83V29z" />
      <circle className="lm-operational-icon__dial" cx="56" cy="56" r="28" fill={`url(#icon-core-${kind})`} />
      <path className="lm-operational-icon__shine" d="M35 45c7-12 20-18 34-13" />
      <g className="lm-operational-icon__marks" aria-hidden="true"><path d="M56 17v6M56 89v6M17 56h6M89 56h6" /><path d="m29 29 4 4M79 79l4 4M83 29l-4 4M33 79l-4 4" /></g>
      <g className="lm-operational-icon__glyph">{iconGlyph(kind)}</g>
      <circle className="lm-operational-icon__status" cx="88" cy="88" r="7" /><circle className="lm-operational-icon__status-core" cx="88" cy="88" r="3" />
    </svg>
  </span>;
}

function iconGlyph(kind: OperationalIconKind): ReactNode {
  switch (kind) {
    case "control-system": return <><path d="M34 59h10l5-17 9 29 7-21 5 9h8" /><circle cx="56" cy="56" r="20" /></>;
    case "operational-data": return <><ellipse cx="56" cy="43" rx="17" ry="7" /><path d="M39 43v13c0 4 8 7 17 7s17-3 17-7V43M39 56v12c0 4 8 7 17 7s17-3 17-7V56" /></>;
    case "execution-system": return <><circle cx="40" cy="42" r="5" /><path d="M45 42h13c9 0 13 5 13 13v14M63 61l8 8 8-8M35 70h17" /></>;
    case "people-authority": return <><circle cx="56" cy="44" r="8" /><path d="M39 74c2-12 8-18 17-18s15 6 17 18M35 48c-5 3-8 7-9 13M77 48c5 3 8 7 9 13" /></>;
    case "signal": return <><circle cx="56" cy="56" r="4" /><path d="M45 46a15 15 0 0 0 0 20M67 46a15 15 0 0 1 0 20M37 38a26 26 0 0 0 0 36M75 38a26 26 0 0 1 0 36" /></>;
    case "context": return <><circle cx="56" cy="56" r="10" /><circle cx="38" cy="40" r="4" /><circle cx="75" cy="40" r="4" /><circle cx="75" cy="72" r="4" /><circle cx="38" cy="72" r="4" /><path d="m42 43 7 7M63 49l8-6M64 63l7 6M48 64l-7 6" /></>;
    case "flow": return <><path d="M34 41h14c7 0 10 5 10 12v19M50 64l8 8 8-8M58 52c0-7 5-11 13-11h7" /><circle cx="34" cy="41" r="4" /><circle cx="78" cy="41" r="4" /></>;
    case "command": return <><path d="M39 69a24 24 0 1 1 34 0" /><path d="M56 38v18l13 7" /><circle cx="56" cy="56" r="4" /></>;
    case "evidence": return <><path d="M40 35h25l8 8v34H40zM65 35v9h8M47 54h19M47 63h15" /><path d="m48 72 4 4 9-10" /></>;
    case "decision": return <><path d="M35 42h17M60 42h17M56 38v8M42 42v31M70 42v15M42 57h12" /><circle cx="42" cy="76" r="4" /><circle cx="70" cy="61" r="4" /></>;
    case "work": return <><path d="m39 67 21-21 9 9-21 21H39zM58 43l5-5 11 11-5 5M38 75h38" /></>;
    case "verification": return <><circle cx="56" cy="56" r="21" /><path d="m44 56 8 8 17-18" /></>;
    case "resource": return <><path d="M38 35h30l7 7v35H38zM68 35v8h7M46 52h21M46 61h21M46 70h13" /></>;
    case "security": return <><path d="M56 34c7 6 13 7 19 8v13c0 12-7 20-19 25-12-5-19-13-19-25V42c6-1 12-2 19-8z" /><path d="m47 56 7 7 12-14" /></>;
    case "production": return <><path d="M35 38h42M42 38v10c0 5 3 8 8 10v18h12V58c5-2 8-5 8-10V38" /><path d="M47 66h18M34 77h44M38 30v8M74 30v8" /><circle cx="56" cy="49" r="5" /></>;
  }
}
