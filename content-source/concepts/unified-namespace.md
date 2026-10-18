---
content_id: CONCEPT-UNS-001
status: approved
owner: Industrial Architecture
last_reviewed: 2026-10-17
claim_maturity: [perspective, reference_architecture]
depends_on: [PROD-SIGNAL-001, PROD-SINGULARITY-001]
used_by: [/infinit-signal, /singularity, /ecosystem, /resources/industrial-concepts/uns-and-ssom]
---

# Connected data needs operating context.

## Canonical position

A reading becomes more useful when your team knows which asset it belongs to, when it was captured, whether it can be trusted, and what needs attention.

## Publication-ready article

### Connected data needs operating context.

#### Connecting data sources is only the first step

Most industrial facilities already collect thousands of data points across controllers, SCADA screens, historians, and maintenance software. Making those data sources reachable over a network is an important first step, because it reduces isolated data silos and allows current values to move between systems. However, moving a number from one system to another does not automatically make that reading useful to the people responsible for acting on it.

When an abnormal reading appears, operators and engineers immediately have practical questions. Which specific piece of equipment produced this value? Did the reading happen just now, or is it a delayed or repeated message? How does this asset affect the line, room, or utility loop around it, and is maintenance work already underway? Answering those questions requires operating context, not just network transport.

#### What makes a reading usable across teams and systems

For teams and software to work from the same understanding, raw readings need consistent supporting details. Clear asset identity links a control tag, historian point, and maintenance equipment number to the same physical machine without erasing the original source identifiers. Engineering units and timestamps make it clear what was measured and when the event actually occurred in the process.

Data quality checks help separate current, trustworthy readings from missing, stale, or duplicated messages before they trigger unnecessary alarms or mislead a recovery check. Relationships show what upstream or downstream equipment depends on the asset, so teams can judge operational impact quickly and coordinate the right response.

#### Preserving meaning with a shared data structure

Without a shared structure, every integration or report has to rebuild that context from scratch, and different tools can interpret the same event in different ways. A shared operational data structure preserves asset identity, timing, quality, system relationships, active issues, and follow-up results so they stay connected as work moves from initial warning to resolution.

Crucially, organizing operating context in a shared model does not require ripping out or replacing existing plant and enterprise software. Control systems continue to handle local monitoring and equipment control, historians keep long-term time-series archives, and maintenance systems remain the system of record for work orders and asset history.

#### How UNS, OPC UA, and SSOM fit with existing systems

Several technical approaches often appear in architecture discussions around industrial data. A Unified Namespace (UNS), commonly built with MQTT and Sparkplug conventions, provides a shared messaging structure for publishing and discovering current events across a site. Standards such as OPC UA and its companion specifications help describe equipment information and context at the source.

Last Mile works alongside these investments using SSOM (Standardized Semantic Object Model), which is Last Mile’s shared operational data model inside Singularity. Infinit-Signal checks incoming source readings and preserves where they came from, while Singularity uses SSOM to connect equipment identity, relationships, issues, response work, and post-work verification.

## What this looks like in an operating response

In a facility cooling response, a pump status update arrives from a building control topic while motor current is logged in a historian and equipment records live in maintenance software. Rather than treating the message topic as the whole story, incoming checks verify that the reading is current, set aside a duplicate message, and link the update to the shared record for that pump and the cooling loop it supports.

Because the equipment identity, loop role, maintenance work order, and subsequent pressure and current readings are connected in one context, operations and maintenance teams can follow the response from the initial pump fault through field repair and post-work verification while each underlying system retains its established role.

## Sources

- Eclipse Sparkplug Specification: https://sparkplug.eclipse.org/specification/
- OPC Foundation Unified Architecture: https://opcfoundation.org/about/opc-technologies/opc-ua/
