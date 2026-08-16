import { useState, type KeyboardEvent } from "react";

type PortalRole = "executive" | "plant" | "operator";

type PortalMetric = {
  label: string;
  value: string;
  detail: string;
  level: number;
};

type PortalView = {
  tab: string;
  scope: string;
  title: string;
  summary: string;
  metrics: readonly [PortalMetric, PortalMetric, PortalMetric, PortalMetric];
};

const portalRoles: readonly PortalRole[] = ["executive", "plant", "operator"];

const portalViews: Record<PortalRole, PortalView> = {
  executive: {
    tab: "EXEC",
    scope: "CENTRAL OPERATIONS · NORTH RIDGE PLANT",
    title: "Portfolio view",
    summary: "The highlighted site is the only location included in these surrounding measurements.",
    metrics: [
      { label: "REGIONAL PERFORMANCE", value: "94.8%", detail: "Selected site performance", level: 95 },
      { label: "PORTFOLIO ASSET HEALTH", value: "96.1%", detail: "Assets available at this site", level: 96 },
      { label: "LOCAL MARKET DEMAND", value: "87%", detail: "Current demand against plan", level: 87 },
      { label: "HIGH-LEVEL OEE", value: "91.2%", detail: "Availability, speed, and quality", level: 91 },
    ],
  },
  plant: {
    tab: "PLANT MGR",
    scope: "NORTH RIDGE PLANT · BOTTLING HALL 4",
    title: "Facility view",
    summary: "The plant view connects the highlighted line to site capacity, alarms, and overall equipment effectiveness.",
    metrics: [
      { label: "ASSET HEALTH", value: "92%", detail: "Facility assets inside plan", level: 92 },
      { label: "PROCESS ALARMS", value: "3", detail: "One affects Bottling Line 4", level: 38 },
      { label: "THROUGHPUT", value: "12,450 MT/h", detail: "Current plant output", level: 86 },
      { label: "PLANT OEE", value: "87.6%", detail: "Availability, speed, and quality", level: 88 },
    ],
  },
  operator: {
    tab: "OPERATOR",
    scope: "BOTTLING LINE 4 · FILLER STATION FIL-04",
    title: "Line view",
    summary: "The line view narrows the same condition to the filler station, current production, and the next approved check.",
    metrics: [
      { label: "THROUGHPUT", value: "428 units/min", detail: "Current line output", level: 86 },
      { label: "LINE EFFICIENCY", value: "93.4%", detail: "Current run against plan", level: 93 },
      { label: "ACTIVE ALARMS", value: "1", detail: "Filler pressure variance", level: 25 },
      { label: "LINE MTTR", value: "18 min", detail: "Current mean repair time", level: 72 },
    ],
  },
};

export function ControlPortalExperience() {
  const [activeRole, setActiveRole] = useState<PortalRole>("plant");
  const view = portalViews[activeRole];

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, role: PortalRole) {
    const currentIndex = portalRoles.indexOf(role);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % portalRoles.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + portalRoles.length) % portalRoles.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = portalRoles.length - 1;
    else return;

    event.preventDefault();
    const nextRole = portalRoles[nextIndex];
    setActiveRole(nextRole);
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    requestAnimationFrame(() => tabs?.[nextIndex]?.focus());
  }

  return <figure className="lm-control-portal" aria-labelledby="control-portal-caption">
    <header className="lm-control-portal__header">
      <div className="lm-control-portal__identity"><i aria-hidden="true" /><div><strong>INFINIT-CONTROL</strong><span>ONE OPERATING CASE · FIL-04</span></div></div>
      <div className="lm-control-portal__tabs" role="tablist" aria-label="Choose an operating role">
        {portalRoles.map(role => <button key={role} id={`control-tab-${role}`} type="button" role="tab" aria-selected={activeRole === role} aria-controls="control-role-panel" tabIndex={activeRole === role ? 0 : -1} onClick={() => setActiveRole(role)} onKeyDown={event => handleTabKey(event, role)}>{portalViews[role].tab}</button>)}
      </div>
      <div className="lm-control-portal__status"><i aria-hidden="true" /><span>LIVE CONTEXT</span><small>Current measurements</small></div>
    </header>

    <div id="control-role-panel" key={activeRole} className="lm-control-portal__workspace" role="tabpanel" aria-labelledby={`control-tab-${activeRole}`}>
      <MetricColumn metrics={view.metrics.slice(0, 2)} side="left" />
      <section className="lm-control-portal__center" aria-label={`${view.title}: ${view.scope}`}>
        <header><div><span>{view.title}</span><strong>{view.scope}</strong></div><small>ROLE-TUNED VIEW · SHARED FACTS</small></header>
        <div className="lm-control-portal__visual">
          {activeRole === "executive" ? <ExecutiveMap /> : activeRole === "plant" ? <PlantSchematic /> : <OperatorLine />}
        </div>
        <p className="lm-control-portal__view-summary" aria-live="polite">{view.summary}</p>
      </section>
      <MetricColumn metrics={view.metrics.slice(2)} side="right" />
    </div>

    <div className="lm-control-portal__shared-context" aria-label="Operating facts shared by every role">
      <div><span>CURRENT CONDITION</span><strong>Filler pressure variance</strong></div>
      <div><span>AFFECTED ASSET</span><strong>FIL-04 · Bottling Line 4</strong></div>
      <div><span>OWNER + WORK</span><strong>Line Operations · WO-18427</strong></div>
      <div><span>CURRENT STATE</span><strong>Inside approved band · Return check pending</strong></div>
    </div>
    <figcaption id="control-portal-caption">Concept interface. Executive, plant-manager, and operator views show the same filler-pressure condition, asset, owner, work, and current state at the level needed for each decision.</figcaption>
  </figure>;
}

