import { EntryPath } from "../data/types";

interface AssessmentPathSelectorProps {
  onSelectPath: (path: EntryPath) => void;
}

export default function AssessmentPathSelector({
  onSelectPath,
}: AssessmentPathSelectorProps) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        Choose Your Path
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <button
          onClick={() => onSelectPath("strength")}
          className="group rounded-2xl border-2 border-card-border bg-card-bg p-8 text-center transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg"
        >
          <span className="mb-3 block text-4xl">💪</span>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Start from Strength
          </h3>
          <p className="text-sm text-muted">
            &ldquo;I know what I&apos;m good at&rdquo;
          </p>
        </button>
        <button
          onClick={() => onSelectPath("allergy")}
          className="group rounded-2xl border-2 border-card-border bg-card-bg p-8 text-center transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg"
        >
          <span className="mb-3 block text-4xl">😤</span>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Start from Allergy
          </h3>
          <p className="text-sm text-muted">
            &ldquo;I know what annoys me in others&rdquo;
          </p>
        </button>
      </div>
    </div>
  );
}
