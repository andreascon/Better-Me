"use client";

import { useMemo } from "react";
import { quadrants } from "../../ofman/data/quadrants";
import type { PersonalValue, ValueStatement } from "../data/types";

interface StatementWriterProps {
  value: PersonalValue;
  index: number;
  total: number;
  onUpdate: (index: number, statements: ValueStatement) => void;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
}

export default function StatementWriter({
  value,
  index,
  total,
  onUpdate,
  onNext,
  onPrev,
  onFinish,
}: StatementWriterProps) {
  const s = value.statements;
  const isLast = index === total - 1;

  const update = (patch: Partial<ValueStatement>) => {
    onUpdate(index, { ...s, ...patch });
  };

  const updatePositive = (i: number, text: string) => {
    const next = [...s.positive];
    next[i] = text;
    update({ positive: next });
  };

  // Gather source context from quadrant data
  const sourceContext = useMemo(() => {
    const allergyLines: { trait: string; description: string }[] = [];
    const pitfallLines: { trait: string; description: string }[] = [];
    let coreQualityDescription = "";

    for (const id of value.sourceAllergyIds) {
      const q = quadrants.find((q) => q.id === id);
      if (q) {
        allergyLines.push({
          trait: q.allergy.trait,
          description: q.allergy.description,
        });
        if (!coreQualityDescription) {
          coreQualityDescription = q.coreQuality.description;
        }
      }
    }
    for (const id of value.sourcePitfallIds) {
      const q = quadrants.find((q) => q.id === id);
      if (q) {
        pitfallLines.push({
          trait: q.pitfall.trait,
          description: q.pitfall.description,
        });
        if (!coreQualityDescription) {
          coreQualityDescription = q.coreQuality.description;
        }
      }
    }

    // Generate suggested statements
    const suggestedPositive = `I practise ${value.coreQualityTrait.toLowerCase()} in how I work and relate to others`;
    const suggestedBoundary = allergyLines.length > 0
      ? `I will not accept ${allergyLines[0].trait.toLowerCase()} behaviour from others or myself`
      : pitfallLines.length > 0
        ? `I will not let my ${pitfallLines[0].trait.toLowerCase()} undermine what I stand for`
        : `I will not compromise on ${value.coreQualityTrait.toLowerCase()}`;

    return {
      allergyLines,
      pitfallLines,
      coreQualityDescription,
      suggestedPositive,
      suggestedBoundary,
    };
  }, [value]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      {/* Progress */}
      <div className="mb-6 text-center">
        <p className="mb-1 text-xs font-medium text-muted">
          Value {index + 1} of {total}
        </p>
        <h2 className="mb-2 text-3xl font-bold text-foreground">
          {value.name || "Untitled Value"}
        </h2>
      </div>

      {/* Source context — allergy, pitfall, and strength insight */}
      <div className="mb-8 rounded-2xl border border-card-border bg-card-bg p-5">
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Why this value matters to you
        </h3>

        {sourceContext.coreQualityDescription && (
          <p className="mb-4 text-sm leading-relaxed text-muted">
            Your core strength is being <strong className="text-foreground">{value.coreQualityTrait}</strong>: {sourceContext.coreQualityDescription}
          </p>
        )}

        {sourceContext.allergyLines.length > 0 && (
          <div className="mb-3">
            {sourceContext.allergyLines.map((a, i) => (
              <p key={`a-${i}`} className="mb-1 text-sm text-muted">
                <span className="mr-1 text-quadrant-pitfall">&times;</span>
                You&apos;re triggered by <strong className="text-foreground">&ldquo;{a.trait}&rdquo;</strong> &mdash; {a.description.charAt(0).toLowerCase() + a.description.slice(1)}
              </p>
            ))}
          </div>
        )}

        {sourceContext.pitfallLines.length > 0 && (
          <div>
            {sourceContext.pitfallLines.map((p, i) => (
              <p key={`p-${i}`} className="mb-1 text-sm text-muted">
                <span className="mr-1 text-amber-600">&bull;</span>
                People say you can overdo it as <strong className="text-foreground">&ldquo;{p.trait}&rdquo;</strong> &mdash; {p.description.charAt(0).toLowerCase() + p.description.slice(1)}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Positive statements */}
      <div className="mb-8">
        <h3 className="mb-1 text-sm font-semibold text-quadrant-quality">
          Positive statements
        </h3>
        <p className="mb-4 text-xs text-muted">
          What commitment would you make to your future self to honour this
          value?
        </p>
        {s.positive.map((text, i) => (
          <div key={i} className="mb-3 flex gap-2">
            <span className="mt-2.5 shrink-0 text-sm text-quadrant-quality">
              +
            </span>
            <textarea
              value={text}
              onChange={(e) => updatePositive(i, e.target.value)}
              placeholder={
                i === 0
                  ? sourceContext.suggestedPositive
                  : "Another behaviour (optional)"
              }
              rows={2}
              className="w-full resize-none rounded-lg border border-card-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-accent"
            />
          </div>
        ))}
      </div>

      {/* Boundary statement */}
      <div className="mb-8">
        <h3 className="mb-1 text-sm font-semibold text-quadrant-pitfall">
          Boundary statement
        </h3>
        <p className="mb-4 text-xs text-muted">
          What behaviour connected to this value will you never accept — from
          others or yourself?
        </p>
        <div className="flex gap-2">
          <span className="mt-2.5 shrink-0 text-sm text-quadrant-pitfall">
            -
          </span>
          <textarea
            value={s.boundary}
            onChange={(e) => update({ boundary: e.target.value })}
            placeholder={sourceContext.suggestedBoundary}
            rows={2}
            className="w-full resize-none rounded-lg border border-card-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-accent"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={index === 0}
          className="rounded-full border border-card-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-foreground disabled:opacity-30"
        >
          &larr; Previous
        </button>

        <div className="flex items-center gap-3">
          {/* Skip to end */}
          <button
            onClick={onFinish}
            className="text-xs text-muted transition-colors hover:text-foreground"
          >
            Skip to summary
          </button>

          {isLast ? (
            <button
              onClick={onFinish}
              className="rounded-full border border-accent bg-accent/10 px-6 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
            >
              See summary &rarr;
            </button>
          ) : (
            <button
              onClick={onNext}
              className="rounded-full border border-card-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent"
            >
              Next value &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
