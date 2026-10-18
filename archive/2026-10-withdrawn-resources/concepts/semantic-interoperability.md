---
content_id: CONCEPT-SEMANTIC-001
status: approved
owner: SSOM Architecture
last_reviewed: 2026-08-06
claim_maturity: [perspective, designed]
depends_on: [PROD-SINGULARITY-001]
used_by: [/singularity, /ecosystem, /resources/industrial-concepts/semantic-interoperability]
---

# Semantic Interoperability

## Canonical position

Protocol connectivity moves values. Semantic interoperability preserves what those values refer to, how they relate, what quality and time mean, and how they remain interpretable when systems, vendors, and sites disagree.

## Publication-ready article

### Connected is not yet interoperable

Industrial integration often celebrates the moment a value can move from one system to another. That is necessary, but it is not the hard part. A pressure value without a stable asset identity, engineering meaning, time basis, quality, source authority, and relationship to the operating process is connected data—not dependable operational context.

Semantic interoperability means two systems can exchange information and preserve meaning well enough to use it correctly. In physical operations, that includes asset class and instance identity; units and quantity kind; topology and dependency; event and observation semantics; source and event time; quality and uncertainty; and the evidence required to explain a decision later.

Last Mile does not attempt to erase strong source semantics. OPC UA information models, Companion Specifications, Sparkplug metrics, historian points, ISA-95 structures, equipment models, and customer naming conventions may all contain valuable meaning. Infinit-Signal preserves those source representations and maps them through governed profiles. Singularity/SSOM gives the resulting facts a portable operational contract and retains the crosswalk back to the source.

This matters most when one physical asset has five names, when a functional relationship differs from a physical hierarchy, when equipment is replaced, when a source changes vendors, or when an AI system needs to understand whether two observations are comparable. The goal is not to force every source into one flattened taxonomy. It is to establish canonical continuity while keeping the original evidence and uncertainty visible.

Semantic interoperability is therefore the foundation for cross-vendor orchestration. Without it, automation scales interfaces. With it, operations can scale accountable meaning.

## What this looks like in an operating response

The same chilled-water pump appears as Rockwell tag `B3_CHW_P02_CMD`, BMS status `B3_CHW_P02_STS`, Ignition path `[DC03]CHW/LoopB/CHWP-02`, HighByte instance `dc03.loop_b.chwp_02`, MQTT topic `dc03/chw/loop-b/chwp-02/state`, historian point `DC03_CHWP02_AMPS`, and SAP equipment `CHWP-02`. Semantic interoperability preserves each source identity and validity period while resolving the shared asset and its topology: CHWP-02 → Cooling Loop B → Hall 3 → N+1 secondary pumping path.

## Site placement

Primary on Singularity; supporting on Ecosystem; full article in Resources. Do not put the term in the home hero without explanation.

## Sources

- OPC UA information modeling and enterprise interoperability: https://opcfoundation.org/about/opc-technologies/opc-ua/
- OPC UA Companion Specifications and domain models: https://opcfoundation.org/about/opc-technologies/opc-ua/ua-companion-specifications/
