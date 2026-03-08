"use client";

import { QuadrantData, EntryPath } from "../data/types";

interface QuadrantDiagramProps {
  quadrant: QuadrantData | null;
  revealedSteps: number;
  entryPath: EntryPath | null;
}

type QuadrantPosition = "quality" | "pitfall" | "challenge" | "allergy";

function getVisibility(
  position: QuadrantPosition,
  revealedSteps: number,
  entryPath: EntryPath | null
): "hidden" | "revealed" | "active" {
  if (revealedSteps === 0) return "hidden";

  const strengthOrder: QuadrantPosition[] = [
    "quality",
    "pitfall",
    "challenge",
    "allergy",
  ];
  const pitfallOrder: QuadrantPosition[] = [
    "pitfall",
    "quality",
    "challenge",
    "allergy",
  ];
  const allergyOrder: QuadrantPosition[] = [
    "allergy",
    "challenge",
    "pitfall",
    "quality",
  ];
  const order =
    entryPath === "allergy"
      ? allergyOrder
      : entryPath === "pitfall"
        ? pitfallOrder
        : strengthOrder;
  const stepIndex = order.indexOf(position);

  if (stepIndex >= revealedSteps) return "hidden";
  if (stepIndex === revealedSteps - 1) return "active";
  return "revealed";
}

function isArrowVisible(
  from: QuadrantPosition,
  to: QuadrantPosition,
  revealedSteps: number,
  entryPath: EntryPath | null
): boolean {
  const fromVis = getVisibility(from, revealedSteps, entryPath);
  const toVis = getVisibility(to, revealedSteps, entryPath);
  return fromVis !== "hidden" && toVis !== "hidden";
}

const COLORS: Record<QuadrantPosition, { bg: string; border: string; text: string }> = {
  quality: { bg: "#6b8f5e", border: "#5a7a4f", text: "#fff" },
  pitfall: { bg: "#c2694a", border: "#a8573b", text: "#fff" },
  challenge: { bg: "#5b7fa5", border: "#4a6b8e", text: "#fff" },
  allergy: { bg: "#b47a3e", border: "#9a6832", text: "#fff" },
};

const LABELS: Record<QuadrantPosition, string> = {
  quality: "Core Quality",
  pitfall: "Pitfall",
  challenge: "Challenge",
  allergy: "Allergy",
};

const SUBLABELS: Record<QuadrantPosition, string> = {
  quality: "Strength",
  pitfall: "Too much",
  challenge: "To develop",
  allergy: "Irritant",
};

