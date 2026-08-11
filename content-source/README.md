# Content Source

This directory is the website's controlled intellectual foundation. Each Markdown file is both human-readable and machine-addressable through its front matter `content_id`.

## Required fields

Every content object declares:

- `content_id`: stable identifier; never recycle it.
- `status`: draft, approved, superseded, or archived.
- `owner`: accountable role.
- `last_reviewed`: ISO date.
- `claim_maturity`: one or more allowed maturity states.
- `depends_on`: governing content IDs.
- `used_by`: routes or artifacts that render the object.

## Change rule

If a correction changes what Last Mile is, owns, supports, proves, or promises, change the governing content object and claims registry first. If it changes only order, length, layout, or audience phrasing, change the page contract.

## Publication rule

Public copy may simplify canonical content but may not:

- broaden scope;
- elevate maturity;
- collapse UNS, SSOM, and Singularity into one thing;
- describe reference integrations as validated;
- convert reference-scenario results into customer claims;
- imply that software closes the loop by bypassing customer safety or operational authority.
