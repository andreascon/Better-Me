import Link from "next/link";

export const metadata = {
  title: "About | Better-Me",
  description: "About the Better-Me self-improvement platform and its creator.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background font-sans">
      {/* Navigation */}
      <div className="mx-auto max-w-3xl px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-accent"
        >
          &larr; Back to Better-Me
        </Link>
      </div>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          About Better-Me
        </h1>

        <div className="space-y-6 text-base leading-relaxed text-muted">
          <p>
            Better-Me is a collection of thoughtful, interactive tools designed
            to support your personal growth. Whether you want to understand your
            strengths, build better habits, or cultivate more mindfulness in your
            daily life, Better-Me offers a gentle, judgment-free space to
            explore.
          </p>

          <p>
            The first tool, <strong className="text-foreground">Core Quadrants</strong>,
            is based on Daniel Ofman&apos;s Core Quadrant model. It helps you
            uncover the hidden dynamics behind your greatest strengths — the
            pitfalls that come with them, the challenges that balance them, and
            the allergies that reveal what truly triggers you. More tools are on
            the way.
          </p>

          <p>
            The goal is simple: small steps toward a better you.
          </p>
        </div>

        {/* Author */}
        <div className="mt-16 rounded-2xl border border-card-border bg-card-bg p-8">
          <p className="mb-1 text-sm font-medium uppercase tracking-wide text-muted">
            Created by
          </p>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">
            Andreas Konstantinou
          </h2>
          <p className="mb-5 text-base leading-relaxed text-muted">
            Andreas builds products and teams at the intersection of technology
            and human potential. Better-Me is a passion project exploring how
            simple, well-crafted tools can support meaningful personal growth.
          </p>
          <a
            href="https://www.linkedin.com/in/andreasc/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-card-border px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-sm"
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Connect on LinkedIn
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-card-border py-8 text-center text-sm text-muted">
        <p>&copy; 2026 Better-Me. All rights reserved.</p>
      </footer>
    </main>
  );
}
