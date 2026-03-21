export type InterpersonalPhase =
  | "intro"
  | "dimension-1"
  | "dimension-2"
  | "results";

export type Choice = "A" | "B";

export interface ForcedChoicePair {
  id: number;
  optionA: string;
  optionB: string;
}

export type StyleType = "analytical" | "driver" | "amiable" | "expressive";

export interface StyleProfile {
  type: StyleType;
  label: string;
  emoji: string;
  tagline: string;
  description: string;
  strengths: string[];
  watchOuts: string[];
}

export interface InterpersonalState {
  phase: InterpersonalPhase;
  dimension1Answers: Record<number, Choice>;
  dimension2Answers: Record<number, Choice>;
  currentQuestion: number;
}

export type InterpersonalAction =
  | { type: "START" }
  | { type: "ANSWER_D1"; questionId: number; choice: Choice }
  | { type: "ANSWER_D2"; questionId: number; choice: Choice }
  | { type: "NEXT_QUESTION" }
  | { type: "PREV_QUESTION" }
  | { type: "GO_TO_QUESTION"; question: number }
  | { type: "FINISH_D1" }
  | { type: "FINISH_D2" }
  | { type: "RESET" };
