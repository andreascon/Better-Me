"use client";

import Link from "next/link";

interface ValuesHeroProps {
  onStart: () => void;
}

export default function ValuesHero({ onStart }: ValuesHeroProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-accent"
        >
          &larr; Back to Better-Me
        </Link>
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-16 pt-4 text-center">
        <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
          Values Discovery
        </span>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Discover Your Personal Values
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-muted">
          Core values are your role model and articles of association: what
          behaviours would your future self be proud of, and what behaviours will
          you never accept &mdash; from others or yourself?
        </p>

        <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-muted">
          We&apos;ll discover your values through what triggers you and what you
          overdo. Not through a list of nice-sounding words, but through real
          reactions and honest blind spots.
        </p>

        {/* Example value */}
        <div className="mx-auto max-w-md rounded-2xl border border-card-border bg-card-bg p-6 text-left">
          <h3 className="mb-3 text-sm font-semibold text-accent">
            Example value: &ldquo;Own it&rdquo;
          </h3>
          <ul className="space-y-2 text-sm text-muted">
            <li className="flex gap-2">
              <span className="shrink-0 text-quadrant-quality">+</span>
              I take responsibility for my actions
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-quadrant-quality">+</span>
              I honour my commitments. If I can&apos;t, I will give ample notice
            </li>
            <li className="mt-3 flex gap-2">
              <span className="shrink-0 text-quadrant-pitfall">-</span>
              <span>
                I will not take responsibility for things outside my control
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-quadrant-pitfall">-</span>
              <span>
                I will not be associated with people who are not dependable, or
                who like to absolve themselves from responsibility
              </span>
            </li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-card-border bg-card-bg px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-accent hover:shadow-md"
        >
          Get Started &darr;
        </button>
      </div>
    </section>
  );
}
