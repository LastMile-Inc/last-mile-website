---
content_id: PROD-CONTROL-001
status: approved
owner: Infinit-Control Product and Architecture
last_reviewed: 2026-08-06
claim_maturity: [designed, reference_architecture]
depends_on: [GOV-DOCTRINE-001, PROD-SINGULARITY-001, PROD-FLOW-001]
used_by: [/platform, /infinit-control, use-cases]
---

# Infinit-Control Product Contract

## Canonical statement

Infinit-Control is Last Mile's role-based operating surface. It presents one accountable case with live state, canonical topology, evidence, ownership, work, authority, return measurements, and verified outcomes through governed projections and real-time events.

## Owns

- Versioned views, layouts, widgets, templates, publishing, sharing, and rollback.
- Role/team/location surfaces and experience modes.
- Widget SDK and controlled bindings to SSOM, Flow, quality, source-health, evidence, media, and platform operations APIs.
- Real-time event updates, freshness display, reconciliation, and degraded-data behavior.
- Operational case, evidence timeline, topology, map, media, work, and outcome presentation.
- Accessibility, audit, view governance, and display-performance SLOs.

## Does not own

- Canonical assets, telemetry, Conditions, evidence, or Outcomes.
- Workflow execution or work state.
- Raw historian queries from browser clients.
- HMI/SIS deterministic control or casual direct equipment commands.
- Generic BI exploration as its primary purpose.

## Required operating-state pattern

Every material measurement displays:

1. canonical measurement name;
2. current numerical value and engineering unit;
3. approved/reference band or expected discrete state;
4. visible state icon and text, not color alone;
5. trend direction and rate when operationally meaningful;
6. freshness/timestamp when required for trust;
7. reference-basis disclosure for configured bands.

Status words such as stable, high, low, normal, declining, or near zero are never standalone analog values.

## Binding types

- canonical Asset, asset group, location, or topology scope;
- Condition type, severity, lifecycle, owner, and impact scope;
- Observation/metric with unit, band, quality, and freshness;
- evidence and replay package;
- Flow case, task, approval, work-system record, provider dispatch, or timer;
- Outcome contract, measurement window, and recurrence state;
- source/runtime health and mapping/quarantine state;
- authorized media/map reference.

## Degraded-data behavior

If a required input is missing, stale, quarantined, unresolved, or below quality threshold, the UI states **No valid data**, displays the reason and last valid time, and prevents a healthy or recovered result. Last known value may be shown only as explicitly stale evidence.

## Experience modes

- Operator case: one condition, current state, owner, response, evidence, and next action.
- Facility/site: cross-system conditions and capacity/protection view.
- Reliability/engineering: topology, recurrence, history, evidence, and result patterns.
- Executive/portfolio: aggregated operating outcomes and risk with drill-through, not raw alarm count.
- Platform administration: source, mapping, quality, workflow, and product health kept distinct from customer operating truth.

## Public copy kernel

**Heading:** See the operating condition, the response, and the proof in one place.

**Body:** Infinit-Control gives each role the live state and evidence it needs without forcing operators to reconstruct one event across alarm consoles, work orders, provider updates, and spreadsheets. It keeps ownership visible and distinguishes work completion from physical recovery.

## Prohibited implications

- the screen itself is a system of record for operational truth.
- color alone communicates state.
- a green ticket status can override failed telemetry.
- Infinit-Control replaces SCADA HMI or SIS.
- user-configured widgets may bypass tenant, role, or source authority.
