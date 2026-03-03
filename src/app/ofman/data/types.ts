export type QuadrantCategory = "leadership" | "interpersonal" | "work" | "personal";

export interface QuadrantElement {
  trait: string;
  description: string;
}

export interface QuadrantData {
  id: string;
  category: QuadrantCategory;
  coreQuality: QuadrantElement;
  pitfall: QuadrantElement;
  challenge: QuadrantElement;
  allergy: QuadrantElement;
  growthTip: string;
}

export type AssessmentPhase = "intro" | "picking" | "stepping" | "complete";

export type EntryPath = "strength" | "allergy";

export interface AssessmentState {
  phase: AssessmentPhase;
  entryPath: EntryPath | null;
  selectedQuadrantId: string | null;
  revealedSteps: number;
}

export type AssessmentAction =
  | { type: "SELECT_PATH"; path: EntryPath }
  | { type: "SELECT_TRAIT"; quadrantId: string }
  | { type: "NEXT_STEP" }
  | { type: "COMPLETE" }
  | { type: "RESET" }
  | { type: "LOAD_SHARED"; quadrantId: string; entryPath: EntryPath };
