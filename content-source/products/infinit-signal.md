---
content_id: PROD-SIGNAL-001
status: approved
owner: Infinit-Signal Product and Architecture
last_reviewed: 2026-08-13
claim_maturity: [designed, reference_architecture]
depends_on: [GOV-DOCTRINE-001, GOV-VOCAB-001, PROD-SINGULARITY-001]
used_by: [/platform, /infinit-signal, /ecosystem, use-cases]
---

# Infinit-Signal Product Contract

## Canonical statement

Infinit-Signal is Last Mile's governed operational-evidence intake and qualification product. It consumes configured outputs from existing industrial systems, preserves original evidence and source authority, classifies time and data quality, resolves source mappings, and creates SSOM-conformant canonical operational records once for acceptance into Singularity.

## Customer problem

Industrial information arrives through brokers, UNS structures, SCADA/BMS/MES platforms, historians, gateways, APIs, files, and service systems with different identities, timestamps, quality conventions, session behavior, and replay characteristics. Connectivity alone does not determine which record is current, authoritative, duplicated, stale, replayed, unresolved, or fit to influence an operating decision.

## Speed, power, and scale strategy

Infinit-Signal is purpose-built to meet an existing production ecosystem where it is. Implementation begins by understanding the customer's source architecture, preserving strong source meaning, and selecting the smallest useful customer-approved path into Last Mile. Configured MQTT/UNS subscriptions, industrial platforms, controls, historians, APIs, and governed files can participate without requiring the customer to rename or replace the systems that already run the operation.

The UNS remains a live communication and discovery fabric. JSON, repository-managed files, and spreadsheets may separately provide governed schemas, mappings, crosswalks, and configuration. These inputs help Infinit-Signal understand the environment, but they are not described as the UNS itself.

Infinit-Signal is designed for priority-aware 24x7 ingestion, isolated backpressure, controlled store-and-forward, and recovery by declared workload class. Performance and stress testing use explicit sustained-rate, burst-rate, payload-size, source-concurrency, recovery, and store-and-forward profiles. Public language may describe that ongoing testing discipline and the designed scale controls. It must not imply a universal measured rate, production uptime, or production-grade scale without approved evidence.

## Owns

- Source Platform Profiles and connection configuration.
- Boundary-local software runtime where required; no proprietary Last Mile hardware.
- MQTT, Sparkplug, OPC UA, historian, API, file, and platform adapter contracts.
- Subscription, acquisition, source timestamp, receive timestamp, sequence, and session capture.
- Source quality preservation, freshness, deduplication, retained-message handling, replay classification, quarantine, and dead-letter behavior.
- Mapping-package registry, versioning, tests, signing, promotion, rollback, and drift detection.
- Creation of SSOM-conformant CORs with source evidence and lineage.
- Secure delivery to Singularity and optional governed customer destinations.
- Source/runtime health and ingestion SLO telemetry.

## Does not own

- Broker, customer UNS, PLC, SCADA, BMS, MES, historian, or source-system operation.
- Canonical operational-memory storage, canonical asset succession, Condition lifecycle, or verified outcomes; Singularity owns those durable responsibilities.
- Workflow runtime, tasks, approvals, or work-system state; Infinit-Flow owns them.
- Operator views; Infinit-Control owns them.
- Deterministic control, SIS logic, LOTO, field work, or physical operating authority.
- Contribution consent or cross-customer learning policy by implication; those are explicit Singularity/Data Trust decisions.

## Supported source families

| Family | Representative mechanisms | Required preservation |
|---|---|---|
| MQTT / UNS | MQTT 3.1.1/5.0, configured topic subscriptions | broker identity, topic, QoS, retain flag, packet/session context, publisher/source identity where available |
| Sparkplug | Sparkplug 3.0 topic/payload/session semantics | group, edge node, device, metric alias/name, birth/death state, sequence, timestamp, quality |
| OPC UA | Client/server subscriptions, events, history, Companion Specification models | endpoint, namespace URI, NodeId, browse path, source/server time, status code, engineering metadata, model identity |
| SCADA/BMS/MES | Ignition, building-management, production, supervisory outputs | source tag/path, source system, site scope, quality and timestamp semantics |
| Historians/data platforms | PI/AVEVA, industrial data services, export APIs | point identity, interpolation/exception behavior, original time, revision/backfill status |
| Enterprise/service systems | Customer-selected CMMS, EAM, and provider APIs | external record identity, lifecycle state, source authority, update time |
| Files/batch | CSV, JSON, Parquet, governed object drops | manifest, schema, checksum, time range, producer, replay/backfill classification |

