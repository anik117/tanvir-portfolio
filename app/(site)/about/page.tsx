import { safeFetch } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { Briefcase, GraduationCap, Sparkles, Wrench } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "About | Tanvir Ahassan",
  description: "Background, education, and experience.",
};

function Heading({ icon: Icon, children }: { icon: typeof Briefcase; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-sm font-medium text-muted">
      <Icon aria-hidden size={15} />
      {children}
    </h2>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <li className="grid gap-x-8 gap-y-1 border-t border-border py-6 sm:grid-cols-[10rem_1fr]">
      {children}
    </li>
  );
}

export default async function AboutPage() {
  const settings = await safeFetch<SiteSettings>(SITE_SETTINGS_QUERY);

  return (
    <main className="mx-auto max-w-read px-6 py-20 sm:py-28">
      <Reveal>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">About</h1>

        {settings?.aboutIntro && (
          <p className="mt-8 text-lg leading-relaxed">{settings.aboutIntro}</p>
        )}

        {settings?.aboutParagraphs?.length ? (
          <div className="mt-6 space-y-5 leading-relaxed text-muted">
            {settings.aboutParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ) : null}

        {settings?.stats?.length ? (
          <dl className="mt-14 grid grid-cols-3 gap-4">
            {settings.stats.map((stat) => (
              <div key={stat._key ?? stat.label} className="raised rounded-2xl px-5 py-6">
                <dt className="text-3xl font-semibold tracking-tight">{stat.value}</dt>
                <dd className="mt-1 text-sm text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Reveal>

      {settings?.experience?.length ? (
        <Reveal>
          <section className="mt-16">
            <Heading icon={Briefcase}>Experience</Heading>
            <ul className="mt-6">
              {settings.experience.map((job) => (
                <Row key={job._key ?? job.role}>
                  <span className="mono text-sm text-muted">{job.years}</span>
                  <span>
                    <span className="block font-medium">{job.role}</span>
                    {job.organization && (
                      <span className="block text-sm text-muted">{job.organization}</span>
                    )}
                    {job.summary && (
                      <span className="mt-2 block text-sm leading-relaxed text-muted">
                        {job.summary}
                      </span>
                    )}
                  </span>
                </Row>
              ))}
            </ul>
          </section>
        </Reveal>
      ) : null}

      {settings?.education?.length ? (
        <Reveal>
          <section className="mt-16">
            <Heading icon={GraduationCap}>Education</Heading>
            <ul className="mt-6">
              {settings.education.map((ed) => (
                <Row key={ed._key ?? ed.qualification}>
                  <span className="mono text-sm text-muted">{ed.years}</span>
                  <span>
                    <span className="block font-medium">{ed.qualification}</span>
                    {ed.institution && (
                      <span className="block text-sm text-muted">{ed.institution}</span>
                    )}
                    {ed.note && (
                      <span className="mt-2 block text-sm leading-relaxed text-muted">
                        {ed.note}
                      </span>
                    )}
                  </span>
                </Row>
              ))}
            </ul>
          </section>
        </Reveal>
      ) : null}

      {settings?.services?.length ? (
        <Reveal>
          <section className="mt-16">
            <Heading icon={Sparkles}>What I do</Heading>
            <ul className="mt-6">
              {settings.services.map((service) => (
                <Row key={service._key ?? service.name}>
                  <span className="font-medium">{service.name}</span>
                  <span className="text-sm leading-relaxed text-muted">
                    {service.description}
                  </span>
                </Row>
              ))}
            </ul>
          </section>
        </Reveal>
      ) : null}

      {settings?.toolkit?.length ? (
        <Reveal>
          <section className="mt-16">
            <Heading icon={Wrench}>Toolkit</Heading>
            <ul className="mt-5 flex flex-wrap gap-2">
              {settings.toolkit.map((tool) => (
                <li
                  key={tool}
                  className="raised rounded-full px-3.5 py-1.5 text-sm"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      ) : null}

      {settings?.clientsNote ? (
        <Reveal>
          <section className="mt-16 border-t border-border pt-8">
            <p className="leading-relaxed text-muted">{settings.clientsNote}</p>
          </section>
        </Reveal>
      ) : null}
    </main>
  );
}
