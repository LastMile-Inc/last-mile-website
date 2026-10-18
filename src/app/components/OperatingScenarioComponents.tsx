import type { ReactNode } from "react";
import { ArrowRight, Check, CircleAlert, CircleCheck, CircleHelp, CircleX, Info, ShieldCheck, TriangleAlert } from "lucide-react";
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
    <div className="lm-boundary-flow" aria-label="Unified Namespace qualification boundary"><span>Customer UNS<small>transport</small></span><ArrowRight aria-hidden="true" /><strong>Infinit-Signal<small>qualification</small></strong><ArrowRight aria-hidden="true" /><span>Singularity<small>shared operational context</small></span></div>
  </section>;
}

export function IdentityCrosswalk() {
  return <section className="lm-identity-crosswalk" aria-label="CHWP-02 source identity crosswalk">
    <header><span>Identity crosswalk</span><strong>Every scoped identity and validity period is retained.</strong></header>
    <dl>{coolingReference.sourceReferences.map(([label, value]) => <div key={label}><dt>{label}</dt><dd><code>{value}</code></dd></div>)}</dl>
    <div className="lm-identity-crosswalk__resolved"><span>Equipment record</span><strong>CHWP-02</strong><p>CHWP-02 → Cooling Loop B → Hall 3 → N+1 secondary pumping path</p></div>
  </section>;
}

export function AuthorityStrip({ response }: { response: OperatingScenario["response"] }) {
  return <div className="lm-authority-strip" aria-label="Response authority modes">{response.map((step) => <article key={`${step.stage}-${step.mode}`}><span>{step.stage}</span><strong>{step.mode}</strong><p>{step.detail}</p></article>)}</div>;
}

function resolveTimelineAttribution(scenario: OperatingScenario, time: string, event: string): string | null {
  const byStage = (stage: string) => scenario.response.find((step) => step.stage === stage);
  const formatStage = (stage: string) => {
    const matched = byStage(stage);
    return matched ? `${matched.mode} · ${matched.product}` : null;
  };
  const primarySource = scenario.systems[0]?.name ?? "Source control system";

  if (/command issued/i.test(event)) {
    return scenario.key === "cooling"
      ? `${primarySource} (BMS-DC03-01) · Source control system`
      : `${primarySource} · Source control system`;
  }
  if (/status remains Stopped/i.test(event)) {
    return scenario.key === "cooling"
      ? `${primarySource} (BMS-DC03-01) · Source status observation`
      : `${primarySource} · Source status observation`;
  }
  if (time === "Initial" || time === "Incident") {
    return `${primarySource} · Source observation received by Infinit-Signal`;
  }
  if (/acknowledg/i.test(event)) {
    const ownerPerson = scenario.people[0]?.role ?? "Customer owner";
    return `HUMAN AUTHORITY · ${ownerPerson} · Infinit-Control`;
  }
  if (/dispatch.*accepted/i.test(event)) {
    return "Mechanical service provider · Recorded in Infinit-Flow";
  }
  if (time === "Work" || /inspection|repair|Product protection|field work marked complete/i.test(event)) {
    return formatStage("Act");
  }
  if (time === "Recovery" || /recovery|stability|drawdown|recurrence|measurement window/i.test(event)) {
    return formatStage("Verify");
  }
  if (/dispatch|assigned|work order|\bWO-\d+/i.test(event)) {
    return formatStage("Coordinate");
  }
  if (/estimate|Condition created/i.test(event)) {
    return formatStage("Understand");
  }
  return formatStage("Evidence");
}

export function ResponseTimeline({ scenario, compact = false }: { scenario: OperatingScenario; compact?: boolean }) {
  return <ol className={`lm-response-timeline${compact ? " is-compact" : ""}`} aria-label={`${scenario.operatingProblem} response timeline`}>{scenario.timeline.map(([time, event]) => {
    const attribution = resolveTimelineAttribution(scenario, time, event);
    return <li key={`${time}-${event}`}><span>{time}</span><div><strong>{event}</strong>{!compact && attribution ? <small>{attribution}</small> : null}</div></li>;
  })}</ol>;
}

