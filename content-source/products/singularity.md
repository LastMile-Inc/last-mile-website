---
content_id: PROD-SINGULARITY-001
status: approved
owner: Singularity and SSOM Architecture
last_reviewed: 2026-08-06
claim_maturity: [designed, reference_architecture]
depends_on: [GOV-DOCTRINE-001, GOV-VOCAB-001]
used_by: [/platform, /singularity, /infinit-signal, /ecosystem, use-cases, concepts]
---

# Singularity / SSOM Product Contract

## Canonical statement

Singularity is Last Mile's governed operational-memory and OT world-model product. SSOM, the Standardized Semantic Object Model, is the open vendor-neutral contract inside it. Singularity accepts qualified SSOM-conformant records, resolves canonical identity and topology, preserves time-correct evidence and history, maintains accountable Conditions and verified Outcomes, and serves governed current-state and historical projections to the rest of the platform.

## Why both names exist

- **SSOM** defines portable operational meaning: object types, identities, relationships, temporal semantics, quality, evidence, provenance, conformance, and profiles.
- **Singularity** supplies the Last Mile runtime: journals, registries, identity resolution, topology services, condition/outcome services, stores, APIs, projections, policy, administration, Data Trust, and learning.

SSOM can remain open and portable without exposing Last Mile's proprietary SaaS control plane, workflow runtime, user experience, or learned operational models.

## Owns

- Canonical asset identity, external identifiers, aliases, succession, merge/split, and validity periods.
- Many-to-many and time-varying topology: physical, functional, process, control, location, dependency, service, and work relationships.
- Append-preserved observations, events, alarms, state, evidence, corrections, and supersession.
- Accountable Condition lifecycle and impact scope.
- Outcome contract, return-measurement evaluation, verification, invalidation, and recurrence.
- Operational context, quality, temporal integrity, provenance, evidence, and policy evidence.
- Current-state projections, semantic APIs/events, conformance, replay, and forensic reconstruction.
- Governed Data Trust, privacy transformation, consent, cross-site learning, and customer-isolated versus aggregate models.

## Does not own

- Source connections, broker sessions, payload decoding, and source qualification before COR creation; Infinit-Signal owns them.
- Workflow/task/approval runtime; Infinit-Flow owns it.
- View and widget configuration; Infinit-Control owns it.
- SaaS commercial, billing, identity-provider, support-entitlement, or deployment configuration; the Platform Domain owns it.
- Physical control or safety authority.

## Core semantic objects

| Object | Required meaning |
|---|---|
| Asset | Canonical operational identity with type, lifecycle, external identifiers, and validity. |
| Relationship | Typed, directed or symmetric relationship with time validity and provenance. |
| Observation | Measured or asserted value with time, unit, quality, source, and lineage. |
| Event | Time-bound occurrence with type, context, evidence, and source authority. |
| Alarm | Source alarm representation; not automatically an accountable Condition. |
| Condition | Qualified operating impairment/state with severity, confidence, evidence, impact, owner eligibility, and lifecycle. |
| Decision/Recommendation | Governed reasoning output with evidence, authority, policy, and model/rule identity. |
| Action | Authorized digital or recorded physical action with actor, command/request, receipt, and evidence. |
| Outcome | Observed or verified result against an explicit result contract. |
| Evidence | Immutable or integrity-protected reference to source, transformation, work, media, or return telemetry. |

## Condition lifecycle

`detected -> qualified -> active -> acknowledged -> mitigated/monitoring -> resolved | recurred | invalidated`

Condition changes are append-preserved. Alarm clearance may update evidence but does not independently resolve a Condition.

## Outcome lifecycle

`awaiting_return_data -> partial_recovery | failed_intervention | recovery_established -> monitoring -> recurrence_detected | closed`

Outcome evaluation requires explicit inputs, bands, freshness, quality, stability duration, and recurrence window. Work-system status is contextual evidence only.

## Storage and serving model

| Plane | Recommended GCP role |
|---|---|
| Canonical event intake | Pub/Sub with versioned SSOM envelopes |
| Validation/semantic services | Cloud Run; Dataflow/Beam when sustained scale or event-time complexity requires it |
| Current state and registries | PostgreSQL/Cloud SQL or AlloyDB, selected through measured load tests |
| Historical semantic journal | BigQuery, append-oriented and partitioned by event/accept time |
| Evidence payloads | Cloud Storage with immutable references, checksums, retention, and legal hold policy |
| Search/graph projections | Controlled projection service; technology selected by query evidence, never a second truth authority |

## Projection rule

Every projection preserves canonical record/asset ID, SSOM/profile version, projection version, source event time, freshness time, quality state, and evidence/lineage reference. A projection may be rebuilt entirely from canonical history and configuration.

## UNS boundary

UNS distributes current information. Singularity/SSOM defines what that information means over time. UNS topic and Sparkplug identifiers are retained as scoped external identities; they do not automatically become canonical identity. Broker session, retained-message, QoS, and birth/death semantics remain runtime evidence mapped by Infinit-Signal.

## Data Trust and learning

- Customer operations never waits on cross-site learning.
- SSOM conformance does not imply consent to contribute.
- Contribution requires explicit tenant/purpose policy, minimization, transformation, provenance, and revocation/retention rules.
- Aggregate learning may create models, benchmarks, and recommendations; it cannot rewrite customer canonical facts.
- Every model output carries model/version, inputs, confidence, applicability scope, and policy evidence.

## Public copy kernel

**Heading:** Distribution is not the same as meaning.

**Body:** Singularity gives every asset, condition, decision, action, and result a durable operational identity. Its SSOM contract preserves the source, time, quality, evidence, and relationships needed to understand what happened—even when the data crossed brokers, plants, work systems, and providers.

## Prohibited implications

- SSOM is proprietary to Last Mile.
- Singularity is merely a BigQuery warehouse.
- a UNS hierarchy supplies the complete canonical topology.
- a source alarm automatically becomes a Condition.
- a closed work order becomes a verified Outcome.
- cross-customer learning occurs without consent.
- AI-generated context is accepted as fact without evidence and policy.
