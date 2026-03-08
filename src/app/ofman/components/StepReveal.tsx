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
const pitfallOrder: StepKey[] = [
  "pitfall",
  "coreQuality",
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
  pitfall: [
    "This is your pitfall — when your strength goes too far.",
    "Underneath this shadow lies your core quality — your true strength.",
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

/** Self-reflection prompts for each quadrant element, inspired by Ofman's methodology */
const reflectionPrompts: Record<StepKey, string[]> = {
  coreQuality: [
    "When do others compliment you on this quality?",
    "How does this strength show up in your daily life?",
    "Can you recall a time this quality helped you or someone around you?",
  ],
  pitfall: [
    "Can you think of a moment when this quality went too far?",
    "How do others react when you overdo your strength?",
    "What signals tell you that you've crossed from strength into excess?",
  ],
  challenge: [
    "What would it look like to practice this quality more often?",
    "Who do you know that models this quality well — and what can you learn from them?",
    "What small step could you take this week to develop this side of yourself?",
  ],
  allergy: [
    "Who in your life displays this trait — and why does it bother you so much?",
    "Could this person's behaviour be a mirror of the challenge you need to develop?",
    "Next time this irritation arises, how could you respond differently?",
  ],
};

export default function StepReveal({
  quadrant,
  entryPath,
  revealedSteps,
  onNext,
  onComplete,
}: StepRevealProps) {
  const order =
    entryPath === "strength"
      ? strengthOrder
      : entryPath === "pitfall"
        ? pitfallOrder
        : allergyOrder;
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
          const prompts = reflectionPrompts[key];

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

              {/* Self-reflection prompt (only on the latest revealed step) */}
              {isLatest && (
                <div className="mt-4 rounded-xl border border-card-border/50 bg-background/60 p-4">
                  <p className="mb-2 text-xs font-semibold text-accent">
                    🪞 Reflect on this
                  </p>
                  <ul className="space-y-1.5">
                    {prompts.map((prompt, pi) => (
                      <li
                        key={pi}
                        className="text-xs leading-relaxed text-muted"
                      >
                        {prompt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
