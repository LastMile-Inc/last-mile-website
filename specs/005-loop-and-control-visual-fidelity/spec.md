# Feature 005: Loop cleanup and control-portal visual fidelity

## Purpose

Correct two contained visual regressions without rebuilding either page: remove the framing and overlays from the restored Home loop image, and restore engineering-grade detail to the existing interactive Infinit-Control portal.

## Scope

- Keep the Home three-column phase layout, current definition wording, and structural centering.
- Remove the Home loop figure's grey fill, border, shadow, center oval, and overlapping text.
- Keep the existing EXEC, PLANT MGR, and OPERATOR tab behavior and shared operating case.
- Give each role a distinct high-detail light engineering plate at native 1672 by 941 resolution.
- Add dense supporting panels with role-specific measurements, status, sparklines, progress bands, and compact comparison rows.
- Preserve the approved white, pale-grey, steel, ink, and Corporate Blue `#1D7CD8` visual system.

## Out of scope

- A site teardown, page restructuring, controlled-claim change, live customer data, a production dashboard claim, equipment control, permission changes, deployment, or merge.

## Acceptance criteria

1. The original Home loop image has no visible frame, grey container fill, shadow, center oval, or overlapping copy.
2. The Home image uses the full available center-column width and remains structurally centered.
3. All three Infinit-Control role tabs continue to update without a page refresh and support arrow, Home, and End keys.
4. EXEC shows a detailed portfolio map with exactly one blue selected site.
5. PLANT MGR shows a detailed industrial plant drawing with structural nodes and active data paths.
6. OPERATOR shows a detailed Bottling Line 4 drawing with a visibly identified filler station.
7. Each role displays four dense supporting panels, including the founder-specified measurements.
8. Desktop and 390-pixel phone layouts have no horizontal overflow.
9. Repository and real-browser checks pass.
