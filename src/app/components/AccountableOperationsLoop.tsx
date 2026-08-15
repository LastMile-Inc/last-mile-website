import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

type LoopStage = {
  name: string;
  headline: string;
  copy: string;
  note?: string;
};

const loopStages: readonly LoopStage[] = [
  { name: "Evidence", headline: "Know what actually happened.", copy: "Capture what happened, when it happened, where it came from, and whether the reading can be trusted." },
  { name: "Understand", headline: "Know what it means here.", copy: "Connect the problem to the right asset, process, location, history, and current operating state." },
  { name: "Decide", headline: "Determine what should happen next.", copy: "Use operating context, policy, and consequence to choose an automatic response, ask a person to decide, or take no action.", note: "Not every Condition requires maintenance. Not every Condition requires action." },
  { name: "Coordinate", headline: "Bring the right participants together.", copy: "Bring operators, maintenance, control systems, work systems, and service providers into one response." },
  { name: "Act", headline: "Execute through the right system.", copy: "Start the approved maintenance, inspection, operator action, production change, or control action." },
  { name: "Verify", headline: "Confirm the operation recovered.", copy: "Keep watching the return readings until the operation is stable again.", note: "Work completed is not the same as problem solved." },
] as const;
export function AccountableOperationsLoop({ context = "home", introCopy, learningCopy }: { context?: "home" | "platform"; introCopy?: string; learningCopy: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);
  const [animatedStage, setAnimatedStage] = useState(-1);
  const [selectedStage, setSelectedStage] = useState<number | null>(null);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const play = useCallback(() => {
    clearTimers();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    loopStages.forEach((_, index) => timersRef.current.push(window.setTimeout(() => setAnimatedStage(index), 240 + index * 480)));
    timersRef.current.push(window.setTimeout(() => setAnimatedStage(0), 240 + loopStages.length * 480));
    timersRef.current.push(window.setTimeout(() => setAnimatedStage(-1), 240 + loopStages.length * 480 + 420));
  }, [clearTimers]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!("IntersectionObserver" in window)) { play(); return clearTimers; }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      play();
      observer.disconnect();
    }, { threshold: .16, rootMargin: "0px 0px -8%" });
    observer.observe(root);
    return () => { observer.disconnect(); clearTimers(); };
  }, [clearTimers, play]);

  const activeStage = selectedStage ?? animatedStage;

  return <section id="accountable-operations-loop" className="lm-premium-loop-section" aria-labelledby="premium-loop-heading">
    <div className="lm-v2-container">
      <header className="lm-home-section-head lm-premium-loop-section__head">
        {context === "platform" ? <>
          <p className="lm-eyebrow">THE LEARNING OPERATIONS PLATFORM</p>
          <h2 id="premium-loop-heading">Four products. One Accountable Operations Loop.</h2>
          <p>{introCopy ?? "Infinit-Signal, Singularity, Infinit-Flow, and Infinit-Control advance the same issue through Evidence, Understand, Decide, Coordinate, Act, and Verify. The loop keeps every decision connected to the physical result."}</p>
        </> : <>
          <p className="lm-eyebrow">HOW THE LAST MILE PLATFORM WORKS</p>
          <h2 id="premium-loop-heading">The Accountable Operations Loop</h2>
          <p>{introCopy ?? "A closed ticket only says the task ended. The loop keeps the problem, response, work, and return readings connected until the operation is stable again."}</p>
        </>}
      </header>
      <div ref={rootRef} className="lm-premium-loop-composition">
        <PrecisionLoopGraphic activeStage={activeStage} onSelect={setSelectedStage} />
        <ol className="lm-premium-loop-definitions">
          {loopStages.map((stage, index) => <li key={stage.name} className={activeStage === index ? "is-active" : activeStage >= 0 ? "is-muted" : ""}>
            <button
              type="button"
              onMouseEnter={() => setSelectedStage(index)}
              onMouseLeave={() => setSelectedStage(null)}
              onFocus={() => setSelectedStage(index)}
              onBlur={() => setSelectedStage(null)}
              aria-label={`${stage.name}: ${stage.headline}`}
            >
              <span aria-hidden="true" />
              <div><em>{stage.name}</em><strong>{stage.headline}</strong><p>{stage.copy}</p>{stage.note ? <small>{stage.note}</small> : null}</div>
            </button>
          </li>)}
        </ol>
      </div>
      <div className="lm-premium-loop-payoff"><strong>{context === "platform" ? "A new kind of learning, automated operations platform." : "Every verified fix improves the next operating decision."}</strong><p>{learningCopy}{context === "platform" ? " Customer policy and human authority remain in control." : ""}</p></div>
    </div>
  </section>;
}

