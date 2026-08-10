# Last Mile Website Constitution

These instructions apply to the entire repository and to every Codex task performed in it.

## Color Theme: Non-Negotiable

The Last Mile website uses a pale-blue, steel, and neutral panel system. Maintain this system across every page, component, diagram, illustration, generated image, and responsive state unless the user explicitly approves a different palette.

Reference files:

- Visual reference: `public/images/Theme Colors.png`
- CSS source of truth: the `:root` design tokens in `src/styles/last-mile-system.css`

Approved palette:

| Role | Value | Token |
| --- | --- | --- |
| Surface | `#FFFFFF` | `--lm-surface` |
| Ink | `#263244` | `--lm-ink`, `--lm-deep` |
| Body copy | `#58687A` | `--lm-copy` |
| Canvas | `#F1F3F6` | `--lm-canvas` |
| Panel wash | `#E7EDF3` | `--lm-wash` |
| Primary blue | `#4C86C6` | `--lm-blue`, `--lm-cta` |
| Dark blue | `#315F91` | `--lm-blue-dark` |
| Blue-grey | `#5E8FAF` | `--lm-teal` |
| Pale blue | `#8BB4CF` | `--lm-mint` |
| Steel | `#A8BCCB` | `--lm-steel` |

The legacy token names `--lm-teal` and `--lm-mint` refer to approved blue-family colors. Their names are not permission to introduce teal-green or mint-green hues.

### Required visual treatment

- Use white content panels and cards on the very light grey canvas.
- Use pale blue or neutral washes sparingly for hierarchy.
- Use restrained blue-grey borders and subtle shadows.
- Use primary blue for calls to action, links, selected states, and controlled emphasis.
- Use ink primarily for headings, text, and fine details—not large page or section backgrounds.
- Keep all website images, diagrams, and generated visual assets within this palette. Preserve transparent backgrounds when the asset specification requires one.

### Prohibited treatment

- No green, sage, mint-green, neon, yellow-green, or ServiceNow-like hues.
- No black or near-black page sections.
- No broad dark-navy/ink section backgrounds.
- No page-local replacement palettes or near-duplicate hard-coded colors when an approved token is available.
- No gradients that drift outside the approved blue, steel, pale-grey, and white system.

If a genuinely new semantic color is required, derive it from the approved palette and define it centrally in `src/styles/last-mile-system.css`. Do not silently change the canonical palette.

## Visual Change Checklist

Before completing any visual change:

1. Confirm the component uses the shared `--lm-*` tokens wherever practical.
2. Search changed code and assets for unapproved green or dark-background colors.
3. Confirm white-panel/light-canvas hierarchy remains intact.
4. Check that diagrams and imagery coordinate with the same palette.
5. Run the repository's appropriate validation, including `npm run build` after meaningful frontend changes.

## Change Discipline

- Preserve approved page structure and content unless the user requests changes.
- Keep edits scoped to the requested outcome and do not redesign unrelated routes.
- Reuse established components and styles before creating page-specific alternatives.
- Do not overwrite unrelated work in a dirty worktree.

## Founder OS Workflow

Before changing product language, architecture claims, repository policy, publishing behavior, or ownership:

1. Read `docs/founder-os/CURRENT_STATE.md`, `docs/founder-os/IP_REGISTER.md`, `docs/founder-os/DECISION_LOG.md`, and `docs/founder-os/LATEST_HANDOFF.md`.
2. Read `content-source/control.json`, `content-source/public-claims.json`, and `content-source/repository-governance.json`.
3. Identify the canonical source for the proposed change and update it before any derivative page, generated artifact, or presentation.
4. Run `npm run validate`; do not bypass the content or governance validators.
5. Update the decision log and latest handoff when a decision, source-of-truth relationship, approval state, or unresolved blocker changes.

Founder approval is required before merging to the protected default branch, publishing or deploying the website, mutating GCP or production infrastructure, changing repository ownership or visibility, releasing architecture marked `UNDER_REVIEW`, or reviving the retired integration catalog. A task-scoped approval may authorize review branches and draft pull requests, but it does not imply approval for those gated actions.

Historical material must stay clearly labeled as historical. Do not turn archive content into a current claim or active product requirement without an explicit decision and source review.
