import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { deriveOutcomeStatus, deriveRag, outcomes } from "../src/app/pages/platformReferenceData.ts";
import { validateClaimUseTraceability } from "../scripts/claim-traceability.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));

test("claim traceability accepts wording published by the registered route consumer", () => {
  const errors = validateClaimUseTraceability({
    root,
    claimId: "CLM-CAT-001",
    use: { route: "/", sourceFile: "src/app/pages/HomePage.tsx", wording: "The Physical Operations Platform" },
  });
  assert.deepEqual(errors, []);
});

test("claim traceability rejects registered wording that drifts from the published consumer", () => {
  const errors = validateClaimUseTraceability({
    root,
    claimId: "CLM-CAT-001",
    use: { route: "/", sourceFile: "src/app/pages/HomePage.tsx", wording: "The Physical Operations Platform — drifted" },
  });
  assert.ok(errors.some((error) => /does not exactly match/.test(error)));
});

test("recovery established requires all valid measurements and the complete stability window", () => {
  assert.equal(deriveOutcomeStatus(outcomes.recovery), "normal");
  assert.ok(outcomes.recovery.measurements.every((measurement) => deriveRag(measurement) === "normal"));
  assert.ok(outcomes.recovery.measurements.find((measurement) => measurement.id === "stability").numericValue >= 900);
  const invalidRecovery = { ...outcomes.recovery, measurements: outcomes.recovery.measurements.map((measurement, index) => index ? measurement : { ...measurement, valid: false }) };
  assert.equal(deriveOutcomeStatus(invalidRecovery), "unknown");
  const earlyRecovery = { ...outcomes.recovery, measurements: outcomes.recovery.measurements.map((measurement) => measurement.id === "stability" ? { ...measurement, numericValue: 899 } : measurement) };
  assert.notEqual(deriveOutcomeStatus(earlyRecovery), "normal");
});

test("partial recovery has an unmet criterion or incomplete stability window", () => {
  assert.equal(deriveOutcomeStatus(outcomes.partial), "warning");
  assert.ok(outcomes.partial.measurements.some((measurement) => deriveRag(measurement) !== "normal"));
  assert.ok(outcomes.partial.measurements.find((measurement) => measurement.id === "stability").numericValue < 900);
});

test("failed intervention cannot have an all-healthy required measurement set", () => {
  assert.equal(deriveOutcomeStatus(outcomes.failed), "critical");
  assert.ok(outcomes.failed.measurements.some((measurement) => deriveRag(measurement) === "critical"));
  assert.match(outcomes.failed.reason, /work|stopped|pressure/i);
});

test("recurrence includes prior recovery and elapsed time inside its configured window", () => {
  assert.equal(deriveOutcomeStatus(outcomes.recurrence), "critical");
  assert.match(outcomes.recurrence.priorRecoveryAt, /^\d{2}:\d{2}:\d{2}$/);
  assert.match(outcomes.recurrence.recurrenceElapsed, /^\d{2}:\d{2}$/);
  const elapsed = outcomes.recurrence.measurements.find((measurement) => measurement.id === "recurrence_elapsed");
  assert.ok(elapsed.numericValue <= elapsed.rule.max);
});

test("insufficient return data identifies invalid input and work state cannot set recovery", () => {
  assert.equal(deriveOutcomeStatus(outcomes.insufficient), "unknown");
  assert.ok(outcomes.insufficient.measurements.some((measurement) => measurement.valid === false));
  for (const outcome of Object.values(outcomes)) assert.equal(outcome.resultBasis, "qualified_measurements");
  assert.equal(outcomes.failed.workStatus.includes("Closed"), true);
  assert.notEqual(deriveOutcomeStatus(outcomes.failed), "normal");
});
