"use client";

import type { StyleType } from "../data/types";

interface StyleGridProps {
  assertiveness: number;
  responsiveness: number;
  style: StyleType;
}

const QUADRANTS: {
  type: StyleType;
  label: string;
  x: "left" | "right";
  y: "top" | "bottom";
  bg: string;
  bgActive: string;
  text: string;
}[] = [
  {
    type: "analytical",
    label: "Analytical",
    x: "left",
    y: "top",
    bg: "rgba(91, 127, 165, 0.12)",
    bgActive: "rgba(91, 127, 165, 0.25)",
    text: "#5b7fa5",
  },
  {
    type: "driver",
    label: "Driver",
    x: "right",
    y: "top",
    bg: "rgba(194, 105, 74, 0.12)",
    bgActive: "rgba(194, 105, 74, 0.25)",
    text: "#c2694a",
  },
  {
    type: "amiable",
    label: "Amiable",
    x: "left",
    y: "bottom",
    bg: "rgba(107, 143, 94, 0.12)",
    bgActive: "rgba(107, 143, 94, 0.25)",
    text: "#6b8f5e",
  },
  {
    type: "expressive",
    label: "Expressive",
    x: "right",
    y: "bottom",
    bg: "rgba(180, 122, 62, 0.12)",
    bgActive: "rgba(180, 122, 62, 0.25)",
    text: "#b47a3e",
  },
];

export default function StyleGrid({
  assertiveness,
  responsiveness,
  style,
}: StyleGridProps) {
  const pad = 60;
  const gridW = 320;
  const gridH = 320;
  const svgW = gridW + pad * 2;
  const svgH = gridH + pad * 2;
  const halfW = gridW / 2;
  const halfH = gridH / 2;

  // Map scores (0-15) to position within the grid
  // X = assertiveness (0=left/less, 15=right/more)
  // Y = responsiveness (0=top/less, 15=bottom/more)
  const dotX = pad + (assertiveness / 15) * gridW;
  const dotY = pad + (responsiveness / 15) * gridH;

  return (
    <div className="mx-auto max-w-lg">
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="mx-auto w-full"
        role="img"
        aria-label="Interpersonal style grid showing your position"
      >
        {/* Quadrant backgrounds */}
        {QUADRANTS.map((q) => {
          const x = q.x === "left" ? pad : pad + halfW;
          const y = q.y === "top" ? pad : pad + halfH;
          const isActive = q.type === style;
          return (
            <g key={q.type}>
              <rect
                x={x}
                y={y}
                width={halfW}
                height={halfH}
                fill={isActive ? q.bgActive : q.bg}
                stroke={isActive ? q.text : "rgba(0,0,0,0.08)"}
                strokeWidth={isActive ? 2 : 1}
                rx={0}
              />
              <text
                x={x + halfW / 2}
                y={y + halfH / 2 + 6}
                textAnchor="middle"
                fill={q.text}
                fontSize={isActive ? 18 : 15}
                fontWeight={isActive ? 700 : 500}
                opacity={isActive ? 1 : 0.6}
              >
                {q.label}
              </text>
            </g>
          );
        })}

        {/* Grid border */}
        <rect
          x={pad}
          y={pad}
          width={gridW}
          height={gridH}
          fill="none"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth={1.5}
        />
        {/* Cross lines */}
        <line
          x1={pad + halfW}
          y1={pad}
          x2={pad + halfW}
          y2={pad + gridH}
          stroke="rgba(0,0,0,0.12)"
          strokeWidth={1}
        />
        <line
          x1={pad}
          y1={pad + halfH}
          x2={pad + gridW}
          y2={pad + halfH}
          stroke="rgba(0,0,0,0.12)"
          strokeWidth={1}
        />

        {/* Axis labels */}
        {/* Top */}
        <text
          x={pad + halfW}
          y={pad - 14}
          textAnchor="middle"
          fill="#8b7355"
          fontSize={12}
          fontWeight={600}
        >
          LESS RESPONSIVE (LOGIC)
        </text>
        {/* Bottom */}
        <text
          x={pad + halfW}
          y={pad + gridH + 28}
          textAnchor="middle"
          fill="#8b7355"
          fontSize={12}
          fontWeight={600}
        >
          MORE RESPONSIVE (EMOTION)
        </text>
        {/* Left */}
        <text
          x={pad - 14}
          y={pad + halfH}
          textAnchor="middle"
          fill="#8b7355"
          fontSize={12}
          fontWeight={600}
          transform={`rotate(-90, ${pad - 14}, ${pad + halfH})`}
        >
          LESS ASSERTIVE
        </text>
        {/* Right */}
        <text
          x={pad + gridW + 14}
          y={pad + halfH}
          textAnchor="middle"
          fill="#8b7355"
          fontSize={12}
          fontWeight={600}
          transform={`rotate(90, ${pad + gridW + 14}, ${pad + halfH})`}
        >
          MORE ASSERTIVE
        </text>

        {/* User position dot */}
        <circle
          cx={dotX}
          cy={dotY}
          r={10}
          fill="#3d2c1e"
          stroke="white"
          strokeWidth={3}
        />
        <circle cx={dotX} cy={dotY} r={4} fill="white" />
      </svg>
    </div>
  );
}
