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
          Your core values shape every decision you make. When you&apos;re clear
          on your values, it becomes much easier to say yes to the right things
          and no to the wrong ones. Personal values tell you what behaviours your
          future self would be proud of, and what behaviours you&apos;ll never
          accept - from others or yourself.
        </p>

        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted">
          But values are hard to spot because they hide in plain sight. Most
          people can&apos;t just pick them from a list of nice-sounding words.
          That&apos;s why we&apos;ll uncover yours by looking at what triggers
          you and what you tend to overdo - two places where your values show up
          most clearly, even when you&apos;re not aware of them.
        </p>

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
