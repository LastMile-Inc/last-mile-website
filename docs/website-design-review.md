# Website design review: run and edit the source

This branch ports the approved Last Mile Homepage Concept into the company's existing React, TypeScript, and Vite website. It runs independently of ChatGPT Sites. There is no Sites account, API, hosting service, or deployment tool required to run it.

## Start on the test webserver

Use Node.js 24 (the same version as repository CI). From your existing repository checkout, with local work committed or stashed:

```sh
git fetch origin
git switch --track origin/codex/website-design-review-2026-09-25
npm ci
npm run dev
```

If the branch is already checked out locally, use `git switch codex/website-design-review-2026-09-25` and `git pull --ff-only` instead of the tracking command.

Vite listens on `0.0.0.0:5173` and explicitly accepts `preview.lastmileinc.ai`. Your existing tunnel can continue forwarding to port 5173. Once the server is running, open https://preview.lastmileinc.ai/. Stop the previous website process using port 5173 before starting this one. The server intentionally fails if that port is occupied rather than choosing a different port.

Keep this process running while the team reviews. Edits to source files update the browser through Vite. Restarting the host or closing its terminal may stop the process; use your existing process supervisor if it must stay up unattended.

## Where to edit

| Area | File or directory |
| --- | --- |
| Homepage | `src/app/pages/HomePage.tsx` |
| Supporting pages | `src/app/pages/{HowItWorks,Industries,WhyLastMile,OurService,About,Demo,PrivateBeta}Page.tsx` |
| Header, footer, repeated calls to action | `src/app/components/makeover/SiteShell.tsx` |
| Review-page styles | `src/styles/website-review.css` |
| Shared brand colors | `src/styles/last-mile-system.css` |
| Screenshot briefs | `src/app/content/productScreenshots.ts` |
| Screenshot placeholder component | `src/app/components/makeover/ProductShot.tsx` |
| Shared request form | `src/app/components/ContactLastMileForm.tsx` |
| Images | `public/images/` |
| Canonical homepage and supporting-page copy | `content-source/pages/home.md`, `content-source/pages/supporting-review.md` |
| Service claims and evidence status | `content-source/claims/claims-registry.md` |

The new design covers `/`, `/how-it-works`, `/industries`, `/why-last-mile`, `/our-service`, `/about`, `/demo`, and `/private-beta`. Existing deeper platform, product, scenario, resources, contact, and legal pages remain available with their established layout.

## Product screenshots to supply

1. The big picture: the product's operating overview, for the homepage hero.
2. Understand the issue: a real issue with equipment context and relevant history.
3. Coordinate the response: the same issue showing the next step, responsible people, and approvals.
4. Verify the result: the same issue showing the operating evidence after the response.
5. A direct conversation: the product's built-in chat with the Last Mile operations team.

Use anonymized, readable desktop captures, ideally 1600 × 1000 or larger. Each placeholder's “View image brief” interaction describes the intended content. Add final files under `public/images/product/` and replace the placeholder presentation in `ProductShot.tsx` while preserving captions and meaningful alternative text.

## Forms, review status, and publishing

`npm run dev` runs demo and beta requests in review mode: validation and success states work, but no requests are sent to the CRM. The production build retains the existing HubSpot submission integration. Its delivery must be checked before the public release.

The new pages are marked `noindex, nofollow` and the header identifies a team design review. Screenshot placeholders remain intentionally visible. Remove the review marker and deliberately update the indexing policy when approving a public release.

Run `npm run validate` before committing changes. The repository's content and claims rules still apply, so update canonical content and registered wording together when changing governed claims.

`npm run build` produces the standard `dist/` static website for your own hosting. Configure that host to serve `index.html` for client-side routes. The GitHub review branch does not merge or deploy anything. Production publishing remains a separate founder-approved step.
