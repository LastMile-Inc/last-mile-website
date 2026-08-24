import { useMemo, useState } from "react";
import { Calculator, Network, Radio, ShieldCheck, Users, Workflow, type LucideIcon } from "lucide-react";
import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, NextStep } from "@/app/components/NarrativeComponents";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";

type RolloutPhase = {
  id: string;
  label: string;
  duration: string;
  title: string;
  copy: string;
  deliverables: readonly string[];
  workstreams: readonly string[];
  exitGates: readonly string[];
};

type ParallelMode = {
  id: string;
  label: string;
  title: string;
  goal: string;
  exitGate: string;
  currentStack: readonly string[];
  synapse: readonly string[];
  singularity: readonly string[];
  governance: readonly string[];
};

const rolloutPhases: readonly RolloutPhase[] = [
  {
    id: "mobilize",
    label: "01 Mobilize",
    duration: "Weeks 1-2",
    title: "Freeze the first-wave scope and operating contract.",
    copy: "Choose the first sites, define the operating issue family, lock the measurement contract, and assign the sponsors who can authorize each phase gate.",
    deliverables: [
      "Program charter with first-wave site roster",
      "Named operator, OT, maintenance, and PMO owners",
      "Measurement contract for qualified Conditions and verified outcomes",
    ],
    workstreams: [
      "Program governance and wave sequencing",
      "OT source inventory and access review",
      "Outcome definition and evidence contract",
    ],
    exitGates: [
      "Wave-one sites and source systems approved",
      "Operating owner and authority chain named",
      "Verification measures agreed before any cutover work starts",
    ],
  },
  {
    id: "instrument",
    label: "02 Instrument",
    duration: "Weeks 3-5",
    title: "Stage source acquisition, mappings, and workflow endpoints.",
    copy: "Deploy the edge-gateway workstream, bind representative sources, establish SSOM mappings, and connect the response surfaces that will be exercised during parallel run.",
    deliverables: [
      "Synapse deployment plan by site and source family",
      "Canonical asset, condition, and topology mappings",
      "Workflow targets, escalation rules, and notification paths",
    ],
    workstreams: [
      "Source onboarding and transport qualification",
      "Singularity / SSOM mapping",
      "Workflow and authority configuration",
    ],
    exitGates: [
      "Representative source data flowing in the staging path",
      "Critical identities and topology resolved",
      "Response targets available for rehearsal without production cutover",
    ],
  },
  {
    id: "parallel-run",
    label: "03 Parallel Run",
    duration: "Weeks 6-9",
    title: "Mirror evidence and compare behavior before changing operator muscle memory.",
    copy: "Run the implementation path beside the current stack, reconcile mismatches, and prove that qualified Conditions, mappings, and response timing are coherent before guided execution begins.",
    deliverables: [
      "Parallel-run issue log with source and mapping deltas",
      "Condition classification and reconciliation report",
      "Operator review cadence with shift-level feedback",
    ],
    workstreams: [
      "Evidence mirroring and freshness review",
      "Exception handling and mapping cleanup",
      "Shift review and operator readiness",
    ],
    exitGates: [
      "Qualified Conditions match the agreed reference behavior",
      "Open mapping exceptions triaged or blocked explicitly",
      "Operators sign off on guided-response readiness",
    ],
  },
  {
    id: "guided-wave",
    label: "04 Guided Wave",
    duration: "Weeks 10-13",
    title: "Move the first wave into governed assisted response.",
    copy: "Use the implementation path for guided response, keep customer operating authority explicit, and verify that escalations, approvals, and work coordination behave as designed under live conditions.",
    deliverables: [
      "Guided-response runbook for the first wave",
      "Escalation, dispatch, and approval coverage map",
      "Verified-outcome review against live return measurements",
    ],
    workstreams: [
      "Guided-response orchestration",
      "Approvals and work-system bindings",
      "Outcome verification and rollback readiness",
    ],
    exitGates: [
      "Guided-response path used successfully under live conditions",
      "Authority boundaries preserved during each escalated event",
      "Return measurements establish the result without manual patching",
    ],
  },
  {
    id: "scale",
    label: "05 Scale",
    duration: "Weeks 14+",
    title: "Repeat the wave model with fewer exceptions and tighter governance.",
    copy: "Expand across sites only after the first wave has durable evidence quality, stable mappings, and a repeatable operator motion. Use the learned runbook to compress later waves without skipping gates.",
    deliverables: [
      "Repeatable wave template with named exit evidence",
      "Cross-site scorecard for load, exceptions, and verified outcomes",
      "Backlog for additional source families and operator views",
    ],
    workstreams: [
      "Wave-by-wave rollout planning",
      "Cross-site operational governance",
      "Post-wave measurement and backlog management",
    ],
    exitGates: [
      "First wave remains stable without hidden manual repair",
      "Next-wave sites accept the proven runbook and governance pattern",
      "Program scorecard shows repeatable capacity gains and known constraints",
    ],
  },
] as const;

