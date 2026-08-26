# Enterprise Sales Narrative Specification

## Objective

Reposition the Last Mile website from a generic SaaS marketing posture to an enterprise-grade B2B narrative for Enterprise Architects, Plant Managers, and OT Engineers while preserving the governed four-product platform model.

## Experience architecture

The implementation keeps the existing route map and editorial component system, but changes the public journey in four coordinated ways:

1. Homepage messaging leads with the operating failure problem statement and the Accountable Operations Loop before any architecture-heavy exploration.
2. Homepage navigation introduces explicit audience signposts so visitors can self-select business or technical depth without being dropped into dense reference material accidentally.
3. Product pages keep their individual product responsibilities, but each page shows where that product sits inside one connected response spanning Infinit-Signal, Singularity, Infinit-Flow, and Infinit-Control.
4. Shared navigation, footer, and design tokens standardize the preferred language and primary accent treatment across the public site.

## Files and surfaces

- `content-source/public-claims.json`
- `content-source/claims/claims-registry.md`
- `content-source/governance/canonical-vocabulary.md`
- `content-source/pages/home.md`
- `content-source/pages/platform.md`
- `content-source/pages/infinit-signal.md`
- `content-source/pages/singularity.md`
- `content-source/pages/infinit-flow.md`
- `content-source/pages/infinit-control.md`
- `data/content-control/route-claims.json`
- `docs/founder-os/CURRENT_STATE.md`
- `docs/founder-os/DECISION_LOG.md`
- `docs/founder-os/LATEST_HANDOFF.md`
- `src/app/components/Navbar.tsx`
- `src/app/components/Footer.tsx`
- `src/app/components/NarrativeComponents.tsx`
- `src/app/content/siteContent.ts`
- `src/app/pages/HomePage.tsx`
- `src/app/pages/PlatformOverviewPage.tsx`
- `src/app/pages/InfinitSignalPage.tsx`
- `src/app/pages/SSOMPage.tsx`
- `src/app/pages/InfinitFlowPage.tsx`
- `src/app/pages/InfinitControlPage.tsx`
- `src/styles/theme.css`
- `src/styles/last-mile-system.css`
- `src/styles/site-v2.css`
- `src/styles/platform-recovery.css`

## Runtime behavior

- No new routes, APIs, forms, tracking contracts, or persisted client state are introduced.
- All new interactivity remains local React state and existing tracked links.
- Product-page connected-response framing is presentational only and reuses the current product route structure.

## Data flow

### Homepage audience signposting

1. The visitor lands on the homepage.
2. The hero frames the accountable-operations problem first.
3. Audience-path cards route the visitor to the most appropriate next page for their technical depth.

### Connected product framing

1. Each product page highlights one product in the shared connected-response strip.
2. The strip links to the other three product pages using existing tracked navigation.
3. The page body then explains the selected product's responsibility in more detail without implying it operates alone.

## Governance boundaries

- Keep the canonical public product model limited to Infinit-Signal, Singularity, Infinit-Flow, and Infinit-Control.
- Standardize public phrasing around **orchestration layer for physical operations** as the cross-system role descriptor.
- Preserve existing conservative claims boundaries: no production-scale performance, no autonomous plant control, no connector-certification claims, and no replacement claims for existing OT or enterprise systems.
- Keep technical reference material discoverable, but label it clearly enough that non-technical visitors stay on the operating narrative unless they intentionally choose depth.

## IAM and RBAC

No new runtime IAM or application RBAC is introduced.

| Surface | Access model | Change required |
| --- | --- | --- |
| Public route rendering | Anonymous read | None |
| Homepage and product-page interactivity | Local browser state only | None |
| Content governance | Repository write access under Founder OS process | No new role |

## Validation

- `npm run validate`
- `npm run build`
