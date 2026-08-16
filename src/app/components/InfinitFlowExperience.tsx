export function FlowHeroVisual() {
  return <figure className="lm-experience lm-flow-photo lm-flow-photo--hero">
    <img
      src="/images/products/infinit-flow/infinit-flow-control-room.png"
      alt="A bright industrial control room with a rugged workflow screen overlooking automated equipment."
      width="1672"
      height="941"
      loading="eager"
      fetchPriority="high"
    />
    <figcaption className="lm-flow-photo__caption">
      <span>THE DIGITAL WORKFLOW</span>
      <strong>Condition · Context · Decision · Work · Return reading</strong>
    </figcaption>
  </figure>;
}

export function FlowRecoveryVisual() {
  return <figure className="lm-experience lm-flow-photo lm-flow-photo--recovery">
    <img
      src="/images/products/infinit-flow/infinit-flow-reliability-engineer.png"
      alt="A reliability engineer inspects an industrial compressor with the response timeline and return readings in view."
      width="1672"
      height="941"
      loading="lazy"
    />
    <dl className="lm-flow-photo__rail" aria-label="Recovery context delivered with the work">
      <div><dt>ISSUE</dt><dd>Qualified condition</dd></div>
      <div><dt>CONTEXT</dt><dd>Asset and operating impact</dd></div>
      <div><dt>ACTION</dt><dd>Owner, authority, and timing</dd></div>
      <div><dt>RETURN</dt><dd>Required sensor reading</dd></div>
    </dl>
  </figure>;
}

export function FlowArchitectureVisual() {
  return <figure className="lm-experience lm-flow-architecture">
    <img
      src="/images/products/infinit-flow/infinit-flow-orchestration-architecture.png"
      alt="A light industrial architecture connecting operating inputs to a governed workflow core, coordinated work, and return telemetry."
      width="1672"
      height="941"
      loading="lazy"
    />
    <ol aria-label="Infinit-Flow orchestration path">
      <li><span>OPERATING INPUTS</span><strong>Signals · asset context · work systems</strong></li>
      <li><span>GOVERNED WORKFLOW</span><strong>Policy · owner · timing · approval</strong></li>
      <li><span>COORDINATED RESPONSE</span><strong>Work · receipts · return telemetry</strong></li>
    </ol>
  </figure>;
}
const workflowSteps = [
  { label: "CONDITION", title: "Pressure drifting", detail: "Qualified live signal" },
  { label: "CONTEXT", title: "Production exposed", detail: "Site, asset, schedule" },
  { label: "DECISION", title: "Response required", detail: "Policy and timing" },
  { label: "WORK", title: "Inspect C-04", detail: "Owner and work system" },
  { label: "RETURN", title: "Read pressure again", detail: "Stable operating band" },
] as const;

export function FlowStudioVisual() {
  return <figure className="lm-experience lm-flow-workbench" aria-labelledby="flow-workbench-caption">
    <header><div><i /><i /><i /><strong>INFINIT-FLOW STUDIO</strong></div><span>MODEL READY</span></header>
    <div className="lm-flow-workbench__scope" aria-label="Operating scope"><span>DENVER SITE</span><span>UTILITIES</span><span>COMPRESSOR C-04</span></div>
    <ol className="lm-flow-workbench__path">{workflowSteps.map((step, index) => <li key={step.label} className={index === 2 ? "is-decision" : index === 4 ? "is-return" : ""}><span>{step.label}</span><strong>{step.title}</strong><small>{step.detail}</small></li>)}</ol>
    <dl className="lm-flow-workbench__bindings"><div><dt>OWNER</dt><dd>Mechanical Reliability</dd></div><div><dt>SYSTEMS</dt><dd>MQTT + CMMS</dd></div><div><dt>TIMING</dt><dd>30 min target</dd></div><div><dt>OUTPUT</dt><dd>Inspection + return reading</dd></div></dl>
    <figcaption id="flow-workbench-caption" className="lm-visually-hidden">A compact workflow authoring view connects a qualified condition to operating context, a decision, assigned work, and a return measurement. The workflow retains its owner, participating systems, timing, and required output.</figcaption>
  </figure>;
}

const measuredSteps = [["QUALIFY", "Know what changed"], ["ASSIGN", "Name the owner"], ["EXECUTE", "Run the approved path"], ["MEASURE", "Read the equipment again"]] as const;
const workflowMeasures = [["MANUAL TOUCHES", "Human steps per run"], ["HANDOFF DELAY", "Minutes waiting for the next owner"], ["CYCLE TIME", "Condition to completed response"], ["REWORK", "Repeated or reopened steps"], ["ON-TIME RATE", "Runs completed inside target"], ["MTTR", "Condition to stable operation"]] as const;

