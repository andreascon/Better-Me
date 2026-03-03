"use client";

import { QuadrantData, EntryPath } from "../data/types";

interface StepRevealProps {
  quadrant: QuadrantData;
  entryPath: EntryPath;
  revealedSteps: number;
  onNext: () => void;
  onComplete: () => void;
}

type StepKey = "coreQuality" | "pitfall" | "challenge" | "allergy";

const stepMeta: Record<
  StepKey,
  { label: string; emoji: string; colorClass: string; bgClass: string }
> = {
  coreQuality: {
    label: "Core Quality",
    emoji: "💎",
    colorClass: "text-quadrant-quality",
    bgClass: "bg-quadrant-quality-light",
  },
  pitfall: {
    label: "Pitfall",
    emoji: "⚠️",
    colorClass: "text-quadrant-pitfall",
    bgClass: "bg-quadrant-pitfall-light",
  },
  challenge: {
    label: "Challenge",
    emoji: "🌱",
    colorClass: "text-quadrant-challenge",
    bgClass: "bg-quadrant-challenge-light",
  },
  allergy: {
    label: "Allergy",
    emoji: "😤",
    colorClass: "text-quadrant-allergy",
    bgClass: "bg-quadrant-allergy-light",
  },
};

const strengthOrder: StepKey[] = [
  "coreQuality",
  "pitfall",
  "challenge",
  "allergy",
];
const allergyOrder: StepKey[] = [
  "allergy",
  "challenge",
  "pitfall",
  "coreQuality",
];

const relationshipLabels: Record<EntryPath, string[]> = {
  strength: [
    "This is your core quality — what you naturally excel at.",
    "But when overdone, your strength becomes this pitfall…",
    "To stay balanced, you need to develop this challenge…",
    "And this is your allergy — the trait that triggers you in others.",
  ],
  allergy: [
    "This is what irritates you most in others — your allergy.",
    "The positive side of your allergy is actually this challenge you need…",
    "Your challenge is the antidote to this pitfall…",
    "And at the heart of it all lies your core quality — your greatest strength.",
  ],
};

export default function StepReveal({
  quadrant,
  entryPath,
  revealedSteps,
  onNext,
  onComplete,
}: StepRevealProps) {
  const order = entryPath === "strength" ? strengthOrder : allergyOrder;
  const totalSteps = 4;
  const isLastStep = revealedSteps >= totalSteps;

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        Your Quadrant Journey
      </h2>

      {/* Step indicator */}
      <div className="mb-8 flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-500 ${
              i < revealedSteps ? "bg-accent" : "bg-card-border"
            }`}
          />
        ))}
      </div>

      {/* Revealed steps */}
      <div className="space-y-4">
        {order.slice(0, revealedSteps).map((key, i) => {
          const meta = stepMeta[key];
          const element = quadrant[key];
          const relationship = relationshipLabels[entryPath][i];
          const isLatest = i === revealedSteps - 1;

          return (
            <div
              key={key}
              className={`rounded-2xl border border-card-border p-6 transition-all duration-500 ${
                isLatest
                  ? `${meta.bgClass} border-transparent shadow-md`
                  : "bg-card-bg"
              }`}
            >
              {/* Step label */}
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">{meta.emoji}</span>
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${meta.colorClass}`}
                >
                  {meta.label}
                </span>
                <span className="text-xs text-muted">
                  Step {i + 1} of {totalSteps}
                </span>
              </div>

              {/* Relationship explanation */}
              {isLatest && (
                <p className="mb-3 text-sm italic text-muted">{relationship}</p>
              )}

              {/* Trait */}
              <h3 className="mb-1 text-lg font-bold text-foreground">
                {element.trait}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {element.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Action button */}
      {!isLastStep ? (
        <button
          onClick={onNext}
          className="mt-6 w-full rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg active:translate-y-0.5"
        >
          Reveal Next Step →
        </button>
      ) : (
        <button
          onClick={onComplete}
          className="mt-6 w-full rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg active:translate-y-0.5"
        >
          See Full Results ✨
        </button>
      )}
    </div>
  );
}
