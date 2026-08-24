# Customer Architect Reference Center

## Purpose

Add a public review-site route for customer architects who need a practical reference center for protocol fit, telemetry sizing, zero-trust deployment posture, and control-mapping downloads.

The route must stay conservative:

- It may describe designed and reference-architecture behavior.
- It may not imply production certification, connector certification, or customer compliance proof.
- It must stay aligned with the existing Last Mile product model: Infinit-Signal, Singularity, Infinit-Flow, and Infinit-Control.

## Route and UX scope

- Canonical route: `/resources/architect-reference-center`
- Discoverability surfaces:
  - `src/app/routes.ts`
  - `src/app/components/Navbar.tsx`
  - `src/app/components/Footer.tsx`
  - `src/app/pages/ResourcesPage.tsx`
- SEO:
  - Shared `SEO` component
  - Correct title, description, canonical path, and breadcrumb JSON-LD

## Feature modules

### 1. Protocol compatibility calculator

Interactive reference-fit calculator for common source families and deployment objectives.

Inputs:

- Source family / protocol pattern
- Trust-boundary posture
- Operational objective

Outputs:

- Fit score by product surface
- Recommended deployment note
- Governance note clarifying reference-architecture scope

### 2. Telemetry bandwidth estimator

Interactive estimator for telemetry volume and retention footprint.

Inputs:

- Asset count
- Measurements per asset
- Sampling interval
- Payload size
- Overhead / redundancy multiplier

Outputs:

- Messages per second
- Daily ingress
- Warm-retention footprint
- 24-hour accumulation chart
- Recommended backhaul posture

### 3. Zero-trust encryption architecture diagrams

Code-native, accessible diagrams for:

- Site boundary acquisition
- Encrypted transport and control plane
- Governed response and authority boundary

Each view must clearly separate:

- Customer OT / site authority
- Boundary-local collection
- Last Mile control plane
- Human authority for consequential physical action

### 4. Downloadable control-mapping matrices

Provide downloadable CSV artifacts for:

- SOC 2
- ISO/IEC 27001
- IEC 62443

These are reference control mappings for architecture review only, not attestation artifacts.

## Data flow

1. Static route renders from Vite bundle with no backend dependency.
2. Interactive calculators execute entirely in-browser.
3. Download links resolve to versioned static CSV files under `public/downloads/architect-reference/`.
4. No customer input is transmitted, stored, or processed server-side.

## IAM / RBAC

Current implementation is a public website route with no authenticated workflow and no GCP mutation.

- Public website visitor: may view the page and download static reference matrices.
- No privileged RBAC path is introduced in this phase.
- No service account, API credential, or tenant-scoped data path is added.

If this evolves into a private customer portal later, that work should introduce explicit authenticated viewer roles and signed download delivery as a separate phase.

## Files expected

- `docs/specs/architect-reference-portal/spec.md`
- `docs/specs/architect-reference-portal/plan.md`
- `docs/specs/architect-reference-portal/tasks.md`
- `src/app/pages/ArchitectReferenceCenterPage.tsx`
- `src/app/pages/architectReferenceData.ts`
- `public/downloads/architect-reference/*.csv`
- Route and navigation updates in existing app files

## Validation

- `npm run validate`

