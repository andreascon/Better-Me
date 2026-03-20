"use client";

import { useState, useMemo } from "react";
import { quadrants } from "../../ofman/data/quadrants";

interface CostTestProps {
  allergyIds: string[];
  pitfallIds: string[];
  onFinish: (survivingAllergyIds: string[]) => void;
}

interface AllergyDetail {
  id: string;
  allergyTrait: string;
  allergyDescription: string;
  coreQualityTrait: string;
  /** Whether this allergy was directly selected in the allergy phase */
  directlySelected: boolean;
  /** Whether this quadrant was also selected via pitfall */
  hasPitfall: boolean;
}

export default function CostTest({
  allergyIds,
  pitfallIds,
  onFinish,
}: CostTestProps) {
  // Gather ALL unique quadrant IDs from both allergy and pitfall selections,
  // then show each quadrant's allergy for the cost test
  const allergyDetails = useMemo<AllergyDetail[]>(() => {
    const allergySet = new Set(allergyIds);
    const pitfallSet = new Set(pitfallIds);

    // Combine all unique quadrant IDs
    const allQuadrantIds = new Set([...allergyIds, ...pitfallIds]);

    return Array.from(allQuadrantIds)
      .map((id) => {
        const q = quadrants.find((q) => q.id === id);
        if (!q) return null;
        return {
          id,
          allergyTrait: q.allergy.trait,
          allergyDescription: q.allergy.description,
          coreQualityTrait: q.coreQuality.trait,
          directlySelected: allergySet.has(id),
          hasPitfall: pitfallSet.has(id),
        };
      })
      .filter(Boolean) as AllergyDetail[];
  }, [allergyIds, pitfallIds]);

  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const toggleId = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleContinue = () => {
    onFinish(Array.from(checkedIds));
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-foreground">
          The cost test
        </h2>
        <p className="mx-auto max-w-md text-lg leading-relaxed text-muted">
          Values aren&apos;t really <em>core</em> values unless they cost you
          something. Which of these behaviours would you refuse to tolerate
          &mdash; even if it meant losing a friend?
        </p>
      </div>

      <div className="space-y-3">
        {allergyDetails.map((item) => {
          const isChecked = checkedIds.has(item.id);
          return (
            <label
              key={item.id}
              className={`flex cursor-pointer gap-4 rounded-2xl border p-5 transition-all ${
                isChecked
                  ? "border-quadrant-quality bg-quadrant-quality-light"
                  : "border-card-border bg-card-bg hover:border-accent/50"
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleId(item.id)}
                className="mt-1 h-5 w-5 shrink-0 accent-quadrant-quality"
              />
              <div className="min-w-0">
                <p className="text-lg font-semibold text-foreground">
                  {item.allergyTrait}
                </p>
                <p className="mt-1 text-lg leading-relaxed text-muted">
                  {item.allergyDescription}
                </p>
                <p className="mt-2 text-base text-muted/60">
                  Linked to your value:{" "}
                  <span className="font-medium text-quadrant-quality">
                    {item.coreQualityTrait}
                  </span>
                </p>
              </div>
            </label>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleContinue}
          disabled={checkedIds.size === 0}
          className="rounded-full border border-accent bg-accent/10 px-6 py-2.5 text-lg font-medium text-accent transition-colors hover:bg-accent/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent/10"
        >
          Continue with {checkedIds.size} value
          {checkedIds.size !== 1 && "s"} &rarr;
        </button>
        {checkedIds.size === 0 && (
          <p className="mt-3 text-base text-muted/60">
            Select at least one to continue
          </p>
        )}
      </div>
    </div>
  );
}
