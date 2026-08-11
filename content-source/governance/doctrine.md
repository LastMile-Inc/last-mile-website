---
content_id: GOV-DOCTRINE-001
status: approved
owner: Founder and Product Architecture
last_reviewed: 2026-08-06
claim_maturity: [designed, demonstrated]
depends_on: []
used_by: [all]
---

# Last Mile Product and Content Doctrine

## Category

Last Mile is the **Physical Operations Platform**: an independent operational-accountability layer above existing OT, industrial data, work, facilities, and service ecosystems. It turns fragmented operational evidence into one accountable Condition, coordinates the governed response, and verifies the physical outcome from live return measurements.

The category is not IT service management, generic workflow, dashboarding, data transport, a historian replacement, a control system, or an industrial data lake. Last Mile connects those responsibilities without claiming to replace them.

## Customer problem

Physical operations commonly split one operating condition across incompatible identities, alarm streams, asset hierarchies, work systems, providers, and teams. An alarm may clear, a ticket may close, or a contractor may leave while the physical impairment remains. The missing capability is not another signal or work order; it is accountable continuity from evidence through verified recovery.

## Platform thesis

Last Mile establishes a time-correct evidence chain:

> source -> qualified record -> canonical identity and topology -> accountable Condition -> governed response -> work and authority -> return telemetry -> verified outcome -> recurrence learning

## Product responsibilities

### Infinit-Signal

Consumes configured outputs from MQTT/UNS, Sparkplug, OPC UA, historians, SCADA/BMS/MES, data platforms, files, APIs, and approved customer sources. It preserves source authority and evidence; classifies time, freshness, duplication, replay, and quality; resolves mappings; and creates SSOM-conformant canonical operational records once.

### Singularity / SSOM

SSOM is the open, vendor-neutral semantic contract. Singularity is Last Mile's governed implementation and operational-memory product. It preserves canonical identity, aliases, topology, observations, events, alarms, Conditions, evidence, temporal history, decisions, actions, verified outcomes, provenance, policy evidence, and projections. It provides the durable context required for cross-vendor operations and responsible industrial AI.

### Infinit-Flow

Coordinates condition-to-work-to-verified-outcome response. It owns workflow definitions and runtime state, cases, tasks, approvals, escalation, provider coordination, integration commands, receipts, timers, and governed AUTO/ASSIST execution. It references canonical facts; it does not redefine them.

### Infinit-Control

Presents role-based operational cases, current state, evidence timelines, ownership, work, authority, and verified outcomes. It renders governed projections and events; it is not a second operational truth store or a replacement for deterministic HMI/SIS control.

## Boundary with the existing ecosystem

Existing systems retain their proper responsibilities:

- PLC, DCS, SIS, and control logic retain deterministic process and safety control.
- SCADA, HMI, BMS, and MES retain local monitoring, control, and production functions.
- MQTT brokers and a customer UNS retain transport, topic, session, and distribution responsibilities.
- Historians and industrial data platforms retain their source and storage responsibilities.
- SAP, Maximo, ServiceNow, CMMS, facilities, and provider systems retain their systems-of-record roles.
- Field personnel and customer operating authorities retain physical-work, safety, LOTO, and control authority.

Last Mile consumes and aggregates evidence from these systems, attaches it to one canonical operating context, coordinates the response across them, and proves the outcome.

## Truth and storage rules

1. Data is accepted once as an SSOM-conformant canonical operational record.
2. Singularity is the canonical journal and operational-memory authority.
3. Current-state stores, caches, indexes, and UI models are projections with source record ID, version, freshness, and lineage.
4. Infinit-Flow owns private workflow state; Infinit-Control owns private view configuration; neither mutates canonical operational facts.
5. Raw high-volume evidence may live in object storage, provided its immutable reference and integrity evidence remain attached.
6. Corrections are append-preserved through supersession; destructive rewriting of operational history is prohibited.

## Outcome doctrine

Work status is not physical state. Recovery may be established only when the configured result contract is satisfied by current, valid return measurements for the required stability period. Required result states are:

- **Recovery established**: all required inputs are valid and all criteria pass for the complete stability window.
- **Partial recovery**: some criteria pass, but at least one required criterion or duration remains unsatisfied.
- **Failed intervention**: work is complete but core operating criteria remain unsatisfied.
- **Recurrence detected**: the same qualified impairment returns during the configured recurrence window after recovery.
- **Insufficient return data**: at least one required result input is missing, stale, quarantined, unresolved, or below quality threshold.

Ticket closure, work-order closure, command receipt, agent completion, or alarm clearance must never override these rules.

## Automation doctrine

- **AUTO**: Last Mile executes an explicitly authorized digital step automatically.
- **ASSIST**: Last Mile assembles evidence, proposes a response, or prepares work; an operator decides or authorizes the next step.
- **HUMAN AUTHORITY**: customer policy retains authority for physical work, process-control changes, safety, LOTO, or other governed action.

Agents and rules must declare authority boundaries, evidence inputs, allowed actions, rollback, audit, and stop conditions. Last Mile may automate a digital response without claiming permission to operate physical equipment.

## AI doctrine

Last Mile is AI-native where governed semantic context, evidence, policy, and outcome history improve detection, assistance, planning, and learning. Public content must distinguish deterministic rules, statistical models, generative assistance, and autonomous agents. “AI-native” never means unreviewed model output can become operational truth or bypass customer authority.

## Market and vendor doctrine

Last Mile is vendor-agnostic. Vendor names illustrate the ecosystems customers use; they do not imply certification, partnership, or validated integration unless a claim record says so. ServiceNow has no privileged role. Last Mile is not dependent on proprietary hardware or on one automation, cloud, broker, work-management, or industrial-data vendor.

## Public narrative

The primary public promise is:

> One accountable operating condition—from first evidence to verified physical outcome.

The supporting category statement is:

> Last Mile is the independent operational-accountability layer across existing OT, data, work, and service ecosystems.
