import { safeFetch } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { Reveal } from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";

export const metadata = {
  title: "About | Tanvir Ahassan",
  description: "Background, education, and experience.",
};

/** A small mono label above a group of rows. */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mono text-[11px] uppercase tracking-[0.18em] text-muted-strong">{children}</h2>
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
    <li className="grid gap-x-8 gap-y-1 border-t border-border py-5 sm:grid-cols-[8.5rem_1fr]">
      <span className="mono text-[13px] text-muted">{when}</span>
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
 * One reading column, top to bottom: who he is, the numbers, where he has
 * worked and studied, what he does, what he uses. Rows and hairlines only.
 */
export default async function AboutPage() {
  const settings = await safeFetch<SiteSettings>(SITE_SETTINGS_QUERY);

  return (
    <main className="mx-auto max-w-read px-5 py-16 sm:px-10 sm:py-24">
      <Reveal y={12}>
        <h1 className="text-[2.3rem] font-semibold leading-[1.08] sm:text-[3.2rem]">
          <Highlight text={settings?.aboutHeading ?? "About"} words={2} />
        </h1>
      </Reveal>

      {settings?.aboutIntro && (
        <Reveal delay={120} y={12}>
          <p className="mt-8 text-xl leading-relaxed sm:text-[22px]">{settings.aboutIntro}</p>
        </Reveal>
      )}

      {settings?.aboutParagraphs?.length ? (
        <Reveal delay={200} y={12}>
          <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-muted-strong">
            {settings.aboutParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      ) : null}

      {settings?.stats?.length ? (
        <Reveal delay={280}>
          <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-y border-border py-7">
            {settings.stats.map((stat) => (
              <div key={stat._key ?? stat.label}>
                <dd className="mono text-[28px] font-medium leading-none">{stat.value}</dd>
                <dt className="mt-1.5 text-[13px] text-muted-strong">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      ) : null}

      {settings?.experience?.length ? (
        <Reveal>
          <section className="mt-20">
            <Label>Experience</Label>
            <ul className="mt-5 border-b border-border">
              {settings.experience.map((job) => (
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
      ) : null}

      {settings?.education?.length ? (
        <Reveal>
          <section className="mt-20">
            <Label>Education</Label>
            <ul className="mt-5 border-b border-border">
              {settings.education.map((ed) => (
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
      ) : null}

      {settings?.services?.length ? (
        <Reveal>
          <section className="mt-20">
            <Label>What I do</Label>
            <ul className="mt-5 border-b border-border">
              {settings.services.map((service) => (
                <Row
                  key={service._key ?? service.name}
                  title={service.name}
                  note={service.description}
                />
              ))}
            </ul>
          </section>
        </Reveal>
      ) : null}

      {settings?.toolkit?.length ? (
        <Reveal>
          <section className="mt-20">
            <Label>Toolkit</Label>
            <p className="mt-5 text-[17px] leading-relaxed text-muted-strong">
              {settings.toolkit.join("  ·  ")}
            </p>
          </section>
        </Reveal>
      ) : null}
    </main>
  );
}
