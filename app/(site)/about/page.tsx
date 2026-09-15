import { safeFetch } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { Reveal } from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";
import aboutContent from "@/sanity/seed/about.json";

export const metadata = {
  title: "About | Tanvir Ahassan",
  description:
    "Tanvir Ahassan is a product designer with a software engineering background, working across fintech, healthcare, education, SaaS and consumer products.",
};

/** A small label above a run of rows. */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mono text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
      {children}
    </h2>
  );
}

/** Years on the left, the entry on the right, a hairline between rows. */
function Row({
  when,
  title,
  where,
  note,
}: {
  when?: string;
  title: string;
  where?: string;
  note?: string;
}) {
  return (
    <li className="grid gap-x-6 gap-y-1 border-t border-border py-5 sm:grid-cols-[7rem_1fr]">
      <span className="mono text-[13px] leading-relaxed text-muted">{when}</span>
      <span>
        <span className="block font-semibold">{title}</span>
        {where && <span className="block text-[15px] text-muted-strong">{where}</span>}
        {note && (
          <span className="mt-2 block text-[15px] leading-relaxed text-muted-strong">{note}</span>
        )}
      </span>
    </li>
  );
}

/**
 * One column: the prose first, then the record underneath it. The prose is
 * the part a CV cannot do; the record is there for the reader who wants it.
 */
export default async function AboutPage() {
  const settings = await safeFetch<SiteSettings>(SITE_SETTINGS_QUERY);
  const heading = settings?.aboutHeading ?? aboutContent.aboutHeading;
  const paragraphs = settings?.aboutParagraphs ?? aboutContent.aboutParagraphs;
  const availability = settings?.aboutAvailability ?? aboutContent.aboutAvailability;
  const outside = settings?.aboutOutside ?? aboutContent.aboutOutside;
  const experience = settings?.experience ?? [];
  const education = settings?.education ?? [];

  return (
    <main className="mx-auto max-w-read px-5 py-20 sm:px-10 sm:py-28">
      <Reveal y={12}>
        <h1 className="text-[2.4rem] font-semibold leading-[1.05] sm:text-[3.4rem]">
          <Highlight text={heading} words={1} />
        </h1>
      </Reveal>

      {paragraphs.length > 0 && (
        <Reveal delay={120} y={12}>
          <div className="mt-10 space-y-6 text-[18px] leading-[1.7] text-muted-strong sm:text-[19px]">
            {paragraphs.map((p, i) => (
              // The opening line carries the page; the rest supports it.
              <p key={i} className={i === 0 ? "text-foreground" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      )}

      {availability && (
        <Reveal delay={200}>
          <p className="mt-12 border-y border-border py-6 text-[18px] font-medium leading-relaxed sm:text-[19px]">
            {availability}
          </p>
        </Reveal>
      )}

      {outside.length > 0 && (
        <Reveal delay={260}>
          <section className="mt-16">
            <h2 className="mono text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
              Outside of work
            </h2>
            <div className="mt-6 space-y-6 text-[18px] leading-[1.7] text-muted-strong sm:text-[19px]">
              {outside.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {experience.length > 0 && (
        <Reveal delay={60}>
          <section className="mt-20">
            <Label>Experience</Label>
            <ul className="mt-5 border-b border-border">
              {experience.map((job) => (
                <Row
                  key={job._key ?? job.role}
                  when={job.years}
                  title={job.role}
                  where={job.organization}
                  note={job.summary}
                />
              ))}
            </ul>
          </section>
        </Reveal>
      )}

      {education.length > 0 && (
        <Reveal delay={60}>
          <section className="mt-16">
            <Label>Education</Label>
            <ul className="mt-5 border-b border-border">
              {education.map((ed) => (
                <Row
                  key={ed._key ?? ed.qualification}
                  when={ed.years}
                  title={ed.qualification}
                  where={ed.institution}
                  note={ed.note}
                />
              ))}
            </ul>
          </section>
        </Reveal>
      )}
    </main>
  );
}
