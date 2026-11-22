---
content_id: PAGE-CONTROL-001
status: approved
owner: Infinit-Control Product Marketing
last_reviewed: 2026-11-22
claim_maturity: [designed, demonstrated]
depends_on: [PROD-CONTROL-001, CLAIMS-REGISTRY-001]
used_by: [/infinit-control]
---

# Infinit-Control Page Contract and Copy

## Job

Show how Infinit-Control gives each role a clear, governed view of operating conditions, responsibilities, work, and outcomes—with the context and authority needed to respond—and clearly distinguishes work status from established operating recovery.

## Hero

**Eyebrow:** INFINIT-CONTROL

**H1:** Know what needs action. See what changed.

**Body:** Give each role a clear view of operating conditions, responsibilities, work, and outcomes—with the context and authority needed to respond.

**Hero visual (2026-11-22):** `Asset_detail.png` (customer asset detail view) delivered as `/images/product-views/asset-detail-{640,960,1280,1920,2880}.{avif,webp}` with `.jpg` fallback, placed across the content width directly below the introductory text and buttons so the interface stays legible. It supersedes the `field-command-v2.png` concept illustration.

**Hero image caption:** Current readings, equipment details, active conditions and replacement history—together in the asset view.

**Audience line:** Product screenshot · Example operating data.

## Role-based explanation

Explain the questions each role needs answered using documented capabilities (`CLM-CTRL-001`, `CLM-CTRL-002`, `CLM-CTRL-003`) without implying unrestricted authority for every role:

- **Operators:** `What needs attention, and what can I do?`
- **Shift leads:** `Who owns the response, and where is progress blocked?`
- **Leaders:** `Where is risk accumulating, and what results have been established?`

## Shared oversight image (operations overview, map view)

After the role-based explanation, render `hud.png` (customer Operations Overview, flat-map presentation) delivered as `/images/product-views/operations-overview-map-{640,960,1280,1920,2880}.{avif,webp}` with `.jpg` fallback. It supersedes the `mission-control-v2.png` control-room concept illustration, and the former caption about an illustrative control room and physical hardware is removed because it no longer describes the image.

**Heading:** Keep the wider operation in view.

**Body:** See site status across your operation, then bring the selected site’s information and contacts into view. Give your team a shared starting point for understanding where attention is needed.

**Image caption:** Operations overview · Map view with selected-site context.

**Audience line:** Product screenshot · Example operating data.

`hud.png` and `Ops.png` are two presentations of the same operations overview, not separate products.

## Work status versus operating result

**Heading:** `The work is complete but, is the operation recovered?`

Keep the worked example and its interactive states. The product screenshots on this page show visibility, asset context, and conditions; they do not independently demonstrate completed work, approvals, or verified recovery.

The technical-details disclosure is not shown on this page.

Include a concise illustrative example reusing the approved Cooling Loop B (`CHWP-02` / `SAP WO-18427`) reference scenario to show that:
- Work status and operating condition are distinct.
- Completed work may still require additional evidence (in the `Work complete · Stability in progress` state, `Why` states `Pressure and the required stability window have not met the recovery criteria.` without duplicating the `Operating result` summary).
- Recovery is established using the relevant operating evidence.

Include the exact statement:
`Completed work is one milestone. Operating evidence determines whether recovery is established or further response is needed.`

Label synthetic/reference examples as illustrative and preserve `CLM-OUTCOME-001` / `CLM-CTRL-003` (`Stale, quarantined, unresolved, or missing inputs are shown as No valid data and cannot support a recovered result.`).
