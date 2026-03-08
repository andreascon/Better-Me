import { EntryPath } from "../data/types";

interface AssessmentPathSelectorProps {
  onSelectPath: (path: EntryPath) => void;
  completedPaths: Set<EntryPath>;
}

interface PathOption {
  path: EntryPath;
  emoji: string;
  title: string;
  subtitle: string;
  requiresCompleted?: EntryPath;
}

const paths: PathOption[] = [
  {
    path: "strength",
    emoji: "💪",
    title: "Start from Strength",
    subtitle: "\u201cI know what I\u2019m good at\u201d",
  },
  {
    path: "allergy",
    emoji: "😤",
    title: "Start from Allergy",
    subtitle: "\u201cI know what annoys me in others\u201d",
    requiresCompleted: "strength",
  },
  {
    path: "pitfall",
    emoji: "⚠️",
    title: "Start from Pitfall",
    subtitle: "\u201cI recognize this shadow side in myself\u201d",
    requiresCompleted: "allergy",
  },
];

const prerequisiteLabels: Record<EntryPath, string> = {
  strength: "Strength",
  allergy: "Allergy",
  pitfall: "Pitfall",
};

export default function AssessmentPathSelector({
  onSelectPath,
  completedPaths,
}: AssessmentPathSelectorProps) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        Choose Your Path
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {paths.map(({ path, emoji, title, subtitle, requiresCompleted }) => {
          const isCompleted = completedPaths.has(path);
          const isLocked =
            requiresCompleted != null && !completedPaths.has(requiresCompleted);

          return (
            <button
              key={path}
              onClick={() => !isLocked && onSelectPath(path)}
              disabled={isLocked}
              className={`group relative rounded-2xl border-2 p-8 text-center transition-all ${
                isLocked
                  ? "cursor-not-allowed border-card-border/50 bg-card-bg/50 opacity-55"
                  : "border-card-border bg-card-bg hover:-translate-y-1 hover:border-accent hover:shadow-lg"
              }`}
            >
              {/* Completed badge */}
              {isCompleted && (
                <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs text-white">
                  ✓
                </span>
              )}

              {/* Lock icon */}
              {isLocked && (
                <span className="absolute right-3 top-3 text-lg opacity-40">
                  🔒
                </span>
              )}

              <span className="mb-3 block text-4xl">{emoji}</span>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="text-sm text-muted">{subtitle}</p>

              {/* Unlock hint */}
              {isLocked && requiresCompleted && (
                <p className="mt-3 text-xs text-muted/70">
                  Complete {prerequisiteLabels[requiresCompleted]} path first
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
