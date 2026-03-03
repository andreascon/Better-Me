interface VideoSectionProps {
  /** URL for an embedded video (YouTube/Vimeo) */
  embedUrl?: string;
  /** Path to a self-hosted video file (e.g. /video/ofman-quadrants.mp4) */
  videoSrc?: string;
}

export default function VideoSection({
  embedUrl,
  videoSrc,
}: VideoSectionProps) {
  const hasVideo = embedUrl || videoSrc;

  return (
    <section className="border-t border-card-border bg-background px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          🎬 Video Walkthrough
        </h2>

        {embedUrl ? (
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-card-border">
            <iframe
              src={embedUrl}
              title="Ofman's Core Quadrants walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        ) : videoSrc ? (
          <div className="overflow-hidden rounded-2xl border border-card-border bg-black">
            <video
              controls
              preload="metadata"
              className="w-full"
              playsInline
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center rounded-2xl border-2 border-dashed border-card-border bg-quadrant-quality-light/30">
            <div className="text-center">
              <span className="mb-2 block text-4xl">▶</span>
              <span className="text-muted">Video Coming Soon</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
