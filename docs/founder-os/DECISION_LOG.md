# Decision log

## 2026-10-15 — buyer-facing /platform redesign

Decision: replace the `/platform` technical briefing with a buyer-facing overview built in four sections: a hero with a live-text platform map, four alternating product explanations, existing-system fit, and a demo invitation. Canonical contract: `content-source/pages/platform.md`. The route moves under the accepted homepage shell (`ReviewRoot`), which removes the nested main landmark and the separate legacy navigation and footer. The new page is `src/app/pages/PlatformPage.tsx` with route-only styles in `src/styles/platform-page.css`. `PlatformOverviewPage.tsx` and its technical components are retained, unrouted, for a future deeper demonstration. All visuals are concept illustrations; no verified product screenshot exists. Claim traceability for `/platform` now points to the new page, and the page links only to the architect reference center for technical depth. Also fixed: `SEO.tsx` had been deleting React 19's natively rendered head tags, so every route showed the homepage title and canonical. Static `index.html` fallbacks are now marked `data-static-head` and are the only tags removed. Review work is on local branch `review/platform-redesign-2026-10-15`; no merge or deployment.

## 2026-10-15 — plain-language homepage copy

Decision: the founder accepted the recovered homepage structure and design and supplied replacement copy written for plant managers, supervisors, and operators. Copy-only change to `/`; layout, links, CTAs, metadata, analytics, and the three service commitments are unchanged. Canonical copy is in `content-source/pages/home.md`. The homepage no longer uses the phrase "Accountable Operations", so the CLM-CAT-004 route use for `/` was removed; CLM-CAT-003 and CLM-OUTCOME-001 now trace to the new wording.

## 2026-10-15 — homepage recovery to the September design baseline

Decision: the founder rejected the ten-section homepage overhaul and its spillover into shared navigation, footer, and styles. Recover from baseline `cc0c329c` (the September review design) instead. The rejected overhaul is preserved, not merged, on local branch `snapshot/homepage-overhaul-2026-10-15` (`425c1181`), and the recovered pre-existing uncommitted `LaunchCountdownBanner.tsx` is in `75e48023`. The homepage becomes five sections (hero, problem and response, industry relevance, service, final CTA) built on the baseline's existing classes, with homepage-only styles scoped under `.lm-home`. All supporting routes, the sitewide navigation, and the footer return to baseline; screenshot comparison found no visible differences. Retained technical fixes: metadata deduplication, environment-aware robots (preview `noindex, nofollow` plus `X-Robots-Tag`; production `index, follow`), on-palette social image metadata, the structured-data description, CTA instrumentation, and review chrome hidden on `/` unless `?review=1`. The eager homepage import and font-loading change were not retained because neither had measured evidence of improvement. No countdown or availability notice is shown because no verified release date exists. Canonical contract: `content-source/pages/home.md`. No merge, deployment, or infrastructure change is included.

## 2026-09-25 — buyer website and proactive service review

Decision: carry the founder-approved Sites concept into a dedicated corporate-repository review branch based on current main at d14c49d44aa2b80ad669621c8d3af8aa92577243, which includes the previously reconciled work. Replace the buyer homepage and About page, add six supporting routes, and preserve the existing deeper resources and product routes. The founder explicitly authorized repository updates and confirmed the review hostname preview.lastmileinc.ai tunnels to Vite on port 5173. Keep that workflow and the current inquiry integration. Product screenshots remain intentional placeholders pending founder delivery. The service model and rating ambition are recorded conservatively in the release gate and claims registry. No merge, server deployment, infrastructure change, or architecture release is included. This supersedes the August homepage layout contract only for the approved redesign.

## 2026-08-26 — enterprise narrative and terminology standardization

Decision: standardize the public website narrative around the Accountable Operations Loop and the phrase **orchestration layer for physical operations**. Homepage discovery should lead with the operating-failure problem statement and audience signposting before architecture-heavy exploration. The four product pages must present Infinit-Signal, Singularity, Infinit-Flow, and Infinit-Control as one connected response rather than isolated applications.

## 2026-08-24 — PMO Implementation Hub review route

Decision: add a Resources-scoped PMO Implementation Hub route as reference implementation planning content only. The page may present phased rollout models, staffing estimates, and parallel-run governance as planning aids rather than customer commitments. "Last Mile Synapse" is restricted to the implementation label for the open-protocol edge gateway workstream that stages source acquisition for Infinit-Signal during rollout; it does not expand the canonical four-product public model.

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

## 2026-09-26 — Independent-hosting source handoff

The founder explicitly requested editable code in the corporate GitHub repository and declined ChatGPT Sites hosting for the release. The approved concept is now ported to the existing Vite app on the review branch `codex/website-design-review-2026-09-25`. `npm run validate` passes, including all 15 tests and the production build. The handoff guide documents port 5173, the existing preview tunnel hostname, editable source files, development-only form simulation, screenshot briefs, and remaining public-release review. Local browser access was unavailable for this port, so visual verification on the user’s test server remains explicit. No merge or deployment is authorized by this source handoff.
