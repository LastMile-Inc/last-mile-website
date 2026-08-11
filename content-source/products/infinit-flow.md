---
content_id: PROD-FLOW-001
status: approved
owner: Infinit-Flow Product and Architecture
last_reviewed: 2026-08-06
claim_maturity: [designed, reference_architecture]
depends_on: [GOV-DOCTRINE-001, PROD-SINGULARITY-001]
used_by: [/platform, /infinit-flow, use-cases]
---

# Infinit-Flow Product Contract

## Canonical statement

Infinit-Flow is Last Mile's durable, asset-aware operational orchestration product. It turns an accountable Condition into coordinated work, approvals, escalation, provider action, evidence, and return-measurement verification while preserving customer authority and canonical references.

## Owns

- Visual workflow authoring, versioned workflow DSL, compilation, validation, simulation, publishing, rollback, and retirement.
- Asset/type/capability-aware node catalog and binding eligibility.
- Durable workflow runtime, timers, retries, compensation, idempotency, and correlation.
- Cases, human tasks, queues, acknowledgements, escalation, approvals, handoffs, and provider coordination.
- Commands/requests to external systems, receipts, and reconciliation.
- AUTO/ASSIST/HUMAN AUTHORITY policy enforcement.
- Outcome-check orchestration and the request to Singularity to evaluate the result contract.

## Does not own

- Raw OT ingestion or source qualification.
- Canonical assets, Conditions, measurements, or Outcomes.
- Deterministic control or safety logic.
- Customer work-system records of authority; it references and reconciles them.
- Operator dashboard truth; Infinit-Control presents governed runtime projections.

## Authoring model

Users begin with an object type and operational intent. The backend returns only assets compatible with tenant, site, role, SSOM class/profile, required capability, quality, and freshness. The canvas exposes simple configuration first and expert semantic/lineage details only when needed.

Node families:

- Condition/event triggers.
- Evidence, quality, freshness, topology, and context gates.
- Decisions, rules, model recommendations, and authority gates.
- Case, task, acknowledgement, approval, escalation, and timer nodes.
- Work-system, provider, messaging, and customer-integration actions.
- Return-measurement, stability, recurrence, and Outcome checks.
- Audit, stop, compensate, and exception nodes.

## Workflow definition requirements

Every published version declares:

- workflow and version ID;
- compatible SSOM/profile and object-pack versions;
- trigger Condition/event types and eligibility;
- asset/topology scope;
- required evidence, quality, freshness, and uncertainty rules;
- authority mode and named approval classes;
- external commands, idempotency keys, receipts, timeouts, and compensation;
- result contract and recurrence policy;
- observability, retention, SLO, rollback, and simulation evidence.

## Runtime principle

Use a durable workflow engine such as Temporal for long-running state, timers, retries, and human work. Pub/Sub transports canonical events; PostgreSQL stores product-private configuration and work state; Singularity remains the canonical operational authority. Runtime state must reference source Condition, Asset, and evidence IDs.

## Closure rule

Infinit-Flow may close a task or external work order independently of the operating result. The case cannot be presented as physically recovered until Singularity evaluates current valid return measurements and publishes `recovery_established`. Failed, partial, recurrent, and insufficient-data results route to explicit workflow branches.

## Public copy kernel

**Heading:** Coordinate the response without losing the operating condition.

**Body:** Infinit-Flow creates one durable case across operators, maintenance, work systems, providers, approvals, and evidence. It can execute authorized digital steps automatically, prepare the next best response for an operator, and keep physical authority where customer policy requires it. Work completion starts verification; it does not end the operating story.

## Prohibited implications

- Drag-and-drop convenience replaces governed compilation and validation.
- workflows can bind to arbitrary incompatible assets.
- a Last Mile workflow supersedes SIS, control, LOTO, or operating procedure authority.
- external work completion proves recovery.
- an agent may execute an unbounded action.
