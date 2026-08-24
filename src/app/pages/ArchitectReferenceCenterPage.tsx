import { Suspense, lazy, type ReactNode } from "react";
import {
  ArrowRight,
  Download,
  Gauge,
  LockKeyhole,
  ShieldCheck,
  Waypoints,
  Workflow,
} from "lucide-react";
import { SEO } from "@/app/components/SEO";
import {
  EditorialHero,
  EditorialSection,
  NextStep,
} from "@/app/components/NarrativeComponents";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";
import {
  complianceMatrices,
  zeroTrustViews,
} from "./architectReferenceData";

const ArchitectReferenceInteractiveSections = lazy(() =>
  import("./ArchitectReferenceInteractiveSections").then((module) => ({
    default: module.ArchitectReferenceInteractiveSections,
  })),
);

export function ArchitectReferenceCenterPage() {
  const description =
    "Customer architect reference center for protocol-fit evaluation, telemetry sizing, zero-trust deployment posture, and downloadable Last Mile security control mappings.";

  return (
    <>
      <SEO
        title="Customer Architect Reference Center | Last Mile"
        description={description}
        canonicalPath="/resources/architect-reference-center"
        jsonLd={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          {
            name: "Customer Architect Reference Center",
            path: "/resources/architect-reference-center",
          },
        ])}
      />
      <div className="lm-v2-page">
        <EditorialHero
          eyebrow="Architect reference"
          title="Customer Architect Reference Center"
          intro="Evaluate source-fit, model the telemetry footprint, inspect zero-trust deployment boundaries, and download review-ready control mappings without leaving the Last Mile site."
          support="Reference architecture only. This center does not claim certified connector support, production attestation, or customer compliance."
          primary={{
            label: "Open the calculators",
            to: "/resources/architect-reference-center#protocol-calculator",
          }}
          secondary={{
            label: "Discuss your architecture",
            to: "/contact?intent=operation",
          }}
          visual={<HeroReferencePanels />}
        />
        <Suspense fallback={<InteractiveSectionsFallback />}>
          <ArchitectReferenceInteractiveSections />
        </Suspense>

        <EditorialSection
          eyebrow="Deployment reference"
          title="Zero-trust encryption architecture diagrams"
          intro="These diagrams stay code-native and accessible. Each view keeps the OT boundary, transport scope, and customer authority model explicit."
          tone="grid"
        >
          <Tabs defaultValue={zeroTrustViews[0].key} className="gap-6">
            <TabsList className="h-auto w-full flex-wrap justify-start gap-2 rounded-2xl bg-[var(--lm-wash)] p-2">
              {zeroTrustViews.map((view) => (
                <TabsTrigger
                  key={view.key}
                  value={view.key}
                  className="rounded-xl px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-[var(--lm-ink)]"
                >
                  {view.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {zeroTrustViews.map((view) => (
              <TabsContent key={view.key} value={view.key}>
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                  <Card className="border-[color:var(--lm-line)] bg-white shadow-[var(--lm-shadow)]">
                    <CardHeader>
                      <CardTitle className="text-[var(--lm-ink)]">
                        {view.title}
                      </CardTitle>
                      <CardDescription className="text-[var(--lm-copy)]">
                        {view.intro}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
                        {view.zones.map((zone, index) => (
                          <DiagramZone
                            key={zone.title}
                            zone={zone}
                            showArrow={index < view.zones.length - 1}
                          />
                        ))}
                      </div>
                      <div className="rounded-2xl border border-[color:var(--lm-line)] bg-[var(--lm-canvas)] p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--lm-blue-dark)]">
                          Authority note
                        </p>
                        <p className="mt-3 text-sm leading-6 text-[var(--lm-copy)]">
                          {view.authorityNote}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4">
                    {view.controls.map((control) => (
                      <Card
                        key={control}
                        className="border-[color:var(--lm-line)] bg-white shadow-[var(--lm-shadow)]"
                      >
                        <CardContent className="flex items-start gap-3 pt-6">
                          <LockKeyhole className="mt-1 size-5 text-[var(--lm-blue)]" />
                          <p className="text-sm leading-6 text-[var(--lm-copy)]">
                            {control}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </EditorialSection>

        <EditorialSection
          id="compliance-matrices"
          eyebrow="Download package"
          title="SOC 2, ISO/IEC 27001, and IEC 62443 reference matrices"
          intro="Download static CSV mappings for architecture review. These artifacts help a security or enterprise-architecture conversation; they are not compliance attestations or customer proof."
        >
          <Tabs defaultValue={complianceMatrices[0].key} className="gap-6">
            <TabsList className="h-auto w-full flex-wrap justify-start gap-2 rounded-2xl bg-[var(--lm-wash)] p-2">
              {complianceMatrices.map((matrix) => (
                <TabsTrigger
                  key={matrix.key}
                  value={matrix.key}
                  className="rounded-xl px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-[var(--lm-ink)]"
                >
                  {matrix.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {complianceMatrices.map((matrix) => (
              <TabsContent key={matrix.key} value={matrix.key}>
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                  <Card className="border-[color:var(--lm-line)] bg-white shadow-[var(--lm-shadow)]">
                    <CardHeader className="gap-3 sm:flex sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <CardTitle className="text-[var(--lm-ink)]">
                          {matrix.label} reference matrix
                        </CardTitle>
                        <CardDescription className="mt-2 text-[var(--lm-copy)]">
                          {matrix.description}
                        </CardDescription>
                      </div>
                      <Button
                        asChild
                        className="bg-[var(--lm-blue)] text-white hover:bg-[var(--lm-blue-dark)]"
                      >
                        <a href={matrix.filename} download>
                          Download CSV
                          <Download className="size-4" />
                        </a>
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <Table className="text-left">
                        <TableHeader>
                          <TableRow className="border-[color:var(--lm-line)]">
                            <TableHead className="text-[var(--lm-ink)]">
                              Control family
                            </TableHead>
                            <TableHead className="text-[var(--lm-ink)]">
                              Design treatment
                            </TableHead>
                            <TableHead className="text-[var(--lm-ink)]">
                              Review evidence
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {matrix.controls.map((row) => (
                            <TableRow
                              key={row.control}
                              className="border-[color:var(--lm-line)] hover:bg-[var(--lm-canvas)]"
                            >
                              <TableCell className="max-w-[16rem] whitespace-normal font-semibold text-[var(--lm-ink)]">
                                {row.control}
                              </TableCell>
                              <TableCell className="max-w-[24rem] whitespace-normal text-[var(--lm-copy)]">
                                {row.design}
                              </TableCell>
                              <TableCell className="max-w-[20rem] whitespace-normal text-[var(--lm-copy)]">
                                {row.evidence}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4">
                    <ControlNote
                      icon={<ShieldCheck className="size-5" />}
                      title="Control mapping, not attestation"
                      copy="The CSV traces design intent and review evidence. It does not represent a signed report, a Type II opinion, or a certified audit result."
                    />
                    <ControlNote
                      icon={<Waypoints className="size-5" />}
                      title="Architect-review ready"
                      copy="Each row is framed so customer architecture, security, and OT stakeholders can discuss identity, encryption, auditability, and authority boundaries from one place."
                    />
                    <ControlNote
                      icon={<Workflow className="size-5" />}
                      title="Aligned with the operating model"
                      copy="The matrices stay anchored to boundary-local acquisition, governed orchestration, and telemetry-verified outcome review instead of generic cloud-security claims."
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </EditorialSection>

        <NextStep
          title="Move from reference architecture to customer fit."
          copy="Use the portal to frame the source boundary, expected telemetry volume, and control review conversation before the first integration workshop."
          label="Discuss your architecture"
          to="/contact?intent=operation"
          secondary={{
            label: "Explore the platform",
            to: "/platform",
          }}
        />
      </div>
    </>
  );
}

function HeroReferencePanels() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-3">
        <HeroStat
          icon={<Waypoints className="size-5" />}
          label="Reference-fit calculator"
          copy="Protocol family, trust boundary, and response objective."
        />
        <HeroStat
          icon={<Gauge className="size-5" />}
          label="Telemetry sizing"
          copy="Ingest rate, daily footprint, and retention posture."
        />
        <HeroStat
          icon={<Download className="size-5" />}
          label="CSV artifacts"
          copy="SOC 2, ISO/IEC 27001, and IEC 62443 control mappings."
        />
      </div>
      <Card className="border-[color:var(--lm-line)] bg-white shadow-[var(--lm-shadow)]">
        <CardContent className="grid gap-4 pt-6 md:grid-cols-4">
          {[
            {
              title: "Infinit-Signal",
              copy: "Qualify evidence at the source boundary.",
            },
            {
              title: "Singularity",
              copy: "Preserve identity, semantics, and context.",
            },
            {
              title: "Infinit-Flow",
              copy: "Coordinate governed digital response.",
            },
            {
              title: "Infinit-Control",
              copy: "Verify outcome without hiding authority.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[color:var(--lm-line)] bg-[var(--lm-canvas)] p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--lm-blue-dark)]">
                {item.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--lm-copy)]">
                {item.copy}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function InteractiveSectionsFallback() {
  return (
    <>
      <EditorialSection
        id="protocol-calculator"
        eyebrow="Interactive reference fit"
        title="Protocol compatibility calculator"
        intro="Loading the interactive reference-fit controls."
        tone="grid"
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Card className="border-[color:var(--lm-line)] bg-white shadow-[var(--lm-shadow)]">
            <CardContent className="grid gap-4 pt-6">
              <div className="h-12 rounded-xl bg-[var(--lm-canvas)]" />
              <div className="h-12 rounded-xl bg-[var(--lm-canvas)]" />
              <div className="h-12 rounded-xl bg-[var(--lm-canvas)]" />
            </CardContent>
          </Card>
          <div className="grid gap-4">
            {[0, 1, 2, 3].map((item) => (
              <Card
                key={item}
                className="border-[color:var(--lm-line)] bg-white shadow-[var(--lm-shadow)]"
              >
                <CardContent className="grid gap-4 pt-6">
                  <div className="h-5 w-48 rounded bg-[var(--lm-canvas)]" />
                  <div className="h-3 w-full rounded-full bg-[var(--lm-wash)]" />
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="h-20 rounded-2xl bg-[var(--lm-canvas)]" />
                    <div className="h-20 rounded-2xl bg-[var(--lm-canvas)]" />
                    <div className="h-20 rounded-2xl bg-[var(--lm-canvas)]" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </EditorialSection>
      <EditorialSection
        eyebrow="Sizing guidance"
        title="Telemetry bandwidth footprint estimator"
        intro="Loading the telemetry sizing model."
      >
        <Card className="border-[color:var(--lm-line)] bg-white shadow-[var(--lm-shadow)]">
          <CardContent className="grid gap-4 pt-6">
            <div className="grid gap-4 md:grid-cols-4">
              {[0, 1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-24 rounded-2xl bg-[var(--lm-canvas)]"
                />
              ))}
            </div>
            <div className="h-72 rounded-2xl bg-[var(--lm-canvas)]" />
          </CardContent>
        </Card>
      </EditorialSection>
    </>
  );
}

function HeroStat({
  icon,
  label,
  copy,
}: {
  icon: ReactNode;
  label: string;
  copy: string;
}) {
  return (
    <Card className="border-[color:var(--lm-line)] bg-white shadow-[var(--lm-shadow)]">
      <CardContent className="flex h-full items-start gap-3 pt-6">
        <div className="rounded-xl bg-[var(--lm-wash)] p-3 text-[var(--lm-blue)]">
          {icon}
        </div>
        <div>
          <p className="font-semibold text-[var(--lm-ink)]">{label}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--lm-copy)]">
            {copy}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function DiagramZone({
  zone,
  showArrow,
}: {
  zone: {
    label: string;
    title: string;
    bullets: readonly string[];
  };
  showArrow: boolean;
}) {
  return (
    <>
      <div className="rounded-2xl border border-[color:var(--lm-line)] bg-[var(--lm-surface)] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--lm-blue-dark)]">
          {zone.label}
        </p>
        <h3 className="mt-3 text-lg font-semibold text-[var(--lm-ink)]">
          {zone.title}
        </h3>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-[var(--lm-copy)]">
          {zone.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-[var(--lm-blue)]" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
      {showArrow ? (
        <div className="hidden items-center justify-center xl:flex">
          <ArrowRight className="size-6 text-[var(--lm-steel)]" />
        </div>
      ) : null}
    </>
  );
}

function ControlNote({
  icon,
  title,
  copy,
}: {
  icon: ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <Card className="border-[color:var(--lm-line)] bg-white shadow-[var(--lm-shadow)]">
      <CardContent className="flex items-start gap-3 pt-6">
        <div className="rounded-xl bg-[var(--lm-wash)] p-3 text-[var(--lm-blue)]">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--lm-ink)]">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--lm-copy)]">
            {copy}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
