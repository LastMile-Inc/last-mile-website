# Decision log

## 2026-08-11 — current repository identity and completed baseline

Decision: retain stable repository ID 1147329489 under its current name, `LastMile-Inc/last-mile-website`, and record the earlier `LastMile-Inc/Thesite` name only as historical state. Website Phase 3 PR #8 and Phase 4 PR #9 are merged. `LastMile-Inc/P0_GCP_Foundation` PR #17 and Build Readiness PR #23 are also merged, with PR #23 at `da5a49fc82448c2e2c95be2c8c3d1efeffa0b09f`. These completed baselines do not authorize draft PR #12 to merge or deploy.

## 2026-08-11 — governed parallel website integration

Decision: transplant only checkpoint commit `be9b7c6b5f2cd90abd3df6a8b6a93e0d6099bf50` onto normalized main `358327618a7b6bbd7cccc5ea66a686c3a02608e9`, while retaining normalized governance and publishing authority. Exclude the superseded off-palette scenario and architecture images, keep the legacy catalog retired, and express scenario flow and product ownership through accessible code-native maps. Carry the result on `integration/website-parallel-refresh-2026-08-11` as a draft review change only; no merge or deployment is authorized.

## 2026-08-10 — platform-first canonical narrative

Decision: govern the website around Infinit-Signal, Singularity, Infinit-Flow, and Infinit-Control. Architecture r1.3 remains `UNDER_REVIEW`, and only registered conservative claims may be published.

## 2026-08-10 — exact website lineage

Decision: use the exact `makeover` branch as the website reconciliation baseline. Preserve `main` until review branches are validated and separately approved for merge.

## 2026-08-10 — repository transfer

Decision: transfer stable repository ID 1147329489 from `rrunolfson/Thesite` to `LastMile-Inc/Thesite` without renaming it. The transfer completed; no deployment was triggered.

## 2026-08-10 — legacy catalog disposition

Decision: remove the inactive ServiceNow-era catalog, generated API artifacts, catalog UI, and automation from the active website tree. Preserve exact recovery material in Git history and a dated archive. Keep historical newsroom and podcast records visibly classified.

## 2026-08-10 — protection boundaries

Decision: never weaken branch protection to complete a merge. Merges, deployment, GCP mutation, ownership/visibility changes, release of under-review architecture, and catalog revival require explicit founder approval at the action boundary.
