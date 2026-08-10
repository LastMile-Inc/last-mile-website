
# Last Mile Inc.

Official website for Last Mile Inc.

## Canonical website branch

The active reconciliation baseline is the `makeover` lineage. The default branch remains protected until the platform-first site passes founder review and is deliberately promoted.

## Running the code

Run `npm ci` to install dependencies and `npm run dev` to start the development server.

Run `npm run validate` before opening or updating a pull request.

## Content control

Public product claims and vocabulary are governed by `/content-source`. `npm run content:validate` rejects retired product names, unclassified ServiceNow-era material, committed QA artifacts, and any workflow that can publish the site.

The architecture review baseline is not automatically an approved public release. The website uses only the conservative claims registered in `content-source/public-claims.json`.

## Production deployment

There is no active GitHub Actions production deployment workflow. Production publishing requires a separately approved release procedure after founder review. Do not add scheduled synchronization, repository-writing automation, FTP mirroring, or deployment secrets to validation workflows.
