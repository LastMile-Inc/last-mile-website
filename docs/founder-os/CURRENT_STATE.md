# Current state

Updated: 2026-10-15

## Platform and public narrative

- Last Mile is being reconciled around an independent physical-operations platform.
- The canonical product set is Infinit-Signal, Singularity, Infinit-Flow, and Infinit-Control.
- Last Mile Platform Architecture r1.3 remains `UNDER_REVIEW`; it is not an approved public release.
- The public website is governed by the conservative claims authority chain declared in `content-source/public-claims.json`: release gate, detailed claims registry, route-use manifest, then rendered consumer.

## Website

- Stable repository ID 1147329489 now resolves to `LastMile-Inc/last-mile-website`.
- The approved reconciliation lineage is the exact `makeover` baseline.
- Phase 3 PR #8 and Phase 4 PR #9 are merged; the legacy catalog is removed from the active tree and preserved in Git history plus a dated recovery archive.
- No active website workflow deploys or writes catalog content.
- The current independent-hosting design review is based on main commit `d14c49d44aa2b80ad669621c8d3af8aa92577243` (PR #16), on branch `codex/website-design-review-2026-09-25`.
- The founder authorized transfer of the Homepage Concept into the company repository for direct editing and review through the existing `preview.lastmileinc.ai` tunnel on port 5173.
- Eight buyer-facing routes now carry the approved light design, Accountable Operations story, screenshot placeholders, and proactive personal-service promise. The earlier seven-section homepage restriction is superseded by the explicit redesign request.
- 2026-10-15: the homepage was recovered to the September design language as five sections (see `content-source/pages/home.md`). It no longer uses screenshot placeholders. Supporting routes, sitewide navigation, and the footer match baseline `cc0c329c`. The rejected ten-section overhaul is preserved on local branch `snapshot/homepage-overhaul-2026-10-15` and is not for merge.
- Service capabilities and the ambition to earn the highest service ratings are registered as founder-directed review-site commitments, not independently verified achievements or service-level guarantees.
- Demo and private-beta routes use the existing form integration; development mode does not send CRM submissions. Deeper existing pages retain their layout and routes.
- The port is editable React/TypeScript/CSS in the existing Vite project and has no ChatGPT Sites runtime dependency. See `docs/website-design-review.md`.
- Main, production hosting, tunnel settings, and GCP infrastructure are unchanged by this review increment.

## Foundation dependency

- `LastMile-Inc/P0_GCP_Foundation` PR #17 is merged.
- Build Readiness PR #23 is also merged at `da5a49fc82448c2e2c95be2c8c3d1efeffa0b09f`.
- No branch-protection rule was weakened and this website review performs no GCP mutation.

## Open ownership decision

- `rrunolfson/Last-Mile-Integrations` remains a private, personal-account repository containing historical ServiceNow Store integration source.
- It was inventoried but not altered, archived, or transferred because that ownership change needs a separate explicit decision.
