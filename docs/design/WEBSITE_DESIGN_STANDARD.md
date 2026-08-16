# Last Mile Website Design Standard

Status: founder-approved direction for local review implementation
Reference implementation: `/` in `src/app/pages/HomePage.tsx`
Palette authority: `AGENTS.md` and `src/styles/last-mile-system.css`

## Purpose

This standard preserves the level of clarity, art direction, and operational credibility established by the founder-approved homepage. The homepage is a quality reference, not a template to repeat literally. Every route must feel deliberately composed for its own job while remaining unmistakably part of the same Last Mile system.

## The governing idea

One page. One job. One narrative spine. A small number of visually distinct moments.

Every section must do at least one of the following:

- establish the operating problem;
- explain a mechanism or boundary;
- show how systems, people, evidence, or authority relate;
- demonstrate a controlled reference;
- quantify an operating consequence or measurable value.

If a section only restates an earlier promise, remove it.

## Editorial standard

### Write for comprehension

- Lead with the operational consequence, not the product abstraction.
- Prefer short declarative sentences and concrete verbs.
- Apply the spoken-language test: if an operator, maintenance leader, or buyer would not naturally say the sentence aloud, rewrite it.
- Do not use em dashes in public copy. Use a period, comma, colon, or a shorter sentence instead.
- Name the real-world problem and result before introducing the platform terminology behind them. Prefer "problem" and "verified fix" in a hero to "operational evidence" and "verified outcome"; use the precise technical terms where the page later explains how proof is established.
- State an idea once. Link to detail instead of repeating it.
- Apply the neighboring-copy test: a caption, callout, diagram label, proof line, or section introduction must add new information rather than paraphrase the text immediately beside it.
- Run `npm run copy:proximity` after messaging changes. Review repeated word roots and shared ideas across nearby headings, introductions, captions, and callouts. The report requires editorial judgment and does not authorize blind synonym replacement.
- Use industrial terms only when they add precision for an operator or buyer.
- Define a specialized term before relying on it.
- Distinguish designed capability, controlled reference behavior, and customer-production evidence in the relevant statement itself.
- Do not use standalone disclaimer, caveat, qualification, or proof-posture boxes on marketing pages. Put a necessary factual limit beside the specific measurement, action, source, or claim it qualifies.

### Copy budgets

Budgets are defaults; a page contract may set a lower limit.

| Page type | Major sections | Narrative copy |
| --- | ---: | ---: |
| Homepage | 5 | 500-750 words |
| Platform overview | 5-6 | 650-900 words |
| Product page | 4-5 | 450-700 words |
| Use-case catalog | 2-3 | 250-450 words plus controlled card data |
| Use-case detail | 6-8 | 700-1,100 words plus evidence tables |
| Resource index | 2-4 | 300-550 words plus resource metadata |
| Company or conversion page | 3-5 | 350-650 words |

Lists, evidence tables, measurement labels, navigation, and required legal-policy text are excluded from narrative counts but still require editing.

### Avoid

- stacked conceptual nouns that obscure the action;
- hero copy built from internal category language rather than the reader's real-world problem;
- generic claims such as "transform your operations";
- repeated platform definitions;
- two adjacent captions or labels that communicate the same progression in different words;
- unnecessary numbered cards;
- fake customer proof, logos, ROI, adoption, or performance claims;
- a generic closing CTA or next-step section added only to fill the bottom of a page.

## Visual composition

### Page rhythm

Use an intentional sequence of visual scales:

1. A decisive hero with one promise and one visual subject.
2. A large explanatory composition that makes the mechanism understandable.
3. A contrasting proof, operating state, or relationship view.
4. A concise final proof, operating consequence, or boundary.

Do not render every section as the same card grid. Adjacent sections should vary in composition while retaining the shared spacing, type, border, and palette system.

### Meaningful visuals

A visual must explain, orient, or prove something. Preferred forms include:

- art-directed industrial photography;
- spatial architecture and system-participation maps;
- continuous operating loops and process paths;
- connected-product compositions;
- operational state, measurement, or evidence views;
- focused interactive reference scenarios.