function MetricColumn({ metrics, side }: { metrics: readonly PortalMetric[]; side: "left" | "right" }) {
  return <aside className={`lm-control-portal__metrics lm-control-portal__metrics--${side}`} aria-label={`${side === "left" ? "Left" : "Right"} supporting measurements`}>
    {metrics.map(metric => <article key={metric.label}>
      <span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.detail}</small>
      <i aria-hidden="true"><em style={{ width: `${metric.level}%` }} /></i>
    </article>)}
  </aside>;
}

function ExecutiveMap() {
  return <svg className="lm-control-portal__map" viewBox="0 0 760 430" role="img" aria-labelledby="control-exec-title control-exec-desc">
    <title id="control-exec-title">Executive portfolio map with North Ridge Plant selected</title>
    <desc id="control-exec-desc">A light regional map shows several quiet portfolio locations and exactly one bright blue selected location. All surrounding measurements apply only to North Ridge Plant.</desc>
    <defs><filter id="control-node-glow" x="-220%" y="-220%" width="540%" height="540%"><feGaussianBlur stdDeviation="12" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
    <g className="map-grid"><path d="M50 83H710M50 151H710M50 219H710M50 287H710M50 355H710" /><path d="M126 42V388M240 42V388M354 42V388M468 42V388M582 42V388M696 42V388" /></g>
    <path className="map-land" d="M91 106l70-28 76 16 45-30 88 19 69-14 88 44 63-2 44 44-21 52 53 42-36 70-98 34-54-13-63 27-83-18-57 23-78-48-51-56 19-53-50-41 38-49-13-41z" />
    <path className="map-route" d="M157 162L273 207 378 151 505 195 589 282M273 207L326 302 469 300 505 195M378 151L469 300" />
    <g className="map-site"><circle cx="157" cy="162" r="6" /><path d="M157 174v17" /></g>
    <g className="map-site"><circle cx="273" cy="207" r="6" /><path d="M273 219v17" /></g>
    <g className="map-site"><circle cx="378" cy="151" r="6" /><path d="M378 163v17" /></g>
    <g className="map-site"><circle cx="589" cy="282" r="6" /><path d="M589 294v17" /></g>
    <g className="map-site"><circle cx="326" cy="302" r="6" /><path d="M326 314v17" /></g>
    <g className="map-selected" transform="translate(505 195)"><circle className="map-selected__halo" r="27" filter="url(#control-node-glow)" /><circle className="map-selected__ring" r="16" /><circle className="map-selected__core" r="7" /></g>
    <g className="map-label" transform="translate(525 164)"><rect width="168" height="54" rx="4" /><text x="14" y="22">NORTH RIDGE PLANT</text><text x="14" y="40">SELECTED SITE · LIVE</text></g>
    <text className="map-caption" x="53" y="408">PORTFOLIO CONTEXT · ONE SELECTED SITE</text>
  </svg>;
}

