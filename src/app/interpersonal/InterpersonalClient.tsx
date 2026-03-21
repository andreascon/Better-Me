"use client";

import { useReducer, useCallback } from "react";
import type {
  InterpersonalState,
  InterpersonalAction,
  InterpersonalPhase,
} from "./data/types";
import { dimension1Questions, dimension2Questions } from "./data/questions";

import InterpersonalHero from "./components/InterpersonalHero";
import DimensionQuestionnaire from "./components/DimensionQuestionnaire";
import ResultsSummary from "./components/ResultsSummary";

/* ── Step indicator ────────────────────────────────────── */

const steps: { label: string; phases: InterpersonalPhase[] }[] = [
  { label: "Assertiveness", phases: ["dimension-1"] },
  { label: "Responsiveness", phases: ["dimension-2"] },
  { label: "Your Style", phases: ["results"] },
];

function StepIndicator({ phase }: { phase: InterpersonalPhase }) {
  if (phase === "intro") return null;

  const activeIdx = steps.findIndex((s) => s.phases.includes(phase));

  return (
    <div className="mx-auto max-w-2xl px-6 pt-8 pb-2">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => {
          const isActive = i === activeIdx;
          const isDone = i < activeIdx;
          return (
            <div key={step.label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-accent text-white"
                      : isDone
                        ? "bg-quadrant-quality text-white"
                        : "bg-card-border/40 text-muted"
                  }`}
                >
                  {isDone ? "\u2713" : i + 1}
                </div>
                <span
                  className={`text-xs font-medium whitespace-nowrap ${
                    isActive
                      ? "text-accent"
                      : isDone
                        ? "text-quadrant-quality"
                        : "text-muted/60"
                  }`}
                >
                  <span className="hidden sm:inline">{step.label}</span>
                  <span className="sm:hidden">{i + 1}</span>
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`mx-1 h-0.5 flex-1 transition-colors ${
                    i < activeIdx ? "bg-quadrant-quality" : "bg-card-border/40"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Reducer ───────────────────────────────────────────── */

const initialState: InterpersonalState = {
  phase: "intro",
  dimension1Answers: {},
  dimension2Answers: {},
  currentQuestion: 1,
};

function reducer(
  state: InterpersonalState,
  action: InterpersonalAction
): InterpersonalState {
  switch (action.type) {
    case "START":
      return { ...state, phase: "dimension-1", currentQuestion: 1 };

    case "ANSWER_D1":
      return {
        ...state,
        dimension1Answers: {
          ...state.dimension1Answers,
          [action.questionId]: action.choice,
        },
      };

    case "ANSWER_D2":
      return {
        ...state,
        dimension2Answers: {
          ...state.dimension2Answers,
          [action.questionId]: action.choice,
        },
      };

    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestion: Math.min(state.currentQuestion + 1, 15),
      };

    case "PREV_QUESTION":
      return {
        ...state,
        currentQuestion: Math.max(state.currentQuestion - 1, 1),
      };

    case "GO_TO_QUESTION":
      return { ...state, currentQuestion: action.question };

    case "FINISH_D1":
      return { ...state, phase: "dimension-2", currentQuestion: 1 };

    case "FINISH_D2":
      return { ...state, phase: "results" };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

/* ── Main component ────────────────────────────────────── */

export default function InterpersonalClient() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const scrollToExercise = useCallback(() => {
    setTimeout(() => {
      document
        .getElementById("interpersonal-exercise")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const handleStart = useCallback(() => {
    dispatch({ type: "START" });
    scrollToExercise();
  }, [scrollToExercise]);

  const handleAnswerD1 = useCallback(
    (questionId: number, choice: "A" | "B") => {
      dispatch({ type: "ANSWER_D1", questionId, choice });
    },
    []
  );

  const handleAnswerD2 = useCallback(
    (questionId: number, choice: "A" | "B") => {
      dispatch({ type: "ANSWER_D2", questionId, choice });
    },
    []
  );

  const handleNext = useCallback(() => {
    dispatch({ type: "NEXT_QUESTION" });
  }, []);

  const handlePrev = useCallback(() => {
    dispatch({ type: "PREV_QUESTION" });
  }, []);

  const handleGoTo = useCallback((question: number) => {
    dispatch({ type: "GO_TO_QUESTION", question });
  }, []);

  const handleFinishD1 = useCallback(() => {
    dispatch({ type: "FINISH_D1" });
    scrollToExercise();
  }, [scrollToExercise]);

  const handleFinishD2 = useCallback(() => {
    dispatch({ type: "FINISH_D2" });
    scrollToExercise();
  }, [scrollToExercise]);

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="min-h-screen bg-background font-sans">
      <InterpersonalHero
        onStart={handleStart}
        disabled={state.phase !== "intro"}
      />

      <div id="interpersonal-exercise">
        <StepIndicator phase={state.phase} />

        {state.phase === "dimension-1" && (
          <DimensionQuestionnaire
            title="Dimension I: Assertiveness"
            subtitle="From each pair, pick the trait that most accurately describes you. There are no right or wrong answers."
            labelA="A"
            labelB="B"
            questions={dimension1Questions}
            answers={state.dimension1Answers}
            currentQuestion={state.currentQuestion}
            onAnswer={handleAnswerD1}
            onNext={handleNext}
            onPrev={handlePrev}
            onGoTo={handleGoTo}
            onFinish={handleFinishD1}
          />
        )}

        {state.phase === "dimension-2" && (
          <DimensionQuestionnaire
            title="Dimension II: Responsiveness"
            subtitle="Same idea, different dimension. Pick the trait that best describes how you typically behave."
            labelA="A"
            labelB="B"
            questions={dimension2Questions}
            answers={state.dimension2Answers}
            currentQuestion={state.currentQuestion}
            onAnswer={handleAnswerD2}
            onNext={handleNext}
            onPrev={handlePrev}
            onGoTo={handleGoTo}
            onFinish={handleFinishD2}
          />
        )}

        {state.phase === "results" && (
          <ResultsSummary
            dimension1Answers={state.dimension1Answers}
            dimension2Answers={state.dimension2Answers}
            onReset={handleReset}
          />
        )}
      </div>
    </main>
  );
}
