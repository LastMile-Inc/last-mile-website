---
content_id: GOV-CHANGE-001
status: approved
owner: Content Governance
last_reviewed: 2026-08-06
claim_maturity: [designed]
depends_on: [GOV-DOCTRINE-001, GOV-VOCAB-001, GOV-CLAIMS-001]
used_by: [all]
---

# Canonical Content Change Control

## Change classes

| Class | Example | Required action |
|---|---|---|
| Canonical truth | Product rename or responsibility change | Update doctrine/vocabulary/product contract; impact-scan all dependents. |
| Claim/evidence | Connector validated or demo completed | Update claim record, maturity, evidence, and permitted wording. |
| Scenario data | Pressure band or recovery duration changes | Update the use-case contract and automated calculations; re-render every consumer. |
| Page presentation | Section too long or order changes | Update only the page contract unless meaning changes. |
| External concept | Standard revision or new industrial pattern | Update concept source basis, boundary, and last-reviewed date. |

## Workflow

1. Open a change record with problem, proposed canonical change, owner, and affected IDs.
2. Identify dependencies through `depends_on` and `used_by`.
3. Resolve architecture, claim, and industrial-domain review.
4. Update governing objects before derivatives.
5. Run terminology, maturity, numerical, link, and route-scope tests.
6. Obtain approval from the required owners.
7. Publish one versioned release and archive the prior version.

## Page-authoring instruction

Use the governing content sources as authoritative. Render and adapt them for the specified audience and route. Do not reconstruct Last Mile's product position, invent claims, rename concepts, change maturity, or copy competing explanations from other pages.

## Versioning

- Patch: wording or formatting with no semantic change.
- Minor: additive capability, concept, scenario, or page contract that preserves doctrine.
- Major: product boundary, canonical data rule, category, claim-state model, or authority change.

## Emergency correction

Unsupported or hazardous public copy may be removed immediately. The governing source must then be corrected within one business day, with a release note explaining the issue and dependent content reviewed.

## Definition of done

A change is complete only when governing content, claims, page consumers, tests, release notes, and archives agree. Updating the rendered page alone is incomplete.
