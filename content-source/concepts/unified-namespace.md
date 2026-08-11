---
content_id: CONCEPT-UNS-001
status: approved
owner: Industrial Architecture
last_reviewed: 2026-08-06
claim_maturity: [perspective, reference_architecture]
depends_on: [PROD-SIGNAL-001, PROD-SINGULARITY-001]
used_by: [/infinit-signal, /singularity, /ecosystem, /resources/industrial-concepts/uns-and-ssom]
---

# Unified Namespace and SSOM

## Canonical position

A Unified Namespace and SSOM are complementary. The UNS is the customer's real-time communication and discovery fabric. SSOM is the vendor-neutral semantic and evidence contract. Infinit-Signal bridges them by preserving UNS runtime context while producing governed SSOM-conformant records for Singularity.

## Site placement

- Full article: Resources -> Industrial Concepts.
- Infinit-Signal: primary compact explanation after inputs/checks/outputs.
- Singularity: short “distribution is not meaning” comparison.
- Ecosystem: broker/UNS boundary.
- Platform: one representative source label only; do not add another large section.

## Publication-ready article

### UNS and SSOM: moving industrial data is not the same as making it accountable

A Unified Namespace can solve an important industrial problem: it gives publishers and consumers a shared, event-driven place to make current operational information available. In many implementations, MQTT supplies publish/subscribe transport and Sparkplug adds an industrial topic namespace, payload representation, and session-state model. This can reduce point-to-point integration and make plant information easier to discover.

But availability is not the same as operational truth.

A topic path tells a consumer where information was published. It does not, by itself, establish that two source identifiers refer to the same physical asset, that a retained message is current, that a value arrived in event-time order, that a replay should influence a live decision, or that a cleared alarm proves the underlying impairment is gone. Those questions require identity, time, quality, provenance, evidence, policy, and lifecycle continuity.

That is the division of responsibility between a customer UNS and Last Mile. Infinit-Signal subscribes to configured sources and preserves publisher, topic, QoS, retain flag, timestamp, session, Sparkplug birth/death, sequence, alias, and source-quality context. It classifies freshness, duplicates, retained messages, replay, and unresolved mappings before a record can influence the operating model. The original topic remains visible as a source address; it does not silently become canonical asset identity.

Singularity then applies the SSOM contract. It gives assets stable identities and scoped external aliases, represents many-to-many and time-varying relationships, preserves accepted history and evidence, and connects Conditions, decisions, actions, return measurements, and verified Outcomes. Current state can still be distributed through the UNS, but the evidence chain remains durable outside the broker's session and retention behavior.

The result is not a choice between UNS and SSOM. The UNS makes industrial information available. SSOM makes that information portable, interpretable, governable, and accountable across systems and time.

### Boundary summary

| Customer UNS | Infinit-Signal | Singularity / SSOM |
|---|---|---|
| Topics, transport, session, distribution | Subscription, preservation, qualification, mapping, COR creation | Canonical identity, topology, Conditions, history, evidence, Outcomes |
| Current-state availability | Live/replay/stale/duplicate classification | Durable time-correct operational memory |
| Source/runtime identifiers | Source-to-canonical crosswalk | Canonical identity and lifecycle continuity |
| MQTT/Sparkplug compatibility | Separate compatibility and mapping evidence | SSOM conformance and semantic governance |

## What this looks like in an operating response

Cooling-pump state arrives on `dc03/chw/loop-b/chwp-02/state`. The customer UNS transports that publication and retains its broker, topic, QoS, session, and publisher responsibilities. Infinit-Signal preserves that context, rejects a duplicate event and a pressure sample stale by 47 seconds, and maps the accepted source identities to canonical asset `CHWP-02`. Singularity then carries one accountable Cooling Loop B Condition through work and telemetry-established recovery; the topic never becomes the asset identity or the recovery decision by itself.

## Sources

- Eclipse Sparkplug Specification - MQTT topic namespace, payload, and session state: https://sparkplug.eclipse.org/specification/
- Supplied paper, *SSOM and Unified Namespace: Complementary Roles*.

## Prohibited implications

Last Mile owns the UNS; MQTT equals UNS; a topic is canonical identity; broker publication equals accepted truth; Sparkplug conformance equals SSOM conformance.
