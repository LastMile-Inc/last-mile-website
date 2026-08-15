type LearningStage = {
  name: string;
  shortLabel: readonly [string, string?];
  copy: string;
  definitionLines: readonly string[];
  point: readonly [number, number];
  labelSide: "above" | "below";
  definition: { x: number; y: number; path: string };
};

const stages: readonly LearningStage[] = [
  {
    name: "Manual Reaction",
    shortLabel: ["MANUAL", "REACTION"],
    copy: "People chase alarms and experts. Useful lessons stay in notes and individual memory.",
    definitionLines: ["People chase alarms and experts.", "Useful lessons stay in notes", "and individual memory."],
    point: [170, 540],
    labelSide: "below",
    definition: { x: 118, y: 408, path: "M170 450 V507" },
  },
  {
    name: "Connected Visibility",
    shortLabel: ["CONNECTED", "VISIBILITY"],
    copy: "Live state and work share one current view of the problem.",
    definitionLines: ["Live state and work share", "one current view of", "the problem."],
    point: [340, 480],
    labelSide: "below",
    definition: { x: 278, y: 349, path: "M340 391 V447" },
  },
  {
    name: "Contextual Assistance",
    shortLabel: ["CONTEXTUAL", "ASSISTANCE"],
    copy: "AI assembles context and finds similar events. People choose the response.",
    definitionLines: ["AI assembles context and finds", "similar events. People choose", "the response."],
    point: [520, 392],
    labelSide: "below",
    definition: { x: 452, y: 261, path: "M520 303 V359" },
  },
  {
    name: "Governed Prediction",
    shortLabel: ["GOVERNED", "PREDICTION"],
    copy: "Patterns and past fixes sharpen warnings and response plans.",
    definitionLines: ["Patterns and past fixes", "sharpen warnings and", "response plans."],
    point: [705, 302],
    labelSide: "above",
    definition: { x: 628, y: 394, path: "M705 335 V381" },
  },
  {
    name: "Proactive Automation",
    shortLabel: ["PROACTIVE", "AUTOMATION"],
    copy: "Approved digital steps begin earlier. People own exceptions, safety, and physical work.",
    definitionLines: ["Approved digital steps begin earlier.", "People own exceptions, safety,", "and physical work."],
    point: [885, 210],
    labelSide: "above",
    definition: { x: 802, y: 302, path: "M885 243 V289" },
  },
  {
    name: "Lights-Out Manufacturing",
    shortLabel: ["LIGHTS-OUT", "MANUFACTURING"],
    copy: "A future horizon with minimal routine human presence. It requires the strongest evidence, authority, exception handling, and recovery controls. It is not a current Last Mile autonomous-plant capability.",
    definitionLines: ["Future horizon: minimal routine human", "presence with the strongest evidence,", "authority, exceptions, and recovery."],
    point: [1050, 120],
    labelSide: "above",
    definition: { x: 932, y: 212, path: "M1050 153 V199" },
  },
];

export function SingularityLearningCurve() {
  return <figure className="lm-learning-curve" aria-labelledby="learning-curve-caption">
    <div className="lm-learning-curve__viewport" tabIndex={0} aria-label="Operational learning continuum chart. Scroll horizontally to inspect the complete chart on a small screen.">
      <svg className="lm-learning-curve__plot" viewBox="0 0 1180 700" role="img" aria-labelledby="learning-curve-title learning-curve-desc">
        <title id="learning-curve-title">Operational learning and automation continuum</title>
        <desc id="learning-curve-desc">A rising blue line and gradient ribbon show value capture and degree of automation increasing through six stages. Definitions sit above the first three stages and below the final three stages, connected to their plotted points.</desc>
        <defs>
          <linearGradient id="learning-ribbon" x1="120" y1="560" x2="1072" y2="98" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#E7EDF3" stopOpacity=".35" />
            <stop offset=".34" stopColor="#8BB4CF" stopOpacity=".48" />
            <stop offset=".7" stopColor="#5E8FAF" stopOpacity=".62" />
            <stop offset="1" stopColor="#4C86C6" stopOpacity=".72" />
          </linearGradient>
          <filter id="learning-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="7" stdDeviation="8" floodColor="#263244" floodOpacity=".16" />
          </filter>
        </defs>
        <g className="lm-learning-curve__grid" aria-hidden="true">
          {[140, 235, 330, 425, 520, 615].map((y) => <line key={y} x1="112" y1={y} x2="1094" y2={y} />)}
          {[240, 410, 580, 750, 920].map((x) => <line key={x} x1={x} y1="54" x2={x} y2="620" />)}
        </g>
        <path className="lm-learning-curve__area" d="M120 548 C230 530 282 493 340 460 C430 409 462 407 520 374 C608 324 641 316 705 286 C796 243 823 225 885 192 C960 152 1004 116 1072 76 L1072 620 H120 Z" />
        <path className="lm-learning-curve__line" d="M120 548 C230 530 282 493 340 460 C430 409 462 407 520 374 C608 324 641 316 705 286 C796 243 823 225 885 192 C960 152 1004 116 1072 76" />
        <g className="lm-learning-curve__axes" aria-hidden="true">
          <path d="M112 54V620H1094" />
          <text x="604" y="675" textAnchor="middle">VALUE CAPTURE</text>
          <text x="36" y="337" textAnchor="middle" transform="rotate(-90 36 337)">DEGREE OF AUTOMATION</text>
          <text x="126" y="650">REACTIVE</text>
          <text x="1070" y="650" textAnchor="end">ANTICIPATORY</text>
        </g>
        {stages.map((stage, index) => <g key={stage.name} className={`lm-learning-curve__stage lm-learning-curve__stage--${index + 1}`}>
          <g className="lm-learning-curve__definition" aria-hidden="true">
            <path d={stage.definition.path} />
            <circle cx={stage.point[0]} cy={stage.labelSide === "below" ? stage.point[1] - 31 : stage.point[1] + 31} r="3" />
            <line x1={stage.definition.x} y1={stage.definition.y - 12} x2={stage.definition.x + 44} y2={stage.definition.y - 12} />
            <text x={stage.definition.x} y={stage.definition.y}>
              {stage.definitionLines.map((line, lineIndex) => <tspan key={line} x={stage.definition.x} dy={lineIndex === 0 ? 0 : 16}>{line}</tspan>)}
            </text>
          </g>
          <g className="lm-learning-curve__node" transform={`translate(${stage.point[0]} ${stage.point[1]})`}>
            <circle className="lm-learning-curve__node-halo" r="25" />
            <circle className="lm-learning-curve__node-face" r="13" />
            <text className="lm-learning-curve__node-number" y="4" textAnchor="middle">{index + 1}</text>
            <text className="lm-learning-curve__node-label" y={stage.labelSide === "below" ? 43 : -45} textAnchor="middle">
              <tspan x="0">{stage.shortLabel[0]}</tspan>
              {stage.shortLabel[1] ? <tspan x="0" dy="15">{stage.shortLabel[1]}</tspan> : null}
            </text>
          </g>
        </g>)}
      </svg>
    </div>
    <ol className="lm-visually-hidden">
      {stages.map((stage, index) => <li key={stage.name}>Stage {index + 1}, {stage.name}: {stage.copy}</li>)}
    </ol>
    <figcaption id="learning-curve-caption" className="lm-visually-hidden">Operational learning increases value capture and supports carefully governed increases in automation.</figcaption>
  </figure>;
}
