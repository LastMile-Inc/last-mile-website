import { useMemo, useState } from "react";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { SEO } from "@/app/components/SEO";
import { TrackedLink } from "@/app/components/TrackedLink";
import { operatingScenarioList, type OperatingScenario } from "@/app/pages/platformReferenceData";
import { useCaseVisuals } from "@/app/pages/useCaseVisuals";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";

type SortKey = "relevance" | "industry" | "problem" | "condition";

const industries = Array.from(new Set(operatingScenarioList.map((scenario) => scenario.industry)));

export function UseCasesPage() {
  const description = "Browse industry-specific Last Mile reference scenarios and see how connected command, control, response, and verification can apply across physical operations.";
  const [query, setQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("relevance");

  const filteredScenarios = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const filtered = operatingScenarioList.filter((scenario) => {
      const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(scenario.industry);
      const searchable = [
        scenario.industry,
        scenario.operatingProblem,
        scenario.condition,
        scenario.conditionDetail,
        scenario.context,
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
      <div className="lm-v2-page lm-use-cases-page lm-catalog-page">
        <section className="lm-catalog-hero" aria-labelledby="use-cases-heading">
          <div className="lm-v2-container lm-catalog-hero__intro">
            <p className="lm-eyebrow">Representative Use Cases</p>
            <h1 id="use-cases-heading">Every Industry is different...yet all the same.</h1>
            <p>
              Last Mile has a place in every industry, regardless of size or complexity. Every industry relies on operational technology that requires command and control throughout its lifecycle. Browse these industry-specific scenarios and see firsthand how Last Mile could be applied in your operations.
            </p>
          </div>

          <div className="lm-use-case-catalog" aria-labelledby="use-case-catalog-heading">
            <div className="lm-v2-container">
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
                    <label htmlFor="use-case-search" id="use-case-catalog-heading">Search operating use cases</label>
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
                      <option value="problem">Scenario (A-Z)</option>
                      <option value="condition">Condition (A-Z)</option>
                    </select>
                  </div>
                </div>

                <header className="lm-catalog-results__bar">
                  <p aria-live="polite">
                    <strong>{filteredScenarios.length}</strong> {filteredScenarios.length === 1 ? "reference" : "references"}
                  </p>
                  {hasFilters ? <button type="button" onClick={resetFilters}><RotateCcw aria-hidden="true" />Reset search and filters</button> : null}
                </header>




                <div id="use-case-results" className="lm-catalog-grid">
                  {filteredScenarios.map((scenario) => <CatalogCard key={scenario.key} scenario={scenario} />)}
                </div>

                {filteredScenarios.length === 0 ? (
                  <div className="lm-catalog-empty" role="status">
                    <Search aria-hidden="true" />
                    <h2>No controlled reference matches those filters.</h2>
                    <p>Try a broader operating term or return to all four approved scenarios.</p>
                    <button type="button" onClick={resetFilters}><RotateCcw aria-hidden="true" />Show all references</button>
                  </div>
                ) : null}
              </div>
              </div>
            </div>
          </div>

        </section>
      </div>
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

  return (
    <article className="lm-catalog-card">
      <TrackedLink to={scenario.route} className="lm-catalog-card__media-link" eventName="cta_explore_platform_click" aria-label={`Inspect the ${scenario.menuLabel} reference scenario`}>
        <figure className="lm-catalog-card__media">
          <img src={visual.src} alt={visual.alt} loading="lazy" />
          <figcaption>
            <h2><span>{scenario.industry}:</span><strong>{scenario.operatingProblem}</strong></h2>
          </figcaption>
        </figure>
      </TrackedLink>
    </article>
  );
}
