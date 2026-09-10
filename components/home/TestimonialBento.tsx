import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SocialIcon } from "@/components/SocialIcon";
import type { SiteSettings } from "@/sanity/types";
import { SanityImage } from "@/components/SanityImage";
import { Reveal } from "@/components/Reveal";

type Item = NonNullable<SiteSettings["testimonials"]>[number];

/* Soft avatar tints, cycled by position; ink initials on all of them. */
const tints = [
  "#dbeafe",
  "#fff3d6",
  "#dcfce7",
  "#fce7f3",
  "#ede9fe",
  "#ffedd5",
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/** The LinkedIn mark, where these recommendations come from, in the neutral grey. */
function QuoteMark({ dark }: { dark?: boolean }) {
  return (
    <span className={`block ${dark ? "text-white/40" : "text-muted"}`}>
      <SocialIcon platform="linkedin" size={28} />
    </span>
  );
}

function Card({
  item,
  index,
  dark = false,
  className = "",
}: {
  item: Item;
  index: number;
  dark?: boolean;
  className?: string;
}) {
  const ink = dark ? "text-white" : "text-foreground";
  const soft = dark ? "text-white/65" : "text-muted-strong";
  return (
    <figure
      className={`relative flex h-full flex-col justify-between overflow-hidden p-7 sm:p-8 ${
        dark ? "bg-dark" : "bg-white"
      } ${className}`}
    >
      {dark && (
        // A soft blue glow rising from the foot of the ink card, so the
        // attribution sits in light rather than in the dark.
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 110%, rgb(47 108 246 / 0.55) 0%, rgb(47 108 246 / 0.22) 40%, transparent 72%)",
          }}
        />
      )}
      <div className="relative">
        <QuoteMark dark={dark} />
        <blockquote
          className={`mt-5 text-[15.5px] font-normal leading-[1.65] ${ink}`}
        >
          &ldquo;{item.quote}&rdquo;
        </blockquote>
      </div>

      <figcaption className="relative mt-8 flex items-end justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <span
            aria-hidden
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold text-foreground"
            style={{ background: tints[index % tints.length] }}
          >
            {initials(item.name)}
          </span>
          <div className="min-w-0">
            <p className={`text-[15px] font-semibold ${ink}`}>{item.name}</p>
            <p className={`text-[13px] leading-snug ${soft}`}>
              {[item.title, item.company].filter(Boolean).join(", ")}
            </p>
            {(item.relationship || item.projectSlug) && (
              <p
                className={`mono mt-1.5 flex flex-wrap gap-x-3 text-[10.5px] uppercase tracking-[0.12em] ${dark ? "text-white/50" : "text-muted"}`}
              >
                {item.relationship && (
                  <span>
                    {item.relationship}
                    {item.date ? ` · ${item.date}` : ""}
                  </span>
                )}
                {item.projectSlug && (
                  <Link
                    href={`/work/${item.projectSlug}`}
                    className={`inline-flex items-center gap-1 ${dark ? "text-white/80 hover:text-white" : "text-accent hover:text-accent-hover"}`}
                  >
                    Project
                    <ArrowUpRight aria-hidden size={10} />
                  </Link>
                )}
              </p>
            )}
          </div>
        </div>
        {item.logo && (
          <span className="h-7 w-7 shrink-0 overflow-hidden rounded-md opacity-70">
            <SanityImage
              image={item.logo}
              width={80}
              aspect={1}
              crop
              sizes="28px"
              fill
            />
          </span>
        )}
      </figcaption>
    </figure>
  );
}

/**
 * One card of quotes, ruled into cells: the first stands tall on the left across two rows, the
 * second runs wide across the top right, the next two sit under it, and any
 * after that run the full width. The tall one is set in ink so it stands
 * out; every quote is the same size and weight. Rows size to their content,
 * so long quotes never stretch their neighbours.
 */
export function TestimonialBento({ items }: { items: Item[] }) {
  const [first, second, ...rest] = items;
  if (!first) return null;

  return (
    <section className="py-20 sm:py-28">
      <h2 className="section-title">Testimonials</h2>

      {/* One card. The 1px gaps show the border colour through, which rules
          the cells apart without each needing its own frame. */}
      <div className="card mt-12 overflow-hidden rounded-[28px] p-0">
        <div
          className="grid gap-px lg:grid-cols-3"
          style={{ background: "var(--border)" }}
        >
          <Reveal className="bg-dark lg:col-span-1 lg:row-span-2">
            <Card item={first} index={0} dark />
          </Reveal>

          {second && (
            <Reveal delay={80} className="bg-white lg:col-span-2">
              <Card item={second} index={1} />
            </Reveal>
          )}

          {rest.map((item, i) => {
            // The first two sit beside the tall card; anything after runs full width.
            const wide = i >= 2;
            return (
              <Reveal
                key={item._key ?? item.name}
                delay={160 + i * 80}
                className={`bg-white ${wide ? "lg:col-span-3" : ""}`}
              >
                <Card item={item} index={i + 2} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
