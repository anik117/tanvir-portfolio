import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SiteSettings } from "@/sanity/types";
import { SanityImage } from "@/components/SanityImage";
import { Reveal } from "@/components/Reveal";

type Item = NonNullable<SiteSettings["testimonials"]>[number];

/* Soft avatar tints, cycled by position; ink initials on all of them. */
const tints = ["#dbeafe", "#fff3d6", "#dcfce7", "#fce7f3", "#ede9fe", "#ffedd5"];

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/** The serif closing quote, used as the mark that opens every card. */
function QuoteMark({ dark }: { dark?: boolean }) {
  return (
    <span
      aria-hidden
      className={`serif block text-[44px] leading-[0.6] ${dark ? "text-white/60" : "text-accent"}`}
    >
      &rdquo;
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
      className={`flex h-full flex-col justify-between rounded-[28px] p-7 sm:p-8 ${
        dark ? "bg-dark shadow-[var(--shadow-lift)]" : "card"
      } ${className}`}
    >
      <div>
        <QuoteMark dark={dark} />
        <blockquote className={`mt-4 text-[15.5px] font-normal leading-[1.65] ${ink}`}>
          &ldquo;{item.quote}&rdquo;
        </blockquote>
      </div>

      <figcaption className="mt-8 flex items-end justify-between gap-4">
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
              <p className={`mono mt-1.5 flex flex-wrap gap-x-3 text-[10.5px] uppercase tracking-[0.12em] ${dark ? "text-white/50" : "text-muted"}`}>
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
            <SanityImage image={item.logo} width={80} aspect={1} crop sizes="28px" fill />
          </span>
        )}
      </figcaption>
    </figure>
  );
}

/**
 * A bento of quotes: the first stands tall on the left across two rows, the
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

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        <Reveal className="lg:col-span-1 lg:row-span-2">
          <Card item={first} index={0} dark />
        </Reveal>

        {second && (
          <Reveal delay={80} className="lg:col-span-2">
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
              className={wide ? "lg:col-span-3" : ""}
            >
              <Card item={item} index={i + 2} />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
