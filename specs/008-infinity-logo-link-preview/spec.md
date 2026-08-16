# Feature 008: Infinity-logo link preview

## Purpose

Replace the legacy architecture image shown when the production domain is shared with the approved Last Mile blue and grey infinity-loop logo.

## Scope

- Point static Open Graph and Twitter metadata at `https://lastmileinc.ai/logo.png`.
- Use the source image's exact 1408 by 736 dimensions.
- Describe the image as the Last Mile blue and grey infinity-loop logo.
- Keep route-level metadata consistent with the static crawler metadata.
- Add a regression test that rejects the retired architecture preview.

## Out of scope

- Redesigning the logo, page content, navigation, application UI, product behavior, hosting, DNS, or production infrastructure.

## Acceptance criteria

1. The initial HTML contains the infinity-logo URL before JavaScript runs.
2. Open Graph includes the secure URL, PNG type, exact width, exact height, and accurate alt text.
3. Twitter metadata uses the same logo and alt text.
4. Route-level SEO defaults use the same logo metadata.
5. No active preview metadata references `last-mile-og` or the legacy architecture description.
6. Tests, production build, and published-output verification pass.
