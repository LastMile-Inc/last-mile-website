---
content_id: PAGE-SIGNAL-001
status: approved
owner: Infinit-Signal Product Marketing
last_reviewed: 2026-08-06
claim_maturity: [designed, reference_architecture]
depends_on: [PROD-SIGNAL-001, CONCEPT-UNS-001, CLAIMS-REGISTRY-001]
used_by: [/infinit-signal]
---

# Infinit-Signal Page Contract and Copy

## Job

Explain how operational inputs are acquired, preserved, qualified, resolved, and handed into Singularity. Do not explain the complete outcome loop or imply validated connectors.

## Hero

**Eyebrow:** INFINIT-SIGNAL

**H1:** Know which industrial evidence is fit to act on.

**Body:** Infinit-Signal consumes configured outputs from the systems you already operate, preserves their original evidence, and classifies time, quality, duplication, replay, and identity before data enters the Last Mile operating model.

**Operating artifact:** Show the Cooling Loop B qualified evidence envelope from `USECASE-DC-COOLING-001`, including source authority, event time, latency, quality, duplicate/replay classification, mapping confidence, accepted/quarantined counts, and the rejected duplicate and stale pressure record.

## What enters. What is checked. What leaves.

### What enters

MQTT and customer UNS subscriptions; Sparkplug; OPC UA; SCADA, BMS, and MES outputs; historians and industrial data platforms; APIs, files, and service-system records.

### What is checked

Source authority, schema, event time, receive time, freshness, quality, units, retained-message context, duplication, replay/backfill, asset mapping, policy, and evidence integrity.

### What leaves

SSOM-conformant canonical operational records with original source identity, time, quality, mapping version, lineage, and evidence reference—accepted once for Singularity and governed consumers.

## Unified Namespace section

**Eyebrow:** UNIFIED NAMESPACE

**Heading:** Keep the real-time fabric. Add the operational contract.

**Body:** A Unified Namespace makes current operational information discoverable and available across systems. Infinit-Signal consumes configured UNS subscriptions while preserving the original publisher, topic, timestamp, quality, QoS, retained-message flag, and session context. It then classifies freshness, duplicates, replay, and unresolved assets before the information enters Singularity.

**Boundary:** The UNS remains the customer's communication and discovery fabric. Singularity's SSOM contract supplies canonical identity, relationships, evidence, provenance, history, and lifecycle continuity. A topic path remains a source address—it does not automatically become the identity of the asset.

**Link:** Read: UNS and SSOM - moving industrial data is not the same as making it accountable.

## Quality section

**Heading:** Preserve what arrived. Make every acceptance decision visible.

**Body:** Accepted, warning, quarantined, rejected, duplicate, and replayed records retain reason codes and evidence. A stale or unresolved value may remain available for diagnosis without being allowed to influence a live Condition or verified Outcome.

## Boundary runtime section

**Heading:** Software-defined at the customer boundary.

**Body:** Where customer architecture requires local collection or store-and-forward, Infinit-Signal is designed to run as customer-approved software on a VM, container, Kubernetes/OpenShift environment, private cloud, or existing edge compute. Last Mile does not require proprietary hardware.

## CTA

**Heading:** Turn source data into governed operational evidence.

**CTA:** See how Singularity gives it durable meaning
