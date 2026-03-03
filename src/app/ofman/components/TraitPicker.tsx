"use client";

import { useState } from "react";
import {
  quadrants,
  quadrantsByCategory,
  categoryLabels,
} from "../data/quadrants";
import { EntryPath, QuadrantCategory } from "../data/types";

interface TraitPickerProps {
  mode: EntryPath;
  onSelectTrait: (quadrantId: string) => void;
}

export default function TraitPicker({ mode, onSelectTrait }: TraitPickerProps) {
  const [search, setSearch] = useState("");

  const traitLabel = mode === "strength" ? "strength" : "allergy";

  const filtered = search.trim()
    ? quadrants.filter((q) => {
        const trait =
          mode === "strength" ? q.coreQuality.trait : q.allergy.trait;
        return trait.toLowerCase().includes(search.toLowerCase());
      })
    : null;

  const groupedFiltered = filtered
    ? (Object.entries(
        filtered.reduce(
          (acc, q) => {
            if (!acc[q.category]) acc[q.category] = [];
            acc[q.category].push(q);
            return acc;
          },
          {} as Record<string, typeof filtered>,
        ),
      ) as [QuadrantCategory, typeof filtered][])
    : null;

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        {mode === "strength"
          ? "What's your greatest strength?"
          : "What annoys you most in others?"}
      </h2>
      <p className="mb-6 text-sm text-muted">
        Pick the {traitLabel} that resonates most with you.
      </p>

      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder={`Search ${quadrants.length} ${traitLabel === "strength" ? "strengths" : "allergies"}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 pl-10 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none"
        />
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Trait list */}
      <div className="space-y-6">
        {(groupedFiltered ||
          (Object.entries(quadrantsByCategory) as [
            QuadrantCategory,
            typeof quadrants,
          ][])
        ).map(([category, items]) => (
          <div key={category}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              {categoryLabels[category]}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((q) => {
                const trait =
                  mode === "strength" ? q.coreQuality.trait : q.allergy.trait;
                return (
                  <button
                    key={q.id}
                    onClick={() => onSelectTrait(q.id)}
                    className="rounded-full border border-card-border bg-card-bg px-4 py-2 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md active:translate-y-0"
                  >
                    {trait}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {groupedFiltered && groupedFiltered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted">
            No matching {traitLabel === "strength" ? "strengths" : "allergies"}{" "}
            found. Try a different search term.
          </p>
        )}
      </div>
    </div>
  );
}