Small icons may support scanning but cannot carry the page's primary visual responsibility. Use substantial, product-specific or concept-specific iconography when icons are warranted.

### Image use

- Use authentic industrial environments and people when the page benefits from human context.
- Keep generated imagery inside the approved pale-blue, steel, grey, white, and ink system.
- Do not present generated imagery as a customer deployment, actual site, or evidence.
- Provide responsive derivatives and explicit dimensions.
- Keep essential meaning in accessible HTML rather than embedding it only in an image.

### Diagrams

- Prefer mathematically sharp SVG or code-native visuals.
- Use continuous relationships rather than disconnected SmartArt-style boxes.
- Keep labels large enough to scan at normal desktop and mobile sizes.
- Put supporting definitions in accessible HTML.
- Use motion only to clarify sequence or relationship; support reduced motion.

## Page archetypes

### Platform overview

Job: explain the architectural gap and how the complete platform closes it.

Recommended spine:

1. Platform promise and operating-state visual.
2. Existing-system boundary and what Last Mile adds.
3. Accountable Operations Loop in motion.
4. Connected Last Mile Products and collective verification.
5. One controlled reference that proves the operating model.


Vendor handoff detail belongs on the ecosystem route or behind progressive disclosure, not in the primary narrative.

### Product page

Job: make one product's responsibility, mechanism, and boundary memorable.

Recommended spine:

1. Product promise with a product-specific visual.
2. Input-to-output mechanism or operating surface.
3. One defining boundary or decision principle.
4. Its connection to the other Last Mile Products.
5. One evidence-based value or boundary.

Product pages must not become interchangeable feature lists.

### Use-case detail

Job: let an operator or buyer inspect one controlled condition-to-outcome contract.

Recommended spine:

1. Operating condition and consequence.
2. Evidence snapshot.
3. Response and participant path.
4. Authority and work-system boundary.
5. Recovery contract and result branches.
6. Full evidence or process detail by progressive disclosure.

### Resource index and article

Job: help a reader find or understand one body of knowledge.

Use search, taxonomy, diagrams, examples, and sources. Avoid marketing-section repetition inside technical articles.

### Company and conversion pages

Job: establish credibility or make a next step easy.

Use human context, specific company facts, process expectations, and concise forms. Do not reuse product architecture as filler.

## Shared interaction standard

- Keyboard and pointer interactions must expose the same information.
- Focus is always visible.
- Escape closes temporary UI and restores focus to its trigger.
- Interactive diagrams include accessible names and HTML equivalents.
- Mobile controls use native semantics where practical.
- Hover effects cannot be the sole source of information.
- Respect `prefers-reduced-motion`.

## Responsive standard

Review at minimum:

- 1440 × 900 desktop;
- 1280 × 800 desktop;
- 1024 × 768 tablet landscape;
- 768 × 1024 tablet portrait;
- 390 × 844 mobile.

At every size verify reading order, label size, tap targets, navigation, interactive state, and absence of horizontal overflow. Recompose visuals for mobile instead of only shrinking them.

## Implementation gates

Before a route is considered ready for founder review:

1. Its canonical page contract is current.
2. Its section count and copy budget are within contract.
3. Each major section adds a distinct idea.
4. The page contains at least one route-specific explanatory visual.
5. Shared palette tokens are used wherever practical.
6. Controlled claims match their registered wording.
7. Keyboard, focus, reduced motion, and responsive behavior are checked.
8. `npm run validate` and `git diff --check` pass.
9. Founder OS records are updated when the design changes an approved source relationship or decision.
10. No generic bottom-of-page CTA or next-step section has been added without an explicit route-specific founder request.

## Quality test

A successful Last Mile page should pass five questions:

1. Can the central promise be understood in five seconds?
2. Does each section add a new idea?
3. Is the primary visual explanatory rather than decorative?
4. Could a knowledgeable operator recognize the systems, evidence, or decisions being described?
5. Would removing another sentence make the meaning less precise rather than merely shorter?
