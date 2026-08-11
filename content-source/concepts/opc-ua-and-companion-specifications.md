---
content_id: CONCEPT-OPCUA-001
status: approved
owner: Industrial Connectivity
last_reviewed: 2026-08-06
claim_maturity: [perspective, reference_architecture]
depends_on: [PROD-SIGNAL-001, CONCEPT-SEMANTIC-001]
used_by: [/infinit-signal, /ecosystem, /resources/industrial-concepts/opc-ua]
---

# OPC UA and Companion Specifications

## Canonical position

OPC UA is a secure, platform-independent industrial interoperability architecture with information modeling and multiple communication patterns. Companion Specifications add domain- and equipment-specific models. Infinit-Signal should preserve and map that source meaning; SSOM should not pretend it never existed.

## Publication-ready article

### Preserve the source model, then connect it to the operating outcome

OPC UA is more than a protocol for reading tags. Its architecture includes discovery, security, subscriptions, events, methods, history, and an extensible information model. Companion Specifications build industry and equipment models on that foundation so participants can exchange more than anonymous values.

That makes OPC UA an important source of meaning for Last Mile. An Infinit-Signal OPC UA profile should preserve endpoint and application identity, namespace URI, NodeId, browse path, server and source timestamps, status code, engineering units, event types, and the applicable Companion Specification model. Mapping must remain versioned and reversible so the original representation is always available for evidence and diagnosis.

SSOM adds a different scope. It connects source-specific objects to canonical operational identity across OPC UA, MQTT/UNS, historians, work systems, and service providers. It preserves relationships and evidence over time and connects the operating condition to decisions, work, return measurements, and outcomes.

The correct architecture is therefore additive: keep OPC UA's source information model; map it through governed profiles; use Singularity/SSOM for cross-system operational continuity. Last Mile should never market SSOM as a reason to discard a customer's Companion Specification investment.

## What this looks like in an operating response

An OPC UA server may expose the `CHWP-02` motor-current observation with namespace URI, NodeId, browse path, server and source timestamps, status code, engineering unit `A`, and equipment-model context. Infinit-Signal preserves those fields and maps the observation to the canonical pump without flattening away its source model. The resulting 0.6 A value can contribute to the qualified Cooling Loop B Condition only when its identity, time, and quality satisfy the configured contract.

## Sources

- OPC UA architecture: https://opcfoundation.org/about/opc-technologies/opc-ua/
- OPC UA Companion Specifications: https://opcfoundation.org/about/opc-technologies/opc-ua/ua-companion-specifications/

## Prohibited implications

Every OPC UA server uses a Companion Specification; Last Mile is OPC-certified; a representative endpoint is a validated connector; SSOM replaces OPC UA models.
