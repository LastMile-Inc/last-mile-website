---
content_id: CONCEPT-COMPOSABLE-001
status: approved
owner: Industrial Architecture
last_reviewed: 2026-08-06
claim_maturity: [perspective, designed]
depends_on: [CONCEPT-SEMANTIC-001, CONCEPT-OPCUA-001, PROD-SINGULARITY-001]
used_by: [/resources/industrial-concepts/composable-manufacturing]
---

# Plug-and-Produce and Composable Manufacturing

## Canonical position

Modular industrial operations depend on discoverable capabilities, interoperable models, safe commissioning, and governed orchestration. Last Mile can help preserve identity and coordinate operating response, but it does not replace controls engineering or claim instantaneous plug-and-produce.

## Publication-ready article

### Composable operations need more than a new connector

The promise of plug-and-produce is attractive: add or replace an industrial module and allow the surrounding system to discover its identity, capabilities, data, and services with less custom integration. In practice, physical compatibility, safety, controls, network trust, semantics, commissioning, and operating procedures still matter.

OPC UA information models, Companion Specifications, AAS submodels, and other capability descriptions can make equipment more discoverable and portable. Singularity/SSOM can preserve canonical identity when a device is replaced, connect source models to plant topology, and record which capabilities and relationships are valid over time. Infinit-Flow can bind workflows only to assets whose type, capability, site, role, quality, and freshness satisfy the workflow contract.

That creates a useful operational layer around modularity. A new module can enter the operating model through governed mapping and conformance; procedures and response logic can reference compatible capabilities; and post-change outcomes can be verified from telemetry.

The honest boundary remains important. Last Mile does not certify mechanical compatibility, generate PLC logic, approve safety functions, or eliminate commissioning. It makes the operational context and accountability around composable equipment more durable.

## What this looks like in an operating response

If a replacement pump module is commissioned into Cooling Loop B, its OPC UA model or AAS submodel can describe capabilities and source identifiers. Singularity can preserve succession from the prior equipment identity, while Infinit-Flow binds the existing response only after the replacement asset satisfies the required type, site, capability, quality, and freshness contract. Commissioning, PLC logic, mechanical compatibility, and safety approval remain controls-engineering and customer responsibilities.

## Sources

- OPC UA Companion Specifications: https://opcfoundation.org/about/opc-technologies/opc-ua/ua-companion-specifications/
- Industrial Digital Twin Association: https://industrialdigitaltwin.org/en/technology
