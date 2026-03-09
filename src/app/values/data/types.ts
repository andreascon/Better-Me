export type ValuesPhase =
  | "intro"
  | "picking-allergies"
  | "picking-pitfalls"
  | "synthesis"
  | "writing"
  | "complete";

export interface SwipeItem {
  id: string; // quadrant ID
  trait: string;
  description: string;
  category: string;
}

export interface ValueStatement {
  positive: string[]; // 1-2 "I..." statements
  boundary: string; // "I will not..." statement
  costReflection: string; // what you risk by holding this line
}

export interface PersonalValue {
  name: string; // user-editable name (seeded from core quality)
  sourceAllergyIds: string[]; // quadrant IDs that fed this value
  sourcePitfallIds: string[]; // quadrant IDs that fed this value
  coreQualityTrait: string; // the Ofman core quality this maps to
  statements: ValueStatement;
}

export interface ValuesState {
  phase: ValuesPhase;
  selectedAllergyIds: string[];
  selectedPitfallIds: string[];
  values: PersonalValue[];
  currentValueIndex: number;
}

export type ValuesAction =
  | { type: "START" }
  | { type: "FINISH_ALLERGIES"; selectedIds: string[] }
  | { type: "FINISH_PITFALLS"; selectedIds: string[] }
  | { type: "SET_VALUES"; values: PersonalValue[] }
  | { type: "UPDATE_VALUE_NAME"; index: number; name: string }
  | { type: "REMOVE_VALUE"; index: number }
  | { type: "FINISH_SYNTHESIS" }
  | { type: "UPDATE_STATEMENTS"; index: number; statements: ValueStatement }
  | { type: "NEXT_VALUE" }
  | { type: "PREV_VALUE" }
  | { type: "FINISH_WRITING" }
  | { type: "RESET" };
