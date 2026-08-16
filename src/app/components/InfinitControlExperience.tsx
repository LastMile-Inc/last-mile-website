import { useState, type KeyboardEvent } from "react";

type PortalRole = "executive" | "plant" | "operator";

type PortalMetric = {
  label: string;
  value: string;
  detail: string;
  level: number;
  status: string;
  trend: readonly number[];
  rows: readonly { label: string; value: string }[];
};

type PortalView = {
  tab: string;
  scope: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  tags: readonly { label: string; value: string; x: string; y: string }[];
  metrics: readonly [PortalMetric, PortalMetric, PortalMetric, PortalMetric];
};

const portalRoles: readonly PortalRole[] = ["executive", "plant", "operator"];

const portalViews: Record<PortalRole, PortalView> = {
  executive: {
    tab: "EXEC",
    scope: "CENTRAL OPERATIONS · NORTH RIDGE PLANT",
    title: "Portfolio view",
    summary: "The highlighted site is the only location included in these surrounding measurements.",
    image: "/images/products/infinit-control/portal-executive-v3.png",
    imageAlt: "A high-detail light technical map of the North American operating portfolio. Fine geographic and infrastructure lines connect quiet grey locations to exactly one illuminated blue selected site.",
    tags: [
      { label: "SELECTED SITE", value: "NORTH RIDGE PLANT", x: "61%", y: "47%" },
      { label: "OPERATING CASE", value: "FIL-04 · ACTIVE", x: "72%", y: "66%" },
      { label: "REGIONAL PATH", value: "CENTRAL · QUALIFIED", x: "27%", y: "29%" },
    ],
    metrics: [
      { label: "PORTFOLIO ASSET HEALTH", value: "94%", detail: "Selected site assets available", level: 94, status: "STABLE", trend: [81,84,83,87,86,91,89,93,92,94], rows: [{ label: "TARGET", value: "92%" }, { label: "CHANGE", value: "+1.8%" }] },
      { label: "REGIONAL THROUGHPUT (MT/h)", value: "12,450", detail: "Current selected-site output", level: 83, status: "ON PLAN", trend: [58,61,65,63,69,72,74,71,79,83], rows: [{ label: "PLAN", value: "12,300" }, { label: "DELTA", value: "+150" }] },
      { label: "SUPPLY CHAIN LATENCY", value: "18 min", detail: "Current regional material delay", level: 72, status: "WATCH", trend: [41,38,44,49,45,57,53,64,61,72], rows: [{ label: "LIMIT", value: "25 min" }, { label: "TREND", value: "+3 min" }] },
      { label: "HIGH-LEVEL OEE", value: "91.2%", detail: "Availability, speed, and quality", level: 91, status: "STABLE", trend: [77,79,82,80,85,87,86,90,89,91], rows: [{ label: "AVAIL", value: "94.1%" }, { label: "QUALITY", value: "98.2%" }] },
    ],
  },
  plant: {
    tab: "PLANT MGR",
    scope: "NORTH RIDGE PLANT · BOTTLING HALL 4",
    title: "Facility view",
    summary: "The plant view connects the highlighted line to site capacity, alarms, and overall equipment effectiveness.",
    image: "/images/products/infinit-control/portal-plant-manager-v3.png",
    imageAlt: "A dense light industrial CAD wireframe of North Ridge Plant with processing towers, pipe racks, utilities, tanks, packaging halls, conveyors, sensor nodes, and active data paths.",
    tags: [
      { label: "BOTTLING HALL 4", value: "CONDITION ACTIVE", x: "69%", y: "48%" },
      { label: "UTILITY HEADER", value: "PRESSURE STABLE", x: "30%", y: "56%" },
      { label: "PROCESS CELL 08", value: "FLOW QUALIFIED", x: "48%", y: "24%" },
    ],
    metrics: [
      { label: "ACTIVE PROCESS ALARMS", value: "14", detail: "Three require owner review", level: 58, status: "ATTENTION", trend: [32,38,35,44,49,46,55,52,61,58], rows: [{ label: "P1", value: "0" }, { label: "P2 / P3", value: "3 / 11" }] },
      { label: "LINE 4 OEE", value: "82%", detail: "Availability, speed, and quality", level: 82, status: "WATCH", trend: [72,74,71,76,78,77,80,79,83,82], rows: [{ label: "TARGET", value: "86%" }, { label: "GAP", value: "-4.0%" }] },
      { label: "FACILITY MTTR", value: "24 min", detail: "Current mean repair time", level: 68, status: "IMPROVING", trend: [82,78,75,79,69,66,63,59,57,52], rows: [{ label: "30 DAY", value: "31 min" }, { label: "CHANGE", value: "-7 min" }] },
      { label: "PLANT THROUGHPUT", value: "12,450 MT/h", detail: "Current plant output", level: 86, status: "ON PLAN", trend: [64,68,66,72,75,73,78,81,84,86], rows: [{ label: "PLAN", value: "12,300" }, { label: "CAPACITY", value: "83%" }] },
    ],
  },
  operator: {
    tab: "OPERATOR",
    scope: "BOTTLING LINE 4 · FILLER STATION FIL-04",
    title: "Line view",
    summary: "The line view narrows the same condition to the filler station, current production, and the next approved check.",
    image: "/images/products/infinit-control/portal-operator-v3.png",
    imageAlt: "A detailed light CAD blueprint of Bottling Line 4 with depalletizing, rinsing, rotary filling, capping, labeling, vision inspection, case packing, palletizing, process piping, controls, and live filler data paths.",
    tags: [
      { label: "FILLER FIL-04", value: "PRESSURE CHECK", x: "45%", y: "38%" },
      { label: "VISION CELL", value: "99.8% ACCEPT", x: "72%", y: "42%" },
      { label: "RETURN READING", value: "PENDING", x: "54%", y: "71%" },
    ],
    metrics: [
      { label: "FILLER STATION TEMP", value: "180°C", detail: "FIL-04 current process reading", level: 88, status: "IN BAND", trend: [76,77,78,80,79,82,84,83,86,88], rows: [{ label: "BAND", value: "178–182°C" }, { label: "FRESH", value: "1.2 sec" }] },
      { label: "UNITS/MIN", value: "450", detail: "Current Bottling Line 4 output", level: 90, status: "ON RATE", trend: [68,72,75,71,78,81,84,82,88,90], rows: [{ label: "TARGET", value: "450" }, { label: "REJECT", value: "0.2%" }] },
      { label: "CURRENT SHIFT YIELD", value: "98.2%", detail: "Accepted units this shift", level: 98, status: "STABLE", trend: [91,92,94,93,95,96,95,97,98,98], rows: [{ label: "GOOD", value: "84,226" }, { label: "REJECT", value: "1,542" }] },
      { label: "ACTIVE INTERLOCKS", value: "0", detail: "No line stops requested", level: 100, status: "CLEAR", trend: [98,98,98,99,99,99,100,100,100,100], rows: [{ label: "GUARDS", value: "CLOSED" }, { label: "E-STOP", value: "CLEAR" }] },
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
          <RoleVisualization role={activeRole} view={view} />
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
      <header><span>{metric.label}</span><b><i aria-hidden="true" />{metric.status}</b></header>
      <strong>{metric.value}</strong><small>{metric.detail}</small>
      <MetricSparkline points={metric.trend} level={metric.level} />
      <dl>{metric.rows.map(row => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>
    </article>)}
  </aside>;
}

function MetricSparkline({ points, level }: { points: readonly number[]; level: number }) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = Math.max(1, max - min);
  const plotted = points.map((point, index) => `${(index / (points.length - 1) * 100).toFixed(1)},${(22 - ((point - min) / range * 17)).toFixed(1)}`).join(" ");
  const plottedPoints = plotted.split(" ");
  const last = plottedPoints[plottedPoints.length - 1]?.split(",") ?? ["100", "12"];
  return <div className="lm-control-portal__metric-chart" aria-label={`Current level ${level} percent`}><svg viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true"><path d="M0 6H100M0 12H100M0 18H100" /><polygon points={`0,24 ${plotted} 100,24`} /><polyline points={plotted} /><circle cx={last[0]} cy={last[1]} r="1.7" /></svg><i aria-hidden="true"><em style={{ width: `${level}%` }} /></i></div>;
}

function RoleVisualization({ role, view }: { role: PortalRole; view: PortalView }) {
  return <div className={`lm-control-portal__engineering-plate lm-control-portal__engineering-plate--${role}`}>
    <img src={view.image} alt={view.imageAlt} width="1672" height="941" loading="eager" />
    <div className="lm-control-portal__scan-grid" aria-hidden="true" />
    <div className="lm-control-portal__reticle" aria-hidden="true"><i /><i /><i /></div>
    <div className="lm-control-portal__data-tags">{view.tags.map(tag => <article key={tag.label} style={{ left: tag.x, top: tag.y }}><span>{tag.label}</span><strong>{tag.value}</strong></article>)}</div>
    <div className="lm-control-portal__coordinate-rail" aria-hidden="true"><span>LIVE MODEL</span><i /><span>QUALIFIED SOURCES</span><i /><span>RETURN CHECK ACTIVE</span></div>
  </div>;
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
