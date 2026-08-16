import type { ReactNode } from "react";
import { ArrowRight, Check, CircleAlert, CircleCheck, CircleHelp, CircleX, Info, TriangleAlert } from "lucide-react";
import { OperationalIcon, type OperationalIconKind } from "./OperationalIcon";
import {
  coolingReference,
  deriveRag,
  measurementAriaLabel,
  ragLabel,
  type OperatingScenario,
  type RagStatus,
  type ReferenceMeasurement,
} from "@/app/pages/platformReferenceData";

export function StatusBadge({ status, label }: { status: RagStatus; label: string }) {
  return <span className={`lm-status-badge is-${status}`}><StatusIcon status={status} /><span>{label}</span></span>;
}

export function StatusIcon({ status }: { status: RagStatus }) {
  if (status === "critical") return <CircleX aria-hidden="true" />;
  if (status === "warning") return <TriangleAlert aria-hidden="true" />;
  if (status === "normal") return <CircleCheck aria-hidden="true" />;
  if (status === "unknown") return <CircleHelp aria-hidden="true" />;
  return <Info aria-hidden="true" />;
}

export function MeasurementCard({ measurement }: { measurement: ReferenceMeasurement }) {
  const status = deriveRag(measurement);
  return <article className={`lm-scenario-measurement is-${status}`} aria-label={measurementAriaLabel(measurement)}>
    <header><strong>{measurement.name}</strong><StatusBadge status={status} label={ragLabel(measurement)} /></header>
    <p className="lm-scenario-measurement__value">{measurement.value}</p>
    <p className="lm-scenario-measurement__reference">{measurement.reference}</p>
    {measurement.trend || measurement.freshness ? <footer>{measurement.trend ? <span>{measurement.trend}</span> : null}{measurement.freshness ? <span>{measurement.freshness}</span> : null}</footer> : null}
  </article>;
}

export function MeasurementGrid({ measurements, compact = false }: { measurements: readonly ReferenceMeasurement[]; compact?: boolean }) {
  return <div className={`lm-scenario-measurements${compact ? " is-compact" : ""}`}>{measurements.map((measurement) => <MeasurementCard key={measurement.id} measurement={measurement} />)}</div>;
}

export function OperatingConditionPanel({ scenario, compact = false }: { scenario: OperatingScenario; compact?: boolean }) {
  return <section className={`lm-operating-condition${compact ? " is-compact" : ""}`} aria-label={`${scenario.condition} operating condition`}>
    <header>
      <div><span>Operating Condition</span><strong>{scenario.condition}</strong><small>{scenario.context}</small></div>
      <StatusBadge status={scenario.severity} label={`${scenario.severity === "critical" ? "Critical" : "Warning"} · Active`} />
    </header>
    <div className="lm-operating-condition__owner"><span>Owner</span><strong>{scenario.owner}</strong></div>
    <MeasurementGrid measurements={compact ? scenario.incident.slice(0, 5) : scenario.incident} compact={compact} />
    <p className="lm-operating-condition__interpretation"><CircleAlert aria-hidden="true" />{scenario.conditionDetail}</p>
  </section>;
}

