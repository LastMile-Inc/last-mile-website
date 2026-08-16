# Feature 003: Interactive Infinit-Control role portal

## Purpose

Turn the approved light Infinit-Control hero concept into an interactive command portal that lets executives, plant managers, and operators inspect one operating case at the level needed for their decision.

## User need

A reader should be able to switch roles and immediately see how the same condition changes in scope without changing the underlying facts. The experience must feel like a precise enterprise engineering interface while remaining clear, responsive, and keyboard accessible.

## Scope

- Replace only the static hero image with a code-native interactive portal.
- Make EXEC, PLANT MGR, and OPERATOR real tabs with instant in-page updates.
- Give each role a distinct central diagram and four supporting measurements.
- Keep the same condition, asset, owner, work item, and current state visible in every view.
- Use white and light-grey surfaces with `#1D7CD8` for selected controls and active diagram points.
- Preserve the rest of the Infinit-Control page, controlled wording, claims, and safety boundaries.
- Add responsive, reduced-motion, accessible-name, keyboard, and regression coverage.

## Out of scope

- Rebuilding the page or replacing the established light visual system.
- Connecting the concept to live equipment, customer data, vendor systems, or cloud resources.
- Changing calculations, stored information, permissions, customer separation, ownership, control authority, or safety behavior.
- Presenting the concept interface or example measurements as deployed customer results.

## Acceptance criteria

1. PLANT MGR is the starting view and shows a facility plan with Bottling Hall 4 highlighted.
2. EXEC shows a regional portfolio map with exactly one illuminated `#1D7CD8` selected site and measurements scoped only to that site.
3. OPERATOR shows Bottling Line 4 with FIL-04 highlighted and line-level measurements.
4. Every view keeps the same filler-pressure condition, affected asset, owner, work item, and return-check status.
5. Tabs work by click and with Arrow Left, Arrow Right, Home, and End keys without a page refresh.
6. The portal contains no dark-mode surface, has visible focus, honors reduced-motion preferences, and has no horizontal overflow at desktop or 390-pixel phone width.
7. Controlled content, governance, editorial, type, lint, production build, published-output, file-format, and whitespace checks pass.