const parallelModes: readonly ParallelMode[] = [
  {
    id: "mirror",
    label: "Mirror source evidence",
    title: "Start with mirror-mode evidence only.",
    goal: "Capture the same operational facts in parallel without changing the operator's current system of record.",
    exitGate: "Exit gate: source timestamps, quality, and identity resolution remain coherent for the agreed reference set.",
    currentStack: [
      "SCADA, historian, and work systems remain the active operator surface.",
      "Existing alarms, work orders, and manual triage continue unchanged.",
    ],
    synapse: [
      "Mirror approved MQTT, OPC UA, API, or file outputs into the implementation path.",
      "Preserve source references, freshness, and transport health for comparison.",
    ],
    singularity: [
      "Stage canonical records and detect unresolved identities without affecting live workflows.",
      "Hold topology and condition resolution behind the review path.",
    ],
    governance: [
      "PMO reviews source coverage and transport exceptions daily.",
      "Operator authority stays fully in the current stack.",
    ],
  },
  {
    id: "reconcile",
    label: "Reconcile mappings",
    title: "Resolve identity, topology, and condition semantics.",
    goal: "Turn mirrored source evidence into stable canonical assets, conditions, and operational context before guided response begins.",
    exitGate: "Exit gate: unresolved mappings fall below the agreed tolerance and all critical assets have named ownership.",
    currentStack: [
      "Source systems remain the baseline for comparison and acceptance.",
      "Operations teams review mismatches with OT and implementation leads.",
    ],
    synapse: [
      "Normalize source payloads and preserve lineage for each mapped record.",
      "Flag duplicates, stale payloads, and source-side drift explicitly.",
    ],
    singularity: [
      "Resolve asset, site, and topology mappings into the governed model.",
      "Promote only accepted mappings to the guided-response view.",
    ],
    governance: [
      "PMO tracks exception age, owner, and next action.",
      "Cutover remains blocked until measurement and mapping exceptions are explicit.",
    ],
  },
  {
    id: "assist",
    label: "Govern assisted response",
    title: "Exercise guided response while customer authority stays explicit.",
    goal: "Use the rollout path for response coordination while preserving the customer's live operating authority and rollback path.",
    exitGate: "Exit gate: guided-response timing, approvals, and work coordination perform as designed under live conditions.",
    currentStack: [
      "Operators still retain live decision authority and final command surfaces.",
      "Existing work systems remain the official maintenance record.",
    ],
    synapse: [
      "Deliver qualified Conditions into the guided implementation workflow.",
      "Keep evidence and site-state references attached to each escalated response.",
    ],
    singularity: [
      "Carry canonical identity, context, and outcome criteria into the guided response.",
      "Retain a reviewable evidence chain for every assisted escalation.",
    ],
    governance: [
      "Approvals, dispatch, and escalation rules are rehearsed against named roles.",
      "Rollback to the current stack remains available at each handoff.",
    ],
  },
  {
    id: "cutover",
    label: "Cut over with verification",
    title: "Promote the governed path only after verification is repeatable.",
    goal: "Use the rollout path as the primary response layer when evidence, mappings, and guided execution remain stable across the agreed window.",
    exitGate: "Exit gate: verified-outcome review stays stable across the agreed window and open exceptions have explicit owners or approved deferrals.",
    currentStack: [
      "Current systems continue to supply source authority and work-system records.",
      "Manual duplicate reviews retire only where the PMO signs off on the exit evidence.",
    ],
    synapse: [
      "Keep transport health and source coverage visible as an operational workstream.",
      "Stage additional source families using the proven wave template.",
    ],
    singularity: [
      "Use the governed model as the shared reference for response state and result review.",
      "Keep verification tied to live return measurements rather than work closure alone.",
    ],
    governance: [
      "PMO tracks wave stability, exceptions, and expansion readiness.",
      "Customer operating authority remains explicit even after cutover.",
    ],
  },
] as const;

