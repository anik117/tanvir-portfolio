import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { safeFetch } from "@/sanity/client";
import { PILE_QUERY, PROJECTS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { ProjectCard, SanityImage, SiteSettings } from "@/sanity/types";
import { Reveal } from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";
import { SetupBanner } from "@/components/SetupBanner";
import { HeroArtboard } from "@/components/home/HeroArtboard";
import { WorkStack } from "@/components/home/WorkStack";
import { AboutReveal } from "@/components/home/AboutReveal";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";

/** "Currently at X" from the most recent experience entry, if there is one. */
function tenure(settings: SiteSettings | null) {
  const job = settings?.experience?.[0];
  if (!job?.organization) return null;
  const current = /present|now|current/i.test(job.years ?? "");
  // The Studio field can carry "Org · Full-time · City"; only the org belongs here.
  const org = job.organization.split(/\s[·•|]\s/)[0].trim();
  return { prefix: current ? "Currently at" : "Previously at", org };
}

export default async function HomePage() {
  const [projects, settings, pile] = await Promise.all([
    safeFetch<ProjectCard[]>(PROJECTS_QUERY),
    safeFetch<SiteSettings>(SITE_SETTINGS_QUERY),
    safeFetch<{ images: (SanityImage | null)[] }[]>(PILE_QUERY),
  ]);

  if (!projects?.length) {
    return (
      <>
        <SetupBanner />
        <main className="mx-auto max-w-page px-6 py-32">
          <h1 className="text-4xl font-semibold tracking-tight">No content yet</h1>
        </main>
      </>
    );
  }

  const headline =
    settings?.heroHeadline ?? "Crafting seamless digital experiences with a human touch.";
  const at = tenure(settings);

  // Covers first, then second images, so the pile spans every project.
  const photos = [
    ...(pile ?? []).map((p) => p.images[0]),
    ...(pile ?? []).map((p) => p.images[1]),
    ...(pile ?? []).map((p) => p.images[2]),
  ]
    .filter((img): img is SanityImage => Boolean(img))
    .slice(0, 5);

  return (
    <main>
      {/* ---- Hero ---------------------------------------------------------- */}
      <section className="px-2 sm:px-4">
        <div className="hero-panel -mt-[var(--nav-h)] rounded-b-[40px] pt-[calc(var(--nav-h)+3rem)] sm:rounded-b-[64px] sm:pt-[calc(var(--nav-h)+4.5rem)]">
          <div className="mx-auto flex max-w-page flex-col items-center px-5 text-center sm:px-10">
            <Reveal y={10}>
              <p className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-[13px] font-medium text-muted-strong shadow-[var(--shadow-card)] backdrop-blur">
                {settings?.availabilityShow && settings.availabilityLabel && (
                  <span className="inline-flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="annotation-dot absolute inset-0 rounded-full bg-accent" />
                      <span className="relative h-2 w-2 rounded-full bg-accent" />
                    </span>
                    {settings.availabilityLabel}
                  </span>
                )}
                {at && (
                  <>
                    <span aria-hidden className="hidden h-3 w-px bg-border sm:block" />
                    <span>
                      {at.prefix} <span className="text-foreground">{at.org}</span>
                    </span>
                  </>
                )}
              </p>
            </Reveal>

            <Reveal delay={80} y={16}>
              <h1 className="mt-8 max-w-4xl text-[2.5rem] font-semibold leading-[1.06] sm:text-[3.75rem]">
                <Highlight text={headline} words={4} />
              </h1>
            </Reveal>

            {settings?.heroSupporting && (
              <Reveal delay={180} y={12}>
                <p className="mt-7 max-w-xl text-[18px] leading-relaxed text-muted-strong sm:text-[21px]">
                  {settings.heroSupporting}
                </p>
              </Reveal>
            )}

            <Reveal delay={260} y={12}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a href="#work" className="group btn btn-primary">
                  See the work
                  <ArrowRight aria-hidden size={15} className="arrow" />
                </a>
                <Link href="/contact" className="group btn btn-light">
                  Get in touch
                  <ArrowUpRight aria-hidden size={15} className="arrow-up" />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={320} y={28} className="mx-auto mt-14 w-full max-w-[880px] px-4 sm:mt-20 sm:px-10">
            <HeroArtboard projects={projects} />
          </Reveal>

          {settings?.stats?.length ? (
            <Reveal delay={420} y={12} className="flex justify-center px-5 pb-12 pt-10 sm:pb-16">
              <dl className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-full border border-white/70 bg-white/80 px-6 py-3 text-[13px] shadow-[var(--shadow-card)] backdrop-blur">
                {settings.stats.map((stat) => (
                  <div key={stat._key ?? stat.label} className="inline-flex items-center gap-2">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <dd className="mono font-semibold">{stat.value}</dd>
                    <dt className="text-muted-strong">{stat.label.toLowerCase()}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* ---- Work ---------------------------------------------------------- */}
      <section id="work" className="mx-auto max-w-page scroll-mt-24 px-5 pt-28 sm:px-10 sm:pt-36">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold leading-[1.05] sm:text-[52px]">
              Case studies, not screenshots.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[18px] text-muted-strong sm:text-[20px]">
              {projects.length} projects told from the brief to what they set out to do.
            </p>
            <Link href="/work" className="group btn btn-soft mt-7">
              All projects
              <ArrowRight aria-hidden size={14} className="arrow" />
            </Link>
          </div>
        </Reveal>

        <div className="panel-cream mt-14 rounded-[32px] px-3 py-6 sm:px-10 sm:py-10">
          <WorkStack projects={projects} />
        </div>
      </section>

      {/* ---- About --------------------------------------------------------- */}
      {settings?.aboutIntro && (
        <AboutReveal
          text={settings.aboutIntro}
          images={photos}
          chips={(settings.services ?? []).map((s) => s.name)}
        />
      )}

      {/* ---- Testimonials -------------------------------------------------- */}
      {settings?.testimonials?.length ? (
        <div className="mx-auto max-w-page px-5 sm:px-10">
          <TestimonialCarousel items={settings.testimonials} />
        </div>
      ) : null}
    </main>
  );
}
