"use client";

import { useCallback, useEffect, useRef } from "react";
import type { ForcedChoicePair, Choice } from "../data/types";

interface DimensionQuestionnaireProps {
  title: string;
  subtitle: string;
  labelA: string;
  labelB: string;
  questions: ForcedChoicePair[];
  answers: Record<number, Choice>;
  currentQuestion: number;
  onAnswer: (questionId: number, choice: Choice) => void;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (question: number) => void;
  onFinish: () => void;
}

export default function DimensionQuestionnaire({
  title,
  subtitle,
  labelA,
  labelB,
  questions,
  answers,
  currentQuestion,
  onAnswer,
  onNext,
  onPrev,
  onGoTo,
  onFinish,
}: DimensionQuestionnaireProps) {
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  const pair = questions[currentQuestion - 1];
  const selected = pair ? answers[pair.id] : undefined;
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  const handleSelect = useCallback(
    (choice: Choice) => {
      if (!pair) return;
      const wasAlreadyAnswered = answers[pair.id] !== undefined;
      onAnswer(pair.id, choice);

      // Auto-advance after selection
      if (currentQuestion < questions.length) {
        if (advanceTimer.current) clearTimeout(advanceTimer.current);
        advanceTimer.current = setTimeout(() => {
          onGoTo(currentQuestion + 1);
        }, 400);
      }
    },
    [pair, answers, currentQuestion, questions.length, onAnswer, onGoTo]
  );

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "1" || e.key === "a") handleSelect("A");
      if (e.key === "ArrowRight" || e.key === "2" || e.key === "b") handleSelect("B");
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleSelect]);

  if (!pair) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-foreground">{title}</h2>
        <p className="mx-auto max-w-md text-lg leading-relaxed text-muted">
          {subtitle}
        </p>
      </div>

      {/* Progress */}
      <div className="mx-auto mb-6 flex max-w-md items-center justify-between text-base text-muted">
        <span>
          Question {currentQuestion} of {questions.length}
        </span>
        <span>
          {answeredCount} of {questions.length} answered
        </span>
      </div>

      {/* Progress dots */}
      <div className="mx-auto mb-8 flex max-w-md justify-center gap-1.5">
        {questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => onGoTo(i + 1)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i + 1 === currentQuestion
                ? "scale-125 bg-accent"
                : answers[q.id] !== undefined
                  ? "bg-quadrant-quality"
                  : "bg-card-border/50"
            }`}
            aria-label={`Go to question ${i + 1}`}
          />
        ))}
      </div>

      {/* Choice cards */}
      <div className="mx-auto max-w-lg space-y-4 sm:flex sm:gap-4 sm:space-y-0">
        {/* Option A */}
        <button
          onClick={() => handleSelect("A")}
          className={`w-full rounded-2xl border-2 p-6 text-left transition-all ${
            selected === "A"
              ? "border-quadrant-challenge bg-quadrant-challenge-light shadow-md"
              : "border-card-border bg-card-bg hover:border-accent/50 hover:shadow-sm"
          }`}
        >
          <span
            className={`mb-3 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
              selected === "A"
                ? "bg-quadrant-challenge/20 text-quadrant-challenge"
                : "bg-muted/10 text-muted"
            }`}
          >
            {labelA}
          </span>
          <p className="text-lg leading-relaxed text-foreground">
            {pair.optionA}
          </p>
        </button>

        {/* Option B */}
        <button
          onClick={() => handleSelect("B")}
          className={`w-full rounded-2xl border-2 p-6 text-left transition-all ${
            selected === "B"
              ? "border-quadrant-quality bg-quadrant-quality-light shadow-md"
              : "border-card-border bg-card-bg hover:border-accent/50 hover:shadow-sm"
          }`}
        >
          <span
            className={`mb-3 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
              selected === "B"
                ? "bg-quadrant-quality/20 text-quadrant-quality"
                : "bg-muted/10 text-muted"
            }`}
          >
            {labelB}
          </span>
          <p className="text-lg leading-relaxed text-foreground">
            {pair.optionB}
          </p>
        </button>
      </div>

      {/* Instructions */}
      <p className="mt-4 text-center text-base text-muted/60">
        Pick the trait that most accurately describes you
        <span className="hidden sm:inline"> &mdash; or press &larr; / &rarr;</span>
      </p>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={currentQuestion === 1}
          className="rounded-full border border-card-border px-5 py-2.5 text-base font-medium text-muted transition-colors hover:border-accent hover:text-foreground disabled:opacity-30"
        >
          &larr; Undo
        </button>

        <div className="flex items-center gap-3">
          {allAnswered && (
            <button
              onClick={onFinish}
              className="rounded-full border border-accent bg-accent/10 px-6 py-2.5 text-lg font-medium text-accent transition-colors hover:bg-accent/20"
            >
              Continue &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
