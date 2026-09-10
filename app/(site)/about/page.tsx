import { safeFetch } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { Reveal } from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";
import aboutContent from "@/sanity/seed/about.json";

export const metadata = {
  title: "About | Tanvir Ahassan",
  description:
    "How Tanvir Ahassan combines product design, software engineering, and AI-assisted workflows to create clear, buildable digital experiences.",
};

/** A small mono label above a group of rows. */
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
    <li
      className={`grid gap-x-6 gap-y-1 border-t border-border py-5 ${
        when ? "sm:grid-cols-[7.5rem_1fr]" : ""
      }`}
    >
      {when && <span className="mono text-[13px] text-muted">{when}</span>}
      <span>
        <span className="block font-semibold">{title}</span>
        {where && (
          <span className="block text-[15px] text-muted-strong">{where}</span>
        )}
        {note && (
          <span className="mt-2 block text-[15px] leading-relaxed text-muted-strong">
            {note}
          </span>
        )}
      </span>
    </li>
  );
}

/**
 * Same container as Contact. Two columns up top — who he is on the left,
 * how he works with AI on the right — then the record underneath: where he
 * has worked and studied, what he does, what he uses. Rows and hairlines.
 */
export default async function AboutPage() {
  const settings = await safeFetch<SiteSettings>(SITE_SETTINGS_QUERY);
  const aboutHeading = settings?.aboutHeading ?? aboutContent.aboutHeading;
  const aboutIntro = settings?.aboutIntro ?? aboutContent.aboutIntro;
  const aboutParagraphs =
    settings?.aboutParagraphs ?? aboutContent.aboutParagraphs;
  const aboutAiHeading =
    settings?.aboutAiHeading ?? aboutContent.aboutAiHeading;
  const aboutAiIntro = settings?.aboutAiIntro ?? aboutContent.aboutAiIntro;
  const aboutAiSteps = settings?.aboutAiSteps ?? aboutContent.aboutAiSteps;
  const services = settings?.services ?? aboutContent.services;

  return (
    <main className="mx-auto max-w-page px-5 py-16 sm:px-10 sm:py-24">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-28 xl:gap-36">
        {/* ---- Who he is ------------------------------------------------- */}
        <div>
          <Reveal y={12}>
            <h1 className="text-[2.3rem] font-semibold leading-[1.08] sm:text-[3.2rem]">
              <Highlight text={aboutHeading} words={2} />
            </h1>
          </Reveal>

          {aboutIntro && (
            <Reveal delay={120} y={12}>
              <p className="mt-8 text-xl leading-relaxed sm:text-[22px]">
                {aboutIntro}
              </p>
            </Reveal>
          )}

          {aboutParagraphs.length ? (
            <Reveal delay={200} y={12}>
              <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-muted-strong">
                {aboutParagraphs.map((p, i) => (
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
                    <dd className="mono text-[28px] font-medium leading-none">
                      {stat.value}
                    </dd>
                    <dt className="mt-1.5 text-[13px] text-muted-strong">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}
        </div>

        {/* ---- AI in the process ------------------------------------------ */}
        <Reveal
          delay={160}
          className="lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)] lg:self-start"
        >
          <section className="panel-soft overflow-hidden rounded-[1.75rem] px-6 py-8 sm:px-10 sm:py-10">
            <p className="mono text-[11px] uppercase tracking-[0.18em] text-muted-strong">
              AI in my process
            </p>
            <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] sm:text-[2.6rem]">
              {aboutAiHeading}
            </h2>
            <p className="mt-5 max-w-[36rem] text-[16px] leading-relaxed text-muted-strong sm:text-[17px]">
              {aboutAiIntro}
            </p>
            <ol className="mt-8 border-b border-border">
              {aboutAiSteps.map((step, index) => (
                <li
                  className="grid gap-3 border-t border-border py-5 sm:grid-cols-[2rem_1fr] sm:gap-x-5 2xl:grid-cols-[2rem_12rem_1fr]"
                  key={step._key ?? step.name}
                >
                  <span className="mono text-[12px] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[16px] font-semibold leading-snug">
                    {step.name}
                  </h3>
                  {step.description && (
                    <p className="text-[15px] leading-relaxed text-muted-strong sm:col-start-2 2xl:col-start-auto">
                      {step.description}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </section>
        </Reveal>
      </div>

      {/* ---- The record ----------------------------------------------------
           Left: where he has worked, then studied. Right: what he does, then
           what he uses. */}
      <div className="mt-24 grid gap-y-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-x-28 xl:gap-x-36">
        <div className="space-y-20">
          {settings?.experience?.length ? (
            <Reveal>
              <section>
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
              <section>
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
        </div>

        <div className="space-y-20">
          {services.length ? (
            <Reveal>
              <section>
                <Label>How I help</Label>
                <ul className="mt-5 border-b border-border">
                  {services.map((service) => (
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
              <section>
                <Label>Toolkit</Label>
                <p className="mt-5 text-[17px] leading-relaxed text-muted-strong">
                  {settings.toolkit.join("  ·  ")}
                </p>
              </section>
            </Reveal>
          ) : null}
        </div>
      </div>
    </main>
  );
}
