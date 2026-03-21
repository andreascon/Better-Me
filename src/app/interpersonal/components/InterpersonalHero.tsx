"use client";

import Link from "next/link";

interface InterpersonalHeroProps {
  onStart: () => void;
  disabled?: boolean;
}

export default function InterpersonalHero({
  onStart,
  disabled,
}: InterpersonalHeroProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-lg text-muted transition-colors hover:text-accent"
        >
          &larr; Back to Better-Me
        </Link>
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-16 pt-4 text-center">
        <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-base font-medium text-accent">
          Communication Style
        </span>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Discover Your Communication Style
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-muted">
          How you communicate is shaped by two key dimensions: how assertive you
          are and how emotionally responsive you are. Together, these create your
          communication style &mdash; the way others experience you in
          conversations, meetings, and relationships.
        </p>

        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted">
          This short assessment helps you discover whether you&apos;re an
          Analytical, Driver, Amiable, or Expressive communicator. Understanding
          your style makes it easier to connect with people who are different
          from you &mdash; and to recognise when your natural tendencies help or
          hinder.
        </p>

        <p className="mx-auto mb-0 max-w-xl text-sm leading-relaxed text-muted/60">
          Based on the Social Styles model by David Merrill &amp; Roger Reid.
          Questions adapted from EMERSE.
        </p>

        <button
          onClick={onStart}
          disabled={disabled}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-card-border bg-card-bg px-6 py-3 text-lg font-medium text-foreground transition-all hover:border-accent hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-card-border disabled:hover:shadow-none"
        >
          Get Started &darr;
        </button>
      </div>
    </section>
  );
}
