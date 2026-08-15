---
content_id: PAGE-USECASES-001
status: approved
owner: Use-Case Product Marketing
last_reviewed: 2026-08-13
claim_maturity: [demonstrated]
depends_on: [USECASE-DC-COOLING-001, USECASE-WW-001, USECASE-AIR-001, USECASE-COLD-001, CLAIMS-REGISTRY-001]
used_by: [/use-cases, /use-cases/data-center-cooling, /use-cases/municipal-wastewater, /use-cases/manufacturing-compressed-air, /use-cases/cold-storage-refrigeration]
---

# Operating Use Cases Page and Shared Detail Contract

## Collection job

Present the four recognizable operating problems as a concise, searchable catalog using the canonical use-case contracts. The index is an orientation surface, not a compressed detail page.

The entire landing page is one continuous hero composition. Its eyebrow is `Representative Use Cases`. The introduction, search and sort toolbar, filters, result count, visual catalog, empty state, and closing action all remain within that single light canvas.

The catalog includes:

- a short hero establishing that operational technology and command-and-control needs span industries of every size and complexity;
- one prominent client-side search field aligned left on the same row as the right-aligned sort control. Their shared toolbar is exactly as wide as the two-column result grid below;
- an Industry filter with honest counts derived from the four canonical scenarios;
- a desktop filter rail and accessible mobile filter controls;
- a responsive visual card grid, result count, and no-results reset state; and
- one complete canonical route from every card.

At narrow widths, the shared search and sort toolbar stacks without reducing either control's touch target or changing its accessible label.

Each result is one substantial, clickable operating photograph. Its label contains only the canonical industry on the first line and the canonical use-case name on the second. The image uses a restrained blue-grey wash at rest and returns to full color with subtle motion on hover or keyboard focus. Condition, measurements, system participation, ownership, and recovery criteria remain on the detail route.

The primary navigation links directly to `/use-cases`. It does not enumerate scenario routes in a desktop dropdown or mobile disclosure; the searchable catalog is the single discovery surface as the collection grows.

Do not invent industries, customer deployments, product adoption, ROI, savings, or taxonomy for visual density. Use the governed use-case titles and data without adding standalone disclaimer or caveat boxes.

## Canonical routes

- `/use-cases/data-center-cooling`
- `/use-cases/municipal-wastewater`
- `/use-cases/manufacturing-compressed-air`
- `/use-cases/cold-storage-refrigeration`

The legacy `/data-center-cooling` route redirects permanently to the canonical cooling route. Competing older use-case aliases redirect and are not canonical destinations.

## Shared detail structure

Each detail page uses five economical story cards: The Issue, The Team, The Response, The Recovery, and The Result. On desktop, the cards form a restrained sticky stack as the reader follows the resolution. Each card sizes to its actual content, with no viewport-height minimum and no large unused interior areas. At tablet and mobile widths, the cards return to normal document flow. A small centered prompt between the hero and the cards reads `Keep scrolling to follow the entire resolution`. Do not place a sticky chapter bar above the cards. Every card and its lower controls must remain reachable at 1920×1080 and smaller laptop viewports.

Each card keeps the decisive operating view visible and places dense supporting evidence in a native disclosure. The complete canonical identity, full measurement set, system evidence table, human authority, detailed work handoffs, result branches, source basis, and process map remain available without forcing every reader through them. No governed data is removed.

Each individual use-case page ends with The Result card. Do not append a generic closing conversion section, next-step prompt, or repeated call to action after the story deck.

Every detail route uses a scenario-specific 16:9 industrial photograph. The same asset appears on the matching catalog card. Photography must show either the exact equipment class and operating context or, when that is not possible, a clearly recognizable high-quality view of the industry. Do not use generic industrial filler.

## Source control

All four use cases consume numerical values from the matching canonical use-case object through one typed scenario registry. Factual limits belong in the relevant measurement, result, or source field, not in a standalone disclaimer box.
