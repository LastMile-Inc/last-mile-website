# Public Page Contract Template

Create the canonical contract under `content-source/pages/<route-name>.md` before materially redesigning the rendered route.

```markdown
---
content_id: PAGE-<ID>
status: review
owner: Product and Content Governance
last_reviewed: YYYY-MM-DD
claim_maturity: [designed]
depends_on: [GOV-CLAIMS-001]
used_by: [/route]
---

# <Page name> Contract and Copy

## Job

One sentence describing the decision this page helps the reader make.

## Audience

Primary reader, their operating context, and what they already know.

## Five-second promise

The single idea a reader should retain after scanning the hero.

## Narrative limits

- Major sections: <number>
- Narrative copy: <word range>
- Primary visual: <one explanatory visual idea>
- Supporting interactions: <only those that materially improve understanding>

## Page order

1. <Distinct narrative job>
2. <Distinct narrative job>
3. <Distinct narrative job>

## Hero

**Eyebrow:**

**Heading:**

**Body:**

**Primary CTA:**

**Secondary CTA:**

**Visual purpose:** What the visual explains; not merely its appearance.

## Section contracts

For each section include:

- narrative job;
- approved heading and core copy;
- visual or interaction purpose;
- controlled claim IDs, if any;
- required disclosure or boundary;
- exclusions and repetition to avoid.

## Responsive behavior

Describe how the primary composition changes on tablet and mobile.

## Exclusions

List unsupported claims, repeated sections, decorative treatments, and route-specific material that belongs elsewhere.
```

## Contract rules

- Canonical claims remain subject to `content-source/public-claims.json`, the detailed claims registry, and the route-use manifest.
- A design contract cannot promote under-review architecture to a released claim.
- Product ownership and system boundaries must remain exact.
- Controlled references must remain labeled as references rather than customer case studies.
- Do not add a section merely to fill an archetype slot.
