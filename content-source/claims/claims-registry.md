---
content_id: CLAIMS-REGISTRY-001
status: approved
owner: Product and Content Governance
last_reviewed: 2026-08-06
claim_maturity: [implemented, demonstrated, designed, reference_architecture, customer_specific, perspective, do_not_publish]
depends_on: [GOV-CLAIMS-001]
used_by: [all]
---

# Claims Registry

The registry approves language and constrains maturity. Empty evidence fields are not permission to publish at a higher state.

## Category and platform

| Claim ID | Approved language | Maturity | Scope/evidence | Prohibited inference |
|---|---|---|---|---|
| CLM-CAT-001 | Last Mile is the Physical Operations Platform. | Designed / category position | Doctrine and four-product architecture | Market leadership or production adoption |
| CLM-CAT-002 | Last Mile is an independent operational-accountability layer above existing OT, data, work, and service ecosystems. | Designed | Platform architecture | Replaces every underlying system |
| CLM-CAT-003 | Last Mile connects condition to work to verified physical outcome. | Designed; Demonstrated in reference scenarios | Four use-case contracts | Customer production outcome |
| CLM-DATA-001 | Operational data is created once as an SSOM-conformant canonical record and consumed through governed contracts and projections. | Designed | Architecture baselines | All persistence is physically one database |
| CLM-OUTCOME-001 | Physical recovery is verified from required current return measurements, not ticket status. | Designed; Demonstrated | Outcome rules and use cases | Regulatory certification |
| CLM-VENDOR-001 | Last Mile is designed to operate across vendor ecosystems without requiring one automation, broker, historian, work, or service platform. | Designed / reference architecture | Source profiles and contracts | Every named vendor is validated |

## Infinit-Signal

| Claim ID | Approved language | Maturity | Scope/evidence | Prohibited inference |
|---|---|---|---|---|
| CLM-SIG-001 | Infinit-Signal consumes configured operational sources, preserves source evidence, qualifies time and quality, and creates SSOM-conformant records. | Designed | Product contract and architecture | Production connector availability |
| CLM-SIG-002 | Infinit-Signal is designed for MQTT, Sparkplug, OPC UA, historian, industrial platform, API, and file source families through versioned Source Platform Profiles. | Designed / reference architecture | Architecture | Certified compatibility |
| CLM-SIG-003 | The customer UNS remains the communication and discovery fabric; Infinit-Signal consumes configured subscriptions without claiming ownership of the namespace. | Designed / perspective | UNS source and product contract | Last Mile operates broker infrastructure |
| CLM-SIG-004 | Duplicate, stale, replayed, retained, unresolved, and invalid records receive explicit classifications and evidence. | Designed; Demonstrated only in reference scenario | Data-center qualification dataset | Measured production rates |
| CLM-SIG-005 | Infinit-Signal is designed for priority-aware 24x7 ingestion and backpressure isolation. | Designed | SLO architecture | “Massive scale” or production-grade without test evidence |

## Singularity / SSOM

| Claim ID | Approved language | Maturity | Scope/evidence | Prohibited inference |
|---|---|---|---|---|
| CLM-SSOM-001 | SSOM is an open, vendor-neutral semantic and evidence contract. | Designed | SSOM architecture | Standards-body adoption unless documented |
| CLM-SING-001 | Singularity is Last Mile's governed operational-memory and OT world-model product implementing SSOM. | Designed | Product and architecture contracts | Implemented production world model |
| CLM-SING-002 | Singularity preserves canonical identity, topology, conditions, evidence, time, and verified outcomes across systems. | Designed; Demonstrated in reference content | Architecture and scenarios | Universal digital twin |
| CLM-SING-003 | SSOM conformance and MQTT/Sparkplug compatibility are separate conformance domains. | Perspective / reference architecture | Eclipse specification and UNS paper | Certification in either domain |
| CLM-SING-004 | Cross-site learning is consent- and purpose-governed and cannot rewrite customer canonical facts. | Designed | Data Trust architecture | Current federated/data-space implementation |

## Infinit-Flow

| Claim ID | Approved language | Maturity | Scope/evidence | Prohibited inference |
|---|---|---|---|---|
| CLM-FLOW-001 | Infinit-Flow coordinates durable operational response across cases, tasks, approvals, systems, providers, and verification. | Designed | Architecture/backlog | Implemented connectors or deployments |
| CLM-FLOW-002 | Workflow binding is filtered by canonical type, capability, tenant, site, role, quality, and freshness. | Designed | Architecture | Arbitrary drag-and-drop binding |
| CLM-FLOW-003 | AUTO executes authorized digital steps; ASSIST prepares evidence or recommendations; HUMAN AUTHORITY retains governed physical and control authority. | Designed; Demonstrated in process maps | Doctrine and use cases | Autonomous plant control |
| CLM-FLOW-004 | Work completion begins verification; it does not establish the physical outcome. | Designed; Demonstrated | Use-case timelines | Work-system replacement |

## Infinit-Control

| Claim ID | Approved language | Maturity | Scope/evidence | Prohibited inference |
|---|---|---|---|---|
| CLM-CTRL-001 | Infinit-Control presents one accountable case with live state, evidence, ownership, work, and verified outcome. | Designed; Demonstrated in reference page spec | Product contract | Implemented product UI unless code evidence exists |
| CLM-CTRL-002 | Measurements display value, unit, reference, state, and operationally meaningful trend/freshness. | Designed; Demonstrated in reference datasets | Use-case contracts | Customer-specific thresholds |
| CLM-CTRL-003 | No-valid-data states prevent a healthy or recovered presentation. | Designed | Result rules | Automatic repair of source data |

## Industrial concepts

| Claim ID | Approved language | Maturity | Source |
|---|---|---|---|
| CLM-CONCEPT-UNS | UNS distributes and exposes current information; SSOM provides durable identity, meaning, provenance, and lifecycle continuity. | Perspective | Eclipse Sparkplug; supplied UNS/SSOM paper |
| CLM-CONCEPT-OPCUA | OPC UA information models and Companion Specifications are source semantics Last Mile should preserve and map. | Perspective | OPC Foundation |
| CLM-CONCEPT-AAS | AAS is an interoperable Industry 4.0 digital-twin implementation pattern; Singularity adds cross-system operational outcome memory. | Perspective | IDTA |
| CLM-CONCEPT-I50 | Industry 5.0 emphasizes human-centricity, sustainability, and resilience. | Perspective | European Commission |
| CLM-CONCEPT-THREAD | Last Mile's operational outcome thread complements broader lifecycle digital threads. | Perspective / Designed | NIST and platform architecture |
| CLM-CONCEPT-OTSEC | OT security must address physical performance, reliability, and safety requirements. | Perspective | NIST SP 800-82r3 |

## Explicit do-not-publish claims

- Last Mile is already the global leader in operational intelligence.
- All named connectors are implemented, certified, or production-proven.
- Last Mile autonomously operates customer plants.
- Singularity contains customer-derived industry knowledge unless consent and evidence exist.
- The reference scenarios represent actual customers, savings, regulatory results, or avoided events.
- A former or current vendor is the foundation of the Last Mile Platform unless a current approved agreement and architecture record say so.
- The reference bands are universal industrial standards.
- A work order, alarm clear, command acknowledgement, or agent task proves physical recovery.