function PlantSchematic() {
  return <svg className="lm-control-portal__plant" viewBox="0 0 760 430" role="img" aria-labelledby="control-plant-title control-plant-desc">
    <title id="control-plant-title">North Ridge Plant facility overview</title>
    <desc id="control-plant-desc">A light architectural plant plan connects receiving, processing, utilities, packaging, warehouse, and four bottling halls. Bottling Hall 4 is highlighted as the affected area.</desc>
    <g className="plan-grid"><path d="M48 55H712V374H48Z" /><path d="M48 146H712M48 258H712M211 55V374M412 55V374M590 55V374" /></g>
    <g className="plan-zone"><rect x="66" y="74" width="127" height="54" rx="4" /><text x="82" y="98">RECEIVING</text><text x="82" y="116">RAW MATERIALS</text></g>
    <g className="plan-zone"><rect x="229" y="74" width="165" height="54" rx="4" /><text x="245" y="98">PROCESSING</text><text x="245" y="116">MIX + HOLD</text></g>
    <g className="plan-zone"><rect x="430" y="74" width="142" height="54" rx="4" /><text x="446" y="98">UTILITIES</text><text x="446" y="116">AIR + WATER</text></g>
    <g className="plan-zone"><rect x="608" y="74" width="86" height="54" rx="4" /><text x="620" y="98">QA LAB</text><text x="620" y="116">READY</text></g>
    <g className="plan-line"><rect x="66" y="169" width="310" height="30" rx="4" /><text x="82" y="189">BOTTLING LINE 1 · RUNNING</text></g>
    <g className="plan-line"><rect x="66" y="211" width="310" height="30" rx="4" /><text x="82" y="231">BOTTLING LINE 2 · RUNNING</text></g>
    <g className="plan-line"><rect x="430" y="169" width="264" height="30" rx="4" /><text x="446" y="189">BOTTLING LINE 3 · RUNNING</text></g>
    <g className="plan-line plan-line--active"><rect x="430" y="211" width="264" height="30" rx="4" /><text x="446" y="231">BOTTLING HALL 4 · CONDITION ACTIVE</text><circle cx="672" cy="226" r="6" /></g>
    <g className="plan-zone"><rect x="66" y="281" width="328" height="69" rx="4" /><text x="82" y="307">PACKAGING + PALLETIZING</text><path d="M83 328h278" /></g>
    <g className="plan-zone"><rect x="430" y="281" width="264" height="69" rx="4" /><text x="446" y="307">FINISHED GOODS</text><path d="M447 328h214" /></g>
    <path className="plan-flow" d="M193 101H229M311 128v41M376 184h54M562 199v12M562 241v40M394 315h36" />
    <text className="plan-caption" x="50" y="405">NORTH RIDGE PLANT · FACILITY ORCHESTRATION</text>
  </svg>;
}

function OperatorLine() {
  const stations = [
    { x: 65, width: 92, label: "DE-PAL", state: "READY" },
    { x: 181, width: 92, label: "RINSE", state: "RUNNING" },
    { x: 297, width: 118, label: "FILLER FIL-04", state: "CHECK", active: true },
    { x: 439, width: 92, label: "CAP", state: "RUNNING" },
    { x: 555, width: 92, label: "LABEL", state: "RUNNING" },
  ];
  return <svg className="lm-control-portal__line" viewBox="0 0 760 430" role="img" aria-labelledby="control-line-title control-line-desc">
    <title id="control-line-title">Bottling Line 4 operator schematic</title>
    <desc id="control-line-desc">A light technical line drawing shows the depalletizer, rinser, filler, capper, labeler, inspection, and palletizer. Filler station FIL-04 is the single highlighted point requiring an approved pressure check.</desc>
    <g className="line-datum"><path d="M48 90H712M48 330H712" /><text x="50" y="76">BOTTLING LINE 4 · FLOW LEFT TO RIGHT</text></g>
    <path className="line-conveyor" d="M48 252H712M48 265H712" />
    {stations.map(station => <g key={station.label} className={station.active ? "line-station line-station--active" : "line-station"} transform={`translate(${station.x} 0)`}><rect x="0" y="152" width={station.width} height="92" rx="5" /><path d={`M12 174h${station.width - 24}M12 219h${station.width - 24}`} /><circle cx={station.width / 2} cy="197" r="14" /><text x={station.width / 2} y="292" textAnchor="middle">{station.label}</text><text x={station.width / 2} y="310" textAnchor="middle">{station.state}</text>{station.active && <><circle className="line-station__indicator" cx={station.width - 13} cy="164" r="6" /><path className="line-station__pointer" d={`M${station.width - 13} 148v-27h72`} /><text className="line-station__callout" x={station.width + 64} y="116">PRESSURE VARIANCE</text></>}</g>)}
    <g className="line-end"><path d="M672 151h37v93h-37" /><text x="690" y="292" textAnchor="middle">INSPECT</text><text x="690" y="310" textAnchor="middle">READY</text></g>
    <g className="line-reading" transform="translate(270 34)"><rect width="224" height="45" rx="4" /><text x="14" y="19">FIL-04 · FILL PRESSURE</text><text x="14" y="36">CURRENTLY INSIDE APPROVED BAND</text></g>
    <text className="line-caption" x="50" y="405">APPROVED CHECK · CONFIRM PRESSURE + RECORD RETURN READING</text>
  </svg>;
}

