import { announcement } from "@/content/site";

export function AnnouncementBar() {
  return (
    <div className="bg-gold px-5 py-2.5 text-center text-ui font-medium tracking-[0.02em] text-ink-on-gold">
      {announcement.text}{" "}
      <a
        href={announcement.href}
        className="font-semibold text-ink-on-gold underline underline-offset-2 hover:text-ink"
      >
        {announcement.linkLabel}
      </a>
    </div>
  );
}
