---
content_id: PAGE-PLATFORM-001
status: approved
owner: Platform Product Marketing
last_reviewed: 2026-10-26
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

**H1:** Turn operational complexity into proven outcomes.

**Body:** Last Mile brings equipment information, AI assistance, and everyday work into one connected platform. See what needs attention, organize the response, and check the result.

**Primary CTA:** Request a demo — /demo

**Secondary CTA:** Explore the four products — #products

**Visual:** Full-width cleaned platform overview illustration (`/images/platform/platform-overview-illustration-{640,800,1024}.{avif,webp}` and `/images/platform/platform-overview-illustration.jpg`, native 1024×470 derived from `last-mile-platform-overview-placemat.jpg`) with printed header, product-caption strip, and navy footer removed. Live HTML captions are aligned beneath the illustrated regions (`Your existing systems` on the left, followed by linked product captions for `Infinit-Signal — Reliable data from your existing systems.`, `Singularity — Understand your equipment in context.`, `Infinit-Flow (Optional) — Keep work moving across teams and systems.`, and `Infinit-Control — See what needs attention and what changed.`). On narrow screens, four intentional detail crops (`platform-overview-crop-signal`, `platform-overview-crop-singularity`, `platform-overview-crop-flow`, `platform-overview-crop-control`) are paired with the live HTML product captions and links. Do not show an `Illustrative platform view` label.

## 2. Products

**Heading:** Four products. / One connected operation.

Set the heading on two lines: `Four products.` and `One connected operation.` There is no introduction paragraph under the heading.

### Infinit-Signal — Bring scattered information together.

Equipment and business systems report information in different ways. Infinit-Signal brings that information together, checks it for problems, and prepares it for use across Last Mile.

- Collect information from connected systems.
- Check for missing, repeated, or outdated readings.
- Keep track of where information came from.

Link: Explore Infinit-Signal — /infinit-signal. Visual: 4:3 illustration (`/images/platform/platform-infinit-signal-{640,960,1280,1448}.{avif,webp}` and `/images/platform/platform-infinit-signal.png`, native 1448×1086 from `AI-Powered Factory Inspection Line.png`).

### Singularity — Give every reading its place in the bigger picture.

A reading means more when you know which equipment it belongs to, what that equipment supports, and what happened before. Singularity connects those details so people and AI can work with a shared understanding of the operation.

- Connect readings to the right equipment.
- Show how equipment and systems relate.
- Keep the history of issues, work, and results.

Link: Explore Singularity — /singularity. Visual: 4:3 illustration (`/images/platform/platform-singularity-{640,960,1280,1448}.{avif,webp}` and `/images/platform/platform-singularity.png`, native 1448×1086 from `Smart Water Treatment Plant Monitoring.png`).

### Infinit-Flow (Optional) — Turn the next step into organized work.

Display a small `Optional` product-information label beside the `Infinit-Flow` identifier.

Infinit-Flow helps your team assign work, get approvals, and coordinate tasks across people and systems. Approved tasks can run automatically where configured, while your team stays informed.

- Give tasks a clear owner.
- Request approval where needed.
- Automate approved tasks and track progress.

Link: Explore Infinit-Flow — /infinit-flow. Visual: 4:3 illustration (`/images/platform/platform-infinit-flow-{640,960,1280,1448}.{avif,webp}` and `/images/platform/platform-infinit-flow.png`, native 1448×1086 from `Precision Agriculture Teamwork at Golden Hour.png`).

### Infinit-Control — See what needs your attention.

Infinit-Control gives each person a view of the issues, work, and equipment that matter to their role. See who is responding, what has changed, and whether the equipment is performing as expected.

- See current issues and equipment information.
- Follow work and responsibilities.
- Review readings after the response.

Link: Explore Infinit-Control — /infinit-control. Visual: 4:3 illustration (`/images/platform/platform-infinit-control-{640,960,1280,1448}.{avif,webp}` and `/images/platform/platform-infinit-control.png`, native 1448×1086 from `Golden-Hour Oilfield Inspection.png`).

## 3. Built to fit your operation (`#built-for-your-operation`)

**Eyebrow:** BUILT TO FIT YOUR OPERATION

**Heading:** Your systems. Your standards. We’ve got you.

**Introduction:** You’ve invested in the equipment, software and standards that keep your business running. Last Mile builds on that foundation—connecting your existing systems, preserving the context your team relies on, and making operational information easier to use.

**Layout:** Four equal-width, equal-height panels in one horizontal row on desktop (`>= 1200px`), two columns on tablet (`768px–1199px`), and one column below `768px`:

### Column 1: We speak your language.

- **Top visual area:** A centered group of linked logos for `OPC UA` (`/images/platform/logos/opc-foundation-logo.jpg`, official OPC Foundation mark, linked to the OPC UA specification), `Modbus` (`/images/platform/logos/modbus-logo.svg`, linked to `https://www.modbus.org/`), `Rockwell` (`/images/platform/logos/rockwell-automation-logo.svg`, linked to `https://www.rockwellautomation.com/`), and `DNP3` (`/images/platform/logos/dnp-logo.jpg`, linked to `https://www.dnp.org/`). Keep each mark’s official colors. Center the group at the top of the panel.
- **Heading:** We speak your language.
- **Body:** Your operation runs on technologies chosen for a reason. Last Mile connects to PLCs and industrial systems through supported OPC UA, Modbus and DNP3 connections, bringing equipment information into a shared operational view.
- **Technology chips:** Compact, lightly tinted text chips (`PLCs`, `OPC UA`, `Modbus`, `DNP3`; `PLCs` treated as an equipment category; `OPC UA` linked to `https://opcfoundation.org/about/opc-technologies/opc-ua/`, `Modbus` linked to `https://www.modbus.org/`, and `DNP3` linked to `https://www.dnp.org/`).
- **Internal link:** Explore Infinit-Signal — `/infinit-signal`

