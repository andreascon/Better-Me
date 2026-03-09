"use client";

import type { PersonalValue, ValueStatement } from "../data/types";

interface StatementWriterProps {
  value: PersonalValue;
  index: number;
  total: number;
  onUpdate: (index: number, statements: ValueStatement) => void;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
}

export default function StatementWriter({
  value,
  index,
  total,
  onUpdate,
  onNext,
  onPrev,
  onFinish,
}: StatementWriterProps) {
  const s = value.statements;
  const isLast = index === total - 1;

  const update = (patch: Partial<ValueStatement>) => {
    onUpdate(index, { ...s, ...patch });
  };

  const updatePositive = (i: number, text: string) => {
    const next = [...s.positive];
    next[i] = text;
    update({ positive: next });
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      {/* Progress */}
      <div className="mb-8 text-center">
        <p className="mb-1 text-xs font-medium text-muted">
          Value {index + 1} of {total}
        </p>
        <h2 className="mb-2 text-3xl font-bold text-foreground">
          {value.name || "Untitled Value"}
        </h2>
        <p className="text-sm text-muted">
          Write the statements that bring this value to life.
        </p>
      </div>

      {/* Reference example — collapsed */}
      <details className="mb-8 rounded-xl border border-card-border bg-card-bg/50 px-4 py-3">
        <summary className="cursor-pointer text-xs font-medium text-muted">
          See example: &ldquo;Own it&rdquo;
        </summary>
        <div className="mt-3 space-y-1 text-xs text-muted">
          <p>
            <span className="text-quadrant-quality">+</span> I take
            responsibility for my actions
          </p>
          <p>
            <span className="text-quadrant-quality">+</span> I honour my
            commitments. If I can&apos;t, I give ample notice
          </p>
          <p className="mt-2">
            <span className="text-quadrant-pitfall">-</span> I will not be
            associated with people who absolve themselves from responsibility
          </p>
        </div>
      </details>

      {/* Positive statements */}
      <div className="mb-8">
        <h3 className="mb-1 text-sm font-semibold text-quadrant-quality">
          Positive statements
        </h3>
        <p className="mb-4 text-xs text-muted">
          What does your future self do? Think of specific behaviours that
          reflect this value.
        </p>
        {s.positive.map((text, i) => (
          <div key={i} className="mb-3 flex gap-2">
            <span className="mt-2.5 shrink-0 text-sm text-quadrant-quality">
              +
            </span>
            <textarea
              value={text}
              onChange={(e) => updatePositive(i, e.target.value)}
              placeholder={
                i === 0
                  ? `I ...`
                  : "Another behaviour (optional)"
              }
              rows={2}
              className="w-full resize-none rounded-lg border border-card-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted/40 focus:border-accent"
            />
          </div>
        ))}
      </div>

      {/* Boundary statement */}
      <div className="mb-8">
        <h3 className="mb-1 text-sm font-semibold text-quadrant-pitfall">
          Boundary statement
        </h3>
        <p className="mb-4 text-xs text-muted">
          What behaviour connected to this value will you never accept — from
          others or yourself?
        </p>
        <div className="flex gap-2">
          <span className="mt-2.5 shrink-0 text-sm text-quadrant-pitfall">
            -
          </span>
          <textarea
            value={s.boundary}
            onChange={(e) => update({ boundary: e.target.value })}
            placeholder="I will not ..."
            rows={2}
            className="w-full resize-none rounded-lg border border-card-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted/40 focus:border-accent"
          />
        </div>
      </div>

      {/* The cost test */}
      <div className="mb-8 rounded-xl border border-accent/30 bg-accent/5 p-5">
        <h3 className="mb-2 text-sm font-semibold text-accent">
          The cost test
        </h3>
        <p className="mb-4 text-xs leading-relaxed text-muted">
          If your values don&apos;t really cost you something, they&apos;re not
          really values. What are you willing to risk by holding this line? What
          might you lose by not associating yourself with people who demonstrate
          this allergy?
        </p>
        <textarea
          value={s.costReflection}
          onChange={(e) => update({ costReflection: e.target.value })}
          placeholder="The cost of holding this value is ..."
          rows={3}
          className="w-full resize-none rounded-lg border border-accent/20 bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted/40 focus:border-accent"
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={index === 0}
          className="rounded-full border border-card-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-foreground disabled:opacity-30"
        >
          &larr; Previous
        </button>

        {isLast ? (
          <button
            onClick={onFinish}
            className="rounded-full border border-accent bg-accent/10 px-6 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
          >
            See your Sandbox &rarr;
          </button>
        ) : (
          <button
            onClick={onNext}
            className="rounded-full border border-card-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent"
          >
            Next value &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
