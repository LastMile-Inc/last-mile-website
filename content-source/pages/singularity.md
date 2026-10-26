---
content_id: PAGE-SINGULARITY-001
status: approved
owner: Singularity Product Marketing
last_reviewed: 2026-10-16
claim_maturity: [designed, reference_architecture]
depends_on: [PROD-SINGULARITY-001, CONCEPT-UNS-001, CLAIMS-REGISTRY-001]
used_by: [/singularity]
---

# Singularity Page Contract and Copy (`/singularity`)

## Job

Explain how Singularity connects equipment, conditions, dependencies, history, work, and outcomes in a shared operational world model so people and AI can understand an issue in the context of the operation. Establish SSOM (Standardized Semantic Object Model) as the open semantic contract inside Singularity without overclaiming a completed world model or introducing unsupported data ownership, AI training rights, privacy, certification, or security claims.

## A. Hero

- **Eyebrow:** `Singularity`
- **H1:** `Give your team the context they need.`
- **Supporting copy:** `From the moment that Last Mile is implemented, Singularity begins understanding your equipment, how it relates, what has happened and the work underway so that your team will always understand an issue in the right context.`
- **Primary CTA:** `Book a demo` -> `/demo`
- **Secondary link:** `Explore the platform` -> `/platform`
- **Hero visual:** Approved Singularity concept asset (`Smart Water Treatment Plant Monitoring(1).png`, delivered as `platform-singularity` in a `4:3` frame, `1448x1086`).
  - **Caption:** `Concept illustration`
  - **Alt:** `Concept illustration of water facility engineers reviewing how equipment, systems, and readings relate`

## B. Main Explanatory Illustration

- **Eyebrow:** `SHARED OPERATIONAL CONTEXT`
- **Section headline:** `Different sources. One connected understanding.`
- **Supporting copy:** `Bring equipment information, readings, relationships, time, and records into a connected view without losing where the information came from.`
- **Explanatory illustration:** `semantic-operating-record-v3.png` (`1672x941`, delivered as `semantic-operating-record-v3`).
  - **Caption:** `Concept illustration`
- **Three live labels aligned to the composition:**
  - `Source information`
  - `Connected context`
  - `Shared operating record`

## C. Operational Context Questions

The pump-failure example panel is not shown. The section lead is: `The power of that shared context is most noticeable when mission critical parts of your operation are down.`

Concise explanations addressing the four operational questions using canonical Singularity capabilities and showing how Singularity supplies shared context across `Infinit-Signal`, `Singularity`, `Infinit-Flow`, and `Infinit-Control`:

1. **What equipment and processes does this issue affect?**
   - Connects equipment identities and physical, process, control, location, and dependency relationships so teams and AI see upstream and downstream impact across the operation.
2. **What conditions and history help explain it?**
   - Connects qualified observations, events, and Conditions from `Infinit-Signal` with operating history, prior occurrences, and past interventions in time order.
3. **What work is underway, and who is responsible?**
   - Links the active Condition to accountable owners, authorized decisions, and coordinated `Infinit-Flow` tasks, approvals, work orders, and dispatches across systems.
4. **What evidence will show whether the response worked?**
   - Evaluates qualified return measurements, operating bands, and stability windows against an explicit Outcome contract—distinguishing `Recovery established`, `Partial recovery`, `Failed intervention`, `Recurrence detected`, and `Insufficient return data` for `Infinit-Control` rather than treating ticket closure as proof.

## D. Optional Technical Reference: SSOM, Identity Crosswalk, and Governance Boundaries

- Presented as an optional expandable technical reference section plus links to canonical Industrial Concepts resources (`/resources/industrial-concepts/semantic-interoperability`, `/resources/industrial-concepts/uns-and-ssom`, `/resources/industrial-concepts/digital-twins`, `/resources/industrial-concepts/industrial-ai`, `/resources/industrial-concepts/data-spaces`).
- **Eyebrow:** `Last Mile's Open Data Standard`
- **Visible introduction:** `At the heart of Singularity is the Standardized Semantic Object Model (SSOM). SSOM offers the structure and meaning that is so important to your operations and does it in a way that conforms with the data standards you already use.`
- **SSOM expansion:** `The Standardized Semantic Object Model defines portable operational meaning, identity, relationships, temporal semantics, quality, evidence, provenance, conformance, and profiles.`
- **Scoped source-identity crosswalk:** Shows how `Source tag`, `MQTT topic`, `OPC UA NodeId`, `Historian point`, `SAP equipment`, and `Provider record` resolve to one canonical operational asset (`Cooling Loop B · CHWP-02`) while preserving every scoped external identity and validity period.
- **Conformance & Data Trust boundaries:**
  - `SSOM conformance and MQTT/Sparkplug compatibility are separate conformance domains.`
  - `The architecture separates customer operations from cross-site learning. SSOM conformance does not grant contribution rights. Purpose, consent, minimization, transformation, provenance, retention, and model scope remain explicit, and aggregate learning cannot rewrite customer canonical facts.`

## E. Connected Platform and Closing CTA

- **Heading:** `Shared context across every stage of the response.`
- **Four linked product cards:** `Infinit-Signal`, `Singularity` (current page), `Infinit-Flow`, `Infinit-Control`.
- **Closing CTA:**
  - **Heading:** `See how shared operational context guides coordinated action.`
  - **Primary CTA:** `Book a demo` -> `/demo`
  - **Secondary link:** `Explore Infinit-Flow` -> `/infinit-flow`