export default function QuadrantDiagram({
  quadrant,
  revealedSteps,
  entryPath,
}: QuadrantDiagramProps) {
  const boxW = 200;
  const boxH = 100;
  const gapX = 130;
  const gapY = 110;
  const pad = 30;

  const svgW = boxW * 2 + gapX + pad * 2;
  const svgH = boxH * 2 + gapY + pad * 2;

  const positions = {
    quality: { x: pad, y: pad },
    pitfall: { x: pad + boxW + gapX, y: pad },
    allergy: { x: pad, y: pad + boxH + gapY },
    challenge: { x: pad + boxW + gapX, y: pad + boxH + gapY },
  };

  function getTraitName(pos: QuadrantPosition): string {
    if (!quadrant) return "";
    switch (pos) {
      case "quality":
        return quadrant.coreQuality.trait;
      case "pitfall":
        return quadrant.pitfall.trait;
      case "challenge":
        return quadrant.challenge.trait;
      case "allergy":
        return quadrant.allergy.trait;
    }
  }

  function renderBox(pos: QuadrantPosition) {
    const { x, y } = positions[pos];
    const vis = getVisibility(pos, revealedSteps, entryPath);
    const color = COLORS[pos];
    const opacity = vis === "hidden" ? 0.12 : 1;
    const trait = vis !== "hidden" ? getTraitName(pos) : "";
    const isActive = vis === "active";

    return (
      <g
        key={pos}
        style={{
          opacity,
          transition: "opacity 600ms ease-out",
        }}
      >
        {/* Shadow */}
        <rect
          x={x + 2}
          y={y + 2}
          width={boxW}
          height={boxH}
          rx={14}
          fill="rgba(0,0,0,0.06)"
        />
        {/* Card */}
        <rect
          x={x}
          y={y}
          width={boxW}
          height={boxH}
          rx={14}
          fill={color.bg}
          stroke={isActive ? "#fff" : color.border}
          strokeWidth={isActive ? 2.5 : 1}
        />
        {/* Label */}
        <text
          x={x + boxW / 2}
          y={y + (trait ? 30 : 40)}
          textAnchor="middle"
          fill={color.text}
          fontSize={14}
          fontWeight={600}
          letterSpacing="0.02em"
        >
          {LABELS[pos]}
        </text>
        {/* Sublabel */}
        <text
          x={x + boxW / 2}
          y={y + (trait ? 47 : 57)}
          textAnchor="middle"
          fill={color.text}
          fontSize={11}
          opacity={0.7}
        >
          {SUBLABELS[pos]}
        </text>
        {/* Trait name */}
        {trait && (
          <text
            x={x + boxW / 2}
            y={y + 74}
            textAnchor="middle"
            fill={color.text}
            fontSize={trait.length > 14 ? 13 : 17}
            fontWeight={700}
            style={{
              opacity: vis !== "hidden" ? 1 : 0,
              transition: "opacity 400ms ease-out 200ms",
            }}
          >
            {trait}
          </text>
        )}
      </g>
    );
  }

  function renderArrow(
    from: QuadrantPosition,
    to: QuadrantPosition,
    label: string
  ) {
    const visible = isArrowVisible(from, to, revealedSteps, entryPath);
    const fp = positions[from];
    const tp = positions[to];

    let x1: number,
      y1: number,
      x2: number,
      y2: number,
      lx: number,
      ly: number;

    const arrowGap = 14;

    if (from === "quality" && to === "pitfall") {
      // Top horizontal →
      x1 = fp.x + boxW + arrowGap;
      y1 = fp.y + boxH / 2;
      x2 = tp.x - arrowGap;
      y2 = tp.y + boxH / 2;
      lx = (x1 + x2) / 2;
      ly = y1 - 12;
    } else if (from === "pitfall" && to === "challenge") {
      // Right vertical ↓
      x1 = fp.x + boxW / 2;
      y1 = fp.y + boxH + arrowGap;
      x2 = tp.x + boxW / 2;
      y2 = tp.y - arrowGap;
      lx = x1 + 20;
      ly = (y1 + y2) / 2 + 4;
    } else if (from === "challenge" && to === "allergy") {
      // Bottom horizontal ←
      x1 = fp.x - arrowGap;
      y1 = fp.y + boxH / 2;
      x2 = tp.x + boxW + arrowGap;
      y2 = tp.y + boxH / 2;
      lx = (x1 + x2) / 2;
      ly = y1 + 16;
    } else {
      // Left vertical ↑ (allergy → quality)
      x1 = fp.x + boxW / 2;
      y1 = fp.y - arrowGap;
      x2 = tp.x + boxW / 2;
      y2 = tp.y + boxH + arrowGap;
      lx = x1 - 20;
      ly = (y1 + y2) / 2 + 4;
    }

    // Measure approximate label width for the pill
    const pillW = label.length * 7.5 + 20;
    const pillH = 22;

    return (
      <g
        key={`${from}-${to}`}
        style={{
          opacity: visible ? 0.7 : 0.08,
          transition: "opacity 600ms ease-out",
        }}
      >
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#a08b6f"
          strokeWidth={1.2}
          strokeDasharray="4 3"
          markerEnd="url(#arrowhead)"
        />
        {/* Pill background */}
        <rect
          x={lx - pillW / 2}
          y={ly - pillH / 2 - 1}
          width={pillW}
          height={pillH}
          rx={pillH / 2}
          fill="#f5f0e8"
          stroke="#d4c9b8"
          strokeWidth={1}
        />
        <text
          x={lx}
          y={ly + 4}
          textAnchor="middle"
          fill="#6b5d4d"
          fontSize={10.5}
          fontWeight={500}
        >
          {label}
        </text>
      </g>
    );
  }

  return (
    <div className="rounded-2xl border border-card-border bg-card-bg p-5">
      <p className="mb-4 text-center text-sm font-semibold text-foreground">
        Your Quadrant
      </p>
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="mx-auto w-full max-w-[520px]"
        role="img"
        aria-label="Ofman's Core Quadrants diagram"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="7"
            markerHeight="5"
            refX="6"
            refY="2.5"
            orient="auto"
          >
            <path d="M0,0 L7,2.5 L0,5" fill="#a08b6f" />
          </marker>
        </defs>

        {renderArrow("quality", "pitfall", "too much of")}
        {renderArrow("pitfall", "challenge", "positive opposite")}
        {renderArrow("challenge", "allergy", "too much of")}
        {renderArrow("allergy", "quality", "positive opposite")}

        {renderBox("quality")}
        {renderBox("pitfall")}
        {renderBox("challenge")}
        {renderBox("allergy")}
      </svg>
      {revealedSteps === 0 && (
        <p className="mt-3 text-center text-xs text-muted">
          Fills in as you complete the assessment
        </p>
      )}
    </div>
  );
}