export function FlowMeasurementVisual() {
  return <figure className="lm-experience lm-flow-measurement" aria-labelledby="flow-measurement-caption">
    <div className="lm-flow-measurement__scope"><span>SITE</span><b>LINE</b><b>ASSET</b><b>OWNER</b><b>SCHEDULE</b><b>AUTHORITY</b></div>
    <ol className="lm-flow-measurement__steps">{measuredSteps.map(([label, title]) => <li key={label}><span>{label}</span><strong>{title}</strong></li>)}</ol>
    <div className="lm-flow-measurement__rail"><header><span>MEASURE THE WORK, NOT JUST THE WORK ORDER</span><strong>Baseline → current run → approved target</strong></header><dl>{workflowMeasures.map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}</dl></div>
    <figcaption id="flow-measurement-caption" className="lm-visually-hidden">The documented workflow carries site, line, asset, owner, schedule, and authority context. Each run can measure manual touches, handoff delay, cycle time, rework, on-time completion, and mean time to recovery.</figcaption>
  </figure>;
}

const manualTasks = ["Copy data between systems", "Chase the next owner", "Re-enter the same details", "Remember every escalation"] as const;
const governedTasks = ["Qualify the input", "Route the work", "Enforce the clock", "Record the receipt"] as const;

export function FlowManualReductionVisual() {
  return <figure className="lm-experience lm-flow-reduction" aria-labelledby="flow-reduction-caption">
    <section><header><span>MANUAL COORDINATION</span><strong>Effort that adds no operating value</strong></header><ul>{manualTasks.map((task, index) => <li key={task}><i>{String(index + 1).padStart(2, "0")}</i><span>{task}</span></li>)}</ul></section>
    <div className="lm-flow-reduction__core" aria-hidden="true"><span>INFINIT-FLOW</span><i /><strong>POLICY GATE</strong><small>Only approved digital steps move automatically</small></div>
    <section><header><span>AUTHORIZED OPERATING PATH</span><strong>People stay on judgment and physical work</strong></header><ul>{governedTasks.map((task, index) => <li key={task}><i>{String(index + 1).padStart(2, "0")}</i><span>{task}</span></li>)}</ul></section>
    <footer><strong>Human authority remains with the customer</strong><span>Inspect · isolate · approve · restart · perform physical work</span></footer>
    <figcaption id="flow-reduction-caption" className="lm-visually-hidden">Infinit-Flow removes repetitive copying, chasing, re-entry, and reminders by qualifying inputs, routing work, enforcing timing, and recording receipts. Customer personnel retain judgment, safety, approval, and physical-work authority.</figcaption>
  </figure>;
}

const improvementMeasures = [["WAIT TIME", "Compare time between owners"], ["REWORK", "Find repeated and reopened steps"], ["MTTR", "Measure condition to stable operation"], ["ON-TIME", "Track completion against target"]] as const;

export function FlowImprovementVisual() {
  return <figure className="lm-experience lm-flow-improvement" aria-labelledby="flow-improvement-caption">
    <div className="lm-flow-improvement__chart">
      <header><span>WORKFLOW PERFORMANCE OVER TIME</span><strong>Use the record of every run to improve the next one</strong></header>
      <svg viewBox="0 0 760 330" aria-hidden="true">
        <defs><linearGradient id="flowImproveFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--lm-blue)" stopOpacity=".38" /><stop offset="1" stopColor="var(--lm-mint)" stopOpacity=".04" /></linearGradient></defs>
        <path d="M78 42V282H722" fill="none" stroke="var(--lm-steel)" strokeWidth="2" />
        <path d="M78 70H722M78 136H722M78 202H722M78 268H722" fill="none" stroke="var(--lm-steel)" strokeOpacity=".28" />
        <path d="M90 88C174 116 210 104 282 148S402 171 468 209 590 221 706 254V282H90Z" fill="url(#flowImproveFill)" />
        <path d="M90 88C174 116 210 104 282 148S402 171 468 209 590 221 706 254" fill="none" stroke="var(--lm-blue-dark)" strokeWidth="6" strokeLinecap="round" />
        {[["90","88"],["282","148"],["468","209"],["706","254"]].map(([x,y]) => <g key={x}><circle cx={x} cy={y} r="11" fill="var(--lm-surface)" stroke="var(--lm-blue)" strokeWidth="5" /><circle cx={x} cy={y} r="4" fill="var(--lm-blue-dark)" /></g>)}
        <text x="31" y="185" transform="rotate(-90 31 185)">TIME AND MANUAL EFFORT</text>
        <text x="397" y="318" textAnchor="middle">APPROVED WORKFLOW CHANGES</text>
      </svg>
      <div className="lm-flow-improvement__notes"><span>BASELINE</span><span>MEASURE</span><span>CHANGE</span><span>CONFIRM</span></div>
    </div>
    <aside><span>AI-ASSISTED REVIEW</span><h3>Find the next improvement in the work that already happened.</h3><dl>{improvementMeasures.map(([term, detail]) => <div key={term}><dt>{term}</dt><dd>{detail}</dd></div>)}</dl></aside>
    <figcaption id="flow-improvement-caption" className="lm-visually-hidden">A performance curve compares the baseline, measured run, approved change, and confirmed result. Teams can use wait time, rework, mean time to recovery, and on-time completion to identify the next improvement.</figcaption>
  </figure>;
}
