---
content_id: GOV-CLAIMS-001
status: approved
owner: Product and Legal Review
last_reviewed: 2026-08-06
claim_maturity: [implemented, demonstrated, designed, reference_architecture, customer_specific, perspective, do_not_publish]
depends_on: [GOV-DOCTRINE-001, GOV-VOCAB-001]
used_by: [all]
---

# Claims and Evidence Policy

## Maturity states

| State | Publication rule | Minimum evidence |
|---|---|---|
| **Implemented** | May be stated as present capability within its tested scope. | Working code, version, owner, test result, and environment. |
| **Demonstrated** | State as a Last Mile reference demonstration, never customer production. | Reproducible scenario, data, screenshots/logs, acceptance criteria, and date. |
| **Designed** | Use “designed to,” “architecture defines,” or roadmap language. | Approved architecture/specification and accountable owner. |
| **Reference architecture** | Describe a pattern and its assumptions; do not imply validated interoperability. | Contract, sequence, dependencies, boundary, and representative systems. |
| **Customer-specific** | Publish only in scoped customer material with approval. | Customer configuration, acceptance evidence, authorization, and confidentiality review. |
| **Perspective** | Publish as Last Mile's informed position, not product capability. | Authoritative sources and clear Last Mile interpretation. |
| **Do not publish** | Must not appear publicly. | Unsupported, obsolete, confidential, misleading, or legally restricted. |

## Claim record

Every consequential claim requires:

- stable claim ID;
- exact approved language;
- allowed variants;
- maturity state;
- scope and exclusions;
- evidence owner and evidence location;
- last verification date;
- routes allowed to use it;
- routes prohibited from using it.

## Qualification rules

### Integration claims

Naming HiveMQ, EMQX, HighByte, Ignition, Siemens, AVEVA, Cognite, SAP, Maximo, JR Automation, Convergix, or another company is illustrative unless the claims registry records implemented or validated status. Never imply partnership from representative placement.

### Performance claims

“Real-time,” “massive scale,” “high-volume,” “low latency,” “production grade,” and “resilient” require measured or designed thresholds. If only designed, state the SLO and maturity. Do not publish unverified throughput numbers.

### AI claims

Identify whether the behavior is deterministic correlation, anomaly detection, prediction, generative assistance, planning, or an agent. State authority and stop conditions. Do not describe a recommendation as a decision or a model response as a verified fact.

### Industrial outcome claims

Reference scenarios may show internally consistent measurements and deltas. They may not be converted into annual savings, avoided cost, regulatory compliance, OEE improvement, MTTR reduction, energy savings, or customer-performance claims without customer-specific evidence.

### Standards and guidance

Distinguish:

- external recommended or allowable ranges;
- facility-specific commissioned bands;
- Last Mile reference-demo assumptions;
- customer-specific acceptance criteria.

An asterisk after a reference band must resolve to a visible reference-configuration disclosure.

## Evidence lifecycle

Claims expire when their evidence changes materially. Review implemented and demonstrated claims at every release; review designed claims quarterly; review external-source perspective claims annually or when a standard changes. A stale claim is downgraded or removed, never silently carried forward.

## Public-writing test

Before publication, answer:

1. What exactly is being claimed?
2. Is it product, architecture, reference demonstration, customer result, or perspective?
3. What evidence supports it?
4. What boundary would a reasonable industrial buyer infer?
5. Could the copy imply control authority, certification, partnership, or customer success that does not exist?
6. Does the page link to the canonical explanation instead of inventing a second one?