function PrecisionLoopGraphic({ activeStage, onSelect }: { activeStage: number; onSelect: (stage: number | null) => void }) {
  return <figure className="lm-precision-loop" style={{ "--active-stage": activeStage } as CSSProperties} aria-labelledby="precision-loop-caption">
    <svg viewBox="0 0 920 920" role="img" aria-labelledby="precision-loop-title precision-loop-desc">
      <title id="precision-loop-title">The Accountable Operations Loop</title>
      <desc id="precision-loop-desc">A continuous engineered ring moves clockwise through Evidence, Understand, Decide, Coordinate, Act, and Verify before returning to Evidence.</desc>
      <defs>
        <linearGradient id="loop-g0" x1="300" y1="120" x2="650" y2="170" gradientUnits="userSpaceOnUse"><stop stopColor="#315F91" /><stop offset="1" stopColor="#4C86C6" /></linearGradient>
        <linearGradient id="loop-g1" x1="680" y1="170" x2="820" y2="520" gradientUnits="userSpaceOnUse"><stop stopColor="#4C86C6" /><stop offset="1" stopColor="#5E8FAF" /></linearGradient>
        <linearGradient id="loop-g2" x1="820" y1="540" x2="620" y2="805" gradientUnits="userSpaceOnUse"><stop stopColor="#5E8FAF" /><stop offset="1" stopColor="#8BB4CF" /></linearGradient>
        <linearGradient id="loop-g3" x1="600" y1="805" x2="275" y2="770" gradientUnits="userSpaceOnUse"><stop stopColor="#8BB4CF" /><stop offset="1" stopColor="#A8BCCB" /></linearGradient>
        <linearGradient id="loop-g4" x1="240" y1="750" x2="105" y2="410" gradientUnits="userSpaceOnUse"><stop stopColor="#A8BCCB" /><stop offset="1" stopColor="#5E8FAF" /></linearGradient>
        <linearGradient id="loop-g5" x1="110" y1="375" x2="300" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="#5E8FAF" /><stop offset="1" stopColor="#315F91" /></linearGradient>
        <radialGradient id="loop-center" cx="50%" cy="42%" r="62%"><stop stopColor="#FFFFFF" /><stop offset="1" stopColor="#E7EDF3" /></radialGradient>
        <filter id="loop-depth" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="12" stdDeviation="13" floodColor="#263244" floodOpacity=".16" /></filter>
      </defs>
      <circle className="lm-precision-loop__halo" cx="460" cy="460" r="420" />
      <circle className="lm-precision-loop__grid" cx="460" cy="460" r="398" />
      <circle className="lm-precision-loop__orbit lm-precision-loop__orbit--outer" cx="460" cy="460" r="380" />
      <circle className="lm-precision-loop__orbit lm-precision-loop__orbit--inner" cx="460" cy="460" r="258" />
      <g className="lm-precision-loop__ticks" aria-hidden="true">
        {Array.from({ length: 48 }, (_, index) => {
          const angle = -90 + index * 7.5;
          const inner = polar(460, 460, index % 8 === 0 ? 377 : 386, angle);
          const outer = polar(460, 460, 399, angle);
          return <line key={angle} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} />;
        })}
      </g>
      <circle className="lm-precision-loop__rail-shadow" cx="460" cy="460" r="318" />
      <circle className="lm-precision-loop__rail" cx="460" cy="460" r="318" />
      {loopStages.map((stage, index) => {
        const start = -90 + index * 60 + 3;
        const end = -90 + (index + 1) * 60 - 1.5;
        const segment = ringSegmentPath(460, 460, 366, 270, start, end);
        return <g key={stage.name} className={"lm-precision-segment lm-precision-segment--" + index + (activeStage === index ? " is-active" : activeStage >= 0 ? " is-muted" : "")} onMouseEnter={() => onSelect(index)} onMouseLeave={() => onSelect(null)} onClick={() => onSelect(index)}>
          <path className="lm-precision-segment__depth" d={segment} />
          <path className="lm-precision-segment__face" d={segment} />
          <path className="lm-precision-segment__edge" d={ringGuidePath(460, 460, 348, start + 3, end - 8)} />
        </g>;
      })}      {loopStages.map((stage, index) => {
        const point = polar(460, 460, 318, -60 + index * 60);
        return <circle key={`${stage.name}-node`} className={`lm-precision-loop__node${activeStage === index ? " is-active" : ""}`} cx={point.x} cy={point.y} r="7" />;
      })}
      <circle className="lm-precision-loop__center" cx="460" cy="460" r="218" />
      <circle className="lm-precision-loop__center-rule" cx="460" cy="460" r="194" />
      <path className="lm-precision-loop__center-trace" d="M322 504 C372 472 394 541 442 497 S526 454 596 490" />
      <text className="lm-precision-loop__eyebrow" x="460" y="418" textAnchor="middle">THE LAST MILE</text>
      <text className="lm-precision-loop__title" x="460" y="470" textAnchor="middle">Condition → Response → Outcome</text>
      <text className="lm-precision-loop__sub" x="460" y="518" textAnchor="middle">One accountable operational cycle</text>
      {loopStages.map((stage, index) => {
        const angle = -60 + index * 60;
        const lineStart = polar(460, 460, 354, angle);
        const lineEnd = polar(460, 460, 371, angle);
        const point = polar(460, 460, 394, angle);
        return <g key={stage.name} className={`lm-precision-label lm-precision-label--${index}${activeStage === index ? " is-active" : activeStage >= 0 ? " is-muted" : ""}`} onMouseEnter={() => onSelect(index)} onMouseLeave={() => onSelect(null)}>
          <line x1={lineStart.x} y1={lineStart.y} x2={lineEnd.x} y2={lineEnd.y} />
          <text x={point.x} y={point.y} textAnchor="middle" dominantBaseline="middle">{stage.name.toUpperCase()}</text>
        </g>;
      })}
      <text className="lm-precision-loop__return-label" x="460" y="45" textAnchor="middle">VERIFY RECONNECTS TO EVIDENCE</text>
    </svg>
    <figcaption id="precision-loop-caption" className="lm-visually-hidden">The return reading becomes the starting point for the next decision.</figcaption>
  </figure>;
}

