export type ProtocolKey =
  | "mqtt-sparkplug"
  | "opc-ua"
  | "historian-sql"
  | "rest-webhook"
  | "file-batch";

export type BoundaryKey = "site-lan" | "dmz-broker" | "outbound-relay";

export type ObjectiveKey =
  | "evidence-only"
  | "response-orchestration"
  | "human-authorized-action";

type ProductScoreMap = {
  signal: number;
  singularity: number;
  flow: number;
  control: number;
};

export const productMeta = [
  {
    key: "signal",
    label: "Infinit-Signal",
    summary: "Source acquisition, evidence preservation, and telemetry qualification.",
  },
  {
    key: "singularity",
    label: "Singularity",
    summary: "Canonical identity, semantics, topology, and operational memory.",
  },
  {
    key: "flow",
    label: "Infinit-Flow",
    summary: "Response coordination, approvals, and governed enterprise-system action.",
  },
  {
    key: "control",
    label: "Infinit-Control",
    summary: "Role-based visibility, command context, and verified outcome views.",
  },
] as const;

export const protocolProfiles: Record<
  ProtocolKey,
  {
    label: string;
    shortLabel: string;
    summary: string;
    transport: string;
    evidence: string;
    recommendation: string;
    baseScores: ProductScoreMap;
  }
> = {
  "mqtt-sparkplug": {
    label: "MQTT + Sparkplug B",
    shortLabel: "MQTT / Sparkplug",
    summary:
      "Best fit when the customer already exposes topic-based operational evidence through a governed UNS or broker boundary.",
    transport:
      "Prefer customer-owned broker namespaces and least-privilege subscriptions at the source boundary.",
    evidence:
      "Good fit for event, state, and measurement streams where freshness and retained-message handling matter.",
    recommendation:
      "Use qualified subscriptions at the site boundary, preserve topic provenance, and keep the customer's namespace authoritative.",
    baseScores: { signal: 94, singularity: 88, flow: 74, control: 60 },
  },
  "opc-ua": {
    label: "OPC UA",
    shortLabel: "OPC UA",
    summary:
      "Strong fit where structured source semantics and companion-model context should be preserved before cross-system mapping.",
    transport:
      "Place collection close to the OT zone and publish only the required variables, events, and metadata outward.",
    evidence:
      "Good fit for typed equipment data, alarms, status, and source information-model context.",
    recommendation:
      "Preserve OPC UA source semantics locally, map them through governed profiles, and avoid flattening authority at the server boundary.",
    baseScores: { signal: 90, singularity: 86, flow: 66, control: 54 },
  },
  "historian-sql": {
    label: "Historian / SQL extracts",
    shortLabel: "Historian / SQL",
    summary:
      "Useful when the source of truth already lands in historians or reporting stores and the goal is governed replay into the platform.",
    transport:
      "Prefer boundary-local queries, incremental windows, and explicit freshness metadata for each extract cycle.",
    evidence:
      "Good fit for historical replay, context enrichment, and governed evidence retention with lower immediacy.",
    recommendation:
      "Use for canonical backfill, cross-checking, and historical context rather than pretending it is a zero-latency control path.",
    baseScores: { signal: 82, singularity: 84, flow: 58, control: 46 },
  },
  "rest-webhook": {
    label: "REST API / webhooks",
    shortLabel: "REST / webhooks",
    summary:
      "Effective for enterprise-system events, work-state changes, and approved digital response handoffs.",
    transport:
      "Use signed outbound delivery, workload identity, and bounded retries between enterprise boundaries.",
    evidence:
      "Good fit for digital work events, case state, approvals, and cross-platform orchestration evidence.",
    recommendation:
      "Use for enterprise response signals and receipts; do not market it as plant-floor protocol replacement.",
    baseScores: { signal: 72, singularity: 78, flow: 84, control: 68 },
  },
  "file-batch": {
    label: "File drops / batch exports",
    shortLabel: "File / batch",
    summary:
      "Lowest-fidelity option, but still useful for scheduled evidence exchange where no live interface is approved.",
    transport:
      "Prefer signed delivery, explicit file manifests, hash validation, and replay classification.",
    evidence:
      "Good fit for periodic reports, offline snapshots, and constrained onboarding where real-time access is unavailable.",
    recommendation:
      "Treat as scheduled evidence transfer with explicit delay and replay handling, not as a live operating signal path.",
    baseScores: { signal: 56, singularity: 66, flow: 48, control: 34 },
  },
};

