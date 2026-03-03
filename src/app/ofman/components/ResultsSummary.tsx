"use client";

import { useState } from "react";
import { QuadrantData, EntryPath } from "../data/types";

interface ResultsSummaryProps {
  quadrant: QuadrantData;
  entryPath: EntryPath;
  onReset: () => void;
}

const cardConfig = [
  {
    key: "coreQuality" as const,
    label: "Core Quality",
    emoji: "💎",
    colorClass: "text-quadrant-quality",
    borderClass: "border-quadrant-quality/30",
    bgClass: "bg-quadrant-quality-light",
  },
  {
    key: "pitfall" as const,
    label: "Pitfall",
    emoji: "⚠️",
    colorClass: "text-quadrant-pitfall",
    borderClass: "border-quadrant-pitfall/30",
    bgClass: "bg-quadrant-pitfall-light",
  },
  {
    key: "challenge" as const,
    label: "Challenge",
    emoji: "🌱",
    colorClass: "text-quadrant-challenge",
    borderClass: "border-quadrant-challenge/30",
    bgClass: "bg-quadrant-challenge-light",
  },
  {
    key: "allergy" as const,
    label: "Allergy",
    emoji: "😤",
    colorClass: "text-quadrant-allergy",
    borderClass: "border-quadrant-allergy/30",
    bgClass: "bg-quadrant-allergy-light",
  },
];

export default function ResultsSummary({
  quadrant,
  entryPath,
  onReset,
}: ResultsSummaryProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/ofman?q=${quadrant.id}&via=${entryPath}`
      : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        Your Core Quadrant
      </h2>
      <p className="mb-8 text-sm text-muted">
        Here&apos;s the complete picture of your personal dynamics.
      </p>

      {/* Four result cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {cardConfig.map(({ key, label, emoji, colorClass, borderClass, bgClass }) => {
          const element = quadrant[key];
          return (
            <div
              key={key}
              className={`rounded-2xl border ${borderClass} ${bgClass} p-5`}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">{emoji}</span>
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${colorClass}`}
                >
                  {label}
                </span>
              </div>
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

      {/* Growth tip */}
      <div className="mt-6 rounded-2xl border border-accent/20 bg-accent/5 p-6">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-accent">
          <span>🎯</span> Growth Tip
        </h3>
        <p className="text-sm leading-relaxed text-foreground">
          {quadrant.growthTip}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleCopyLink}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-card-border bg-card-bg px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-accent hover:shadow-md"
        >
          {copied ? (
            <>
              <span>✓</span> Link Copied!
            </>
          ) : (
            <>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share Result
            </>
          )}
        </button>
        <button
          onClick={onReset}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-card-border bg-card-bg px-6 py-3 text-sm font-medium text-muted transition-all hover:border-accent hover:text-foreground hover:shadow-md"
        >
          ↺ Start Over
        </button>
      </div>
    </div>
  );
}
