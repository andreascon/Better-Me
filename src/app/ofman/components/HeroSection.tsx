"use client";

import Link from "next/link";

export default function HeroSection() {
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
          Self-Awareness Tool
        </span>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Ofman&apos;s Core Quadrants
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted">
          Discover the hidden dynamics behind your greatest strengths — and
          what trips you up. Every quality has a shadow side, and every
          irritation holds a mirror.
        </p>

        <div className="mx-auto max-w-md rounded-2xl border border-card-border bg-card-bg p-6 text-left">
          <h3 className="mb-3 text-sm font-semibold text-accent">
            🎯 Use this tool if...
          </h3>
          <ul className="space-y-2 text-sm text-muted">
            <li>• You want to understand your blind spots</li>
            <li>• You wonder why certain people annoy you</li>
            <li>• You&apos;re looking to grow as a leader or person</li>
            <li>• You want to turn self-awareness into action</li>
          </ul>
        </div>

        <button
          onClick={() =>
            document
              .getElementById("assessment")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-card-border bg-card-bg px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-accent hover:shadow-md"
        >
          Get Started ↓
        </button>
      </div>
    </section>
  );
}
