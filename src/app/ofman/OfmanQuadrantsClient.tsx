"use client";

import { useReducer, useEffect, useState, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  AssessmentState,
  AssessmentAction,
  EntryPath,
} from "./data/types";
import { getQuadrantById } from "./data/quadrants";
import HeroSection from "./components/HeroSection";
import VideoSection from "./components/VideoSection";
import QuadrantDiagram from "./components/QuadrantDiagram";
import AssessmentPathSelector from "./components/AssessmentPathSelector";
import TraitPicker from "./components/TraitPicker";
import StepReveal from "./components/StepReveal";
import ResultsSummary from "./components/ResultsSummary";

const initialState: AssessmentState = {
  phase: "intro",
  entryPath: null,
  selectedQuadrantId: null,
  revealedSteps: 0,
};

function reducer(
  state: AssessmentState,
  action: AssessmentAction
): AssessmentState {
  switch (action.type) {
    case "SELECT_PATH":
      return { ...state, phase: "picking", entryPath: action.path };
    case "SELECT_TRAIT":
      return {
        ...state,
        phase: "stepping",
        selectedQuadrantId: action.quadrantId,
        revealedSteps: 1,
      };
    case "NEXT_STEP":
      return { ...state, revealedSteps: state.revealedSteps + 1 };
    case "COMPLETE":
      return { ...state, phase: "complete", revealedSteps: 4 };
    case "RESET":
      return initialState;
    case "LOAD_SHARED":
      return {
        phase: "complete",
        entryPath: action.entryPath,
        selectedQuadrantId: action.quadrantId,
        revealedSteps: 4,
      };
    default:
      return state;
  }
}

const COMPLETED_PATHS_KEY = "ofman_completed_paths";

function loadCompletedPaths(): Set<EntryPath> {
  try {
    const raw = localStorage.getItem(COMPLETED_PATHS_KEY);
    if (raw) return new Set(JSON.parse(raw) as EntryPath[]);
  } catch {
    // ignore
  }
  return new Set();
}

function saveCompletedPaths(paths: Set<EntryPath>) {
  try {
    localStorage.setItem(COMPLETED_PATHS_KEY, JSON.stringify([...paths]));
  } catch {
    // ignore
  }
}

function AssessmentContent() {
  const searchParams = useSearchParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [completedPaths, setCompletedPaths] = useState<Set<EntryPath>>(
    new Set(),
  );
  const quadrant = state.selectedQuadrantId
    ? (getQuadrantById(state.selectedQuadrantId) ?? null)
    : null;

  // Load completed paths from localStorage on mount
  useEffect(() => {
    setCompletedPaths(loadCompletedPaths());
  }, []);

  // Persist completed path when assessment finishes
  useEffect(() => {
    if (state.phase === "complete" && state.entryPath) {
      setCompletedPaths((prev) => {
        const next = new Set(prev);
        next.add(state.entryPath!);
        saveCompletedPaths(next);
        return next;
      });
    }
  }, [state.phase, state.entryPath]);

  // Check for shared URL on mount
  useEffect(() => {
    const qId = searchParams.get("q");
    const via = searchParams.get("via") as EntryPath | null;
    if (qId && via && getQuadrantById(qId)) {
      dispatch({ type: "LOAD_SHARED", quadrantId: qId, entryPath: via });
    }
  }, [searchParams]);

  // Auto-scroll when phase changes
  const scrollToAssessment = useCallback(() => {
    setTimeout(() => {
      document
        .getElementById("assessment")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const handleSelectPath = (path: EntryPath) => {
    dispatch({ type: "SELECT_PATH", path });
    scrollToAssessment();
  };

  const handleSelectTrait = (quadrantId: string) => {
    dispatch({ type: "SELECT_TRAIT", quadrantId });
    scrollToAssessment();
  };

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const handleComplete = () => {
    dispatch({ type: "COMPLETE" });
    scrollToAssessment();
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Clean URL params
    window.history.replaceState({}, "", "/ofman");
  };

  return (
    <div className="bg-background">
      {/* Hero */}
      <HeroSection />

      {/* Video */}
      <VideoSection videoSrc="/video/ofman-quadrants.mp4" />

      {/* Assessment Section */}
      <section
        id="assessment"
        className="border-t border-card-border bg-background px-6 py-16"
      >
        <div className="mx-auto max-w-2xl">
          {/* Single-column layout */}
          <div className="space-y-8">
            {state.phase === "intro" && (
              <AssessmentPathSelector
                onSelectPath={handleSelectPath}
                completedPaths={completedPaths}
              />
            )}

            {state.phase === "picking" && state.entryPath && (
              <TraitPicker
                mode={state.entryPath}
                onSelectTrait={handleSelectTrait}
              />
            )}

            {/* Quadrant diagram: only visible during stepping and complete */}
            {(state.phase === "stepping" || state.phase === "complete") && (
              <QuadrantDiagram
                quadrant={quadrant}
                revealedSteps={state.revealedSteps}
                entryPath={state.entryPath}
              />
            )}

            {state.phase === "stepping" &&
              quadrant &&
              state.entryPath && (
                <StepReveal
                  quadrant={quadrant}
                  entryPath={state.entryPath}
                  revealedSteps={state.revealedSteps}
                  onNext={handleNext}
                  onComplete={handleComplete}
                />
              )}

            {state.phase === "complete" &&
              quadrant &&
              state.entryPath && (
                <ResultsSummary
                  quadrant={quadrant}
                  entryPath={state.entryPath}
                  onReset={handleReset}
                />
              )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function OfmanQuadrantsClient() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="text-muted">Loading…</div>
        </div>
      }
    >
      <AssessmentContent />
    </Suspense>
  );
}