const heartbeat = [["COOLING", "NORMAL", "82%"], ["POWER", "NORMAL", "76%"], ["PRODUCTION", "CONSTRAINED", "63%"], ["RESPONSE", "ACTIVE", "88%"]] as const;

export function ControlCommandCenterVisual() {
  return <figure className="lm-experience lm-control-command" aria-labelledby="control-command-caption">
    <header><div><i /><strong>INFRASTRUCTURE COMMAND CENTER</strong></div><nav aria-label="Displayed command scope"><b>SITE</b><span>SYSTEM</span><span>ASSET</span></nav><small>CURRENT SOURCES</small></header>
    <div className="lm-control-command__body">
      <section className="lm-control-command__plan">
        <div className="lm-control-command__panel-title"><span>SITE 04 · OPERATING PLAN</span><small>ALL CRITICAL AREAS IN SCOPE</small></div>
        <svg viewBox="0 0 720 390" aria-hidden="true">
          <path className="site-boundary" d="M38 38H680V344H38Z" />
          <g className="zone utility"><rect x="67" y="72" width="188" height="104" rx="12" /><text x="88" y="106">UTILITY PLANT</text><text x="88" y="133">CHILLERS · PUMPS</text><path d="M87 154h146" /></g>
          <g className="zone power"><rect x="67" y="204" width="188" height="104" rx="12" /><text x="88" y="238">ELECTRICAL SERVICE</text><text x="88" y="265">SWITCHGEAR · UPS</text><path d="M87 286h146" /></g>
          <g className="zone"><rect x="305" y="72" width="160" height="104" rx="12" /><text x="326" y="106">DATA HALL 1</text><text x="326" y="133">COOLING NORMAL</text></g>
          <g className="zone"><rect x="493" y="72" width="160" height="104" rx="12" /><text x="514" y="106">DATA HALL 2</text><text x="514" y="133">COOLING NORMAL</text></g>
          <g className="zone active"><rect x="305" y="204" width="348" height="104" rx="12" /><text x="326" y="238">DATA HALL 3</text><text x="326" y="265">COOLING REDUNDANCY REDUCED</text><circle cx="616" cy="256" r="17" /><circle cx="616" cy="256" r="5" /></g>
          <path className="water-path" d="M255 124H282V256H305M282 124H305M282 124H493" />
          <path className="power-path" d="M255 256H282V322H586V308" />
          <text className="path-label" x="300" y="195">CHILLED WATER LOOP B</text>
        </svg>
      </section>
      <aside className="lm-control-command__condition">
        <header><span>ACTIVE CONDITION</span><b>OWNER ASSIGNED</b></header>
        <h3>Cooling redundancy reduced</h3><p>CHWP-02 · Data Hall 3</p>
        <dl><div><dt>RACK INLET</dt><dd>73.6°F</dd><small>Inside approved band</small></div><div><dt>PUMP STATE</dt><dd>Stopped</dd><small>Run command received</small></div><div><dt>OWNER</dt><dd>Critical Facilities</dd><small>Response active</small></div><div><dt>WORK</dt><dd>WO-18427</dd><small>Field inspection</small></div></dl>
      </aside>
    </div>
    <div className="lm-control-command__heartbeat"><span>OPERATING HEARTBEAT</span>{heartbeat.map(([label,state,value]) => <div key={label}><b>{label}</b><i><em style={{ width: value }} /></i><small>{state}</small></div>)}</div>
    <figcaption id="control-command-caption" className="lm-visually-hidden">A site command view uses a believable facility plan to connect the utility plant, electrical service, and three data halls. A reduced cooling-redundancy condition is tied to its equipment, owner, work order, live reading, and operating heartbeat.</figcaption>
  </figure>;
}

const roleViews = [{ label: "C-SUITE", question: "Where is enterprise risk?", facts: ["1 site constrained", "Production protected", "Owner assigned"] }, { label: "PLANT MANAGER", question: "What is affected?", facts: ["Data Hall 3", "Cooling Loop B", "N+1 unavailable"] }, { label: "SUPERVISOR", question: "Is the response moving?", facts: ["Critical Facilities owns it", "WO-18427 active", "Return check pending"] }, { label: "SHIFT WORKER", question: "What happens next?", facts: ["Inspect CHWP-02", "Follow approved work", "Record return readings"] }] as const;

