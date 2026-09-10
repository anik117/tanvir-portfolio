import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

/** Who this person is to him, as a small pill that opens the card. */
function Relation({ item, dark }: { item: Item; dark?: boolean }) {
  if (!item.relationship) return null;
  return (
    <span
      className={`mono inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] ${
        dark ? "bg-white/70 text-accent-hover" : "bg-panel text-muted-strong"
      }`}
    >
      {item.relationship}
      {item.date && (
        <>
          <span
            aria-hidden
            className="h-0.5 w-0.5 rounded-full bg-current opacity-60"
          />
          {item.date}
        </>
      )}
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
  const ink = "text-foreground";
  const soft = "text-muted-strong";
  return (
    <figure
      className={`relative flex h-full flex-col justify-between overflow-hidden p-9 sm:p-11 ${
        dark ? "bg-accent-soft" : "bg-white"
      } ${className}`}
    >
      <div className="relative">
        <Relation item={item} dark={dark} />
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
            style={{ background: dark ? "#fff" : tints[index % tints.length] }}
          >
            {initials(item.name)}
          </span>
          <div className="min-w-0">
            <p className={`text-[15px] font-semibold ${ink}`}>{item.name}</p>
            <p className={`text-[13px] leading-snug ${soft}`}>
              {[item.title, item.company].filter(Boolean).join(", ")}
            </p>
            {item.projectSlug && (
              <p
                className={`mono mt-1.5 flex flex-wrap gap-x-3 text-[10.5px] uppercase tracking-[0.12em] text-muted`}
              >
                {item.projectSlug && (
                  <Link
                    href={`/work/${item.projectSlug}`}
                    className={`inline-flex items-center gap-1 text-accent hover:text-accent-hover`}
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
 * after that run the full width. The tall one sits on a soft blue so it
 * leads without shouting; every quote is the same size and weight. Rows size to their content,
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
          <Reveal className="bg-accent-soft lg:col-span-1 lg:row-span-2">
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
