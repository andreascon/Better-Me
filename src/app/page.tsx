import Image from "next/image";

const UNSPLASH_IMAGE_URL =
  "https://images.unsplash.com/photo-1516676839530-135a545cce02";

interface AppCardProps {
  title: string;
  description: string;
  icon: string;
  category: string;
}

function AppCard({ title, description, icon, category }: AppCardProps) {
  return (
    <div className="group rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-4xl">{icon}</span>
        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          Coming Soon
        </span>
      </div>
      <p className="mb-1 text-sm font-medium uppercase tracking-wide text-muted">
        {category}
      </p>
      <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}

const apps: AppCardProps[] = [
  {
    title: "Habit Tracker",
    description:
      "Build lasting habits with daily tracking, streaks, and gentle reminders to keep you on course.",
    icon: "\u{1F331}",
    category: "Habits",
  },
  {
    title: "Mindful Moments",
    description:
      "Guided breathing exercises and meditation sessions to bring calm and clarity to your day.",
    icon: "\u{1F9D8}",
    category: "Mindfulness",
  },
  {
    title: "Move & Thrive",
    description:
      "Simple fitness routines and activity logging designed for sustainable well-being, not perfection.",
    icon: "\u{1F3C3}",
    category: "Fitness",
  },
  {
    title: "Daily Journal",
    description:
      "A private space for reflection, gratitude, and capturing the moments that shape who you are.",
    icon: "\u{1F4D3}",
    category: "Journaling",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans">
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
            Your self-improvement companion &mdash; coming soon
          </p>
        </div>
      </section>

      {/* App Directory Section */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground sm:text-4xl">
            What&apos;s Coming
          </h2>
          <p className="mx-auto max-w-xl text-muted">
            We&apos;re crafting a suite of thoughtful tools to support your
            personal growth. Here&apos;s a glimpse of what&apos;s ahead.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
        <p className="mt-2">&copy; 2026 Better-Me. All rights reserved.</p>
      </footer>
    </main>
  );
}
