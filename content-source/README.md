# Last Mile Website Content Source

This directory is the control layer for public website language. It does not replace the private platform architecture repository.

Authority order:

1. Founder doctrine and canonical vocabulary
2. Approved platform architecture
3. Approved product specifications
4. The review-site release gate and umbrella boundaries in `public-claims.json`
5. Detailed approved language, maturity, evidence scope, and prohibited inference in `claims/claims-registry.md`
6. Route-specific wording and render-consumer traceability in `../data/content-control/route-claims.json`
7. Controlled content objects in this directory
8. Rendered pages and presentation assets

The synchronized r1.3 architecture corpus remains under review. It is referenced here only as the review baseline; it is not silently promoted to an approved release.

## Controlled content objects

Markdown content objects use stable `content_id` front matter and declare status, owner, review date, claim maturity, dependencies, and rendered consumers. Never recycle a content ID.

`public-claims.json` is the release gate, not a second detailed registry. A route claim may publish only when the release gate permits the review-site posture, the detailed registry contains the claim and its conservative maturity, and the route-use manifest names both the approved route wording and the source consumer that renders it. The validator requires an exact wording match in that consumer so registry-to-page drift fails deterministically.

If a correction changes what Last Mile is, owns, supports, proves, or promises, update the release gate when its umbrella boundary changes, then update the detailed registry and governing content object before the route-use manifest and rendered page. Layout, order, length, and audience phrasing may be handled by the applicable page contract without broadening the registered claim.

Public copy may simplify canonical content but may not broaden scope, elevate maturity, collapse UNS, SSOM, and Singularity into one thing, describe reference integrations as validated, convert reference-scenario results into customer claims, or bypass customer safety and operational authority.

Run `npm run validate` before review or release. The normalized `content:validate` and `governance:validate` controls remain authoritative; supplemental content-control checks run under their own script names.