function polar(cx: number, cy: number, radius: number, angle: number) {
  const radians = angle * Math.PI / 180;
  return { x: Number((cx + radius * Math.cos(radians)).toFixed(2)), y: Number((cy + radius * Math.sin(radians)).toFixed(2)) };
}
function ringGuidePath(cx: number, cy: number, radius: number, start: number, end: number) {
  const a = polar(cx, cy, radius, start);
  const b = polar(cx, cy, radius, end);
  return "M " + a.x + " " + a.y + " A " + radius + " " + radius + " 0 0 1 " + b.x + " " + b.y;
}

function ringSegmentPath(cx: number, cy: number, outer: number, inner: number, start: number, end: number) {
  const outerStart = polar(cx, cy, outer, start);
  const outerShoulder = polar(cx, cy, outer, end - 8);
  const tip = polar(cx, cy, (outer + inner) / 2, end);
  const innerShoulder = polar(cx, cy, inner, end - 8);
  const innerStart = polar(cx, cy, inner, start);
  return [
    "M " + outerStart.x + " " + outerStart.y,
    "A " + outer + " " + outer + " 0 0 1 " + outerShoulder.x + " " + outerShoulder.y,
    "L " + tip.x + " " + tip.y,
    "L " + innerShoulder.x + " " + innerShoulder.y,
    "A " + inner + " " + inner + " 0 0 0 " + innerStart.x + " " + innerStart.y,
    "Z",
  ].join(" ");
}