export const boundaryProfiles: Record<
  BoundaryKey,
  {
    label: string;
    summary: string;
    adjustments: ProductScoreMap;
  }
> = {
  "site-lan": {
    label: "Boundary-local collector",
    summary:
      "Collection remains in the site or OT-adjacent zone and publishes only the approved evidence outward.",
    adjustments: { signal: 4, singularity: 2, flow: -2, control: -4 },
  },
  "dmz-broker": {
    label: "DMZ / broker handoff",
    summary:
      "A broker, gateway, or relay boundary separates site systems from platform ingestion while preserving identity and auditability.",
    adjustments: { signal: 2, singularity: 4, flow: 2, control: 0 },
  },
  "outbound-relay": {
    label: "Outbound-only relay",
    summary:
      "The site publishes outbound through an explicitly approved relay path with no implicit inbound authority.",
    adjustments: { signal: 1, singularity: 3, flow: 4, control: 3 },
  },
};

export const objectiveProfiles: Record<
  ObjectiveKey,
  {
    label: string;
    summary: string;
    adjustments: ProductScoreMap;
  }
> = {
  "evidence-only": {
    label: "Evidence capture",
    summary:
      "Prioritize trustworthy source evidence, freshness, and provenance without assuming downstream response automation.",
    adjustments: { signal: 5, singularity: 5, flow: -8, control: -6 },
  },
  "response-orchestration": {
    label: "Response orchestration",
    summary:
      "Prioritize qualified source evidence that can drive cases, approvals, work, and verified return checks.",
    adjustments: { signal: 0, singularity: 2, flow: 6, control: 4 },
  },
  "human-authorized-action": {
    label: "Human-authorized action",
    summary:
      "Prioritize explicit authority boundaries and verified response coordination while keeping physical action under customer policy.",
    adjustments: { signal: -2, singularity: 2, flow: 8, control: 8 },
  },
};

export const zeroTrustViews = [
  {
    key: "edge",
    label: "Site boundary",
    title: "Edge acquisition stays inside the approved trust boundary.",
    intro:
      "The collection path sits near the OT zone, reads only the approved evidence, and never turns network adjacency into control authority.",
    zones: [
      {
        label: "Zone 01",
        title: "Customer OT + source systems",
        bullets: [
          "PLC, SCADA, BMS, historian, or UNS stays authoritative",
          "Customer-managed credentials and sessions",
          "No Last Mile ownership claim over namespace or control fabric",
        ],
      },
      {
        label: "Zone 02",
        title: "Boundary-local collector",
        bullets: [
          "Least-privilege subscriptions",
          "Certificate rotation and mapping audit",
          "Replay, duplication, and freshness classification",
        ],
      },
      {
        label: "Zone 03",
        title: "Outbound relay",
        bullets: [
          "Approved DMZ or relay path",
          "Outbound-oriented delivery where required",
          "No implicit inbound plant authority",
        ],
      },
    ],
    controls: [
      "Source identity stays separate from platform identity.",
      "Mapping changes are auditable and revocable.",
      "Loss of cloud path cannot imply a healthy operating state.",
    ],
    authorityNote:
      "Physical control authority remains with customer systems and policy at the site boundary.",
  },
  {
    key: "transport",
    label: "Encrypted transport",
    title: "Transport security is explicit, scoped, and rotated.",
    intro:
      "Encryption covers the relay path, service identity, and storage boundaries without assuming the OT environment can absorb generic enterprise controls unchanged.",
    zones: [
      {
        label: "Layer 01",
        title: "Transport channel",
        bullets: [
          "TLS-protected publish or API delivery",
          "Mutual identity where the source path permits it",
          "Bounded retries with evidence of failures",
        ],
      },
      {
        label: "Layer 02",
        title: "Platform runtime",
        bullets: [
          "Tenant-scoped workload identity",
          "Encrypted secrets and policy checks",
          "Service-to-service access only by explicit grant",
        ],
      },
      {
        label: "Layer 03",
        title: "Storage + audit",
        bullets: [
          "Encrypted data at rest",
          "Traceable connection and mapping changes",
          "Separation of raw evidence, current state, and history",
        ],
      },
    ],
    controls: [
      "No connection receives implicit trust because it is already on the network.",
      "Secrets, mappings, and tokens can be rotated without re-architecting the signal path.",
      "Transport errors remain visible instead of silently degrading evidence quality.",
    ],
    authorityNote:
      "Encrypted transport protects the path; it does not expand who is allowed to command a physical process.",
  },
  {
    key: "response",
    label: "Governed response",
    title: "Digital response can automate receipts and coordination without hiding human authority.",
    intro:
      "The operating response may create cases, tasks, and approved digital actions automatically, while consequential physical work and control changes remain explicit.",
    zones: [
      {
        label: "Step 01",
        title: "Qualified condition",
        bullets: [
          "Signal and freshness checks complete",
          "Canonical identity and topology resolved",
          "Condition is ready for policy evaluation",
        ],
      },
      {
        label: "Step 02",
        title: "Governed flow",
        bullets: [
          "Approvals, escalation, and work coordination",
          "Idempotent enterprise-system actions",
          "Receipts and timers bound to the active response",
        ],
      },
      {
        label: "Step 03",
        title: "Verified return",
        bullets: [
          "Return telemetry proves recovery",
          "Work completion alone cannot prove outcome",
          "Recurrence remains visible after closure",
        ],
      },
    ],
    controls: [
      "Human authority remains explicit for consequential physical action.",
      "Enterprise-system automation is bounded, auditable, and revocable.",
      "No-valid-data states prevent a healthy or recovered presentation.",
    ],
    authorityNote:
      "Customer policy decides what may execute automatically, what requires assistive preparation, and what must stay human-authorized.",
  },
] as const;

