import { useMemo, useState } from "react";
import { ArrowRight, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { CtaLink } from "@/app/components/MarketingComponents";
import { SEO } from "@/app/components/SEO";
import { TrackedLink } from "@/app/components/TrackedLink";
import { operatingScenarioList, type OperatingScenario } from "@/app/pages/platformReferenceData";
import { useCaseVisuals } from "@/app/pages/useCaseVisuals";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";

type SortKey = "relevance" | "industry" | "problem" | "condition";

type ScenarioContext = {
  stakes: string;
  equipment: string;
  references: string[];
};

const industries = Array.from(new Set(operatingScenarioList.map((scenario) => scenario.industry)));

const scenarioContext: Record<OperatingScenario["key"], ScenarioContext> = {
  cooling: {
    stakes: "A stopped secondary pump leaves the hall one failure away from losing cooling protection.",
    equipment: "Secondary chilled-water pump",
    references: ["Uptime Tier redundancy", "ASHRAE TC 9.9"],
  },
  wastewater: {
    stakes: "A running pump is not enough when the wet well keeps rising and standby capacity is unavailable.",
    equipment: "Lift-station pumps and variable-frequency drives",
    references: ["EPA NPDES", "Sanitary sewer overflow prevention"],
  },
  air: {
    stakes: "Off-shift flow and pressure loss expose abnormal demand before the next production run.",
    equipment: "Rotary-screw compressors and distribution headers",
    references: ["DOE compressed-air guidance", "ISO 50001 context"],
  },
  refrigeration: {
    stakes: "Capacity loss appears in suction, superheat, fan current, and defrost behavior before product temperature crosses its limit.",
    equipment: "R-448A refrigeration rack and evaporator",
    references: ["FDA frozen-food guidance", "FSMA preventive controls"],
  },
};

const operatingPath = [
  { label: "Infinit-Signal", detail: "Qualify the source" },
  { label: "Singularity", detail: "Connect asset and condition" },
  { label: "Infinit-Flow", detail: "Coordinate approved work" },
  { label: "Infinit-Control", detail: "Keep the response visible" },
];

const operatingRecord = [
  ["Signal qualified", "The source, timestamp, and quality stay attached."],
  ["Owner accepted", "Responsibility and authority are visible."],
  ["Work completed", "Receipts return from the system that performed the work."],
  ["Return window passed", "Live measurements are checked against the site criteria."],
  ["Result recorded", "The next response starts with what the operation learned."],
];

export function UseCasesPage() {
  const description = "Explore four governed industrial use cases and see how Last Mile connects plant-floor signals, accountable work, and measured operating results.";
  const [query, setQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("relevance");

  const filteredScenarios = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const filtered = operatingScenarioList.filter((scenario) => {
      const context = scenarioContext[scenario.key];
      const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(scenario.industry);
      const searchable = [
        scenario.industry,
        scenario.operatingProblem,
        scenario.condition,
        scenario.conditionDetail,
        scenario.context,
        context.stakes,
        context.equipment,
        ...context.references,
        ...scenario.systems.flatMap((system) => [system.name, system.evidence]),
      ].join(" ").toLocaleLowerCase();
      return matchesIndustry && (!normalizedQuery || searchable.includes(normalizedQuery));
    });

    const sorted = [...filtered];
    if (sortBy === "industry") {
      sorted.sort((a, b) => a.industry.localeCompare(b.industry) || a.operatingProblem.localeCompare(b.operatingProblem));
    } else if (sortBy === "problem") {
      sorted.sort((a, b) => a.operatingProblem.localeCompare(b.operatingProblem) || a.industry.localeCompare(b.industry));
    } else if (sortBy === "condition") {
      sorted.sort((a, b) => a.condition.localeCompare(b.condition) || a.operatingProblem.localeCompare(b.operatingProblem));
    }

    return sorted;
  }, [query, selectedIndustries, sortBy]);

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((current) =>
      current.includes(industry)
        ? current.filter((item) => item !== industry)
        : [...current, industry],
    );
  };

  const resetFilters = () => {
    setQuery("");
    setSelectedIndustries([]);
  };

  const hasFilters = query.trim().length > 0 || selectedIndustries.length > 0;

  return (
    <>
      <SEO
        title="Industrial Operating Use Cases | Last Mile"
        description={description}
        canonicalPath="/use-cases"
        keywords="chilled-water pump redundancy, wastewater lift-station pumping capacity, compressed-air abnormal demand, cold-storage refrigeration capacity"
        jsonLd={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Use Cases", path: "/use-cases" },
        ])}
      />

      <main className="lm-v2-page lm-use-cases-page lm-use-cases-hub">
        <header className="lm-use-cases-hero-v2" aria-labelledby="use-cases-heading">
          <div className="lm-v2-container">
            <div className="lm-use-cases-hero-v2__layout">
              <div className="lm-use-cases-hero-v2__copy">
                <p className="lm-eyebrow">Representative Use Cases</p>
                <h1 id="use-cases-heading">Real Operations. Real Stakes. Accountable Execution.</h1>
                <p>
                  A pump can report running while capacity disappears. A work order can close while the equipment remains down. Last Mile keeps the condition, response, owner, and return readings together so teams can act on what is actually happening.
                </p>
              </div>
              <figure className="lm-use-cases-hero-v2__visual">
                <img
                  src="/images/use-cases/hub/operating-stakes-hero-v1.png"
                  alt="Chilled-water equipment and a compressed-air plant connected by a coordinated operating view"
                  fetchPriority="high"
                />
                <figcaption>Two operating environments. One accountable path from warning to measured recovery.</figcaption>
              </figure>
            </div>

            <div className="lm-use-cases-reality-rail" aria-label="The operator's reality">
              <p><span>01</span>The machine state is not the operating result.</p>
              <p><span>02</span>The next action must reach the right owner.</p>
              <p><span>03</span>Closure must match the return readings.</p>
            </div>
            <div className="lm-use-cases-reality-copy">
              <div><p className="lm-eyebrow">The Operator's Reality</p><h2>The alarm is only the beginning.</h2></div>
              <p>
                Data-center teams watch thermal headroom. Wastewater crews protect pumping capacity. Manufacturers defend air pressure during production. Cold-storage operators hold temperature through every door opening and defrost cycle. The standards and equipment differ, but the operating question is the same: who owns the response, what happens next, and what readings show the process is stable again?
              </p>
            </div>

          </div>
        </header>

        <section className="lm-use-cases-gateway" aria-labelledby="protocol-heading">
          <div className="lm-v2-container">
            <div className="lm-use-cases-gateway__heading">
              <p className="lm-eyebrow">From Plant Signal to Enterprise Action</p>
              <h2 id="protocol-heading">Keep the equipment context when the work crosses systems.</h2>
              <p>
                OPC UA, Modbus, BACnet, MQTT, and Sparkplug describe plant-floor reality in different ways. Last Mile keeps the source and operating context intact as the issue moves from a reading to an owned response.
              </p>
            </div>

            <div className="lm-use-cases-gateway__layout">
              <figure className="lm-use-cases-gateway__visual">
                <img
                  src="/images/use-cases/hub/protocol-to-action-v1.png"
                  alt="Industrial controllers, drives, and sensors feeding a central operating path connected to enterprise work systems"
                  loading="lazy"
                />
              </figure>

              <div className="lm-use-cases-path" aria-label="Last Mile protocol-to-action path">
                <div className="lm-use-cases-path__sources">
                  <span>OPC UA</span>
                  <span>Modbus</span>
                  <span>BACnet</span>
                  <span>MQTT</span>
                  <span>Sparkplug</span>
                </div>
                <ol>
                  {operatingPath.map((step) => (
                    <li key={step.label}>
                      <span aria-hidden="true" />
                      <div><strong>{step.label}</strong><small>{step.detail}</small></div>
                    </li>
                  ))}
                </ol>
                <div className="lm-use-cases-path__destination">
                  <strong>Customer-authorized work systems</strong>
                  <span>Operations, maintenance, field service, and enterprise workflows</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lm-use-cases-catalog-section" aria-labelledby="use-case-catalog-title">
          <div className="lm-v2-container">
            <div className="lm-catalog-section-head">
              <div>
                <p className="lm-eyebrow">Industry Use Cases</p>
                <h2 id="use-case-catalog-title">Find the operating problem your team already knows.</h2>
              </div>
              <p>
                Each use case begins with real equipment behavior, follows the people and systems involved, and ends with the measurements that determine whether the operation recovered.
              </p>
            </div>

            <div className="lm-use-case-catalog">
              <details className="lm-catalog-mobile-filters">
                <summary>
                  <SlidersHorizontal aria-hidden="true" />
                  Filter industries
                  <span>{selectedIndustries.length || "All"}</span>
                </summary>
                <FilterControls idPrefix="mobile" selectedIndustries={selectedIndustries} onToggle={toggleIndustry} onReset={resetFilters} />
              </details>

              <div className="lm-catalog-layout">
                <aside className="lm-catalog-filter-rail" aria-label="Use case filters">
                  <FilterControls idPrefix="desktop" selectedIndustries={selectedIndustries} onToggle={toggleIndustry} onReset={resetFilters} />
                </aside>

                <div className="lm-catalog-results">
                  <div className="lm-catalog-toolbar">
                    <div className="lm-catalog-search">
                      <label htmlFor="use-case-search">Search operating use cases</label>
                      <div>
                        <Search aria-hidden="true" />
                        <input
                          id="use-case-search"
                          type="search"
                          value={query}
                          onChange={(event) => setQuery(event.target.value)}
                          placeholder="Search equipment, conditions, industries, or systems"
                          aria-controls="use-case-results"
                        />
                      </div>
                    </div>
                    <div className="lm-catalog-sort-control">
                      <label htmlFor="use-case-sort" className="lm-catalog-sort-label">Sort by</label>
                      <select id="use-case-sort" className="lm-catalog-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value as SortKey)}>
                        <option value="relevance">Relevance</option>
                        <option value="industry">Industry (A-Z)</option>
                        <option value="problem">Use case (A-Z)</option>
                        <option value="condition">Condition (A-Z)</option>
                      </select>
                    </div>
                  </div>

                  <header className="lm-catalog-results__bar">
                    <p aria-live="polite">
                      <strong>{filteredScenarios.length}</strong> {filteredScenarios.length === 1 ? "use case" : "use cases"}
                    </p>
                    {hasFilters ? <button type="button" onClick={resetFilters}><RotateCcw aria-hidden="true" />Reset search and filters</button> : null}
                  </header>

                  <div id="use-case-results" className="lm-catalog-grid">
                    {filteredScenarios.map((scenario) => <CatalogCard key={scenario.key} scenario={scenario} />)}
                  </div>

                  {filteredScenarios.length === 0 ? (
                    <div className="lm-catalog-empty" role="status">
                      <Search aria-hidden="true" />
                      <h3>No use case matches those filters.</h3>
                      <p>Try a broader operating term or return to all four use cases.</p>
                      <button type="button" onClick={resetFilters}><RotateCcw aria-hidden="true" />Show all use cases</button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lm-use-cases-record" aria-labelledby="operating-record-heading">
          <div className="lm-v2-container">
            <div className="lm-use-cases-record__heading">
              <p className="lm-eyebrow">The Operating Record</p>
              <h2 id="operating-record-heading">A closed ticket is only one line in the story.</h2>
              <p>
                Last Mile keeps the source reading, qualified condition, owner, decisions, work receipts, and return measurements in time order. Teams can review what happened against their site procedures and regulatory obligations without rebuilding the record from inboxes and screenshots.
              </p>
            </div>

            <div className="lm-use-cases-record__layout">
              <figure className="lm-use-cases-record__image">
                <img
                  src="/images/use-cases/hub/operating-record-v1.png"
                  alt="Cold-storage operator reviewing a source-linked operating record on a rugged tablet"
                  loading="lazy"
                />
              </figure>

              <div className="lm-use-cases-record__story">
                <ol>
                  {operatingRecord.map(([title, detail]) => (
                    <li key={title}>
                      <span aria-hidden="true" />
                      <div><strong>{title}</strong><p>{detail}</p></div>
                    </li>
                  ))}
                </ol>
                <div className="lm-use-cases-record__action">
                  <p>Bring the equipment, the readings, the current handoffs, and the people who own the response.</p>
                  <CtaLink to="/contact?intent=operation">Configure Your Operating Case</CtaLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function FilterControls({ idPrefix, selectedIndustries, onToggle, onReset }: { idPrefix: string; selectedIndustries: string[]; onToggle: (industry: string) => void; onReset: () => void }) {
  return (
    <div className="lm-catalog-filter-controls">
      <div className="lm-catalog-filter-heading">
        <strong>Industry</strong>
        {selectedIndustries.length ? <button type="button" onClick={onReset}>Clear</button> : null}
      </div>
      <fieldset>
        <legend className="lm-visually-hidden">Filter by industry</legend>
        {industries.map((industry) => {
          const count = operatingScenarioList.filter((scenario) => scenario.industry === industry).length;
          const id = `${idPrefix}-industry-${industry.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
          return (
            <label key={industry} htmlFor={id}>
              <input
                id={id}
                type="checkbox"
                checked={selectedIndustries.includes(industry)}
                onChange={() => onToggle(industry)}
              />
              <span>{industry}</span>
              <small>{count}</small>
            </label>
          );
        })}
      </fieldset>
    </div>
  );
}

function CatalogCard({ scenario }: { scenario: OperatingScenario }) {
  const visual = useCaseVisuals[scenario.key];
  const context = scenarioContext[scenario.key];

  return (
    <article className="lm-catalog-card">
      <TrackedLink
        to={scenario.route}
        className="lm-catalog-card__link"
        eventName="cta_explore_platform_click"
        aria-label={`Open the ${scenario.menuLabel} use case`}
      >
        <figure className="lm-catalog-card__media">
          <img src={visual.src} alt={visual.alt} loading="lazy" />
          <figcaption>
            <h3><span>{scenario.industry}</span><strong>{scenario.operatingProblem}</strong></h3>
          </figcaption>
        </figure>
        <div className="lm-catalog-card__context">
          <p>{context.stakes}</p>
          <dl>
            <div><dt>Equipment</dt><dd>{context.equipment}</dd></div>
            <div><dt>Industry context</dt><dd>{context.references.join(" · ")}</dd></div>
          </dl>
          <span className="lm-catalog-card__open">Open use case <ArrowRight aria-hidden="true" /></span>
        </div>
      </TrackedLink>
    </article>
  );
}
