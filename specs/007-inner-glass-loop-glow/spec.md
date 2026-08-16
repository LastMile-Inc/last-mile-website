# Feature 007: Inner-glass loop glow correction

## Purpose

Correct the reviewed Accountable Operations Loop illumination without changing the approved page structure, commissioned image, phase copy, or trigger logic.

## Scope

- Remove the six clipped raster wedges and all loop polygon clipping.
- Keep the commissioned `accountable-operations-loop-v3.png` as the neutral visual surface.
- Trace six smooth SVG paths through the inner glass rails.
- Reveal the commissioned color beneath each rail through a feathered SVG mask.
- Add a light-to-dark gradient anchored on Corporate Blue `#1D7CD8`.
- Give the matching definition the same gradient while its rail is active.
- Preserve the one-pass Evidence-to-Verify opening sequence, neutral finish, hover linkage, focus linkage, and reduced-motion behavior.
- Leave the approved Infinit-Control portal unchanged.

## Out of scope

- Replacing or regenerating the ring image.
- Rebuilding the Home section or changing phase definitions.
- Changing calculations, data, security, permissions, customer boundaries, equipment control, safety behavior, cloud resources, or deployment state.

## Acceptance criteria

1. No loop illumination class uses a CSS polygon or clipped raster wedge.
2. Six feathered SVG masks reveal color only along smooth inner-glass paths.
3. Active light uses `#DFF6FF`, `#70C8FF`, and `#1D7CD8` as one progressive gradient.
4. The matching definition uses the same gradient and retains readable dark text.
5. Exactly one rail and definition are active at each opening-sequence step.
6. The loop returns to neutral after Verify.
7. Hovering or focusing the image rail or definition activates both.
8. Reduced-motion users skip the timed sequence but retain direct interaction.
9. Desktop and phone layouts have no horizontal overflow.
10. Focused tests, full validation, and real-browser review pass.
