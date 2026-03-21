"use client";

import { useMemo } from "react";
import type { Choice } from "../data/types";
import { computeScores, determineStyle, styleProfiles } from "../data/styles";
import StyleGrid from "./StyleGrid";

interface ResultsSummaryProps {
  dimension1Answers: Record<number, Choice>;
  dimension2Answers: Record<number, Choice>;
  onReset: () => void;
}

export default function ResultsSummary({
  dimension1Answers,
  dimension2Answers,
  onReset,
}: ResultsSummaryProps) {
  const { assertiveness, responsiveness } = useMemo(
    () => computeScores(dimension1Answers, dimension2Answers),
    [dimension1Answers, dimension2Answers]
  );

  const styleType = useMemo(
    () => determineStyle(assertiveness, responsiveness),
    [assertiveness, responsiveness]
  );

  const profile = styleProfiles[styleType];

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-3xl font-bold text-foreground">
          Your Interpersonal Style
        </h2>
        <p className="text-lg text-muted">
          Based on your answers, here&apos;s how you show up in relationships
          and conversations.
        </p>
      </div>

      {/* Grid */}
      <div className="mb-10">
        <StyleGrid
          assertiveness={assertiveness}
          responsiveness={responsiveness}
          style={styleType}
        />
        <div className="mt-4 flex justify-center gap-6 text-base text-muted">
          <span>
            Assertiveness: <strong className="text-foreground">{assertiveness}</strong>/15
          </span>
          <span>
            Responsiveness: <strong className="text-foreground">{responsiveness}</strong>/15
          </span>
        </div>
      </div>

      {/* Style card */}
      <div className="mb-8 rounded-2xl border border-card-border bg-card-bg p-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-3xl">{profile.emoji}</span>
          <div>
            <h3 className="text-2xl font-bold text-foreground">
              {profile.label}
            </h3>
            <p className="text-lg text-muted">{profile.tagline}</p>
          </div>
        </div>

        <p className="mb-6 text-lg leading-relaxed text-muted">
          {profile.description}
        </p>

        {/* Strengths */}
        <div className="mb-6">
          <h4 className="mb-3 text-lg font-semibold text-quadrant-quality">
            Your strengths
          </h4>
          <ul className="space-y-2">
            {profile.strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-lg text-muted">
                <span className="shrink-0 text-quadrant-quality">+</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Watch-outs */}
        <div>
          <h4 className="mb-3 text-lg font-semibold text-quadrant-pitfall">
            Watch out for
          </h4>
          <ul className="space-y-2">
            {profile.watchOuts.map((w, i) => (
              <li key={i} className="flex gap-2 text-lg text-muted">
                <span className="shrink-0 text-quadrant-pitfall">&bull;</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Relationship insight */}
      <div className="mb-8 rounded-2xl border border-accent/20 bg-accent/5 p-6">
        <h3 className="mb-2 text-lg font-semibold text-accent">
          Working with others
        </h3>
        <p className="text-lg leading-relaxed text-muted">
          People with different styles aren&apos;t wrong &mdash; they&apos;re
          just wired differently. When you notice friction, consider whether
          it&apos;s a style clash rather than a personal conflict. Adapting
          slightly toward the other person&apos;s style can dramatically improve
          communication.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-10 text-center">
        <button
          onClick={onReset}
          className="rounded-full border border-card-border px-5 py-2.5 text-lg font-medium text-muted transition-colors hover:border-accent hover:text-foreground"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
