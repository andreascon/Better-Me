"use client";

import { useEffect, useMemo } from "react";
import { quadrants } from "../../ofman/data/quadrants";
import type { PersonalValue } from "../data/types";
import { synthesizeValues } from "../data/helpers";

interface ValuesSynthesisProps {
  allergyIds: string[];
  pitfallIds: string[];
  values: PersonalValue[];
  onSetValues: (values: PersonalValue[]) => void;
  onUpdateName: (index: number, name: string) => void;
  onRemoveValue: (index: number) => void;
  onFinish: () => void;
}

export default function ValuesSynthesis({
  allergyIds,
  pitfallIds,
  values,
  onSetValues,
  onUpdateName,
  onRemoveValue,
  onFinish,
}: ValuesSynthesisProps) {
  // Synthesize on first render
  useEffect(() => {
    if (values.length === 0) {
      const synth = synthesizeValues(allergyIds, pitfallIds, quadrants);
      onSetValues(synth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Build origin descriptions
  const origins = useMemo(() => {
    return values.map((v) => {
      const lines: { emoji: string; text: string }[] = [];
      for (const id of v.sourcePitfallIds) {
        const q = quadrants.find((q) => q.id === id);
        if (q) {
          lines.push({
            emoji: "\u26A0\uFE0F",
            text: `Your pitfall "${q.pitfall.trait}" tells us you value ${q.coreQuality.trait} so deeply it sometimes spills over`,
          });
        }
      }
      for (const id of v.sourceAllergyIds) {
        const q = quadrants.find((q) => q.id === id);
        if (q) {
          lines.push({
            emoji: "\uD83D\uDE24",
            text: `Your allergy to "${q.allergy.trait}" confirms you can't stand the opposite of what you stand for`,
          });
        }
      }
      return lines;
    });
  }, [values]);

  if (values.length === 0) {
    return (
      <div className="py-12 text-center text-muted">
        Synthesizing your values...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-2xl font-bold text-foreground">
          Your Emerging Values
        </h2>
        <p className="text-sm leading-relaxed text-muted">
          Based on your selections, here are the values that are taking shape.
          You can rename them to make them your own, or remove any that
          don&apos;t resonate.
        </p>
      </div>

      <div className="space-y-6">
        {values.map((v, i) => (
          <div
            key={i}
            className="rounded-2xl border border-card-border bg-card-bg p-6"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-muted">
                  Value name
                </label>
                <input
                  type="text"
                  value={v.name}
                  onChange={(e) => onUpdateName(i, e.target.value)}
                  className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-lg font-semibold text-foreground outline-none transition-colors focus:border-accent"
                  placeholder="Name this value..."
                />
              </div>
              {values.length > 1 && (
                <button
                  onClick={() => onRemoveValue(i)}
                  className="mt-6 text-xs text-muted transition-colors hover:text-quadrant-pitfall"
                  title="Remove this value"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-2">
              {origins[i]?.map((o, j) => (
                <p key={j} className="text-sm leading-relaxed text-muted">
                  <span className="mr-1">{o.emoji}</span> {o.text}
                </p>
              ))}
            </div>

            <p className="mt-3 text-xs text-muted/60">
              Seeded from: {v.coreQualityTrait}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={onFinish}
          disabled={values.length === 0}
          className="rounded-full border border-accent bg-accent/10 px-6 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent/20 disabled:opacity-50"
        >
          Continue to write your value statements &rarr;
        </button>
      </div>
    </div>
  );
}
