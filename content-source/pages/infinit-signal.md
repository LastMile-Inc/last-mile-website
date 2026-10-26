---
content_id: PAGE-SIGNAL-001
status: approved
owner: Infinit-Signal Product Marketing
last_reviewed: 2026-10-16
claim_maturity: [designed, reference_architecture]
depends_on: [PROD-SIGNAL-001, CLAIMS-REGISTRY-001]
used_by: [/infinit-signal]
---

# Infinit-Signal Page Contract and Copy (`/infinit-signal`)

## Job

Answer the buyer question: **"How does Last Mile make operational data dependable without losing where it came from or passing noisy readings downstream?"** Keep the tone buyer-friendly and consistent with `/` and `/platform`. Do not expose internal record identifiers, protocol flags, or unvalidated connector claims.

## A. Hero

- **Eyebrow:** `INFINIT-SIGNAL`
- **H1:** `Make operational data dependable.`
- **Supporting copy:** `Capture operational information, check its quality, and preserve its source—so downstream decisions and workflows start with a dependable foundation.`
- **Primary CTA:** `Book a demo` -> `/demo`
- **Secondary link:** `Explore the platform` -> `/platform`
- **Hero visual:** Approved Infinit-Signal concept asset (`AI-Powered Factory Inspection Line(1).png`, delivered as `platform-infinit-signal` in a `4:3` frame, `1448x1086`).
  - **Caption:** `Concept illustration`
  - **Alt:** `Packaging-line cameras and sensors with conceptual graphics showing organized operating information.`

## B. Main Explanatory Illustration

- **Eyebrow:** `FROM SOURCE TO SHARED CONTEXT`
- **Section headline:** `From incoming signals to meaningful context.`
- **Supporting copy:** `You depend on a variety of technologies and vendors to run your operations. Infinit-Signal ingests that signal and prepares it for coordinated work and oversight.`
- **Explanatory illustration:** `Futuristic Factory-to-AI Data Pipeline.png` (`1672x941`, delivered as `signal-handoff-web-v3`, cleaned replacement for `ai-ready-handoff-v2.png`).
  - **Caption:** `Concept illustration`
- **Three live region headings aligned to the corresponding regions:**
  - **Left/qualification region:** `Infinit-Signal — Ingest and qualify.`
  - **Central context region:** `Singularity — Shared operational context.`
  - **Right region:** `Connected work and oversight — Infinit-Flow + Infinit-Control.`
- **Five live labels aligned to the five qualification rows:**
  1. `Preserve source identity`
  2. `Preserve event time`
  3. `Check data quality`
  4. `Recognize repeated delivery`
  5. `Structure consistent records`
- **Connected capabilities framing:** Explain the three regions as connected capabilities rather than a mandatory one-way architecture, a physical Singularity appliance, or independent parallel sources of truth. Explain the right-hand region collectively without inventing individual features for the five right-hand icon rows. On mobile, present the labels in a clearly associated explanation directly below the illustration.

## C. Record-Handling Example

- **Heading:** `There is a tidal wave of operational data and it's messy.`
- **Supporting copy:** `Select a scenario below to see how Infinit-Signal handles the diversity and complexity of incoming data from your operations.`
- **Compact selectable example (`Illustrative example`) covering four documented conditions:**
  - **Current information (`Accepted`):** Preserves source identity, event time, and arrival time; checks quality against the configured profile; structures a consistent canonical operational record for Singularity.
  - **Repeated delivery (`Duplicate`):** Recognizes repeated delivery of the same event within the governed deduplication window, records the duplicate and arrival evidence, and prevents the repeated message from being applied a second time to current operational state.
  - **Delayed information (`Replay / backfill`):** Preserves the original source event time alongside the later arrival time, classifies the record as replay/backfill, and allows event-time history in Singularity to update while live decisions follow configured replay policy rather than treating delayed data as a new live event.
  - **Incomplete information (`Quarantined`):** Preserves the incoming record, source details, and arrival time for remediation and review, while quarantining the incomplete record so it cannot influence live operational state.
- **Boundary note:** Infinit-Signal qualifies incoming operational records and preserves source and timing evidence. It does not independently diagnose equipment problems, authorize physical actions, or verify operational recovery.

## D. Fit With Existing Systems

- **Eyebrow:** `BUILT AROUND YOUR EXISTING OPERATIONS`
- **H2:** `Keep the systems you rely on. Make their information more useful.`
- **Two-column comparison:**
  - **Your existing systems**
    - `Continue running equipment, monitoring, building, historian, and maintenance systems.`
    - `Remain the source of original operating records.`
    - `Work with your site’s security and access requirements.`
  - **Infinit-Signal**
    - `Receives configured operational inputs.`
    - `Checks timing, completeness, and consistency.`
    - `Preserves source details for review.`
    - `Passes reliable information into Singularity.`

## E. Connected Platform and Closing CTA

- **Heading:** `One connected platform, built on dependable information.`
- **Four linked product cards:**
  - **Infinit-Signal** (`/infinit-signal`, current page): `Brings in and checks operational data from your existing systems.`
  - **Singularity** (`/singularity`): `Connects equipment, systems, and history into shared context.`
  - **Infinit-Flow** (`/infinit-flow`): `Guides the work from issue to verified resolution.`
  - **Infinit-Control** (`/infinit-control`): `Gives operators and leaders a clear view of status and outcomes.`
- **Closing CTA:**
  - **Heading:** `See how your operating information becomes a foundation for action.`
  - **Primary CTA:** `Book a demo` -> `/demo`
  - **Secondary link:** `Explore Singularity` -> `/singularity`
