"use client";

import type { PersonalValue } from "../data/types";

interface ValuesSummaryProps {
  values: PersonalValue[];
  onReset: () => void;
}

export default function ValuesSummary({ values, onReset }: ValuesSummaryProps) {
  const filledValues = values.filter(
    (v) =>
      v.statements.positive.some((p) => p.trim()) ||
      v.statements.boundary.trim()
  );
  const emptyValues = values.filter(
    (v) =>
      !v.statements.positive.some((p) => p.trim()) &&
      !v.statements.boundary.trim()
  );

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-3xl font-bold text-foreground">
          Your Personal Values
        </h2>
        <p className="text-sm text-muted">
          Here are the values you&apos;ve uncovered. Review them, refine them
          over time, and let them guide your decisions.
        </p>
      </div>

      {/* Values with statements */}
      <div className="space-y-6">
        {filledValues.map((v, i) => (
          <div
            key={i}
            className="rounded-2xl border border-card-border bg-card-bg p-6"
          >
            <h3 className="mb-4 text-xl font-semibold text-foreground">
              {v.name}
            </h3>

            {v.statements.positive
              .filter((p) => p.trim())
              .map((p, j) => (
                <p key={j} className="mb-1.5 text-sm text-muted">
                  <span className="mr-1.5 text-quadrant-quality">+</span> {p}
                </p>
              ))}

            {v.statements.boundary.trim() && (
              <p className="mt-3 text-sm text-muted">
                <span className="mr-1.5 text-quadrant-pitfall">&minus;</span>{" "}
                {v.statements.boundary}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Values without statements */}
      {emptyValues.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 text-sm font-medium text-muted">
            Values you haven&apos;t written statements for yet:
          </h3>
          <div className="flex flex-wrap gap-2">
            {emptyValues.map((v, i) => (
              <span
                key={i}
                className="rounded-full border border-card-border bg-card-bg px-3 py-1.5 text-sm text-foreground"
              >
                {v.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-10 text-center">
        <button
          onClick={onReset}
          className="rounded-full border border-card-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-foreground"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
