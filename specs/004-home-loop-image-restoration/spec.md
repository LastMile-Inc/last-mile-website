# Feature 004: Home loop image restoration and centering

## Purpose

Correct the Home Accountable Operations Loop by restoring its original commissioned image and structurally centering it within the approved three-column layout.

## Scope

- Restore `accountable-operations-loop-v3.png`.
- Remove the superseded v4 loop image.
- Preserve the left and right phase-definition columns, wording, spacing, order, and interaction.
- Add a dedicated center container that uses Flexbox for vertical and horizontal centering.
- Retain the responsive tablet and phone layouts.

## Out of scope

- Redesigning the loop, rewriting phase definitions, changing controlled claims, or changing any other Home section.

## Acceptance criteria

1. Home loads the exact 1672 by 941 v3 source asset.
2. The v4 asset is neither referenced nor present.
3. Desktop retains three columns with the figure vertically centered between the definition stacks.
4. Centering uses Flexbox alignment and no padding offset.
5. Tablet and phone layouts have no horizontal overflow.
6. Repository and browser checks pass.