export const complianceMatrices = [
  {
    key: "soc2",
    label: "SOC 2",
    filename:
      "/downloads/architect-reference/last-mile-soc-2-reference-matrix.csv",
    description:
      "Reference mapping for Security and Availability review conversations.",
    controls: [
      {
        control: "CC6.1 Logical access",
        design: "Tenant-scoped workload identity, least-privilege service access, and explicit operator roles.",
        evidence: "Identity policy, service bindings, and access review records.",
      },
      {
        control: "CC6.6 Logical access removal",
        design: "Revocable credentials, certificate rotation, and source-specific connection grants.",
        evidence: "Rotation records and disabled access audit trail.",
      },
      {
        control: "CC7.2 Change monitoring",
        design: "Connection, mapping, and policy changes are logged with actor, time, and target.",
        evidence: "Audit events for configuration changes and approvals.",
      },
      {
        control: "A1.2 Availability commitments",
        design: "Boundary-local acquisition, backpressure isolation, and explicit degraded-state handling.",
        evidence: "Runbooks, replay handling, and resilience posture notes.",
      },
    ],
  },
  {
    key: "iso27001",
    label: "ISO/IEC 27001",
    filename:
      "/downloads/architect-reference/last-mile-iso-27001-reference-matrix.csv",
    description:
      "Reference mapping for ISO/IEC 27001:2022 control-family review.",
    controls: [
      {
        control: "5.15 Access control",
        design: "Access is granted per tenant, role, service identity, and approved operating scope.",
        evidence: "Role design, service identity policy, and boundary approval records.",
      },
      {
        control: "5.17 Authentication information",
        design: "Secrets and certificates are rotated and scoped to the specific source or service path.",
        evidence: "Credential inventory and rotation records.",
      },
      {
        control: "8.15 Logging",
        design: "Connection changes, policy decisions, and workflow actions emit auditable events.",
        evidence: "Application audit trail and action receipts.",
      },
      {
        control: "8.24 Use of cryptography",
        design: "Encryption protects transport and storage boundaries with explicit key-management ownership.",
        evidence: "Transport posture and storage-encryption configuration.",
      },
    ],
  },
  {
    key: "iec62443",
    label: "IEC 62443",
    filename:
      "/downloads/architect-reference/last-mile-iec-62443-reference-matrix.csv",
    description:
      "Reference mapping for OT-aware zone, conduit, identity, and integrity review.",
    controls: [
      {
        control: "SR 1.1 Human user identification and authentication",
        design: "Operator and administrator actions require explicit authenticated identity and role context.",
        evidence: "User-role mapping and audit records for privileged actions.",
      },
      {
        control: "SR 1.2 Software process and device identification",
        design: "Collectors, relays, and services use scoped machine identity instead of shared trust.",
        evidence: "Service identity configuration and certificate assignment.",
      },
      {
        control: "SR 2.1 Authorization enforcement",
        design: "Approved sources, actions, and targets are policy-bound and revocable.",
        evidence: "Connection allowlists, policy records, and blocked-action logging.",
      },
      {
        control: "SR 3.1 Communication integrity",
        design: "Encrypted conduits, signed delivery where appropriate, and replay classification preserve transport integrity.",
        evidence: "TLS posture, relay configuration, and duplicate/replay handling.",
      },
    ],
  },
] as const;