### Column 2: Your names matter. Your context stays.

- **Top visual area:** Official International Society of Automation logo (`/images/platform/logos/isa-logo.svg`, taken from the public `isa.org` header mark) centered at the top of the panel and linked to `https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard` as the ISA-95 logo.
- **Heading:** Your names matter. Your context stays.
- **Body:** Your team has invested time in naming equipment and organizing how your operation fits together. If you already use a Unified Namespace (UNS), Last Mile preserves those names and relationships as it maps your information into an ISA-95-aligned operational model. (Link `ISA-95` to `https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard`.)
- **Internal link:** Explore Singularity — `/singularity`

### Column 3: Keep work moving with Infinit-Flow.

- **Top visual area:** Official horizontal SVG logo (`/images/platform/logos/n8n-logo-dark.svg` from `https://n8n.io/brandguidelines/`) linked to `https://n8n.io/` (`Visit n8n`), centered in the panel, with minimum width `>= 100` CSS px and clear space preserved. Do not show an `Optional` label in this panel.
- **Heading:** Keep work moving with Infinit-Flow.
- **Body:** Infinit-Flow uses embedded n8n technology to coordinate work across your people and systems. Add it when you want Last Mile to organize workflows, approvals and automated tasks.
- **Supporting line:** Infinit-Flow is an optional addition to the Last Mile platform.
- **Internal link:** Explore Infinit-Flow — `/infinit-flow`

### Column 4: Visibility into the service you rely on.

- **Top visual area:** Official horizontal color SVG logo (`/images/platform/logos/opentelemetry-horizontal-color.svg` from `https://github.com/cncf/artwork` under `projects/opentelemetry/horizontal/color/`) linked to `https://opentelemetry.io/` (`Visit OpenTelemetry`) and centered in the panel.
- **Heading:** Visibility into the service you rely on.
- **Body:** Last Mile uses OpenTelemetry to collect metrics, logs and traces from its cloud services, helping our team monitor performance and investigate problems.
- **Supporting line:** Platform monitoring is part of how we operate Last Mile.

Do not show a trademark attribution line under the grid, and do not show a closing transition that says `Bring us your systems list. We’ll help map the right starting point.`

## 4. Final invitation

**Heading:** See how Last Mile could work in your operation.

**Body:** Bring one problem your team spends too much time chasing. We’ll walk through the platform and discuss how it could fit your equipment, systems, and people.

**CTA:** Request a demo — /demo

## Evidence boundaries and pre-release technical/commercial confirmation register

The hero visual is the cleaned platform overview illustration (`platform-overview-illustration` and its four mobile detail crops, without an `Illustrative platform view` label), and the four product visuals are approved 4:3 illustrations (`platform-infinit-signal`, `platform-singularity`, `platform-infinit-flow`, `platform-infinit-control`) rather than live product screenshots or customer deployments.

The `#built-for-your-operation` section is built in preview on the review branch (`releaseStatus: UNDER_REVIEW`). Before public production release, the following specific sentences require technical-owner or commercial confirmation and must be withheld from production merge until verified:
1. `"Last Mile connects to PLCs and industrial systems through supported OPC UA, Modbus and DNP3 connections, bringing equipment information into a shared operational view."` (and `Modbus · DNP3` in the technology strip) — OPC UA source profiles and the open-protocol edge gateway workstream (`Last Mile Synapse`) are documented in architecture (`PROD-SIGNAL-001`, `CLM-SIG-002`, `CLM-IMPL-002`), whereas Modbus and DNP3 adapter/gateway requirements and production support scope await technical owner confirmation.
2. `"If you already use a Unified Namespace (UNS), Last Mile preserves those names and relationships as it maps your information into an ISA-95-aligned operational model."` — Source-to-SSOM crosswalks and preservation of source names/identifiers/relationships are documented in `PROD-SIGNAL-001` and `PROD-SINGULARITY-001`, whereas specific implemented ISA-95 model alignment rules await technical owner confirmation.
3. The live-import and SI-normalization sentences (`"Through supported live connections or imports..."`, `"Equipment names preserved."`, `"Existing relationships carried forward."`, `"Measurements made consistent."`, and `"No UNS yet? We can help establish the equipment context your team needs."`) were removed from this page on 2026-10-26. Do not restore them without technical owner confirmation. Minimum COR envelopes include value, unit, quantity kind, and conversion lineage (`PROD-SIGNAL-001`), whereas live structure import tooling and automated SI unit normalization scope remain unconfirmed.
4. The `Rockwell` logo in `We speak your language.` identifies Rockwell Automation equipment as a requested compatibility mark. It is not yet a registered connection claim. Do not add supporting Rockwell connection copy until a technical owner confirms the supported scope.
5. `"Infinit-Flow uses embedded n8n technology to coordinate work across your people and systems. Add it when you want Last Mile to organize workflows, approvals and automated tasks."` — Current product architecture (`PROD-FLOW-001`) references a durable workflow engine without recording embedded n8n implementation or commercial embedding license clearance in `IP_REGISTER.md`; both technical implementation and commercial rights require confirmation before public release.
6. `"Last Mile uses OpenTelemetry to collect metrics, logs and traces from its cloud services, helping our team monitor performance and investigate problems."` — Confirm with the technical owner that all three telemetry signals (`metrics, logs and traces`) are actively collected via OpenTelemetry in the cloud services environment before public release.