const workstreams: ReadonlyArray<{ label: string; title: string; copy: string; icon: LucideIcon }> = [
  {
    label: "01",
    title: "Source onboarding",
    copy: "Stage the approved source outputs, validate transport health, and make transport exceptions visible before any rollout wave depends on them.",
    icon: Radio,
  },
  {
    label: "02",
    title: "Canonical mapping",
    copy: "Resolve assets, topology, conditions, and ownership into the governed model so every guided response references the same operating context.",
    icon: Network,
  },
  {
    label: "03",
    title: "Workflow and authority",
    copy: "Bind approvals, work systems, escalation rules, and response timers without blurring customer operating authority or work-system ownership.",
    icon: Workflow,
  },
  {
    label: "04",
    title: "Site readiness",
    copy: "Rehearse shift reviews, operator expectations, rollback rules, and wave scorecards so the PMO can scale only after the first wave is stable.",
    icon: Users,
  },
];

const wholeNumber = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const oneDecimal = new Intl.NumberFormat("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function formatWhole(value: number) {
  return wholeNumber.format(Math.round(value));
}

function formatDecimal(value: number) {
  return oneDecimal.format(value);
}

export function PmoImplementationHubPage() {
  const description = "Reference planning for phased Last Mile rollout with interactive FTE models, phase gates, and a governed Synapse parallel-run schema.";
  const [sites, setSites] = useState(8);
  const [conditionsPerSite, setConditionsPerSite] = useState(28);
  const [manualMinutes, setManualMinutes] = useState(12);
  const [escalationRate, setEscalationRate] = useState(32);
  const [coordinationMinutes, setCoordinationMinutes] = useState(26);
  const [guidedCoverage, setGuidedCoverage] = useState(55);
  const [waves, setWaves] = useState(3);
  const [sourceSystems, setSourceSystems] = useState(4);
  const [parallelRunWeeks, setParallelRunWeeks] = useState(6);
  const [shiftReviews, setShiftReviews] = useState(10);
  const [selectedPhaseId, setSelectedPhaseId] = useState(rolloutPhases[0].id);
  const [selectedModeId, setSelectedModeId] = useState(parallelModes[0].id);

  const operationsModel = useMemo(() => {
    const totalConditions = sites * conditionsPerSite;
    const escalatedConditions = totalConditions * (escalationRate / 100);
    const baselineHours =
      (totalConditions * manualMinutes + escalatedConditions * coordinationMinutes) / 60;
    const assistedManualMinutes = Math.max(4, manualMinutes * 0.42);
    const assistedCoordinationMinutes = Math.max(8, coordinationMinutes * 0.48);
    const guidedRatio = guidedCoverage / 100;
    const targetHours =
      (totalConditions * (manualMinutes * (1 - guidedRatio) + assistedManualMinutes * guidedRatio) +
        escalatedConditions *
          (coordinationMinutes * (1 - guidedRatio) + assistedCoordinationMinutes * guidedRatio)) /
      60;
    const reclaimedHours = Math.max(baselineHours - targetHours, 0);

    return {
      totalConditions,
      baselineHours,
      targetHours,
      reclaimedHours,
      reclaimedFte: reclaimedHours / 40,
      annualHours: reclaimedHours * 52,
    };
  }, [conditionsPerSite, coordinationMinutes, escalationRate, guidedCoverage, manualMinutes, sites]);

  const staffingModel = useMemo(() => {
    const activeWaveSites = sites / waves;
    const waveWeeks = parallelRunWeeks + 4;
    const pmoHours = 44 + waves * 12 + parallelRunWeeks * 6;
    const otDataHours = activeWaveSites * sourceSystems * 16 + parallelRunWeeks * sourceSystems * 5;
    const workflowHours = activeWaveSites * 14 + parallelRunWeeks * 10 + waves * 8;
    const readinessHours = activeWaveSites * shiftReviews * 1.5 + parallelRunWeeks * 12;
    const toFte = (hours: number) => hours / (waveWeeks * 40);

    return {
      activeWaveSites,
      pmoFte: toFte(pmoHours),
      otDataFte: toFte(otDataHours),
      workflowFte: toFte(workflowHours),
      readinessFte: toFte(readinessHours),
      totalFte: toFte(pmoHours + otDataHours + workflowHours + readinessHours),
    };
  }, [parallelRunWeeks, shiftReviews, sites, sourceSystems, waves]);

  const selectedPhase = rolloutPhases.find((phase) => phase.id === selectedPhaseId) ?? rolloutPhases[0];
  const selectedMode = parallelModes.find((mode) => mode.id === selectedModeId) ?? parallelModes[0];

  return (
    <>
      <SEO
        title="PMO Implementation Hub | Last Mile"
        description={description}
        canonicalPath="/resources/pmo-implementation-hub"
        jsonLd={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: "PMO Implementation Hub", path: "/resources/pmo-implementation-hub" },
        ])}
      />
      <div className="lm-v2-page lm-pmo-hub-page">
        <EditorialHero
          eyebrow="Implementation Planning"
          title="PMO Implementation Hub for a phased Last Mile rollout."
          intro="Model the operator load, sequence the implementation waves, and stage a governed parallel-run without expanding the site's public product model."
          support="Last Mile Synapse is the implementation label for the open-protocol edge gateway workstream that stages source acquisition for Infinit-Signal during rollout."
          primary={{ label: "Model the rollout", to: "/resources/pmo-implementation-hub#fte-calculators" }}
          secondary={{ label: "Discuss your implementation", to: "/contact?intent=operation" }}
          visual={<HubSummary operationsModel={operationsModel} staffingModel={staffingModel} phase={selectedPhase} mode={selectedMode} />}
        />

        <EditorialSection
          id="fte-calculators"
          eyebrow="Reference planning models"
          title="Stress-test the rollout before the first site enters parallel run."
          intro="Use these local models to size the delivery motion before the rollout calendar hardens."
          tone="grid"
        >
          <p className="lm-v2-caveat">
            Reference implementation planning pages may present phased rollout models, staffing estimates,
            and parallel-run governance as planning aids rather than customer commitments.
          </p>
          <div className="lm-pmo-calculators">
            <article className="lm-pmo-calculator">
              <header className="lm-pmo-calculator__head">
                <div>
                  <span className="lm-v2-card-label">Operations-response FTE model</span>
                  <h3>Estimate the coordination lift you can reclaim from guided response.</h3>
                </div>
                <Calculator aria-hidden="true" />
              </header>
              <div className="lm-pmo-calculator__fields">
                <PlanningField id="pmo-sites" label="Sites in program" value={sites} min={1} max={30} onChange={setSites} />
                <PlanningField id="pmo-conditions" label="Qualified conditions per site / week" value={conditionsPerSite} min={5} max={120} onChange={setConditionsPerSite} />
                <PlanningField id="pmo-manual-minutes" label="Minutes spent qualifying each condition today" value={manualMinutes} min={4} max={30} onChange={setManualMinutes} />
                <PlanningField id="pmo-escalation-rate" label="Escalation rate" value={escalationRate} min={5} max={80} suffix="%" onChange={setEscalationRate} />
                <PlanningField id="pmo-coordination-minutes" label="Minutes spent coordinating escalated work today" value={coordinationMinutes} min={8} max={75} onChange={setCoordinationMinutes} />
                <PlanningField id="pmo-guided-coverage" label="Guided-response coverage" value={guidedCoverage} min={0} max={85} suffix="%" onChange={setGuidedCoverage} />
              </div>
              <div className="lm-pmo-metrics">
                <MetricCard label="Qualified conditions / week" value={formatWhole(operationsModel.totalConditions)} />
                <MetricCard label="Baseline coordination hours / week" value={formatDecimal(operationsModel.baselineHours)} />
                <MetricCard label="Reference hours reclaimed / week" value={formatDecimal(operationsModel.reclaimedHours)} />
                <MetricCard label="Reference FTE reclaimed" value={formatDecimal(operationsModel.reclaimedFte)} />
              </div>
              <p className="lm-pmo-calculator__note">
                This model compares today's manual coordination effort with a guided-response reference state
                at the selected coverage level. It is a planning aid, not a customer savings claim.
              </p>
            </article>

            <article className="lm-pmo-calculator">
              <header className="lm-pmo-calculator__head">
                <div>
                  <span className="lm-v2-card-label">Rollout staffing model</span>
                  <h3>Size the active-wave staffing you need before the PMO starts stacking sites.</h3>
                </div>
                <ShieldCheck aria-hidden="true" />
              </header>
              <div className="lm-pmo-calculator__fields">
                <PlanningField id="pmo-waves" label="Rollout waves" value={waves} min={1} max={8} onChange={setWaves} />
                <PlanningField id="pmo-source-systems" label="Source systems per site" value={sourceSystems} min={1} max={10} onChange={setSourceSystems} />
                <PlanningField id="pmo-parallel-run-weeks" label="Parallel-run weeks per wave" value={parallelRunWeeks} min={2} max={12} onChange={setParallelRunWeeks} />
                <PlanningField id="pmo-shift-reviews" label="Shift-handoff reviews per site / week" value={shiftReviews} min={2} max={21} onChange={setShiftReviews} />
              </div>
              <div className="lm-pmo-metrics">
                <MetricCard label="Active sites per wave" value={formatDecimal(staffingModel.activeWaveSites)} />
                <MetricCard label="PMO + governance FTE" value={formatDecimal(staffingModel.pmoFte)} />
                <MetricCard label="OT + data onboarding FTE" value={formatDecimal(staffingModel.otDataFte)} />
                <MetricCard label="Total active-wave FTE" value={formatDecimal(staffingModel.totalFte)} />
              </div>
              <div className="lm-pmo-role-metrics">
                <MetricChip label="Workflow + authority" value={`${formatDecimal(staffingModel.workflowFte)} FTE`} />
                <MetricChip label="Site readiness" value={`${formatDecimal(staffingModel.readinessFte)} FTE`} />
                <MetricChip label="Annual hours reclaimed" value={`${formatWhole(operationsModel.annualHours)} hrs`} />
              </div>
            </article>
          </div>
        </EditorialSection>

        <EditorialSection
          id="rollout-timeline"
          eyebrow="Phase-by-phase rollout"
          title="Keep the phase gates explicit from first pilot to scaled deployment."
        >
          <div className="lm-pmo-phase-tabs" role="tablist" aria-label="Rollout phases">
            {rolloutPhases.map((phase) => (
              <button
                key={phase.id}
                type="button"
                role="tab"
                aria-selected={phase.id === selectedPhase.id}
                className={phase.id === selectedPhase.id ? "is-active" : ""}
                onClick={() => setSelectedPhaseId(phase.id)}
              >
                <strong>{phase.label}</strong>
                <span>{phase.duration}</span>
              </button>
            ))}
          </div>
          <div className="lm-pmo-phase-detail">
            <header>
              <span className="lm-v2-card-label">{selectedPhase.duration}</span>
              <h3>{selectedPhase.title}</h3>
              <p>{selectedPhase.copy}</p>
            </header>
            <div className="lm-v2-columns-3 lm-pmo-phase-columns">
              <article>
                <h3>Key deliverables</h3>
                <ul className="lm-v2-list">
                  {selectedPhase.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article>
                <h3>Workstreams</h3>
                <ul className="lm-v2-list">
                  {selectedPhase.workstreams.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article>
                <h3>Exit gates</h3>
                <ul className="lm-v2-list">
                  {selectedPhase.exitGates.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </EditorialSection>

        <EditorialSection
          id="synapse-parallel-run"
          eyebrow="Last Mile Synapse parallel run"
          title="Run the edge-gateway workstream in parallel until evidence, mappings, and authority are ready."
          intro="The implementation path should earn operator trust in stages instead of assuming the first connected source is ready for cutover."
          tone="dark"
        >
          <div className="lm-pmo-mode-tabs" role="tablist" aria-label="Parallel-run schemas">
            {parallelModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                role="tab"
                aria-selected={mode.id === selectedMode.id}
                className={mode.id === selectedMode.id ? "is-active" : ""}
                onClick={() => setSelectedModeId(mode.id)}
              >
                {mode.label}
              </button>
            ))}
          </div>
          <div className="lm-pmo-schema">
            <header className="lm-pmo-schema__head">
              <div>
                <span className="lm-v2-card-label">Selected schema</span>
                <h3>{selectedMode.title}</h3>
                <p>{selectedMode.goal}</p>
              </div>
              <p>{selectedMode.exitGate}</p>
            </header>
            <div className="lm-pmo-schema__grid">
              <SchemaColumn label="Current stack" items={selectedMode.currentStack} />
              <SchemaColumn label="Last Mile Synapse" items={selectedMode.synapse} />
              <SchemaColumn label="Singularity and SSOM" items={selectedMode.singularity} />
              <SchemaColumn label="Response governance" items={selectedMode.governance} />
            </div>
          </div>
        </EditorialSection>

        <EditorialSection
          eyebrow="Delivery tracks"
          title="Keep the implementation parallel without letting the workstreams drift."
          intro="The PMO should run these tracks in lockstep so later waves inherit a proven pattern instead of a growing exception list."
          tone="grid"
        >
          <div className="lm-pmo-workstreams">
            {workstreams.map(({ label, title, copy, icon: Icon }) => (
              <article key={title}>
                <div className="lm-pmo-workstreams__head">
                  <span>{label}</span>
                  <Icon aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </EditorialSection>

        <NextStep
          title="Move from rollout planning to site execution."
          copy="Bring the first operating issue, the current source systems, and the live measurements that will establish success. The implementation plan should follow the operation, not the reverse."
          label="Discuss your implementation"
          to="/contact?intent=operation"
          secondary={{ label: "Explore the Platform", to: "/platform" }}
        />
      </div>
    </>
  );
}

function HubSummary({
  operationsModel,
  staffingModel,
  phase,
  mode,
}: {
  operationsModel: { reclaimedFte: number; annualHours: number };
  staffingModel: { totalFte: number };
  phase: RolloutPhase;
  mode: ParallelMode;
}) {
  return (
    <aside className="lm-pmo-summary" aria-label="Reference rollout snapshot">
      <article>
        <span>Reference FTE reclaimed</span>
        <strong>{formatDecimal(operationsModel.reclaimedFte)}</strong>
        <p>Weekly coordination capacity reclaimed at the current guided-response assumptions.</p>
      </article>
      <article>
        <span>Active-wave staffing</span>
        <strong>{formatDecimal(staffingModel.totalFte)} FTE</strong>
        <p>Reference staffing load while one rollout wave is active.</p>
      </article>
      <article>
        <span>Current phase gate</span>
        <strong>{phase.label}</strong>
        <p>{phase.duration} · {mode.label}</p>
      </article>
      <p className="lm-pmo-summary__note">
        {formatWhole(operationsModel.annualHours)} reference hours move out of manual coordination when
        guided response is stable enough to scale.
      </p>
    </aside>
  );
}

function PlanningField({
  id,
  label,
  value,
  min,
  max,
  onChange,
  suffix,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  suffix?: string;
}) {
  const setValue = (nextValue: number) => onChange(clamp(nextValue, min, max));

  return (
    <label className="lm-pmo-field" htmlFor={id}>
      <div className="lm-pmo-field__head">
        <span>{label}</span>
        <strong>
          {formatWhole(value)}
          {suffix ? suffix : ""}
        </strong>
      </div>
      <input id={id} type="range" min={min} max={max} value={value} onChange={({ currentTarget }) => setValue(currentTarget.valueAsNumber)} />
      <div className="lm-pmo-field__numeric">
        <input type="number" min={min} max={max} value={value} onChange={({ currentTarget }) => setValue(currentTarget.valueAsNumber)} />
        {suffix ? <span>{suffix}</span> : null}
      </div>
    </label>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="lm-pmo-metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function MetricChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="lm-pmo-chip">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SchemaColumn({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <article>
      <span>{label}</span>
      <ul className="lm-v2-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
