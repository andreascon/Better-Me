"use client";

import type { PersonalValue } from "../data/types";

interface SandboxGraphicProps {
  values: PersonalValue[];
  onReset: () => void;
}

/** Collect all non-empty boundary statements */
function getBoundaries(values: PersonalValue[]): string[] {
  return values
    .map((v) => v.statements.boundary)
    .filter((b) => b.trim().length > 0);
}

/** Collect all non-empty positive statements grouped by value */
function getPositives(values: PersonalValue[]): { name: string; lines: string[] }[] {
  return values
    .map((v) => ({
      name: v.name,
      lines: v.statements.positive.filter((p) => p.trim().length > 0),
    }))
    .filter((g) => g.lines.length > 0);
}

export default function SandboxGraphic({ values, onReset }: SandboxGraphicProps) {
  const boundaries = getBoundaries(values);
  const positives = getPositives(values);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-3xl font-bold text-foreground">
          Your Values Sandbox
        </h2>
        <p className="text-sm text-muted">
          The walls are your boundaries. The playground inside is your Zone of
          Genius.
        </p>
      </div>

      {/* SVG Sandbox */}
      <div className="mb-12 overflow-hidden rounded-2xl border border-card-border bg-card-bg p-2">
        <svg
          viewBox="0 0 800 600"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sand background */}
          <defs>
            <linearGradient id="sandGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f5e6d0" />
              <stop offset="100%" stopColor="#e8d5b8" />
            </linearGradient>
            <pattern
              id="sandTexture"
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="0.5" fill="#d4c4a8" opacity="0.3" />
              <circle cx="4" cy="4" r="0.4" fill="#c9b799" opacity="0.2" />
            </pattern>
          </defs>

          {/* Outer sandbox frame (walls) */}
          <rect
            x="40"
            y="40"
            width="720"
            height="520"
            rx="24"
            fill="none"
            stroke="#b47a3e"
            strokeWidth="12"
            opacity="0.8"
          />

          {/* Sand fill */}
          <rect
            x="46"
            y="46"
            width="708"
            height="508"
            rx="20"
            fill="url(#sandGrad)"
          />
          <rect
            x="46"
            y="46"
            width="708"
            height="508"
            rx="20"
            fill="url(#sandTexture)"
          />

          {/* Wall labels (boundaries) — along the edges */}
          {boundaries.map((b, i) => {
            // Distribute along the 4 walls
            const side = i % 4;
            const offset = Math.floor(i / 4);
            let x = 0,
              y = 0,
              anchor = "middle" as const,
              rotate = 0;
            const spacing = 60;

            if (side === 0) {
              // Top
              x = 400;
              y = 28 - offset * 16;
              anchor = "middle";
            } else if (side === 1) {
              // Bottom
              x = 400;
              y = 578 + offset * 16;
              anchor = "middle";
            } else if (side === 2) {
              // Left
              x = 26 - offset * 16;
              y = 200 + offset * spacing;
              rotate = -90;
            } else {
              // Right
              x = 774 + offset * 16;
              y = 200 + offset * spacing;
              rotate = 90;
            }

            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor={anchor}
                transform={rotate ? `rotate(${rotate}, ${x}, ${y})` : undefined}
                className="fill-quadrant-pitfall text-[10px] font-medium"
                opacity="0.7"
              >
                {b.length > 70 ? b.slice(0, 67) + "..." : b}
              </text>
            );
          })}

          {/* "Zone of Genius" label */}
          <text
            x="400"
            y="90"
            textAnchor="middle"
            className="fill-foreground text-[18px] font-bold"
            opacity="0.2"
          >
            Zone of Genius
          </text>

          {/* Value groups inside the sandbox */}
          {positives.map((group, gi) => {
            const cols = Math.min(positives.length, 3);
            const colWidth = 640 / cols;
            const colX = 80 + gi * colWidth + colWidth / 2;
            const startY = 130;

            return (
              <g key={gi}>
                {/* Value name */}
                <text
                  x={colX}
                  y={startY}
                  textAnchor="middle"
                  className="fill-accent text-[15px] font-bold"
                >
                  {group.name}
                </text>
                {/* Underline */}
                <line
                  x1={colX - 40}
                  y1={startY + 8}
                  x2={colX + 40}
                  y2={startY + 8}
                  stroke="#b47a3e"
                  strokeWidth="1"
                  opacity="0.4"
                />
                {/* Positive statements */}
                {group.lines.map((line, li) => {
                  // Wrap long text
                  const maxChars = Math.floor(colWidth / 6);
                  const wrapped =
                    line.length > maxChars
                      ? line.slice(0, maxChars - 3) + "..."
                      : line;
                  return (
                    <text
                      key={li}
                      x={colX}
                      y={startY + 36 + li * 28}
                      textAnchor="middle"
                      className="fill-quadrant-quality text-[11px]"
                    >
                      {wrapped}
                    </text>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Text summary below */}
      <div className="space-y-8">
        {values.map((v, i) => (
          <div
            key={i}
            className="rounded-2xl border border-card-border bg-card-bg p-6"
          >
            <h3 className="mb-4 text-xl font-semibold text-foreground">
              {v.name}
            </h3>

            {v.statements.positive
              .filter((p) => p.trim())
              .map((p, j) => (
                <p key={j} className="mb-1 text-sm text-muted">
                  <span className="mr-1 text-quadrant-quality">+</span> {p}
                </p>
              ))}

            {v.statements.boundary.trim() && (
              <p className="mt-3 text-sm text-muted">
                <span className="mr-1 text-quadrant-pitfall">-</span>{" "}
                {v.statements.boundary}
              </p>
            )}

            {v.statements.costReflection.trim() && (
              <p className="mt-3 text-xs italic text-muted/70">
                Cost: {v.statements.costReflection}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-10 text-center">
        <button
          onClick={onReset}
          className="rounded-full border border-card-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-foreground"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
