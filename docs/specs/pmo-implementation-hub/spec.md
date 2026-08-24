# PMO Implementation Hub Specification

## Objective

Add a governed public resource page at `/resources/pmo-implementation-hub` that helps implementation teams scope a phased Last Mile rollout without broadening the website's canonical four-product narrative.

## Experience architecture

The page is a client-side React route that follows the existing `site-v2` editorial system and is composed of four functional areas:

1. A hero and summary panel that frame the page as reference implementation guidance.
2. Two interactive planning calculators:
   - operations-response FTE model
   - rollout staffing model
3. A phase-by-phase rollout timeline with explicit entry focus, workstreams, and exit gates.
4. A Last Mile Synapse parallel-run schema showing how the edge-gateway workstream stages source acquisition for Infinit-Signal before governed cutover.

## Files and surfaces

- `src/app/routes.ts`
- `src/app/pages/PmoImplementationHubPage.tsx`
- `src/app/components/Navbar.tsx`
- `src/app/components/Footer.tsx`
- `src/app/pages/ResourcesPage.tsx`
- `src/styles/site-v2.css`
- `content-source/pages/pmo-implementation-hub.md`
- `content-source/public-claims.json`
- `content-source/claims/claims-registry.md`
- `data/content-control/route-claims.json`

## Runtime behavior

The page remains static at the network boundary:

- no fetches
- no new APIs
- no persisted user input
- no changes to forms, submission payloads, or tracking contracts

All interactive behavior is local React state plus deterministic derived calculations.

## Data flow

### Operations-response calculator

1. The visitor adjusts rollout assumptions with range and number inputs.
2. React state stores the raw inputs.
3. Derived metrics compute baseline hours, target hours, reclaimed hours, and reclaimed FTE in `useMemo`.
4. Rendered output updates immediately in summary cards.

### Rollout staffing calculator

1. The visitor adjusts waves, source systems, parallel-run duration, and review cadence.
2. React state stores the inputs.
3. Derived metrics compute reference PMO, OT/data, workflow, and site-readiness staffing during an active wave.
4. Rendered output updates immediately in summary cards.

### Rollout timeline

1. A selected phase ID is stored in component state.
2. The selected phase drives the detail panel for focus, workstreams, deliverables, and exit gates.

### Synapse parallel-run schema

1. A selected schema mode ID is stored in component state.
2. The selected mode drives four synchronized columns:
   - current stack
   - Last Mile Synapse
   - Singularity and SSOM
   - response governance

## Governance boundaries

- The route is informational and reference-only.
- The calculators must be labeled as planning aids, not savings claims or delivery commitments.
- The page must preserve the public four-product model: Infinit-Signal, Singularity, Infinit-Flow, and Infinit-Control.
- "Last Mile Synapse" must be constrained to implementation language for the edge-gateway workstream and not presented as a fifth released public product.

## IAM and RBAC

No new runtime IAM or application RBAC is introduced.

| Surface | Access model | Change required |
| --- | --- | --- |
| Public route rendering | Anonymous read | None |
| Calculator interaction | Local browser state only | None |
| Content authoring | Repository write access under existing governance | No new role |
| Public-claims approval | Founder-gated review-site governance | Existing process only |

## Validation

- `npm run validate`