export function EvidenceEnvelope() {
  return <section className="lm-evidence-envelope" aria-label="Infinit-Signal qualified evidence envelope">
    <header><span>Qualified evidence envelope</span><strong>{coolingReference.identity.issue}</strong><StatusBadge status="warning" label="2 records quarantined" /></header>
    <MeasurementGrid measurements={coolingReference.qualification} compact />
    <div className="lm-evidence-envelope__decision"><strong>Acceptance decision</strong><ul>{coolingReference.quarantine.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></div>
    <div className="lm-boundary-flow" aria-label="Unified Namespace qualification boundary"><span>Customer UNS<small>transport</small></span><ArrowRight aria-hidden="true" /><strong>Infinit-Signal<small>qualification</small></strong><ArrowRight aria-hidden="true" /><span>Singularity<small>governed operational memory</small></span></div>
  </section>;
}

export function IdentityCrosswalk() {
  return <section className="lm-identity-crosswalk" aria-label="CHWP-02 source identity crosswalk">
    <header><span>Identity crosswalk</span><strong>Every scoped identity and validity period is retained.</strong></header>
    <dl>{coolingReference.sourceReferences.map(([label, value]) => <div key={label}><dt>{label}</dt><dd><code>{value}</code></dd></div>)}</dl>
    <div className="lm-identity-crosswalk__resolved"><span>Canonical asset</span><strong>CHWP-02</strong><p>CHWP-02 → Cooling Loop B → Hall 3 → N+1 secondary pumping path</p></div>
  </section>;
}

export function AuthorityStrip({ response }: { response: OperatingScenario["response"] }) {
  return <div className="lm-authority-strip" aria-label="Response authority modes">{response.map((step) => <article key={`${step.stage}-${step.mode}`}><span>{step.stage}</span><strong>{step.mode}</strong><p>{step.detail}</p></article>)}</div>;
}

export function ResponseTimeline({ scenario, compact = false }: { scenario: OperatingScenario; compact?: boolean }) {
  return <ol className={`lm-response-timeline${compact ? " is-compact" : ""}`} aria-label={`${scenario.operatingProblem} response timeline`}>{scenario.timeline.map(([time, event], index) => <li key={`${time}-${event}`}><span>{time}</span><div><strong>{event}</strong>{!compact && scenario.response[index] ? <small>{scenario.response[index].mode} · {scenario.response[index].product}</small> : null}</div></li>)}</ol>;
}

export function RecoveryContractPanel({ scenario }: { scenario: OperatingScenario }) {
  return <section className="lm-recovery-contract" aria-label={`${scenario.operatingProblem} recovery contract`}>
    <header><div><span>Recovery contract</span><strong>Current, valid return measurements establish the result.</strong></div><OperationalIcon kind="verification" size="small" /></header>
    <ul>{scenario.recoveryCriteria.map((criterion) => <li key={criterion}><Check aria-hidden="true" />{criterion}</li>)}</ul>
    <dl><div><dt>Required stability</dt><dd>{scenario.stabilityPeriod}</dd></div><div><dt>Recurrence window</dt><dd>{scenario.recurrenceWindow}</dd></div><div><dt>Result basis</dt><dd>Qualified measurements, not work-system state</dd></div></dl>
  </section>;
}


export function AccessibleDataTable({ caption, headers, rows }: { caption: string; headers: readonly string[]; rows: ReadonlyArray<readonly string[]> }) {
  return <div className="lm-data-table-wrap"><table className="lm-data-table"><caption>{caption}</caption><thead><tr>{headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join("|")}>{row.map((cell, index) => index === 0 ? <th key={cell} scope="row">{cell}</th> : <td key={`${cell}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

export function ScenarioProcessMap({ scenario }: { scenario: OperatingScenario }) {
  const stages: ReadonlyArray<{ name: string; owner: string; copy: string; icon: OperationalIconKind }> = [
    { name: "Evidence", owner: "Existing systems", copy: scenario.incident.slice(0, 4).map((measurement) => measurement.name).join(" · "), icon: "evidence" },
    { name: "Qualify", owner: "Infinit-Signal", copy: "Validate source, time, quality, replay, and identity; create the SSOM-conformant record and Condition.", icon: "signal" },
    { name: "Coordinate", owner: "Singularity + Infinit-Flow", copy: "Use accepted canonical context while coordinating policy, people, systems, timers, and authority.", icon: "flow" },
    { name: "Work", owner: "Customer-authorized participants", copy: scenario.response.find((step) => step.stage === "Act")?.detail ?? "Execute the governed physical or digital response.", icon: "work" },
    { name: "Verify", owner: "Infinit-Signal + Singularity", copy: "Qualify return evidence, establish the canonical Outcome, and present live state through Infinit-Control.", icon: "verification" },
  ];

  return <ol className="lm-code-process-map" aria-label={`${scenario.menuLabel}: Evidence, Qualify, Coordinate, Work, Verify`}>
    {stages.map((stage, index) => <li key={stage.name}><OperationalIcon kind={stage.icon} size="small" /><div><strong>{stage.name}</strong><em>{stage.owner}</em><p>{stage.copy}</p></div>{index < stages.length - 1 ? <ArrowRight aria-hidden="true" /> : null}</li>)}
  </ol>;
}

const systemIconKinds: readonly OperationalIconKind[] = ["control-system", "operational-data", "execution-system", "people-authority"];

export function SystemResponsibilityMap({ scenario }: { scenario: OperatingScenario }) {
  return <section className="lm-system-responsibility-map" aria-label={`${scenario.menuLabel} participating systems`}>
    <div className="lm-system-responsibility-map__hub">
      <OperationalIcon kind="context" size="large" />
      <span>Operating issue</span>
      <strong>{scenario.condition}</strong>
      <small>{scenario.owner}</small>
    </div>
    <div className="lm-system-responsibility-map__nodes">
      {scenario.systems.map((system, index) => <article key={system.name}>
        <OperationalIcon kind={systemIconKinds[index % systemIconKinds.length]} />
        <div><strong>{system.name}</strong><p>{system.retains}</p></div>
      </article>)}
    </div>
  </section>;
}

const responseIconKinds: readonly OperationalIconKind[] = ["evidence", "context", "decision", "flow", "work", "verification"];

export function AccountableResponseRail({ scenario }: { scenario: OperatingScenario }) {
  return <ol className="lm-accountable-response-rail" aria-label={`${scenario.menuLabel} Accountable Operations Loop`}>
    {scenario.response.map((step, index) => <li key={step.stage}>
      <OperationalIcon kind={responseIconKinds[index]} />
      <div><strong>{step.stage}</strong><span>{step.product}</span><small>{step.mode}</small></div>
    </li>)}
  </ol>;
}

export function OutcomeEvidenceMap({ scenario }: { scenario: OperatingScenario }) {
  return <section className="lm-outcome-evidence-map" aria-label={`${scenario.menuLabel} event readings and program metrics`}>
    <article>
      <OperationalIcon kind="verification" size="large" />
      <span>This response</span>
      <h3>Return readings</h3>
      <ul>{scenario.eventProof.slice(0, 6).map((item) => <li key={item}>{item}</li>)}</ul>
    </article>
    <div className="lm-outcome-evidence-map__bridge" aria-hidden="true"><i /><i /><i /></div>
    <article>
      <OperationalIcon kind="operational-data" size="large" />
      <span>Across responses</span>
      <h3>Program metrics</h3>
      <ul>{scenario.programMetrics.map((item) => <li key={item}>{item}</li>)}</ul>
    </article>
  </section>;
}

export function ExpandableProcessMap({ scenario, textVersion }: { scenario: OperatingScenario; textVersion: ReactNode }) {
  return <section className="lm-process-map-card">
    <div><span>Governed process map</span><h3>{scenario.menuLabel}</h3><p>This accessible, code-native map is generated from governed scenario data and preserves the approved product ownership boundaries.</p></div>
    <ScenarioProcessMap scenario={scenario} />
    <div className="lm-process-map-text"><h3>Accessible text version</h3>{textVersion}</div>
  </section>;
}
