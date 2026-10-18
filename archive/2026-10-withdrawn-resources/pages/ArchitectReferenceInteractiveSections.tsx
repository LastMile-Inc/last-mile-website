import { type ReactNode, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Gauge, Network, Radio, ShieldCheck } from "lucide-react";
import { EditorialSection } from "@/app/components/NarrativeComponents";
import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";
import {
  boundaryProfiles,
  objectiveProfiles,
  productMeta,
  protocolProfiles,
  type BoundaryKey,
  type ObjectiveKey,
  type ProtocolKey,
} from "./architectReferenceData";

const chartConfig = {
  cumulative: {
    label: "Cumulative GiB",
    color: "var(--lm-blue)",
  },
} as const;

const productTone = {
  strong: "var(--lm-blue)",
  governed: "var(--lm-teal)",
  limited: "var(--lm-steel)",
} as const;

const rangeInputClassName =
  "w-full accent-[var(--lm-blue)] cursor-pointer rounded-full";

export function ArchitectReferenceInteractiveSections() {
  const [protocol, setProtocol] = useState<ProtocolKey>("mqtt-sparkplug");
  const [boundary, setBoundary] = useState<BoundaryKey>("dmz-broker");
  const [objective, setObjective] = useState<ObjectiveKey>("response-orchestration");
  const [assetCount, setAssetCount] = useState(120);
  const [measurementsPerAsset, setMeasurementsPerAsset] = useState(24);
  const [sampleInterval, setSampleInterval] = useState(5);
  const [payloadBytes, setPayloadBytes] = useState(180);
  const [overheadFactor, setOverheadFactor] = useState(1.18);

  const compatibility = useMemo(() => {
    const protocolProfile = protocolProfiles[protocol];
    const boundaryProfile = boundaryProfiles[boundary];
    const objectiveProfile = objectiveProfiles[objective];

    return productMeta.map((product) => {
      const baseScore = protocolProfile.baseScores[product.key];
      const boundaryAdjustment = boundaryProfile.adjustments[product.key];
      const objectiveAdjustment = objectiveProfile.adjustments[product.key];
      const score = clampScore(baseScore + boundaryAdjustment + objectiveAdjustment);
      const fit = score >= 80 ? "strong" : score >= 60 ? "governed" : "limited";

      return {
        ...product,
        score,
        fit,
        fitLabel:
          fit === "strong"
            ? "Strong fit"
            : fit === "governed"
              ? "Governed fit"
              : "Limited fit",
      };
    });
  }, [boundary, objective, protocol]);

  const telemetry = useMemo(() => {
    const messagesPerSecond =
      (assetCount * measurementsPerAsset) / sampleInterval;
    const bytesPerSecond = messagesPerSecond * payloadBytes * overheadFactor;
    const dailyBytes = bytesPerSecond * 60 * 60 * 24;
    const warmRetentionBytes = dailyBytes * 30;
    const archiveBytes = dailyBytes * 90;
    const chartPoints = Array.from({ length: 24 }, (_, index) => ({
      hour: `${String(index + 1).padStart(2, "0")}:00`,
      cumulative:
        (bytesPerSecond * (index + 1) * 60 * 60) / (1024 ** 3),
    }));

    return {
      messagesPerSecond,
      dailyBytes,
      warmRetentionBytes,
      archiveBytes,
      chartPoints,
      guidance:
        dailyBytes / (1024 ** 3) > 40
          ? "Curate signals at the edge, publish only operationally meaningful evidence, and keep high-volume raw history boundary-local."
          : dailyBytes / (1024 ** 3) > 10
            ? "Use a DMZ or outbound relay with batching, replay classification, and deliberate retention boundaries."
            : "Continuous qualified streaming is practical if the trust boundary and retention plan stay explicit.",
    };
  }, [
    assetCount,
    measurementsPerAsset,
    overheadFactor,
    payloadBytes,
    sampleInterval,
  ]);

  return (
    <>
      <EditorialSection
        id="protocol-calculator"
        eyebrow="Interactive reference fit"
        title="Protocol compatibility calculator"
        intro="Select the source family, trust boundary, and operating objective. The calculator returns a reference-fit view for each Last Mile product surface."
        tone="grid"
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Card className="border-[color:var(--lm-line)] bg-white shadow-[var(--lm-shadow)]">
            <CardHeader>
              <CardTitle className="text-[var(--lm-ink)]">
                Evaluate a source posture
              </CardTitle>
              <CardDescription className="text-[var(--lm-copy)]">
                The result is a governed reference-fit score, not a certification result.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5">
              <label className="grid gap-2 text-sm">
                <span className="font-semibold text-[var(--lm-ink)]">
                  Source family
                </span>
                <select
                  className="rounded-xl border border-[color:var(--lm-line)] bg-[var(--lm-surface)] px-4 py-3 text-[var(--lm-ink)]"
                  value={protocol}
                  onChange={(event) =>
                    setProtocol(event.target.value as ProtocolKey)
                  }
                >
                  {Object.entries(protocolProfiles).map(([key, profile]) => (
                    <option key={key} value={key}>
                      {profile.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-semibold text-[var(--lm-ink)]">
                  Trust boundary
                </span>
                <select
                  className="rounded-xl border border-[color:var(--lm-line)] bg-[var(--lm-surface)] px-4 py-3 text-[var(--lm-ink)]"
                  value={boundary}
                  onChange={(event) =>
                    setBoundary(event.target.value as BoundaryKey)
                  }
                >
                  {Object.entries(boundaryProfiles).map(([key, profile]) => (
                    <option key={key} value={key}>
                      {profile.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-semibold text-[var(--lm-ink)]">
                  Primary objective
                </span>
                <select
                  className="rounded-xl border border-[color:var(--lm-line)] bg-[var(--lm-surface)] px-4 py-3 text-[var(--lm-ink)]"
                  value={objective}
                  onChange={(event) =>
                    setObjective(event.target.value as ObjectiveKey)
                  }
                >
                  {Object.entries(objectiveProfiles).map(([key, profile]) => (
                    <option key={key} value={key}>
                      {profile.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="rounded-2xl border border-[color:var(--lm-line)] bg-[var(--lm-canvas)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--lm-blue-dark)]">
                  Reference posture
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--lm-copy)]">
                  {protocolProfiles[protocol].summary}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--lm-copy)]">
                  {boundaryProfiles[boundary].summary}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--lm-copy)]">
                  {objectiveProfiles[objective].summary}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {compatibility.map((product) => (
              <Card
                key={product.key}
                className="border-[color:var(--lm-line)] bg-white shadow-[var(--lm-shadow)]"
              >
                <CardHeader className="gap-3 sm:flex sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle className="text-[var(--lm-ink)]">
                      {product.label}
                    </CardTitle>
                    <CardDescription className="mt-2 text-[var(--lm-copy)]">
                      {product.summary}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-[color:var(--lm-line)] bg-[var(--lm-canvas)] text-[var(--lm-ink)]"
                  >
                    {product.score}% · {product.fitLabel}
                  </Badge>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <ScoreBar
                    value={product.score}
                    tone={productTone[product.fit]}
                  />
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl border border-[color:var(--lm-line)] bg-[var(--lm-surface)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--lm-blue-dark)]">
                        Transport
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--lm-copy)]">
                        {protocolProfiles[protocol].transport}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[color:var(--lm-line)] bg-[var(--lm-surface)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--lm-blue-dark)]">
                        Evidence
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--lm-copy)]">
                        {protocolProfiles[protocol].evidence}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[color:var(--lm-line)] bg-[var(--lm-surface)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--lm-blue-dark)]">
                        Recommendation
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--lm-copy)]">
                        {protocolProfiles[protocol].recommendation}
                      </p>
                    </div>
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
        intro="Model the ingest posture before a collector is deployed. Adjust the sliders and the estimator will translate signal volume into a daily footprint and a 30 / 90 day storage expectation."
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Card className="border-[color:var(--lm-line)] bg-white shadow-[var(--lm-shadow)]">
            <CardHeader>
              <CardTitle className="text-[var(--lm-ink)]">
                Size the feed
              </CardTitle>
              <CardDescription className="text-[var(--lm-copy)]">
                Assumes qualified telemetry plus protocol, envelope, and replay overhead.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <SliderField
                label="Assets or logical equipment objects"
                value={assetCount}
                min={10}
                max={2000}
                step={10}
                onChange={setAssetCount}
              />
              <SliderField
                label="Measurements per asset"
                value={measurementsPerAsset}
                min={4}
                max={120}
                step={1}
                onChange={setMeasurementsPerAsset}
              />
              <SliderField
                label="Sampling interval (seconds)"
                value={sampleInterval}
                min={1}
                max={300}
                step={1}
                onChange={setSampleInterval}
              />
              <SliderField
                label="Average payload size (bytes)"
                value={payloadBytes}
                min={64}
                max={512}
                step={8}
                onChange={setPayloadBytes}
              />
              <div className="grid gap-2">
                <div className="flex items-center justify-between gap-4">
                  <label className="text-sm font-semibold text-[var(--lm-ink)]">
                    Envelope + redundancy factor
                  </label>
                  <span className="text-sm text-[var(--lm-copy)]">
                    {overheadFactor.toFixed(2)}x
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={1.5}
                  step={0.01}
                  value={overheadFactor}
                  className={rangeInputClassName}
                  onChange={(event) =>
                    setOverheadFactor(Number(event.target.value))
                  }
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                icon={<Radio className="size-5" />}
                label="Messages per second"
                value={telemetry.messagesPerSecond.toFixed(1)}
              />
              <MetricCard
                icon={<Gauge className="size-5" />}
                label="Daily ingress"
                value={formatBytes(telemetry.dailyBytes)}
              />
              <MetricCard
                icon={<Network className="size-5" />}
                label="30-day warm retention"
                value={formatBytes(telemetry.warmRetentionBytes)}
              />
              <MetricCard
                icon={<ShieldCheck className="size-5" />}
                label="90-day archive"
                value={formatBytes(telemetry.archiveBytes)}
              />
            </div>

            <Card className="border-[color:var(--lm-line)] bg-white shadow-[var(--lm-shadow)]">
              <CardHeader>
                <CardTitle className="text-[var(--lm-ink)]">
                  24-hour cumulative footprint
                </CardTitle>
                <CardDescription className="text-[var(--lm-copy)]">
                  The curve shows how quickly retained telemetry grows when the source cadence stays constant.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto min-h-[19rem] w-full"
                >
                  <AreaChart data={telemetry.chartPoints}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis
                      dataKey="hour"
                      tickLine={false}
                      axisLine={false}
                      minTickGap={20}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      width={70}
                      tickFormatter={(value) => `${value.toFixed(1)} GiB`}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          labelFormatter={(label) => `${label} cumulative`}
                          formatter={(value) => (
                            <span className="font-medium text-[var(--lm-ink)]">
                              {(value as number).toFixed(2)} GiB
                            </span>
                          )}
                        />
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="cumulative"
                      stroke="var(--color-cumulative)"
                      fill="var(--color-cumulative)"
                      fillOpacity={0.18}
                      strokeWidth={2.5}
                    />
                  </AreaChart>
                </ChartContainer>

                <div className="rounded-2xl border border-[color:var(--lm-line)] bg-[var(--lm-canvas)] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--lm-blue-dark)]">
                    Recommended backhaul posture
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--lm-copy)]">
                    {telemetry.guidance}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </EditorialSection>
    </>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm font-semibold text-[var(--lm-ink)]">
          {label}
        </label>
        <span className="text-sm text-[var(--lm-copy)]">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        className={rangeInputClassName}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card className="border-[color:var(--lm-line)] bg-white shadow-[var(--lm-shadow)]">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 text-[var(--lm-blue)]">
          {icon}
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--lm-blue-dark)]">
            {label}
          </p>
        </div>
        <p className="mt-4 text-2xl font-semibold text-[var(--lm-ink)]">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

function ScoreBar({ value, tone }: { value: number; tone: string }) {
  return (
    <div
      aria-hidden="true"
      className="h-2 overflow-hidden rounded-full bg-[var(--lm-wash)]"
    >
      <div
        className="h-full rounded-full"
        style={{ width: `${value}%`, backgroundColor: tone }}
      />
    </div>
  );
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, value));
}

function formatBytes(bytes: number) {
  const units = ["B", "KiB", "MiB", "GiB", "TiB"];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value >= 10 ? value.toFixed(1) : value.toFixed(2)} ${units[unitIndex]}`;
}