export function ControlRoleVisual() {
  return <figure id="role-views" className="lm-experience lm-control-roles" aria-labelledby="control-role-caption">
    <header><span>ONE CONNECTED OPERATING CASE</span><strong>Cooling redundancy reduced · Data Hall 3</strong><small>Owner: Critical Facilities</small></header>
    <ol>{roleViews.map((view, index) => <li key={view.label}><div><i>{String(index + 1).padStart(2, "0")}</i><span>{view.label}</span></div><h3>{view.question}</h3><ul>{view.facts.map(fact => <li key={fact}>{fact}</li>)}</ul></li>)}</ol>
    <footer><span>ENTERPRISE</span><i /><span>SITE</span><i /><span>SYSTEM</span><i /><span>ASSET</span><i /><span>CONDITION</span></footer>
    <figcaption id="control-role-caption" className="lm-visually-hidden">C-suite, plant-manager, supervisor, and shift-worker views answer different questions from the same connected cooling-redundancy case.</figcaption>
  </figure>;
}

const signals = [["PUMP FEEDBACK", "Stopped", "Fresh 1.2 sec"], ["MOTOR CURRENT", "0.0 A", "Fresh 1.4 sec"], ["DIFF. PRESSURE", "12.4 psid", "Inside band"], ["RACK INLET", "73.6°F", "Stable"]] as const;

export function ControlPriorityVisual() {
  return <figure className="lm-experience lm-control-priority" aria-labelledby="control-priority-caption">
    <section className="lm-control-priority__signals"><header><span>CURRENT TELEMETRY</span><strong>What changed?</strong></header>{signals.map(([label,value,state]) => <div key={label}><span>{label}</span><strong>{value}</strong><small>{state}</small></div>)}</section>
    <section className="lm-control-priority__impact"><header><span>OPERATING IMPACT</span><strong>What does it put at risk?</strong></header><div className="lm-control-priority__topology"><span>CHWP-02</span><i /><b>LOOP B</b><i /><strong>DATA HALL 3</strong></div><dl><div><dt>PROTECTION</dt><dd>Reduced redundancy</dd></div><div><dt>PRODUCTION</dt><dd>Running inside band</dd></div><div><dt>EXPOSURE</dt><dd>Second failure removes cooling path</dd></div></dl></section>
    <aside><span>NEXT REQUIRED ACTION</span><strong>Inspect the stopped pump while the protected load remains stable.</strong><dl><div><dt>OWNER</dt><dd>Critical Facilities</dd></div><div><dt>DUE</dt><dd>Within response target</dd></div><div><dt>CONFIRM WITH</dt><dd>Run state, current, pressure, temperature</dd></div></dl></aside>
    <figcaption id="control-priority-caption" className="lm-visually-hidden">Current pump, current, pressure, and temperature telemetry connects to the affected cooling loop and data hall, then identifies the owner and next required action.</figcaption>
  </figure>;
}

const responseSteps = [["FIRST WARNING", "Pump command and feedback disagree"], ["OWNER", "Critical Facilities accepts the response"], ["WORK", "Field inspection follows WO-18427"], ["RETURN", "Pump, current, pressure, and temperature read again"], ["CURRENT STATE", "The view updates from live operating data"]] as const;

export function ControlContinuityVisual() {
  return <figure className="lm-experience lm-control-continuity" aria-labelledby="control-continuity-caption">
    <ol>{responseSteps.map(([label,detail],index) => <li key={label}><i>{String(index + 1).padStart(2, "0")}</i><span>{label}</span><strong>{detail}</strong></li>)}</ol>
    <div className="lm-control-continuity__boundary"><header><span>INFINIT-CONTROL PRESENTS THE CROSS-SYSTEM RESPONSE</span><strong>Customer-authorized actions only</strong></header><div>{[["SCADA + BMS","Direct equipment control"],["SIS","Safety authority"],["WORK SYSTEM","Record of work"],["LOCAL HMI","Equipment operation"]].map(([system,role]) => <article key={system}><strong>{system}</strong><span>{role} remains in place</span></article>)}</div></div>
    <figcaption id="control-continuity-caption" className="lm-visually-hidden">The command view follows the issue through warning, ownership, work, return measurements, and current state while SCADA, BMS, SIS, work systems, and local HMIs retain their responsibilities.</figcaption>
  </figure>;
}
