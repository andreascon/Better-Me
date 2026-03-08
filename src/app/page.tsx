import Image from "next/image";
import Link from "next/link";

const UNSPLASH_IMAGE_URL =
  "https://images.unsplash.com/photo-1516676839530-135a545cce02";

interface AppCardProps {
  title: string;
  description: string;
  icon: string;
  category: string;
  status: "available" | "coming-soon";
  href?: string;
}

function AppCard({ title, description, icon, category, status, href }: AppCardProps) {
  const isAvailable = status === "available";
  const card = (
    <div
      className={`group rounded-2xl border p-6 transition-all duration-300 ${
        isAvailable
          ? "border-card-border bg-card-bg shadow-sm hover:shadow-md hover:-translate-y-1"
          : "border-card-border/50 bg-card-bg/50 opacity-55 grayscale-[30%]"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className={`text-4xl ${!isAvailable ? "opacity-60" : ""}`}>{icon}</span>
        {isAvailable ? (
          <span className="rounded-full bg-quadrant-quality/10 px-3 py-1 text-xs font-medium text-quadrant-quality">
            Try Now
          </span>
        ) : (
          <span className="rounded-full bg-muted/10 px-3 py-1 text-xs font-medium text-muted/60">
            Coming Soon
          </span>
        )}
      </div>
      <p className={`mb-1 text-sm font-medium uppercase tracking-wide ${isAvailable ? "text-muted" : "text-muted/50"}`}>
        {category}
      </p>
      <h3 className={`mb-2 text-xl font-semibold ${isAvailable ? "text-foreground" : "text-foreground/50"}`}>{title}</h3>
      <p className={`text-sm leading-relaxed ${isAvailable ? "text-muted" : "text-muted/50"}`}>{description}</p>
      {isAvailable && (
        <p className="mt-4 text-sm font-medium text-accent group-hover:underline">
          Get started &rarr;
        </p>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{card}</Link>;
  }

  return card;
}

const apps: AppCardProps[] = [
  {
    title: "Core Quadrants",
    description:
      "Discover the hidden dynamics behind your greatest strengths — and what trips you up. Based on Daniel Ofman's model.",
    icon: "\u{1F3AF}",
    category: "Self-Awareness",
    status: "available",
    href: "/ofman",
  },
  {
    title: "Habit Tracker",
    description:
      "Build lasting habits with daily tracking, streaks, and gentle reminders to keep you on course.",
    icon: "\u{1F331}",
    category: "Habits",
    status: "coming-soon",
  },
  {
    title: "Mindful Moments",
    description:
      "Guided breathing exercises and meditation sessions to bring calm and clarity to your day.",
    icon: "\u{1F9D8}",
    category: "Mindfulness",
    status: "coming-soon",
  },
  {
    title: "Move & Thrive",
    description:
      "Simple fitness routines and activity logging designed for sustainable well-being, not perfection.",
    icon: "\u{1F3C3}",
    category: "Fitness",
    status: "coming-soon",
  },
  {
    title: "Daily Journal",
    description:
      "A private space for reflection, gratitude, and capturing the moments that shape who you are.",
    icon: "\u{1F4D3}",
    category: "Journaling",
    status: "coming-soon",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans">
      {/* Navigation */}
      <nav className="absolute top-0 right-0 z-20 px-6 py-4">
        <Link
          href="/about"
          className="text-sm font-medium text-white/80 transition-colors hover:text-white"
        >
          About
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative flex h-[85vh] min-h-[600px] items-center justify-center overflow-hidden">
        <Image
          src={`${UNSPLASH_IMAGE_URL}?auto=format&fit=crop&w=1920&q=80`}
          alt="Warm-toned nature photograph of brown plants"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            Better-Me
          </h1>
          <p className="mb-6 text-lg leading-relaxed text-white/90 sm:text-xl">
            Small steps toward a better you. Tools for building habits, finding
            calm, staying active, and reflecting on your journey.
          </p>
          <p className="text-sm tracking-wide text-white/60">
            Your self-improvement companion
          </p>
        </div>
      </section>

      {/* App Directory Section */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground sm:text-4xl">
            Your Tools
          </h2>
          <p className="mx-auto max-w-xl text-muted">
            A suite of thoughtful tools to support your personal growth. Start
            with what&apos;s available and stay tuned for more.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <AppCard key={app.title} {...app} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-card-border py-8 text-center text-sm text-muted">
        <p>
          Photo by{" "}
          <a
            href="https://unsplash.com/@aaronburden"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-accent"
          >
            Aaron Burden
          </a>{" "}
          on{" "}
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-accent"
          >
            Unsplash
          </a>
        </p>
        <p className="mt-2">
          &copy; 2026 Better-Me. All rights reserved.
          <span className="mx-2">·</span>
          <Link
            href="/about"
            className="underline underline-offset-2 transition-colors hover:text-accent"
          >
            About
          </Link>
        </p>
      </footer>
    </main>
  );
}
