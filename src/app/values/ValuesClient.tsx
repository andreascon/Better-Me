"use client";

import { useReducer, useCallback, useMemo } from "react";
import { quadrants } from "../ofman/data/quadrants";
import { getAllergies, getPitfalls } from "./data/helpers";
import type {
  ValuesState,
  ValuesAction,
  PersonalValue,
  ValueStatement,
} from "./data/types";

import ValuesHero from "./components/ValuesHero";
import SwipeCards from "./components/SwipeCards";
import CostTest from "./components/CostTest";
import ValuesSynthesis from "./components/ValuesSynthesis";
import StatementWriter from "./components/StatementWriter";
import ValuesSummary from "./components/ValuesSummary";

const initialState: ValuesState = {
  phase: "intro",
  selectedAllergyIds: [],
  selectedPitfallIds: [],
  values: [],
  currentValueIndex: 0,
};

function reducer(state: ValuesState, action: ValuesAction): ValuesState {
  switch (action.type) {
    case "START":
      return { ...state, phase: "picking-allergies" };

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
      // Filter both allergy and pitfall selections to only include these quadrants.
      const survivingSet = new Set(action.survivingAllergyIds);
      return {
        ...state,
        phase: "synthesis",
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

export default function ValuesClient() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        {state.phase === "picking-allergies" && (
          <SwipeCards
            items={allergyItems}
            heading="What triggers you?"
            subheading="Swipe through these traits. Which ones genuinely irritate you when you see them in others? Be honest — your allergies reveal your deepest values."
            selectLabel="Triggers me"
            skipLabel="I don't mind"
            minSelections={3}
            maxSelections={10}
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
            minSelections={3}
            maxSelections={10}
            onComplete={handlePitfallComplete}
          />
        )}

        {state.phase === "cost-test" && (
          <CostTest
            allergyIds={state.selectedAllergyIds}
            pitfallIds={state.selectedPitfallIds}
            onFinish={handleFinishCostTest}
          />
        )}

        {state.phase === "synthesis" && (
          <ValuesSynthesis
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
