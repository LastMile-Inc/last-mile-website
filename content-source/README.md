# Last Mile Website Content Source

This directory is the control layer for public website language. It does not replace the private platform architecture repository.

Authority order:

1. Founder doctrine and canonical vocabulary
2. Approved platform architecture
3. Approved product specifications
4. Website claims registered in `public-claims.json`
5. Controlled content objects in this directory
6. Rendered pages and presentation assets

The synchronized r1.3 architecture corpus remains under review. It is referenced here only as the review baseline; it is not silently promoted to an approved release.

## Controlled content objects

Markdown content objects use stable `content_id` front matter and declare status, owner, review date, claim maturity, dependencies, and rendered consumers. Never recycle a content ID.

If a correction changes what Last Mile is, owns, supports, proves, or promises, update `public-claims.json` and the governing content object first. Layout, order, length, and audience phrasing may be handled by the applicable page contract.

Public copy may simplify canonical content but may not broaden scope, elevate maturity, collapse UNS, SSOM, and Singularity into one thing, describe reference integrations as validated, convert reference-scenario results into customer claims, or bypass customer safety and operational authority.

Run `npm run validate` before review or release. The normalized `content:validate` and `governance:validate` controls remain authoritative; supplemental content-control checks run under their own script names.
