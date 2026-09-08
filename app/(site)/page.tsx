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
  const first = projects[0];

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
      <section className="mx-auto grid max-w-page items-center gap-12 px-5 pb-20 pt-12 sm:px-10 sm:pt-16 lg:min-h-[calc(100vh-var(--nav-h))] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 lg:py-10">
        <div>
          <Reveal y={10}>
            <p className="mono flex flex-wrap items-center gap-x-3 text-[11px] uppercase tracking-[0.18em] text-muted-strong">
              <span>UI/UX Designer</span>
              {at && (
                <>
                  <span aria-hidden className="h-px w-5 bg-border" />
                  <span>
                    {at.prefix} {at.org}
                  </span>
                </>
              )}
            </p>
          </Reveal>

          <Reveal delay={80} y={16}>
            <h1 className="mt-6 max-w-xl text-[2.5rem] font-semibold leading-[1.06] sm:text-[3.5rem]">
              <Highlight text={headline} words={4} />
            </h1>
          </Reveal>

          {settings?.heroSupporting && (
            <Reveal delay={180} y={12}>
              <p className="mt-7 max-w-md text-[17px] leading-relaxed text-muted-strong">
                {settings.heroSupporting}
              </p>
            </Reveal>
          )}

          <Reveal delay={260} y={12}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#work" className="group btn btn-dark">
                See the work
                <ArrowRight aria-hidden size={15} className="arrow" />
              </a>
              <Link href="/contact" className="group btn btn-light">
                Get in touch
                <ArrowUpRight aria-hidden size={15} className="arrow-up" />
              </Link>
            </div>
          </Reveal>

          {settings?.stats?.length ? (
            <Reveal delay={340} y={12}>
              <dl className="mt-14 flex flex-wrap gap-x-10 gap-y-5 border-t border-border pt-6">
                {settings.stats.map((stat) => (
                  <div key={stat._key ?? stat.label}>
                    <dd className="mono text-[26px] font-medium leading-none">{stat.value}</dd>
                    <dt className="mt-1.5 text-[12px] text-muted-strong">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}
        </div>

        <Reveal delay={200} y={24}>
          <HeroArtboard project={first} />
        </Reveal>
      </section>

      {/* ---- Work ---------------------------------------------------------- */}
      <section id="work" className="band scroll-mt-24 pb-[40vh] pt-20 sm:pt-28">
        <div className="mx-auto max-w-page px-5 sm:px-10">
          <Reveal>
            <div className="mb-16 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
              <div>
                <p className="mono text-[11px] uppercase tracking-[0.18em] text-muted-strong">
                  Selected work · {String(projects.length).padStart(2, "0")}
                </p>
                <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
                  Case studies, not screenshots.
                </h2>
              </div>
              <Link
                href="/work"
                className="group mono inline-flex items-center gap-1.5 text-[13px] text-muted-strong hover:text-foreground"
              >
                All projects
                <ArrowUpRight aria-hidden size={13} className="arrow-up" />
              </Link>
            </div>
          </Reveal>
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
        <div className="mt-8">
          <TestimonialCarousel items={settings.testimonials} />
        </div>
      ) : null}
    </main>
  );
}
