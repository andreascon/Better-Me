"use client";
// swipe-tutorial-v2
import { useState, useRef, useCallback, useEffect } from "react";
import type { SwipeItem } from "../data/types";
import { shuffle } from "../data/helpers";

interface SwipeCardsProps {
  items: SwipeItem[];
  heading: string;
  subheading: string;
  /** Label for the "right-swipe" (select) button */
  selectLabel: string;
  /** Label for the "left-swipe" (skip) button */
  skipLabel: string;
  minSelections?: number;
  onComplete: (selectedIds: string[]) => void;
}

const SWIPE_THRESHOLD = 100;

export default function SwipeCards({
  items,
  heading,
  subheading,
  selectLabel,
  skipLabel,
  minSelections = 5,
  onComplete,
}: SwipeCardsProps) {
  const [shuffled, setShuffled] = useState(() => shuffle(items));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [flyDirection, setFlyDirection] = useState<"left" | "right" | null>(
    null
  );
  const [history, setHistory] = useState<
    { index: number; wasSelected: boolean }[]
  >([]);
  const [done, setDone] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);

  const dragStartX = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Dismiss the swipe tutorial on first interaction or after the animation
  useEffect(() => {
    if (!showTutorial) return;
    const timer = setTimeout(() => setShowTutorial(false), 3600);
    return () => clearTimeout(timer);
  }, [showTutorial]);

  const currentCard = shuffled[currentIndex] as SwipeItem | undefined;

  const advanceCard = useCallback(
    (direction: "left" | "right") => {
      if (!currentCard || done) return;

      const isSelect = direction === "right";
      const nextSelected = isSelect
        ? [...selectedIds, currentCard.id]
        : selectedIds;

      setFlyDirection(direction);
      setHistory((h) => [...h, { index: currentIndex, wasSelected: isSelect }]);

      setTimeout(() => {
        if (isSelect) setSelectedIds(nextSelected);

        const nextIndex = currentIndex + 1;

        if (nextIndex >= shuffled.length) {
          setDone(true);
        } else {
          setCurrentIndex(nextIndex);
        }

        setFlyDirection(null);
        setDragX(0);
      }, 300);
    },
    [currentCard, currentIndex, done, selectedIds, shuffled.length]
  );

  // Keyboard support (arrow keys)
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (done) return;
      if (e.key === "ArrowLeft") advanceCard("left");
      if (e.key === "ArrowRight") advanceCard("right");
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [advanceCard, done]);

  // Touch/mouse drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (done) return;
    if (showTutorial) setShowTutorial(false);
    setIsDragging(true);
    dragStartX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setDragX(e.clientX - dragStartX.current);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragX) > SWIPE_THRESHOLD) {
      advanceCard(dragX > 0 ? "right" : "left");
    } else {
      setDragX(0);
    }
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentIndex(last.index);
    if (last.wasSelected) {
      setSelectedIds((s) => s.slice(0, -1));
    }
    setDone(false);
  };

  const handleRetry = () => {
    setShuffled(shuffle(items));
    setCurrentIndex(0);
    setSelectedIds([]);
    setHistory([]);
    setDone(false);
    setShowTutorial(true);
  };

  const handleFinish = () => {
    onComplete(selectedIds);
  };

  // Card transform
  const rotation = isDragging ? dragX * 0.05 : 0;
  const flyX =
    flyDirection === "right" ? 600 : flyDirection === "left" ? -600 : dragX;
  const flyRotation =
    flyDirection === "right" ? 20 : flyDirection === "left" ? -20 : rotation;
  const opacity = flyDirection ? 0 : 1;

  // Colour hint based on drag direction
  const hintGreen = Math.max(0, Math.min(1, dragX / SWIPE_THRESHOLD));
  const hintRed = Math.max(0, Math.min(1, -dragX / SWIPE_THRESHOLD));

  // Done state — show summary
  if (done) {
    const tooFew = selectedIds.length < minSelections;
    return (
      <div className="mx-auto max-w-md px-6 py-12 text-center">
        <h2 className="mb-2 text-2xl font-bold text-foreground">{heading}</h2>
        {selectedIds.length === 0 ? (
          <p className="mb-6 text-lg text-muted">
            You didn&apos;t select any. Try going through the cards again.
          </p>
        ) : (
          <>
            <p className="mb-6 text-lg text-muted">
              You selected {selectedIds.length} item
              {selectedIds.length !== 1 && "s"}.
              {tooFew &&
                ` Try to find at least ${minSelections}. You can undo and keep going.`}
            </p>
            <div className="mb-8 space-y-2 text-left">
              {selectedIds.map((id) => {
                const item = shuffled.find((s) => s.id === id);
                if (!item) return null;
                return (
                  <div
                    key={id}
                    className="rounded-xl border border-card-border bg-card-bg px-4 py-3"
                  >
                    <span className="text-lg font-medium text-foreground">
                      {item.trait}
                    </span>
                    <span className="ml-2 text-base text-muted">
                      {item.category}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          {history.length > 0 && (
            <button
              onClick={handleUndo}
              className="rounded-full border border-card-border px-5 py-2.5 text-base font-medium text-muted transition-colors hover:border-accent hover:text-foreground"
            >
              &larr; Undo last
            </button>
          )}
          <button
            onClick={handleRetry}
            className="rounded-full border border-card-border px-5 py-2.5 text-base font-medium text-muted transition-colors hover:border-accent hover:text-foreground"
          >
            Start over
          </button>
          {!tooFew && selectedIds.length > 0 && (
            <button
              onClick={handleFinish}
              className="rounded-full border border-accent bg-accent/10 px-5 py-2.5 text-base font-medium text-accent transition-colors hover:bg-accent/20"
            >
              Continue with {selectedIds.length} &rarr;
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-foreground">{heading}</h2>
        <p className="mx-auto max-w-md text-lg leading-relaxed text-muted">
          {subheading}
        </p>
      </div>

      {/* Progress */}
      <div className="mx-auto mb-6 flex max-w-md items-center justify-between text-base text-muted">
        <span>
          Card {currentIndex + 1} of {shuffled.length}
        </span>
        <span>{selectedIds.length} selected</span>
      </div>

      {/* Card area — side buttons on desktop, below on mobile */}
      <div className="flex items-center justify-center gap-5">
        {/* Left (skip) button — desktop only */}
        <button
          onClick={() => advanceCard("left")}
          className="hidden sm:flex h-auto min-w-[100px] shrink-0 flex-col items-center gap-1.5 rounded-2xl border border-quadrant-pitfall/30 px-4 py-4 text-quadrant-pitfall transition-all hover:border-quadrant-pitfall hover:bg-quadrant-pitfall/10"
          aria-label={skipLabel}
        >
          <span className="text-2xl">&times;</span>
          <span className="text-base font-medium leading-tight text-center">
            {skipLabel}
          </span>
        </button>

        {/* Card stack */}
        <div className="relative mx-auto h-[320px] w-full sm:max-w-[340px]">
          {/* Background cards for stack effect */}
          {shuffled[currentIndex + 2] && (
            <div className="absolute inset-x-4 top-4 h-[300px] rounded-2xl border border-card-border/50 bg-card-bg/40" />
          )}
          {shuffled[currentIndex + 1] && (
            <div className="absolute inset-x-2 top-2 h-[310px] rounded-2xl border border-card-border/70 bg-card-bg/60" />
          )}

          {/* Active card */}
          {currentCard && (
            <div
              ref={cardRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="absolute inset-0 cursor-grab touch-none select-none rounded-2xl border border-card-border bg-card-bg shadow-md active:cursor-grabbing"
              style={{
                transform: `translateX(${flyX}px) rotate(${flyRotation}deg)`,
                opacity,
                transition:
                  flyDirection || !isDragging
                    ? "transform 0.3s ease-out, opacity 0.3s ease-out"
                    : "none",
                borderColor:
                  hintGreen > 0.3
                    ? `rgba(107, 143, 94, ${hintGreen})`
                    : hintRed > 0.3
                      ? `rgba(194, 105, 74, ${hintRed})`
                      : undefined,
              }}
            >
              <div className="flex h-full flex-col justify-between p-6">
                <div>
                  <span className="mb-3 inline-block rounded-full bg-muted/10 px-3 py-1 text-sm text-muted">
                    {currentCard.category}
                  </span>
                  <h3 className="mb-4 text-2xl font-bold text-foreground">
                    {currentCard.trait}
                  </h3>
                  <p className="text-lg leading-relaxed text-muted">
                    {currentCard.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile swipe tutorial overlay */}
          {showTutorial && currentIndex === 0 && (
            <div
              className="pointer-events-none absolute inset-0 z-10 sm:hidden"
              aria-hidden="true"
            >
              {/* Left label */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2 animate-[fadeInLeft_2.4s_0.4s_both] rounded-lg bg-quadrant-pitfall/90 px-2.5 py-1.5 text-sm font-semibold text-white shadow-md">
                &larr; {skipLabel}
              </div>
              {/* Right label */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-[fadeInRight_2.4s_0.4s_both] rounded-lg bg-quadrant-quality/90 px-2.5 py-1.5 text-sm font-semibold text-white shadow-md">
                {selectLabel} &rarr;
              </div>
              {/* Animated finger icon sliding left then right */}
              <div className="absolute left-1/2 top-2/3 -translate-x-1/2 animate-[swipeHint_2.4s_0.2s_both] text-3xl">
                &#128070;
              </div>
            </div>
          )}
        </div>

        {/* Right (select) button — desktop only */}
        <button
          onClick={() => advanceCard("right")}
          className="hidden sm:flex h-auto min-w-[100px] shrink-0 flex-col items-center gap-1.5 rounded-2xl border border-quadrant-quality/30 px-4 py-4 text-quadrant-quality transition-all hover:border-quadrant-quality hover:bg-quadrant-quality/10"
          aria-label={selectLabel}
        >
          <span className="text-2xl">&#10003;</span>
          <span className="text-base font-medium leading-tight text-center">
            {selectLabel}
          </span>
        </button>
      </div>

      {/* Mobile action buttons — below the card */}
      <div className="mt-4 flex items-center justify-center gap-4 sm:hidden">
        <button
          onClick={() => advanceCard("left")}
          className="flex min-w-[120px] items-center justify-center gap-2 rounded-2xl border border-quadrant-pitfall/30 px-5 py-3 text-quadrant-pitfall transition-all hover:border-quadrant-pitfall hover:bg-quadrant-pitfall/10"
          aria-label={skipLabel}
        >
          <span className="text-lg">&times;</span>
          <span className="text-base font-medium">{skipLabel}</span>
        </button>
        <button
          onClick={() => advanceCard("right")}
          className="flex min-w-[120px] items-center justify-center gap-2 rounded-2xl border border-quadrant-quality/30 px-5 py-3 text-quadrant-quality transition-all hover:border-quadrant-quality hover:bg-quadrant-quality/10"
          aria-label={selectLabel}
        >
          <span className="text-lg">&#10003;</span>
          <span className="text-base font-medium">{selectLabel}</span>
        </button>
      </div>

      {/* Instructions */}
      <p className="mt-3 text-center text-base text-muted/60">
        <span className="sm:hidden">Swipe the card or tap the buttons</span>
        <span className="hidden sm:inline">Swipe the card or use <kbd className="rounded border border-card-border bg-card-bg px-1.5 py-0.5 font-mono text-sm">&larr;</kbd> <kbd className="rounded border border-card-border bg-card-bg px-1.5 py-0.5 font-mono text-sm">&rarr;</kbd> arrow keys</span>
      </p>

      {/* Undo / Done buttons */}
      <div className="mt-6 flex items-center justify-center gap-4">
        {history.length > 0 && (
          <button
            onClick={handleUndo}
            className="rounded-full border border-card-border px-4 py-2.5 text-base font-medium text-muted transition-colors hover:border-accent hover:text-foreground"
          >
            Undo
          </button>
        )}
        {selectedIds.length >= minSelections && (
          <button
            onClick={() => setDone(true)}
            className="rounded-full border border-accent bg-accent/10 px-5 py-2.5 text-base font-medium text-accent transition-colors hover:bg-accent/20"
          >
            Done &mdash; continue with {selectedIds.length} &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
