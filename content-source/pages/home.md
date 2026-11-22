---
content_id: PAGE-HOME-001
status: approved
owner: Website Product Marketing
last_reviewed: 2026-11-22
claim_maturity: [designed, demonstrated, perspective]
depends_on: [GOV-DOCTRINE-001, CLAIMS-REGISTRY-001]
used_by: [/]
---

# Home Page Contract and Copy

## October 2026 founder-directed recovery

On 2026-10-15 the founder rejected the ten-section homepage overhaul and directed a surgical recovery to the September 2026 review design (`cc0c329c`). The homepage keeps the September visual language—light blue, steel, grey, and white editorial layout, approved industrial imagery, the industry examples, and the service relationship—and is reduced to five main sections, each with one purpose. Header, footer, and any verified availability notice sit outside this count. This direction supersedes the September page sequence below; it does not release architecture r1.3 or authorize deployment.

Later on 2026-10-15 the founder accepted the recovered structure and design and supplied plain-language copy for plant managers, supervisors, and operators (copy-only update; layout, links, metadata, and the service commitments are unchanged). Avoid category jargon on the homepage, such as operational intelligence, operating context, orchestration, governed action, authorized automation, and verified operational outcomes.

## 1. Hero — identify the product and its value

**Eyebrow:** SOFTWARE FOR INDUSTRIAL OPERATIONS

**Heading:** Run your operation as one.

**Body:** Last Mile brings information from your equipment and business systems into one place. It uses AI to help your team spot problems and decide what to do next. Your team can assign work, automate approved tasks, and check that the equipment is working as expected afterward.

**Primary CTA:** Request a demo — /demo

**Secondary CTA:** Explore the platform — /platform

**Visual:** the approved industrial worker portrait card (`chuck.png` -> `/images/home/home-chuck-hero-{400,600,800,1086}.{avif,webp}` and `/images/home/home-chuck-hero.jpg`, native 1086×1448 portrait at 3:4 aspect ratio, superseding `Picture10(1).jpg`, without a caption strip over the portrait, alt `"Chuck wearing a blue hard hat and safety glasses on a factory floor."`). No screenshot placeholders, simulated dashboards, or process tables in the hero.

## 2. Inside Last Mile — show the product

Directed on 2026-11-22: this section replaces the conceptual platform overview illustration (`FROM WARNING TO RESOLUTION` / `See how the pieces come together.`) with a real product screenshot. The platform overview illustration remains on `/platform` inside the collapsed `How the four products work together` section.

**Eyebrow:** INSIDE LAST MILE

**Heading:** See the whole operation. Know where to look next.

**Body:** Bring site status, equipment information and the right contacts into one connected view. Start with the wider operation, then look more closely at the assets that need attention.

**Visual:** `Ops.png` (customer Operations Overview, globe presentation) delivered as `/images/product-views/operations-overview-{640,960,1280,1920,2880}.{avif,webp}` with `/images/product-views/operations-overview.jpg` fallback, shown across the content width at its native 16:10 proportion through the shared `ProductViewFigure` component (`src/app/content/productViews.ts`), lazy-loaded, with an `Enlarge screenshot` control.

**Image caption:** Operations overview: site status, incoming data and selected-site context in one place.

**Audience line:** Product screenshot · Example operating data.

**Links:**
- Request a demo — /demo
- Explore the product views — /platform#product-tour

The screenshot is unaltered product imagery with example operating data. Do not reuse its site counts, message totals, or other values as marketing statistics, customer traction, or performance benchmarks, and do not present the example company or sites as customers.

## 3. Industry relevance

**Eyebrow:** YOUR WORLD. YOUR LAST MILE.

**Heading:** Built for the operations you’re responsible for.

**Introduction:** Keep production moving, keep cooling equipment working, and get the right people involved when something needs attention.

Each tab is labeled “Example use.”

- **Manufacturing — Keep the line moving.** When a machine shows signs of trouble, help production and maintenance see the same information, agree on the next step, and keep each other informed. *Equipment condition · Production uptime · Clear responsibilities*
- **Data centers — Keep cooling problems from escalating.** When temperatures rise or cooling equipment needs attention, help the team see what changed, organize the response, and check that temperatures return to the expected range. *Cooling performance · Temperature checks · Clear responsibilities*
- **Cold storage — Keep stored goods at the right temperature.** When storage temperatures move outside the expected range, help the team investigate, organize the work, and check that cooling has recovered. *Storage temperatures · Cooling equipment · Clear responsibilities*

**Link:** Explore your industry — /industries

## 4. Service

**Heading:** Good Service Remembers... Great Service Anticipates.

**Introduction:** You should feel known, supported, and one step ahead. That’s the relationship we’re building into Last Mile from day one.

- People who know you. Named Cloud Operations engineers who get to know your team and operating priorities.
- A direct line, both ways. Built-in chat connects your team with our operations team.
- We make the first call. When Last Mile platform health checks flag an issue, we reach out directly.

**Link:** Explore our service approach — /our-service

## 5. Final CTA

**Heading:** Bring us the problem you’re tired of chasing.

**Body:** Show us where your team loses time chasing information or getting problems resolved. We’ll show you how Last Mile could help.

**CTA:** Book a demo — /demo

## Removed from the homepage

The loop tabs, the six-stage framework, product-view tabs and screenshot placeholders, the outcome strip, measurement lists, separate governance modules, buying FAQ, long meeting-expectation copy, defensive service disclaimers, and the large private-beta panel. Detailed material remains on /how-it-works, /platform, /our-service, and /private-beta. The footer keeps the private-beta link.

## Evidence and image boundaries

Industry examples and the cooling example are illustrative and contain no customer outcomes or unsupported performance numbers. Customer approval and operating rules stay explicit. Equipment evidence determines the outcome. The AI capability statement in the hero is founder-supplied copy (2026-10-15) and is not yet a separately registered claim in the claims registry.

## Service

Use the founder’s slogan exactly: Good Service Remembers...Great Service Anticipates.

The detailed service model is owned by PAGE-SUPPORTING-REVIEW-001 and CLM-SERVICE-001 through CLM-SERVICE-006. Link to /our-service. Contractual limits belong in detailed service material, not on the homepage.
