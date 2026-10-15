---
content_id: PAGE-PLATFORM-001
status: approved
owner: Platform Product Marketing
last_reviewed: 2026-10-15
claim_maturity: [designed, demonstrated]
depends_on: [GOV-DOCTRINE-001, CLAIMS-REGISTRY-001]
used_by: [/platform]
---

# Platform Page Contract and Copy

## October 2026 founder-directed redesign

On 2026-10-15 the founder directed a buyer-facing redesign of `/platform` only. The page answers: “What does this software let my team do, and how do its parts work together?” It uses the accepted homepage shell (same header and footer, one main landmark), one platform overview visual, and four product explanations. The previous technical briefing (cooling measurement panel, six-stage simulation, result selector, response sidebar, ownership lists, handoff dictionary, embedded architecture, and use-case viewer) is removed from this route. Its source remains in `src/app/pages/PlatformOverviewPage.tsx` and deeper routes; it is not deleted. This contract supersedes the August 2026 platform copy.

Write for operators and managers. Product names may appear; explain each immediately in plain language. Do not use: canonical identity, qualified Condition, SSOM-conformant, governed operational memory, time-correct evidence chain, return telemetry, measurement contract, authority boundaries, role-based command surfaces, orchestration layer.

## 1. Hero

**Eyebrow:** THE LAST MILE PLATFORM

**H1:** Bring your systems and your team together.

**Body:** Last Mile brings equipment information, AI assistance, and everyday work into one connected platform. See what needs attention, organize the response, and check the result.

**Primary CTA:** Book a demo — /demo

**Secondary CTA:** Explore the four products — #products

**Visual (concept illustration, live HTML text):** existing equipment and business systems → a bounded Last Mile platform → your team. Inside the platform: Infinit-Signal — Bring information together; Singularity — Understand your operation (shown as shared information used across the platform); Infinit-Flow — Organize the work; Infinit-Control — See and manage what matters. Conceptual only; no integration paths or control relationships.

## 2. Products

**Heading:** Four products. One connected operation.

**Introduction:** Each part has a clear job. Together, they help your team work with the same information and keep the response moving.

### Infinit-Signal — Bring scattered information together.

Equipment and business systems report information in different ways. Infinit-Signal brings that information together, checks it for problems, and prepares it for use across Last Mile.

- Collect information from connected systems.
- Check for missing, repeated, or outdated readings.
- Keep track of where information came from.

Link: Explore Infinit-Signal — /infinit-signal. Visual: three differently named versions of the same reading (one repeated reading set aside) become one consistent record. Concept illustration.

### Singularity — Give every reading its place in the bigger picture.

A reading means more when you know which equipment it belongs to, what that equipment supports, and what happened before. Singularity connects those details so people and AI can work with a shared understanding of the operation.

- Connect readings to the right equipment.
- Show how equipment and systems relate.
- Keep the history of issues, work, and results.

Link: Explore Singularity — /singularity. Visual: readings → selected Pump 2 → supports → Cooling system, with a three-entry history. Concept illustration.

### Infinit-Flow — Turn the next step into organized work.

Infinit-Flow helps your team assign work, get approvals, and coordinate tasks across people and systems. Approved tasks can run automatically where configured, while your team stays informed.

- Give tasks a clear owner.
- Request approval where needed.
- Automate approved tasks and track progress.

Link: Explore Infinit-Flow — /infinit-flow. Visual: issue reviewed → approval requested → task assigned → progress recorded, with the note “Finishing the task doesn’t prove the equipment has recovered. The team checks the readings afterward.” (CLM-FLOW-004, CLM-OUTCOME-001). Concept illustration.

### Infinit-Control — See what needs your attention.

Infinit-Control gives each person a view of the issues, work, and equipment that matter to their role. See who is responding, what has changed, and whether the equipment is performing as expected.

- See current issues and equipment information.
- Follow work and responsibilities.
- Review readings after the response.

Link: Explore Infinit-Control — /infinit-control. Visual: “Concept illustration · not a product screen” showing one issue, who is responding, work state, and readings returning into an unlabeled expected range. No verified product screenshot exists yet; replace with an approved capture when supplied.

## 3. Existing systems

**Heading:** Work with the systems you already use.

**Body:** Last Mile connects information and work across your existing equipment and business software. We’ll review your systems with you to confirm the connections and starting scope.

- Equipment and controls — Readings, operating status, and warnings.
- Business and maintenance systems — Equipment records, work orders, and updates.
- People and service teams — Responsibilities, approvals, and progress.

Discreet link: Explore technical details — /resources/architect-reference-center. No vendor lists; do not imply every system or integration is supported or production-ready.

## 4. Final invitation

**Heading:** See how Last Mile could work in your operation.

**Body:** Bring one problem your team spends too much time chasing. We’ll walk through the platform and discuss how it could fit your equipment, systems, and people.

**CTA:** Book a demo — /demo

## Evidence boundaries

All five visuals are concept illustrations built in HTML/CSS/SVG with live text; none is a product screenshot. They contain no customer names, results, measurements, or vendor integrations. Pump 2 and the roles shown are generic examples.
