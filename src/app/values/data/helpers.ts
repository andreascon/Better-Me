import { QuadrantData } from "../../ofman/data/types";
import { categoryLabels } from "../../ofman/data/quadrants";
import type { SwipeItem, PersonalValue, ValueStatement } from "./types";

/** Fisher-Yates shuffle — returns a new array in random order */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Extract all core qualities (strengths) from quadrant data as swipe-ready items */
export function getStrengths(quadrants: QuadrantData[]): SwipeItem[] {
  return quadrants.map((q) => ({
    id: q.id,
    trait: q.coreQuality.trait,
    description: q.coreQuality.description,
    category: categoryLabels[q.category],
  }));
}

/** Extract all allergies from quadrant data as swipe-ready items */
export function getAllergies(quadrants: QuadrantData[]): SwipeItem[] {
  return quadrants.map((q) => ({
    id: q.id,
    trait: q.allergy.trait,
    description: q.allergy.description,
    category: categoryLabels[q.category],
  }));
}

/** Extract all pitfalls from quadrant data as swipe-ready items */
export function getPitfalls(quadrants: QuadrantData[]): SwipeItem[] {
  return quadrants.map((q) => ({
    id: q.id,
    trait: q.pitfall.trait,
    description: q.pitfall.description,
    category: categoryLabels[q.category],
  }));
}

const emptyStatements: ValueStatement = {
  positive: ["", ""],
  boundary: "",
};

/**
 * Synthesize personal values from selected strength, allergy and pitfall IDs.
 *
 * Logic:
 * 1. Each selected item maps back to a quadrant → core quality.
 * 2. Items from the same quadrant cluster into one value.
 * 3. Remaining items each become their own value.
 * 4. Value name defaults to the core quality trait.
 */
export function synthesizeValues(
  strengthIds: string[],
  allergyIds: string[],
  pitfallIds: string[],
  quadrants: QuadrantData[]
): PersonalValue[] {
  const byQuadrant = new Map<
    string,
    {
      strengthIds: string[];
      allergyIds: string[];
      pitfallIds: string[];
      quadrant: QuadrantData;
    }
  >();

  const ensureEntry = (id: string) => {
    if (!byQuadrant.has(id)) {
      const q = quadrants.find((q) => q.id === id);
      if (!q) return null;
      byQuadrant.set(id, {
        strengthIds: [],
        allergyIds: [],
        pitfallIds: [],
        quadrant: q,
      });
    }
    return byQuadrant.get(id)!;
  };

  for (const id of strengthIds) {
    const entry = ensureEntry(id);
    if (entry) entry.strengthIds.push(id);
  }

  for (const id of allergyIds) {
    const entry = ensureEntry(id);
    if (entry) entry.allergyIds.push(id);
  }

  for (const id of pitfallIds) {
    const entry = ensureEntry(id);
    if (entry) entry.pitfallIds.push(id);
  }

  const values: PersonalValue[] = [];

  for (const [, entry] of byQuadrant) {
    values.push({
      name: entry.quadrant.coreQuality.trait,
      sourceStrengthIds: entry.strengthIds,
      sourceAllergyIds: entry.allergyIds,
      sourcePitfallIds: entry.pitfallIds,
      coreQualityTrait: entry.quadrant.coreQuality.trait,
      statements: { ...emptyStatements, positive: ["", ""] },
    });
  }

  return values;
}
