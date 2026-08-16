import { useState, type KeyboardEvent, type ReactNode } from "react";

type PortalRole = "executive" | "plant" | "operator";

type PortalMetric = {
  label: string;
  value: string;
  status?: string;
  trend: readonly number[];
};

type PortalView = {
  tab: string;
  scope: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  tags: readonly { label: string; value: string; x: string; y: string }[];
  health: { label: string; value: number; status: string; breakdown: readonly PortalMetric[] };
  systems: readonly PortalMetric[];
  alerts: readonly { label: string; value: string; action: string }[];
  kpis: readonly PortalMetric[];
  scopeRows: readonly { label: string; value: string }[];
  work: { total: string; rows: readonly { label: string; value: string }[] };
  returns: readonly PortalMetric[];
  snapshot: readonly PortalMetric[];
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
    health: { label: "Portfolio Asset Health", value: 94, status: "STABLE", breakdown: [
      { label: "RELIABILITY", value: "95.1%", trend: [78,81,80,84,86,85,89,91,90,94] },
      { label: "AVAILABILITY", value: "96.2%", trend: [83,85,84,87,89,88,92,91,94,96] },
      { label: "HIGH-LEVEL OEE", value: "88.4%", trend: [74,76,79,77,82,81,85,84,87,88] },
    ] },
    systems: [
      { label: "NORTH AMERICA", value: "94.6%", status: "18 SITES", trend: [70,74,73,78,81,79,85,84,89,94] },
      { label: "EUROPE", value: "92.1%", status: "11 SITES", trend: [68,71,75,74,79,82,80,86,89,92] },
      { label: "APAC", value: "91.7%", status: "9 SITES", trend: [66,69,72,76,74,79,83,82,88,91] },
    ],
    alerts: [
      { label: "PORTFOLIO ADVISORIES", value: "3", action: "ACKNOWLEDGED" },
      { label: "SUPPLY WATCHES", value: "1", action: "ACTIVE" },
      { label: "CRITICAL", value: "0", action: "CLEAR" },
    ],
    kpis: [
      { label: "REGIONAL THROUGHPUT (MT/h)", value: "42,860", trend: [72,74,77,75,81,84,83,87,90,92] },
      { label: "SUPPLY CHAIN LATENCY", value: "12ms", trend: [42,38,40,35,37,32,29,31,26,24] },
      { label: "HIGH-LEVEL OEE", value: "88.4%", trend: [77,79,78,82,84,83,86,85,87,88] },
      { label: "ACTIVE SITES", value: "38", trend: [34,34,35,35,36,36,37,37,38,38] },
    ],
    scopeRows: [
      { label: "PORTFOLIO OWNER", value: "NORTH RIDGE INDUSTRIES" },
      { label: "ACTIVE REGION", value: "CENTRAL OPERATIONS" },
      { label: "SELECTED SITE", value: "NORTH RIDGE PLANT" },
      { label: "REPORTING WINDOW", value: "CURRENT SHIFT" },
    ],
    work: { total: "483", rows: [
      { label: "PLANNED", value: "212" }, { label: "IN PROGRESS", value: "148" }, { label: "PENDING", value: "91" }, { label: "ON HOLD", value: "32" },
    ] },
    returns: [
      { label: "REGIONAL DEMAND", value: "87%", trend: [73,74,77,75,80,82,81,84,86,87] },
      { label: "ENERGY INTENSITY", value: "0.89 GJ/t", trend: [89,87,86,84,83,81,80,78,76,74] },
      { label: "SERVICE LEVEL", value: "98.1%", trend: [90,92,91,94,93,95,96,95,97,98] },
      { label: "ORDER VARIANCE", value: "1.7%", trend: [39,37,34,33,30,28,27,24,22,20] },
    ],
    snapshot: [
      { label: "TOTAL ASSETS", value: "18,462", trend: [80,81,82,83,84,86,87,88,89,90] },
      { label: "ONLINE ASSETS", value: "17,354", trend: [78,79,81,82,83,84,86,87,88,89] },
      { label: "UTILIZATION", value: "84.2%", trend: [74,76,75,78,80,79,82,81,83,84] },
      { label: "REGIONAL OEE", value: "88.4%", trend: [77,79,78,82,84,83,86,85,87,88] },
      { label: "SITES ON PLAN", value: "34 / 38", trend: [82,82,84,84,86,86,87,88,89,89] },
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
    health: { label: "Plant Health", value: 92, status: "VERY GOOD", breakdown: [
      { label: "RELIABILITY", value: "96.1%", trend: [78,81,80,84,86,85,89,91,90,96] },
      { label: "AVAILABILITY", value: "93.4%", trend: [80,82,84,83,87,86,90,89,91,93] },
      { label: "PERFORMANCE", value: "91.2%", trend: [74,77,76,81,79,84,83,88,87,91] },
    ] },
    systems: [
      { label: "PROCESS", value: "98.6%", status: "ONLINE", trend: [84,85,87,86,90,89,93,92,96,98] },
      { label: "UTILITIES", value: "95.4%", status: "ONLINE", trend: [79,82,81,85,87,86,90,92,91,95] },
      { label: "ELECTRICAL", value: "97.2%", status: "ONLINE", trend: [82,84,86,85,89,91,90,94,93,97] },
      { label: "INSTRUMENTATION", value: "94.1%", status: "ONLINE", trend: [75,78,80,79,83,85,84,89,91,94] },
      { label: "SAFETY SYSTEMS", value: "100%", status: "ONLINE", trend: [98,98,99,99,99,100,100,100,100,100] },
    ],
    alerts: [
      { label: "ADVISORIES", value: "3", action: "ACKNOWLEDGED" },
      { label: "WARNINGS", value: "0", action: "CLEAR" },
      { label: "CRITICAL", value: "0", action: "CLEAR" },
    ],
    kpis: [
      { label: "THROUGHPUT", value: "12,450 TPH", trend: [70,73,76,74,80,82,81,85,88,91] },
      { label: "ENERGY INTENSITY", value: "0.92 GJ/t", trend: [88,86,84,85,82,80,78,77,74,72] },
      { label: "WATER USAGE", value: "18.7 m³/t", trend: [82,80,81,78,76,74,75,72,70,68] },
      { label: "EMISSIONS", value: "0.21 kg/t", trend: [78,76,75,73,71,69,67,65,63,61] },
    ],
    scopeRows: [
      { label: "ASSET OWNER", value: "NORTH RIDGE INDUSTRIES" },
      { label: "PLANT", value: "NORTH RIDGE COMPLEX" },
      { label: "LOCATION", value: "NR-01" },
      { label: "OWNER TEAM", value: "OPERATIONS EXCELLENCE" },
    ],
    work: { total: "156", rows: [
      { label: "PLANNED", value: "72" }, { label: "IN PROGRESS", value: "58" }, { label: "PENDING", value: "18" }, { label: "ON HOLD", value: "8" },
    ] },
    returns: [
      { label: "PRODUCTION RATE", value: "12,450 TPH", trend: [70,73,76,74,80,82,81,85,88,91] },
      { label: "YIELD", value: "96.8%", trend: [88,90,89,92,91,94,93,95,96,96] },
      { label: "SPEC COMPLIANCE", value: "98.6%", trend: [90,91,93,92,95,94,96,97,98,98] },
      { label: "ENERGY EFFICIENCY", value: "0.92 GJ/t", trend: [88,86,84,85,82,80,78,77,74,72] },
      { label: "WATER EFFICIENCY", value: "18.7 m³/t", trend: [82,80,81,78,76,74,75,72,70,68] },
      { label: "EMISSIONS INTENSITY", value: "0.21 kg/t", trend: [78,76,75,73,71,69,67,65,63,61] },
    ],
    snapshot: [
      { label: "TOTAL ASSETS", value: "1,248", trend: [80,81,82,83,84,86,87,88,89,90] },
      { label: "ONLINE ASSETS", value: "1,186", trend: [78,79,81,82,83,84,86,87,88,89] },
      { label: "UTILIZATION", value: "87.6%", trend: [74,76,75,78,80,79,82,84,86,87] },
      { label: "MAINT. COMPLIANCE", value: "98.2%", trend: [91,92,93,94,95,95,96,97,98,98] },
      { label: "SAFE DAYS", value: "342", trend: [92,92,93,94,95,96,97,98,99,100] },
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
    health: { label: "Current Shift Yield", value: 98.2, status: "ON TARGET", breakdown: [
      { label: "AVAILABILITY", value: "97.6%", trend: [84,86,85,89,91,90,94,93,96,97] },
      { label: "LINE PERFORMANCE", value: "93.8%", trend: [79,81,83,82,86,85,89,91,92,93] },
      { label: "QUALITY", value: "98.2%", trend: [90,92,91,94,93,96,95,97,98,98] },
    ] },
    systems: [
      { label: "FILLER FIL-04", value: "98.9%", status: "RUNNING", trend: [84,86,87,86,90,92,91,95,97,98] },
      { label: "CAPPER CAP-04", value: "97.4%", status: "RUNNING", trend: [82,84,83,87,89,88,92,91,95,97] },
      { label: "LABELER LAB-04", value: "99.1%", status: "RUNNING", trend: [90,91,93,92,95,96,95,97,98,99] },
      { label: "VISION CELL", value: "99.8%", status: "RUNNING", trend: [94,95,96,96,97,97,98,98,99,99] },
      { label: "PALLETIZER", value: "96.7%", status: "RUNNING", trend: [80,82,84,83,87,89,88,92,94,96] },
    ],
    alerts: [
      { label: "ACTIVE LINE ALARMS", value: "2", action: "REVIEW" },
      { label: "WARNINGS", value: "1", action: "ACKNOWLEDGED" },
      { label: "CRITICAL", value: "0", action: "CLEAR" },
    ],
    kpis: [
      { label: "FILLER STATION TEMP", value: "180°C", trend: [76,77,78,80,79,82,84,83,86,88] },
      { label: "UNITS/MIN", value: "450", trend: [68,72,75,71,78,81,84,82,88,90] },
      { label: "CURRENT SHIFT YIELD", value: "98.2%", trend: [91,92,94,93,95,96,95,97,98,98] },
      { label: "NEXT PM CYCLE", value: "4 hrs", trend: [100,96,92,88,84,80,76,72,68,64] },
    ],
    scopeRows: [
      { label: "LINE", value: "BOTTLING LINE 4" },
      { label: "ACTIVE STATION", value: "FILLER FIL-04" },
      { label: "SHIFT", value: "A · 06:00–14:00" },
      { label: "OWNER", value: "LINE OPERATIONS" },
    ],
    work: { total: "7", rows: [
      { label: "PLANNED", value: "3" }, { label: "IN PROGRESS", value: "2" }, { label: "PENDING", value: "2" }, { label: "ON HOLD", value: "0" },
    ] },
    returns: [
      { label: "FILLER TEMPERATURE", value: "180°C", trend: [76,77,78,80,79,82,84,83,86,88] },
      { label: "LINE RATE", value: "450 units/min", trend: [68,72,75,71,78,81,84,82,88,90] },
      { label: "SHIFT YIELD", value: "98.2%", trend: [91,92,94,93,95,96,95,97,98,98] },
      { label: "FILL PRESSURE", value: "42.6 psi", trend: [75,77,76,80,82,81,84,83,86,87] },
      { label: "CAP TORQUE", value: "18.4 in-lb", trend: [82,83,85,84,87,86,89,91,90,92] },
      { label: "REJECT RATE", value: "0.2%", trend: [42,40,38,36,37,33,31,29,27,25] },
    ],
    snapshot: [
      { label: "GOOD UNITS", value: "84,226", trend: [72,75,77,80,82,84,87,89,92,94] },
      { label: "UNITS/MIN", value: "450", trend: [68,72,75,71,78,81,84,82,88,90] },
      { label: "SHIFT YIELD", value: "98.2%", trend: [91,92,94,93,95,96,95,97,98,98] },
      { label: "ACTIVE ALARMS", value: "2", trend: [45,42,40,38,34,31,28,26,24,22] },
      { label: "NEXT PM", value: "4 hrs", trend: [100,96,92,88,84,80,76,72,68,64] },
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
    tabs?.[nextIndex]?.focus();
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
      <aside className="lm-control-portal__rail lm-control-portal__rail--left" aria-label="Operating condition and system measurements">
        <HealthPanel health={view.health} />
        <SystemsPanel systems={view.systems} />
        <AlertsPanel alerts={view.alerts} />
        <KpiPanel metrics={view.kpis} />
      </aside>
      <section className="lm-control-portal__center" aria-label={`${view.title}: ${view.scope}`}>
        <header><div><span>{view.title}</span><strong>{view.scope}</strong></div><small>ROLE-TUNED VIEW · SHARED FACTS</small></header>
        <div className="lm-control-portal__visual">
          <RoleVisualization role={activeRole} view={view} />
        </div>
        <SnapshotBar metrics={view.snapshot} />
        <p className="lm-control-portal__view-summary" aria-live="polite">{view.summary}</p>
      </section>
      <aside className="lm-control-portal__rail lm-control-portal__rail--right" aria-label="Scope, work, and return measurements">
        <ScopePanel rows={view.scopeRows} />
        <WorkPanel work={view.work} />
        <ReturnPanel metrics={view.returns} />
      </aside>
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

function Panel({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return <section className={`lm-control-portal__panel ${className}`.trim()}><header><h3>{title}</h3><i aria-hidden="true" /></header>{children}</section>;
}

function HealthPanel({ health }: { health: PortalView["health"] }) {
  return <Panel title="Operational Condition" className="lm-control-portal__health"><div className="lm-control-portal__health-grid"><div className="lm-control-portal__health-ring" style={{ background: `conic-gradient(var(--lm-control-blue) ${health.value}%, #d9e3ec 0)` }}><div><strong>{health.value}</strong><span>%</span></div></div><div className="lm-control-portal__health-detail"><span>{health.label}</span><b>{health.status}</b></div><div className="lm-control-portal__health-breakdown">{health.breakdown.map(metric => <TrendRow key={metric.label} metric={metric} />)}</div></div></Panel>;
}

function SystemsPanel({ systems }: { systems: readonly PortalMetric[] }) {
  return <Panel title="Systems Overview" className="lm-control-portal__systems">{systems.map(metric => <TrendRow key={metric.label} metric={metric} showStatus />)}</Panel>;
}

function AlertsPanel({ alerts }: { alerts: PortalView["alerts"] }) {
  return <Panel title="Alerts & Notifications" className="lm-control-portal__alerts">{alerts.map(alert => <div key={alert.label}><i aria-hidden="true" /><strong>{alert.value}</strong><span>{alert.label}</span><b>{alert.action}</b></div>)}</Panel>;
}

function KpiPanel({ metrics }: { metrics: readonly PortalMetric[] }) {
  return <Panel title="KPI Summary" className="lm-control-portal__kpis"><div>{metrics.map(metric => <article key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><MiniTrend points={metric.trend} /></article>)}</div></Panel>;
}

function ScopePanel({ rows }: { rows: PortalView["scopeRows"] }) {
  return <Panel title="Current Scope" className="lm-control-portal__scope"><dl>{rows.map(row => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl></Panel>;
}

function WorkPanel({ work }: { work: PortalView["work"] }) {
  return <Panel title="Work" className="lm-control-portal__work"><div className="lm-control-portal__work-grid"><div className="lm-control-portal__work-ring"><div><strong>{work.total}</strong><span>TOTAL WORK ORDERS</span></div></div><dl>{work.rows.map(row => <div key={row.label}><dt>{row.value}</dt><dd>{row.label}</dd></div>)}</dl></div></Panel>;
}

function ReturnPanel({ metrics }: { metrics: readonly PortalMetric[] }) {
  return <Panel title="Live Measurements" className="lm-control-portal__returns">{metrics.map(metric => <TrendRow key={metric.label} metric={metric} />)}</Panel>;
}

function SnapshotBar({ metrics }: { metrics: readonly PortalMetric[] }) {
  return <div className="lm-control-portal__snapshot" aria-label="Current role summary">{metrics.map(metric => <div key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong></div>)}</div>;
}

function TrendRow({ metric, showStatus = false }: { metric: PortalMetric; showStatus?: boolean }) {
  return <div className="lm-control-portal__trend-row"><div><span>{metric.label}</span>{showStatus && metric.status ? <small><i aria-hidden="true" />{metric.status}</small> : null}</div><MiniTrend points={metric.trend} /><strong>{metric.value}</strong></div>;
}

function MiniTrend({ points }: { points: readonly number[] }) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = Math.max(1, max - min);
  const plotted = points.map((point, index) => `${(index / (points.length - 1) * 100).toFixed(1)},${(18 - ((point - min) / range * 14)).toFixed(1)}`).join(" ");
  return <svg className="lm-control-portal__mini-trend" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true"><path d="M0 18H100" /><polyline points={plotted} /></svg>;
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
