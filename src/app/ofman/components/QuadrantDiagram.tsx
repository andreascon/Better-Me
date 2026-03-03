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
  const allergyOrder: QuadrantPosition[] = [
    "allergy",
    "challenge",
    "pitfall",
    "quality",
  ];
  const order = entryPath === "allergy" ? allergyOrder : strengthOrder;
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

const COLORS: Record<QuadrantPosition, { bg: string; text: string }> = {
  quality: { bg: "#6b8f5e", text: "#fff" },
  pitfall: { bg: "#c2694a", text: "#fff" },
  challenge: { bg: "#5b7fa5", text: "#fff" },
  allergy: { bg: "#b47a3e", text: "#fff" },
};

const LABELS: Record<QuadrantPosition, string> = {
  quality: "Core Quality",
  pitfall: "Pitfall",
  challenge: "Challenge",
  allergy: "Allergy",
};

const SUBLABELS: Record<QuadrantPosition, string> = {
  quality: "(Strength)",
  pitfall: "(Too much)",
  challenge: "(To develop)",
  allergy: "(Irritant)",
};

export default function QuadrantDiagram({
  quadrant,
  revealedSteps,
  entryPath,
}: QuadrantDiagramProps) {
  const boxW = 200;
  const boxH = 100;
  const gap = 80;
  const svgW = boxW * 2 + gap;
  const svgH = boxH * 2 + gap + 40;
  const pad = 20;

  const positions = {
    quality: { x: pad, y: pad },
    pitfall: { x: pad + boxW + gap, y: pad },
    allergy: { x: pad, y: pad + boxH + gap },
    challenge: { x: pad + boxW + gap, y: pad + boxH + gap },
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
    const opacity = vis === "hidden" ? 0.15 : 1;
    const trait = vis !== "hidden" ? getTraitName(pos) : "";

    return (
      <g
        key={pos}
        style={{
          opacity,
          transition: "opacity 600ms ease-out",
        }}
      >
        <rect
          x={x}
          y={y}
          width={boxW}
          height={boxH}
          rx={12}
          fill={color.bg}
          stroke={vis === "active" ? "#fff" : "none"}
          strokeWidth={vis === "active" ? 3 : 0}
        />
        <text
          x={x + boxW / 2}
          y={y + (trait ? 32 : 40)}
          textAnchor="middle"
          fill={color.text}
          fontSize={13}
          fontWeight={600}
        >
          {LABELS[pos]}
        </text>
        <text
          x={x + boxW / 2}
          y={y + (trait ? 48 : 56)}
          textAnchor="middle"
          fill={color.text}
          fontSize={10}
          opacity={0.8}
        >
          {SUBLABELS[pos]}
        </text>
        {trait && (
          <text
            x={x + boxW / 2}
            y={y + 72}
            textAnchor="middle"
            fill={color.text}
            fontSize={16}
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

    if (from === "quality" && to === "pitfall") {
      // Top horizontal →
      x1 = fp.x + boxW + 8;
      y1 = fp.y + boxH / 2;
      x2 = tp.x - 8;
      y2 = tp.y + boxH / 2;
      lx = (x1 + x2) / 2;
      ly = y1 - 10;
    } else if (from === "pitfall" && to === "challenge") {
      // Right vertical ↓
      x1 = fp.x + boxW / 2;
      y1 = fp.y + boxH + 8;
      x2 = tp.x + boxW / 2;
      y2 = tp.y - 8;
      lx = x1 + 15;
      ly = (y1 + y2) / 2 + 4;
    } else if (from === "challenge" && to === "allergy") {
      // Bottom horizontal ←
      x1 = fp.x - 8;
      y1 = fp.y + boxH / 2;
      x2 = tp.x + boxW + 8;
      y2 = tp.y + boxH / 2;
      lx = (x1 + x2) / 2;
      ly = y1 + 18;
    } else {
      // Left vertical ↑ (allergy → quality)
      x1 = fp.x + boxW / 2;
      y1 = fp.y - 8;
      x2 = tp.x + boxW / 2;
      y2 = tp.y + boxH + 8;
      lx = x1 - 15;
      ly = (y1 + y2) / 2 + 4;
    }

    return (
      <g
        key={`${from}-${to}`}
        style={{
          opacity: visible ? 0.6 : 0.1,
          transition: "opacity 600ms ease-out",
        }}
      >
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#8b7355"
          strokeWidth={1.5}
          markerEnd="url(#arrowhead)"
        />
        <text
          x={lx}
          y={ly}
          textAnchor="middle"
          fill="#8b7355"
          fontSize={10}
          fontStyle="italic"
        >
          {label}
        </text>
      </g>
    );
  }

  return (
    <div className="rounded-2xl border border-card-border bg-card-bg p-4">
      <p className="mb-3 text-center text-sm font-semibold text-foreground">
        Your Quadrant
      </p>
      <svg
        viewBox={`0 0 ${svgW + pad * 2} ${svgH}`}
        className="mx-auto w-full max-w-[500px]"
        role="img"
        aria-label="Ofman's Core Quadrants diagram"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L8,3 L0,6" fill="#8b7355" />
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
        <p className="mt-2 text-center text-xs text-muted">
          Fills in as you complete the assessment
        </p>
      )}
    </div>
  );
}
