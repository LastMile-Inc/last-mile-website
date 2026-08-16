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
      <div ref={rootRef} className="lm-premium-loop-composition lm-premium-loop-composition--three-column">
        <StageDefinitions stages={loopStages.slice(0, 3)} startIndex={0} activeStage={activeStage} onSelect={setSelectedStage} />
        <div className="lm-premium-loop-center"><PrecisionLoopGraphic activeStage={activeStage} /></div>
        <StageDefinitions stages={loopStages.slice(3)} startIndex={3} activeStage={activeStage} onSelect={setSelectedStage} />
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
            >
              <span aria-hidden="true" />
              <div><em>{stage.name}</em><strong>{stage.headline}</strong><p>{stage.copy}</p>{stage.note ? <small>{stage.note}</small> : null}</div>
            </button>
          </li>;
    })}
  </ol>;
}

function PrecisionLoopGraphic({ activeStage }: { activeStage: number }) {
  return <figure className="lm-precision-loop lm-precision-loop--generated" data-active-stage={activeStage} aria-labelledby="precision-loop-caption">
    <img src="/images/platform/accountable-operations-loop-v3.png" alt="A continuous six-segment engineered ring reconnects the measured result to the next operating decision." width="1672" height="941" loading="lazy" />
    <div className="lm-precision-loop__generated-core"><span>THE LAST MILE</span><strong><b>Condition</b><i aria-hidden="true">→</i><b>Response</b><i aria-hidden="true">→</i><b>Outcome</b></strong><small>One accountable operational cycle</small></div>
    <figcaption id="precision-loop-caption" className="lm-visually-hidden">The return reading becomes the starting point for the next decision.</figcaption>
  </figure>;
}
