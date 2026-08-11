---
content_id: GOV-VOCAB-001
status: approved
owner: Product Architecture
last_reviewed: 2026-08-06
claim_maturity: [designed]
depends_on: [GOV-DOCTRINE-001]
used_by: [all]
---

# Canonical Vocabulary

## Required names

| Term | Required use |
|---|---|
| **Last Mile Platform** | The complete cloud-native SaaS platform and four-product system. |
| **Physical Operations Platform** | Primary category descriptor. Capitalize when used as the named category. |
| **Infinit-Signal** | Operational evidence acquisition, qualification, normalization, mapping, and canonical-record production. Never Infinit-Code. |
| **Singularity** | Last Mile's operational-memory and OT world-model product implementing SSOM. |
| **SSOM** | Standardized Semantic Object Model: open, vendor-neutral semantic and evidence contract. Spell out on first technical use. |
| **Singularity / SSOM** | Acceptable compact label in diagrams where product and contract must appear together. In prose, explain the distinction. |
| **Infinit-Flow** | Condition-to-work-to-verified-outcome orchestration and governed action. |
| **Infinit-Control** | Role-based operational surfaces and operator cases. |
| **Condition** | A qualified, accountable operational impairment or state requiring awareness, decision, response, or verification. Capitalize when referring to the SSOM object. |
| **Canonical Operational Record (COR)** | An accepted, SSOM-conformant operational fact with identity, time, quality, source authority, and lineage. |
| **verified outcome** | A result established from required valid return measurements, not work status. |
| **operational outcome thread** | Evidence chain from condition through decision, work, return measurement, and result. Distinct from the broader product-lifecycle digital thread. |
| **configured UNS subscriptions** | Preferred wording for customer-approved source selection. |
| **reference scenario** | A controlled Last Mile demonstration using explicit assumptions, not a customer result. |
| **reference configuration** | A documented set of bands, thresholds, identities, and timing used for a scenario. |
| **representative integration** | An architectural example not claimed as validated production connectivity. |

## Industrial ecosystem terms

| Term | Definition and boundary |
|---|---|
| Unified Namespace (UNS) | A customer architecture for real-time information distribution and discovery, commonly using MQTT and often Sparkplug. It is not a Last Mile product, not inherently a permanent record, and not canonical asset identity. |
| MQTT | Publish/subscribe messaging protocol. Do not use as a synonym for UNS. |
| Sparkplug | Eclipse specification defining MQTT topic namespace, payload, and session-state management for industrial use. Sparkplug compatibility and SSOM conformance are separate. |
| OPC UA | Platform-independent industrial interoperability architecture with secure access and information modeling. Preserve source semantics and Companion Specification identity where available. |
| digital twin | A context-dependent digital representation of an asset. Do not claim Last Mile is “the digital twin” of a plant; explain the specific identity, state, relationship, or lifecycle role. |
| Asset Administration Shell (AAS) | Industry 4.0 implementation pattern for interoperable digital twins. Treat as a source/interoperability model Last Mile can map and preserve, not replace. |
| digital thread | Connected lifecycle information across design, manufacturing, quality, and support. Last Mile contributes an operational outcome thread within or alongside it. |
| Industry 5.0 | Human-centric, sustainable, and resilient industrial development. Do not use as a synonym for more automation. |
| autonomous operations | Operations with increased machine decision and action under explicit policy, authority, evidence, exception, and recovery rules. |
| lights-out / dark factory | A future operating model with minimal routine human presence. Use only in perspective content, not as a current Last Mile capability claim. |
| industrial data space | Federated, governed data sharing that preserves participant control and usage policy. It is not simply a shared data lake. |

## Preferred phrases

- independent operational-accountability layer
- cross-vendor operational identity and topology
- signals and alarms qualified into one accountable Condition
- condition-to-work-to-verified-outcome
- physical recovery verified from live telemetry
- time-correct evidence chain
- policy-governed human and machine action
- consent-governed cross-site learning
- configured source outputs
- current, valid return measurements
- approved or reference band, with basis disclosed

## Retired or prohibited phrases

| Do not use | Use instead |
|---|---|
| Infinit-Code | Infinit-Signal |
| approved UNS topics | configured UNS subscriptions |
| single pane of glass as the full value proposition | role-based operational surface or operator case |
| alarm is the incident/condition | alarm contributes evidence to a qualified Condition |
| ticket closed; issue resolved | work closed; operating result pending/verified |
| near zero, stable, declining, high, low as a measurement | numerical value, unit, band, state, and trend |
| human in the loop as a blanket phrase | HUMAN AUTHORITY with the specific retained authority |
| fully autonomous | policy-governed AUTO/ASSIST; state demonstrated scope |
| real-time without a threshold | state the latency or freshness contract |
| seamless integration | describe the exact contract and support maturity |
| validated connector without evidence | representative integration or designed connector |
| universal industrial standard for scenario bands | reference configuration; distinguish external guidance from site-specific criteria |

## Capitalization and style

- Use `Infinit-Signal`, `Infinit-Flow`, and `Infinit-Control` exactly.
- Use `Last Mile`, not `LastMile`.
- Use `SSOM-conformant`, `condition-to-outcome`, and `cross-vendor` with hyphens.
- Use `24x7` in technical requirements and `24/7` in ordinary public prose.
- Use `AUTO`, `ASSIST`, and `HUMAN AUTHORITY` in labels; explain them in body copy.
- Use precise units: °F, °C, psid, psig, psi, A, GPM, SCFM, kW, RPM, ft, and `kW/100 CFM`.
