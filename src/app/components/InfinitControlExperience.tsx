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

const roleViews = [{ label: "EXECUTIVE", question: "Where is operating risk?", facts: ["1 site constrained", "Production protected", "Owner assigned"] }, { label: "SITE LEADER", question: "What is affected?", facts: ["Data Hall 3", "Cooling Loop B", "N+1 unavailable"] }, { label: "SUPERVISOR", question: "What happens next?", facts: ["Inspect CHWP-02", "WO-18427 active", "Return readings due"] }] as const;

export function ControlRoleVisual() {
  return <figure className="lm-experience lm-control-roles" aria-labelledby="control-role-caption">
    <header><span>ONE CONNECTED OPERATING CASE</span><strong>Cooling redundancy reduced · Data Hall 3</strong><small>Owner: Critical Facilities</small></header>
    <ol>{roleViews.map((view, index) => <li key={view.label}><div><i>{String(index + 1).padStart(2, "0")}</i><span>{view.label}</span></div><h3>{view.question}</h3><ul>{view.facts.map(fact => <li key={fact}>{fact}</li>)}</ul></li>)}</ol>
    <footer><span>ENTERPRISE</span><i /><span>SITE</span><i /><span>SYSTEM</span><i /><span>ASSET</span><i /><span>CONDITION</span></footer>
    <figcaption id="control-role-caption" className="lm-visually-hidden">Executive, site-leader, and supervisor views answer different questions from the same connected cooling-redundancy case.</figcaption>
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
    <div className="lm-control-continuity__boundary"><header><span>INFINIT-CONTROL PRESENTS THE CROSS-SYSTEM RESPONSE</span><strong>Customer-authorized actions only</strong></header><div>{[["SCADA + BMS","Deterministic control"],["SIS","Safety authority"],["WORK SYSTEM","Record of work"],["LOCAL HMI","Equipment operation"]].map(([system,role]) => <article key={system}><strong>{system}</strong><span>{role} remains in place</span></article>)}</div></div>
    <figcaption id="control-continuity-caption" className="lm-visually-hidden">The command view follows the issue through warning, ownership, work, return measurements, and current state while SCADA, BMS, SIS, work systems, and local HMIs retain their responsibilities.</figcaption>
  </figure>;
}
