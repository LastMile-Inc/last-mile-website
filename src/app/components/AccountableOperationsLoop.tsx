import { useCallback, useEffect, useRef, useState } from "react";

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

const loopGlassSegments = [
  { path: "M 500 224 C 626 151 766 120 904 134", start: [500, 224], end: [904, 134] },
  { path: "M 969 139 C 1114 158 1224 229 1260 333", start: [969, 139], end: [1260, 333] },
  { path: "M 1269 355 C 1302 435 1298 510 1243 578", start: [1269, 355], end: [1243, 578] },
  { path: "M 1190 637 C 1079 698 928 716 741 690", start: [1190, 637], end: [741, 690] },
  { path: "M 688 696 C 540 692 426 635 377 552", start: [688, 696], end: [377, 552] },
  { path: "M 367 508 C 333 407 359 303 453 230", start: [367, 508], end: [453, 230] },
] as const;
export function AccountableOperationsLoop({ context = "home", introCopy, learningCopy }: { context?: "home" | "platform"; introCopy?: string; learningCopy: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);
  const [animatedStage, setAnimatedStage] = useState(-1);
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [introPlaying, setIntroPlaying] = useState(true);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const play = useCallback(() => {
    clearTimers();
    setSelectedStage(null);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimatedStage(-1);
      setIntroPlaying(false);
      return;
    }
    setIntroPlaying(true);
    loopStages.forEach((_, index) => timersRef.current.push(window.setTimeout(() => setAnimatedStage(index), 220 + index * 560)));
    timersRef.current.push(window.setTimeout(() => {
      setAnimatedStage(-1);
      setIntroPlaying(false);
    }, 220 + loopStages.length * 560));
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
  const selectStage = (stage: number | null) => {
    if (!introPlaying) setSelectedStage(stage);
  };

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
      <div ref={rootRef} className="lm-premium-loop-composition lm-premium-loop-composition--three-column" data-intro-playing={introPlaying}>
        <StageDefinitions stages={loopStages.slice(0, 3)} startIndex={0} activeStage={activeStage} onSelect={selectStage} />
        <div className="lm-premium-loop-center"><PrecisionLoopGraphic activeStage={activeStage} onSelect={selectStage} /></div>
        <StageDefinitions stages={loopStages.slice(3)} startIndex={3} activeStage={activeStage} onSelect={selectStage} />
      </div>
      <div className="lm-premium-loop-payoff"><strong>{context === "platform" ? "A new kind of learning, automated operations platform." : "Every verified fix improves the next operating decision."}</strong><p>{learningCopy}{context === "platform" ? " Customer policy and human authority remain in control." : ""}</p></div>
    </div>
  </section>;
}

function StageDefinitions({ stages, startIndex, activeStage, onSelect }: { stages: readonly LoopStage[]; startIndex: number; activeStage: number; onSelect: (stage: number | null) => void }) {
  return <ol className="lm-premium-loop-definitions">
    {stages.map((stage, localIndex) => {
      const index = startIndex + localIndex;
      return <li key={stage.name} className={activeStage === index ? "is-active" : activeStage >= 0 ? "is-muted" : ""}>
            <button
              type="button"
              onMouseEnter={() => onSelect(index)}
              onMouseLeave={() => onSelect(null)}
              onFocus={() => onSelect(index)}
              onBlur={() => onSelect(null)}
              aria-label={`${stage.name}: ${stage.headline}`}
              aria-pressed={activeStage === index}
            >
              <span aria-hidden="true" />
              <div><em>{stage.name}</em><strong>{stage.headline}</strong><p>{stage.copy}</p>{stage.note ? <small>{stage.note}</small> : null}</div>
            </button>
          </li>;
    })}
  </ol>;
}

function PrecisionLoopGraphic({ activeStage, onSelect }: { activeStage: number; onSelect: (stage: number | null) => void }) {
  return <figure className="lm-precision-loop lm-precision-loop--generated" data-active-stage={activeStage} aria-labelledby="precision-loop-caption">
    <img className="lm-precision-loop__base" src="/images/platform/accountable-operations-loop-v3.png" alt="A continuous six-segment engineered ring reconnects the measured result to the next operating decision." width="1672" height="941" loading="lazy" />
    <svg className="lm-precision-loop__glass" viewBox="0 0 1672 941" preserveAspectRatio="xMidYMid meet" role="group" aria-label="Interactive Accountable Operations Loop sections">
      <defs>
        <filter id="loop-glass-mask-feather" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="13" /></filter>
        <filter id="loop-glass-bloom" x="-45%" y="-45%" width="190%" height="190%"><feGaussianBlur stdDeviation="11" /></filter>
        {loopGlassSegments.map((segment, index) => <linearGradient key={`gradient-${index}`} id={`loop-glass-gradient-${index}`} gradientUnits="userSpaceOnUse" x1={segment.start[0]} y1={segment.start[1]} x2={segment.end[0]} y2={segment.end[1]}>
          <stop offset="0" stopColor="#dff6ff" />
          <stop offset=".45" stopColor="#70c8ff" />
          <stop offset="1" stopColor="#1d7cd8" />
        </linearGradient>)}
        {loopGlassSegments.map((segment, index) => <mask key={`mask-${index}`} id={`loop-glass-mask-${index}`} maskUnits="userSpaceOnUse" x="0" y="0" width="1672" height="941">
          <rect width="1672" height="941" fill="black" />
          <path d={segment.path} fill="none" stroke="white" strokeWidth="82" strokeLinecap="round" opacity=".34" filter="url(#loop-glass-mask-feather)" />
          <path d={segment.path} fill="none" stroke="white" strokeWidth="54" strokeLinecap="round" />
        </mask>)}
      </defs>
      {loopGlassSegments.map((segment, index) => <g key={loopStages[index].name} className={`lm-precision-loop__glass-segment${activeStage === index ? " is-active" : ""}`}>
        <image href="/images/platform/accountable-operations-loop-v3.png" width="1672" height="941" mask={`url(#loop-glass-mask-${index})`} className="lm-precision-loop__glass-reveal" />
        <path d={segment.path} fill="none" stroke={`url(#loop-glass-gradient-${index})`} strokeWidth="34" strokeLinecap="round" className="lm-precision-loop__glass-aura" filter="url(#loop-glass-bloom)" />
        <path d={segment.path} fill="none" stroke={`url(#loop-glass-gradient-${index})`} strokeWidth="18" strokeLinecap="round" className="lm-precision-loop__glass-beam" />
        <path d={segment.path} fill="none" stroke="#f3fcff" strokeWidth="4" strokeLinecap="round" className="lm-precision-loop__glass-glint" />
      </g>)}
      {loopGlassSegments.map((segment, index) => <path
        key={`hit-${loopStages[index].name}`}
        d={segment.path}
        className="lm-precision-loop__glass-hit"
        fill="none"
        stroke="transparent"
        strokeWidth="126"
        strokeLinecap="round"
        pointerEvents="stroke"
        role="button"
        tabIndex={0}
        aria-label={`Highlight ${loopStages[index].name}: ${loopStages[index].headline}`}
        aria-pressed={activeStage === index}
        onMouseEnter={() => onSelect(index)}
        onMouseLeave={() => onSelect(null)}
        onFocus={() => onSelect(index)}
        onBlur={() => onSelect(null)}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          onSelect(index);
        }}
      />)}
    </svg>
    <figcaption id="precision-loop-caption" className="lm-visually-hidden">The return reading becomes the starting point for the next decision.</figcaption>
  </figure>;
}
