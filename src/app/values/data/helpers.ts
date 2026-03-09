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
  costReflection: "",
};

/**
 * Synthesize personal values from selected allergy and pitfall IDs.
 *
 * Logic:
 * 1. Each selected item maps back to a quadrant → core quality.
 * 2. Items from the same quadrant cluster into one value.
 * 3. Remaining items each become their own value.
 * 4. Value name defaults to the core quality trait.
 */
export function synthesizeValues(
  allergyIds: string[],
  pitfallIds: string[],
  quadrants: QuadrantData[]
): PersonalValue[] {
  const byQuadrant = new Map<
    string,
    { allergyIds: string[]; pitfallIds: string[]; quadrant: QuadrantData }
  >();

  for (const id of allergyIds) {
    const q = quadrants.find((q) => q.id === id);
    if (!q) continue;
    if (!byQuadrant.has(id)) {
      byQuadrant.set(id, { allergyIds: [], pitfallIds: [], quadrant: q });
    }
    byQuadrant.get(id)!.allergyIds.push(id);
  }

  for (const id of pitfallIds) {
    const q = quadrants.find((q) => q.id === id);
    if (!q) continue;
    if (!byQuadrant.has(id)) {
      byQuadrant.set(id, { allergyIds: [], pitfallIds: [], quadrant: q });
    }
    byQuadrant.get(id)!.pitfallIds.push(id);
  }

  const values: PersonalValue[] = [];

  for (const [, entry] of byQuadrant) {
    values.push({
      name: entry.quadrant.coreQuality.trait,
      sourceAllergyIds: entry.allergyIds,
      sourcePitfallIds: entry.pitfallIds,
      coreQualityTrait: entry.quadrant.coreQuality.trait,
      statements: { ...emptyStatements, positive: ["", ""] },
    });
  }

  return values;
}
