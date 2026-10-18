---
content_id: CONCEPT-OTSEC-001
status: approved
owner: Security Architecture
last_reviewed: 2026-08-06
claim_maturity: [perspective, designed]
depends_on: [PROD-SIGNAL-001, PROD-FLOW-001]
used_by: [/security, /ecosystem, /resources/industrial-concepts/ot-security]
---

# OT Cybersecurity and Zero Trust

## Canonical position

Industrial connectivity must preserve the performance, reliability, and safety requirements of OT. Last Mile applies least privilege, identity, segmentation-aware deployment, policy, audit, and bounded action without assuming enterprise IT controls can be copied into plant operations unchanged.

## Publication-ready article

### Connected operations need explicit trust boundaries

Operational technology interacts with the physical environment. Security decisions therefore affect not only confidentiality but also process availability, safety, environmental protection, and the ability to recover. NIST's OT security guidance emphasizes these unique performance, reliability, and safety requirements.

Last Mile should connect through customer-approved zones and conduits, not flatten them. Infinit-Signal supports boundary-local software, outbound-oriented secure delivery where appropriate, source-specific identities, certificate and secret rotation, least-privilege subscriptions, and evidence of connection and mapping changes. A customer UNS or OPC UA environment retains its own authentication, authorization, network, and session responsibilities.

Within the platform, tenant isolation, workload identity, encryption, audit, and policy govern access to canonical facts and product-private state. Infinit-Flow commands are separately authorized, idempotent, time-bounded, and reconciled with receipts. HUMAN AUTHORITY remains explicit for physical work and control changes.

Zero trust in this context does not mean constant cloud reachability or aggressive controls that disrupt operations. It means no connection, user, service, device identity, or agent receives implicit authority merely because it is inside a network. Access is scoped, verified, monitored, and revocable, with safe degraded behavior.

## What this looks like in an operating response

At lift station `LS-07`, Infinit-Signal receives customer-approved wet-well, pump, current, speed, and flow evidence through an explicitly authorized boundary. The connection receives only the subscriptions and credentials required for that evidence. Infinit-Flow may create a digital case automatically, but pump isolation, LOTO, and physical repair remain under Collection Systems HUMAN AUTHORITY. Loss of the cloud path cannot become authority for safety control or hide the degraded station state.

## Sources

- NIST SP 800-82 Rev. 3, Guide to Operational Technology Security: https://csrc.nist.gov/pubs/sp/800/82/r3/final

## Prohibited implications

Last Mile certifies customer compliance; cloud access is required for safety control; IT zero-trust patterns may ignore OT availability; any agent can write to control systems.
