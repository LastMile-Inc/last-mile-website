
# Last Mile Inc.

Official website for Last Mile Inc.

## Canonical website branch

The editable design review is on `codex/website-design-review-2026-09-25`, based on main commit `d14c49d44aa2b80ad669621c8d3af8aa92577243`. See [the run and edit guide](docs/website-design-review.md) for the exact checkout commands, screenshot locations, and review notes. Merge and production publishing remain subject to founder approval.

## Running the code

Use Node.js 24. Run `npm ci` to install dependencies and `npm run dev` to start the development server on `0.0.0.0:5173`. The existing tunnel hostname `preview.lastmileinc.ai` is allowed. This source runs independently of ChatGPT Sites.

Run `npm run validate` before opening or updating a pull request.

## Content control

Public product claims and vocabulary are governed by `/content-source`. `npm run content:validate` rejects retired product names, unclassified ServiceNow-era material, committed QA artifacts, and any workflow that can publish the site.

The architecture review baseline is not automatically an approved public release. The website uses only the conservative claims registered in `content-source/public-claims.json`.

## Historical integration catalog

The earlier ServiceNow-focused vendor catalog, generated API artifacts, and scraper utilities were removed from the active website tree in Phase 4. Their disposition and recovery controls are recorded in `docs/archive/legacy-integration-catalog.md`; Git history and a dated recovery package preserve the underlying material.

## Production deployment

There is no active GitHub Actions production deployment workflow. Production publishing requires a separately approved release procedure after founder review. Do not add scheduled synchronization, repository-writing automation, FTP mirroring, or deployment secrets to validation workflows.
