import { videos } from "@/content/site";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Heading, Section } from "@/components/ui/Section";

export function Videos() {
  return (
    <Section id="videos" tone="raised" divide="top">
      <div className="shell py-24">
        <Reveal>
          <Eyebrow className="mb-3.5">{videos.eyebrow}</Eyebrow>
          <Heading className="mb-4 text-[clamp(1.875rem,3.4vw,2.75rem)]">
            {videos.heading}
          </Heading>
          <p className="mb-12 max-w-xl text-copy text-muted">
            {videos.body}
          </p>
        </Reveal>

        <div className="grid gap-7 lg:grid-cols-[2fr_1fr]">
          <Reveal>
            <MediaSlot
              kind="video"
              size="lg"
              src={videos.feature.src}
              alt={videos.feature.label}
              label={videos.feature.label}
              className="aspect-video w-full"
            />
          </Reveal>

          <div className="flex flex-col gap-7">
            {videos.secondary.map((video, index) => (
              <Reveal key={video.label} delay={80 + index * 80} className="flex-1">
                <MediaSlot
                  kind="video"
                  size="sm"
                  src={video.src}
                  alt={video.label}
                  label={video.label}
                  className="h-full min-h-[140px] w-full"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
