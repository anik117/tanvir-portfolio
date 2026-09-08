import { safeFetch } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { Briefcase, GraduationCap, Sparkles, Wrench } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { GrowLine } from "@/components/motion/GrowLine";

export const metadata = {
  title: "About | Tanvir Ahassan",
  description: "Background, education, and experience.",
};

function Heading({ icon: Icon, children }: { icon: typeof Briefcase; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-sm font-medium text-muted-strong">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-dark text-white">
        <Icon aria-hidden size={14} />
      </span>
      {children}
    </h2>
  );
}

function TimelineRow({
  years,
  title,
  subtitle,
  note,
  delay,
}: {
  years?: string;
  title: string;
  subtitle?: string;
  note?: string;
  delay: number;
}) {
  return (
    <li className="relative pl-10">
      <span
        aria-hidden
        className="absolute left-[11px] top-7 h-2.5 w-2.5 rounded-full bg-dark ring-4 ring-background"
      />
      <Reveal delay={delay} y={16}>
        <div className="card card-hover grid gap-x-8 gap-y-1 rounded-2xl px-5 py-5 sm:grid-cols-[8rem_1fr]">
          <span className="mono text-sm text-muted">{years}</span>
          <span>
            <span className="block font-medium">{title}</span>
            {subtitle && <span className="block text-sm text-muted-strong">{subtitle}</span>}
            {note && (
              <span className="mt-2 block text-sm leading-relaxed text-muted-strong">{note}</span>
            )}
          </span>
        </div>
      </Reveal>
    </li>
  );
}

export default async function AboutPage() {
  const settings = await safeFetch<SiteSettings>(SITE_SETTINGS_QUERY);

  return (
    <main className="mx-auto max-w-page px-5 py-20 sm:px-10 sm:py-28">
      {/* ---- Intro + stats ------------------------------------------------- */}
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        <div>
          <Reveal y={16}>
            <h1 className="text-balance text-[2.2rem] font-medium leading-[1.12] tracking-[-0.02em] sm:text-5xl">
              {settings?.aboutHeading ?? "About"}
            </h1>
          </Reveal>

          {settings?.aboutIntro && (
            <Reveal delay={150} y={12}>
              <p className="mt-8 max-w-2xl text-xl leading-relaxed sm:text-2xl sm:leading-[1.4]">
                {settings.aboutIntro}
              </p>
            </Reveal>
          )}

          {settings?.aboutParagraphs?.length ? (
            <Reveal delay={250} y={12}>
              <div className="mt-6 max-w-2xl space-y-5 leading-relaxed text-muted-strong">
                {settings.aboutParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>

        {settings?.stats?.length ? (
          <dl className="grid content-start gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {settings.stats.map((stat, i) => (
              <Reveal key={stat._key ?? stat.label} delay={200 + i * 100}>
                <div className="card card-hover rounded-2xl px-6 py-6">
                  <dt className="text-sm text-muted-strong">{stat.label}</dt>
                  <dd className="mono mt-2 text-5xl font-medium tracking-[-0.03em]">{stat.value}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        ) : null}
      </div>

      {/* ---- Experience + education --------------------------------------- */}
      {settings?.experience?.length || settings?.education?.length ? (
        <div className="mt-24 grid gap-16 lg:grid-cols-2 lg:gap-10">
          {settings?.experience?.length ? (
            <section>
              <Heading icon={Briefcase}>Experience</Heading>
              <div className="relative mt-8">
                <GrowLine className="left-4 top-4 bottom-4 w-px" />
                <ul className="space-y-4">
                  {settings.experience.map((job, i) => (
                    <TimelineRow
                      key={job._key ?? job.role}
                      years={job.years}
                      title={job.role}
                      subtitle={job.organization}
                      note={job.summary}
                      delay={i * 70}
                    />
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {settings?.education?.length ? (
            <section>
              <Heading icon={GraduationCap}>Education</Heading>
              <div className="relative mt-8">
                <GrowLine className="left-4 top-4 bottom-4 w-px" />
                <ul className="space-y-4">
                  {settings.education.map((ed, i) => (
                    <TimelineRow
                      key={ed._key ?? ed.qualification}
                      years={ed.years}
                      title={ed.qualification}
                      subtitle={ed.institution}
                      note={ed.note}
                      delay={i * 70}
                    />
                  ))}
                </ul>
              </div>
            </section>
          ) : null}
        </div>
      ) : null}

      {/* ---- Services: the page's dark band ---------------------------------- */}
      {settings?.services?.length ? (
        <Reveal className="mt-24">
          <section className="band rounded-3xl p-6 sm:p-10">
            <Heading icon={Sparkles}>What I do</Heading>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {settings.services.map((service, i) => (
                <li key={service._key ?? service.name} className="card rounded-2xl p-6">
                  <span className="mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-strong">
                      {service.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      ) : null}

      {/* ---- Toolkit -------------------------------------------------------- */}
      {settings?.toolkit?.length ? (
        <section className="mt-24">
          <Heading icon={Wrench}>Toolkit</Heading>
          <ul className="mt-6 flex flex-wrap gap-2">
            {settings.toolkit.map((tool, i) => (
              <li key={tool}>
                <Reveal delay={i * 30} y={8}>
                  <span className="card card-hover inline-block rounded-full px-3.5 py-1.5 text-sm">
                    {tool}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