Representative products do not imply validated integrations.

## UNS and Sparkplug contract

The customer UNS remains the real-time communication and discovery fabric. Infinit-Signal:

1. subscribes only to configured sources under least-privilege broker ACLs;
2. preserves the original topic as a source address, never as automatic canonical asset identity;
3. understands retained messages, clean/session expiry behavior, QoS duplication possibility, reconnects, and store-and-forward replay;
4. when Sparkplug is present, processes NBIRTH/DBIRTH/NDEATH/DDEATH, sequence, aliases, and metric timestamps according to the configured profile;
5. distinguishes publisher/session state from physical-equipment state;
6. preserves payload and transport quality without treating publication as accepted operational truth;
7. maps topic, group, node, device, and metric identities through a versioned source-to-SSOM crosswalk;
8. quarantines unresolved, stale, structurally invalid, or policy-disallowed records;
9. can optionally republish governed outputs only through a separately authorized destination contract; and
10. maintains separate MQTT/Sparkplug compatibility and SSOM conformance evidence.

## Record acceptance pipeline

```text
source -> acquire -> authenticate -> decode -> time-align -> classify live/replay
       -> deduplicate -> validate quality -> resolve mapping -> create COR
       -> Singularity acceptance journal -> governed events/projections
```

### Minimum COR envelope

- tenant, source, site, and connection profile IDs;
- canonical asset candidate/crosswalk and source identifiers;
- record type, SSOM version, profile, and schema version;
- event/source/receive/accept times and time-quality evidence;
- value, unit, quantity kind, source quality, normalized quality, and conversion lineage;
- dedupe key, replay class, mapping package, transform version, and evidence reference;
- policy, classification, and destination eligibility;
- correlation/causation IDs and integrity/checksum evidence.

## Quality states

| State | Meaning | Downstream behavior |
|---|---|---|
| Accepted | Schema, identity, time, quality, and policy meet contract | May enter canonical journal and decision logic. |
| Warning | Accepted with explicit non-blocking qualification | Visible to consumers; policy may prevent decision use. |
| Quarantined | Preserved but not allowed to influence canonical state | Routed for remediation and replay. |
| Rejected | Invalid, unauthorized, or unprocessable | Evidence and reason retained; no canonical effect. |
| Duplicate | Same governed identity/dedupe window | Counted and evidenced; not double-applied. |
| Replay/backfill | Valid historical or recovered data | Event-time history may update; live decisions follow replay policy. |

## Designed SLO classes

These are architecture targets, not implemented performance claims:

- P0 critical events: no intentional sampling; bounded end-to-end acceptance objective declared per deployment.
- P1 operational state: preserve complete state changes subject to source contract.
- P2 standard telemetry: controlled batching and backpressure allowed.
- P3 high-rate/backfill: isolate from P0/P1 and schedule within capacity policy.
- No downstream BigQuery, analytics, or learning delay may block current customer operational flow.
- Every deployment declares sustained rate, burst rate, payload size, concurrent sources, store-and-forward window, and recovery target.

## Public copy kernel

**Heading:** One fast path from your plant floor into Last Mile.

**Body:** Infinit-Signal connects to the operational sources you already run, preserves where each reading came from, checks its time and quality, and prepares it for Singularity. It is designed to isolate priority traffic, absorb bursts, and recover safely without making the rest of the plant wait.

**Boundary:** The UNS remains the customer's communication and discovery fabric. A topic path remains a source address. It does not automatically become the identity of the asset.

## Prohibited implications

- Last Mile owns or replaces the customer's UNS.
- MQTT and UNS are synonymous.
- Sparkplug compatibility establishes SSOM conformance.
- every named source is a validated connector.
- publication equals truth.
- a broker is the permanent historical record.
- Infinit-Signal directly controls equipment.