export function RecoveryContractPanel({ scenario }: { scenario: OperatingScenario }) {
  return <section className="lm-recovery-contract" aria-label={`${scenario.operatingProblem} recovery criteria`}>
    <header><div><span>Recovery criteria</span><strong>Current, valid return measurements establish the result.</strong></div><ShieldCheck aria-hidden="true" /></header>
    <ul>{scenario.recoveryCriteria.map((criterion) => <li key={criterion}><Check aria-hidden="true" />{criterion}</li>)}</ul>
    <dl><div><dt>Required stability</dt><dd>{scenario.stabilityPeriod}</dd></div><div><dt>Recurrence window</dt><dd>{scenario.recurrenceWindow}</dd></div><div><dt>Result basis</dt><dd>Qualified measurements, not work-system state</dd></div></dl>
  </section>;
}

export function ScenarioProofPanel({ scenario }: { scenario: OperatingScenario }) {
  return <section className="lm-scenario-proof" aria-label="Scenario scope"><span>Scenario scope</span><ul>{scenario.proofPosture.map((item) => <li key={item}><Info aria-hidden="true" />{item}</li>)}</ul></section>;
}

export function AccessibleDataTable({ caption, headers, rows }: { caption: string; headers: readonly string[]; rows: ReadonlyArray<readonly string[]> }) {
  return <div className="lm-data-table-wrap"><table className="lm-data-table"><caption>{caption}</caption><thead><tr>{headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join("|")}>{row.map((cell, index) => index === 0 ? <th key={cell} scope="row">{cell}</th> : <td key={`${cell}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

export function ScenarioProcessMap({ scenario }: { scenario: OperatingScenario }) {
  const stages = [
    { name: "Evidence", owner: "Infinit-Signal", copy: scenario.response.find((step) => step.stage === "Evidence")?.detail ?? "Qualify source and return evidence." },
    { name: "Understand", owner: "Singularity", copy: scenario.response.find((step) => step.stage === "Understand")?.detail ?? "Maintain shared context around the equipment and issue." },
    { name: "Decide", owner: "Infinit-Flow", copy: scenario.response.find((step) => step.stage === "Decide")?.detail ?? "Assemble options and required approvals." },
    { name: "Coordinate", owner: "Infinit-Flow", copy: scenario.response.find((step) => step.stage === "Coordinate")?.detail ?? "Coordinate permitted response steps across people and systems." },
    { name: "Act", owner: "Customer-authorized people and systems", copy: scenario.response.find((step) => step.stage === "Act")?.detail ?? "Perform authorized field or operational work." },
    { name: "Verify", owner: "Infinit-Signal + Singularity + Infinit-Control", copy: scenario.response.find((step) => step.stage === "Verify")?.detail ?? "Evaluate post-work measurements against configured recovery criteria." },
  ] as const;

  return <ol className="lm-code-process-map" aria-label={`${scenario.menuLabel}: Evidence, Understand, Decide, Coordinate, Act, Verify`}>
    {stages.map((stage, index) => <li key={stage.name}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{stage.name}</strong><em>{stage.owner}</em><p>{stage.copy}</p></div>{index < stages.length - 1 ? <ArrowRight aria-hidden="true" /> : null}</li>)}
  </ol>;
}

export function ExpandableProcessMap({ scenario, textVersion }: { scenario: OperatingScenario; textVersion: ReactNode }) {
  return <section className="lm-process-map-card">
    <div><span>Accountable Operations Loop</span><h3>{scenario.menuLabel}</h3><p>How evidence, responsibility, work, and recovery verification stay connected across the response.</p></div>
    <ScenarioProcessMap scenario={scenario} />
    <div className="lm-process-map-text"><h3>Stage summary</h3>{textVersion}</div>
  </section>;
}
