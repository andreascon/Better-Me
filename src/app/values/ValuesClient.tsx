"use client";

import { useReducer, useCallback, useMemo } from "react";
import { quadrants } from "../ofman/data/quadrants";
import { getStrengths, getAllergies, getPitfalls } from "./data/helpers";
import type {
  ValuesState,
  ValuesAction,
  ValuesPhase,
  PersonalValue,
  ValueStatement,
} from "./data/types";

import ValuesHero from "./components/ValuesHero";
import SwipeCards from "./components/SwipeCards";
import CostTest from "./components/CostTest";
import ValuesSynthesis from "./components/ValuesSynthesis";
import StatementWriter from "./components/StatementWriter";
import ValuesSummary from "./components/ValuesSummary";

/* ── Step indicator ────────────────────────────────────── */

const steps: { label: string; phases: ValuesPhase[] }[] = [
  { label: "Strengths", phases: ["picking-strengths"] },
  { label: "Triggers", phases: ["picking-allergies"] },
  { label: "Overdoing", phases: ["picking-pitfalls"] },
  { label: "Cost test", phases: ["cost-test"] },
  { label: "Your values", phases: ["synthesis"] },
  { label: "Statements", phases: ["writing"] },
  { label: "Summary", phases: ["complete"] },
];

function StepIndicator({ phase }: { phase: ValuesPhase }) {
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
              {/* Dot + label */}
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
              {/* Connector line */}
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

const initialState: ValuesState = {
  phase: "intro",
  selectedStrengthIds: [],
  selectedAllergyIds: [],
  selectedPitfallIds: [],
  values: [],
  currentValueIndex: 0,
};

function reducer(state: ValuesState, action: ValuesAction): ValuesState {
  switch (action.type) {
    case "START":
      return { ...state, phase: "picking-strengths" };

    case "FINISH_STRENGTHS":
      return {
        ...state,
        phase: "picking-allergies",
        selectedStrengthIds: action.selectedIds,
      };

    case "FINISH_ALLERGIES":
      return {
        ...state,
        phase: "picking-pitfalls",
        selectedAllergyIds: action.selectedIds,
      };

    case "FINISH_PITFALLS":
      return {
        ...state,
        phase: "cost-test",
        selectedPitfallIds: action.selectedIds,
      };

    case "FINISH_COST_TEST": {
      // The surviving IDs are quadrant IDs the user feels strongly about.
      // Filter all three selection lists to only include surviving quadrants.
      const survivingSet = new Set(action.survivingAllergyIds);
      return {
        ...state,
        phase: "synthesis",
        selectedStrengthIds: state.selectedStrengthIds.filter((id) =>
          survivingSet.has(id)
        ),
        selectedAllergyIds: state.selectedAllergyIds.filter((id) =>
          survivingSet.has(id)
        ),
        selectedPitfallIds: state.selectedPitfallIds.filter((id) =>
          survivingSet.has(id)
        ),
      };
    }

    case "SET_VALUES":
      return { ...state, values: action.values };

    case "UPDATE_VALUE_NAME":
      return {
        ...state,
        values: state.values.map((v, i) =>
          i === action.index ? { ...v, name: action.name } : v
        ),
      };

    case "REMOVE_VALUE": {
      const next = state.values.filter((_, i) => i !== action.index);
      return { ...state, values: next };
    }

    case "FINISH_SYNTHESIS":
      return { ...state, phase: "writing", currentValueIndex: 0 };

    case "UPDATE_STATEMENTS":
      return {
        ...state,
        values: state.values.map((v, i) =>
          i === action.index ? { ...v, statements: action.statements } : v
        ),
      };

    case "NEXT_VALUE":
      return {
        ...state,
        currentValueIndex: Math.min(
          state.currentValueIndex + 1,
          state.values.length - 1
        ),
      };

    case "PREV_VALUE":
      return {
        ...state,
        currentValueIndex: Math.max(state.currentValueIndex - 1, 0),
      };

    case "FINISH_WRITING":
      return { ...state, phase: "complete" };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

/* ── Main component ────────────────────────────────────── */

export default function ValuesClient() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const strengthItems = useMemo(() => getStrengths(quadrants), []);
  const allergyItems = useMemo(() => getAllergies(quadrants), []);
  const pitfallItems = useMemo(() => getPitfalls(quadrants), []);

  const scrollToExercise = useCallback(() => {
    setTimeout(() => {
      document
        .getElementById("values-exercise")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const handleStart = useCallback(() => {
    dispatch({ type: "START" });
    scrollToExercise();
  }, [scrollToExercise]);

  const handleStrengthComplete = useCallback(
    (ids: string[]) => {
      dispatch({ type: "FINISH_STRENGTHS", selectedIds: ids });
      scrollToExercise();
    },
    [scrollToExercise]
  );

  const handleAllergyComplete = useCallback(
    (ids: string[]) => {
      dispatch({ type: "FINISH_ALLERGIES", selectedIds: ids });
      scrollToExercise();
    },
    [scrollToExercise]
  );

  const handlePitfallComplete = useCallback(
    (ids: string[]) => {
      dispatch({ type: "FINISH_PITFALLS", selectedIds: ids });
      scrollToExercise();
    },
    [scrollToExercise]
  );

  const handleFinishCostTest = useCallback(
    (survivingAllergyIds: string[]) => {
      dispatch({ type: "FINISH_COST_TEST", survivingAllergyIds });
      scrollToExercise();
    },
    [scrollToExercise]
  );

  const handleSetValues = useCallback((values: PersonalValue[]) => {
    dispatch({ type: "SET_VALUES", values });
  }, []);

  const handleUpdateName = useCallback((index: number, name: string) => {
    dispatch({ type: "UPDATE_VALUE_NAME", index, name });
  }, []);

  const handleFinishSynthesis = useCallback(() => {
    dispatch({ type: "FINISH_SYNTHESIS" });
    scrollToExercise();
  }, [scrollToExercise]);

  const handleUpdateStatements = useCallback(
    (index: number, statements: ValueStatement) => {
      dispatch({ type: "UPDATE_STATEMENTS", index, statements });
    },
    []
  );

  const handleNextValue = useCallback(() => {
    dispatch({ type: "NEXT_VALUE" });
    scrollToExercise();
  }, [scrollToExercise]);

  const handlePrevValue = useCallback(() => {
    dispatch({ type: "PREV_VALUE" });
    scrollToExercise();
  }, [scrollToExercise]);

  const handleFinishWriting = useCallback(() => {
    dispatch({ type: "FINISH_WRITING" });
    scrollToExercise();
  }, [scrollToExercise]);

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="min-h-screen bg-background font-sans">
      <ValuesHero onStart={handleStart} disabled={state.phase !== "intro"} />

      <div id="values-exercise">
        <StepIndicator phase={state.phase} />

        {state.phase === "picking-strengths" && (
          <SwipeCards
            items={strengthItems}
            heading="What are your strengths?"
            subheading="Swipe through these qualities. Which ones do you genuinely identify with? Pick the ones that feel most like you — not what you aspire to, but who you actually are."
            selectLabel="That's me"
            skipLabel="Not really"
            minSelections={5}
            onComplete={handleStrengthComplete}
          />
        )}

        {state.phase === "picking-allergies" && (
          <SwipeCards
            items={allergyItems}
            heading="What triggers you?"
            subheading="Swipe through these traits. Which ones genuinely irritate you when you see them in others? Be honest — your allergies reveal your deepest values."
            selectLabel="Triggers me"
            skipLabel="I don't mind"
            minSelections={5}
            onComplete={handleAllergyComplete}
          />
        )}

        {state.phase === "picking-pitfalls" && (
          <SwipeCards
            items={pitfallItems}
            heading="What do you overdo?"
            subheading="Think about what people who know you well — a partner, close friend, or trusted colleague — would say you overdo. These aren't flaws. They're the cost of something you care deeply about."
            selectLabel="I overdo this"
            skipLabel="Not really"
            minSelections={5}
            onComplete={handlePitfallComplete}
          />
        )}

        {state.phase === "cost-test" && (
          <CostTest
            strengthIds={state.selectedStrengthIds}
            allergyIds={state.selectedAllergyIds}
            pitfallIds={state.selectedPitfallIds}
            onFinish={handleFinishCostTest}
          />
        )}

        {state.phase === "synthesis" && (
          <ValuesSynthesis
            strengthIds={state.selectedStrengthIds}
            allergyIds={state.selectedAllergyIds}
            pitfallIds={state.selectedPitfallIds}
            values={state.values}
            onSetValues={handleSetValues}
            onUpdateName={handleUpdateName}
            onFinish={handleFinishSynthesis}
          />
        )}

        {state.phase === "writing" && state.values[state.currentValueIndex] && (
          <StatementWriter
            value={state.values[state.currentValueIndex]}
            index={state.currentValueIndex}
            total={state.values.length}
            onUpdate={handleUpdateStatements}
            onNext={handleNextValue}
            onPrev={handlePrevValue}
            onFinish={handleFinishWriting}
          />
        )}

        {state.phase === "complete" && (
          <ValuesSummary values={state.values} onReset={handleReset} />
        )}
      </div>
    </main>
  );
}
