import type { ReactNode } from "react";
import { ImageOff } from "lucide-react";
import { AnnotatedImage } from "@/components/AnnotatedImage";
import { ZoomableImage } from "@/components/ZoomableImage";
import { Reveal } from "@/components/Reveal";
import { imageDimensions } from "@/sanity/image";
import type {
  CardsChapter,
  Chapter,
  ChapterImage,
  FlowChapter,
  MediaChapter,
  MetricsChapter,
  StatementChapter,
  TeamChapter,
} from "@/sanity/types";

/*
  Renders a case study written as chapters. Every chapter carries its own
  shape, so two sections in a row never look the same unless they were asked
  to: prose sits on the page, panels and dark bands break the column, screens
  run wide.
*/

/** "One paragraph.\n\nAnother." → two paragraphs. */
function paragraphs(text?: string) {
  return (text ?? "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mono text-[11px] uppercase tracking-[0.18em] text-muted-strong">{children}</p>
  );
}

function Lead({ text, dark = false }: { text?: string; dark?: boolean }) {
  const parts = paragraphs(text);
  if (!parts.length) return null;
  return (
    <div className={`space-y-4 text-[17px] leading-[1.65] ${dark ? "text-dark-muted" : "text-muted-strong"}`}>
      {parts.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

/** Eyebrow, heading and lead, stacked. The default head for most chapters. */
function Head({
  eyebrow,
  heading,
  lead,
  dark = false,
  className = "",
}: {
  eyebrow?: string;
  heading?: string;
  lead?: string;
  dark?: boolean;
  className?: string;
}) {
  if (!eyebrow && !heading && !lead) return null;
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {heading && (
        <h2
          className={`text-balance text-3xl font-medium leading-[1.1] tracking-[-0.02em] sm:text-4xl ${
            eyebrow ? "mt-3" : ""
          } ${dark ? "text-dark-fg" : ""}`}
        >
          {heading}
        </h2>
      )}
      {lead && (
        <div className={heading || eyebrow ? "mt-5" : ""}>
          <Lead text={lead} dark={dark} />
        </div>
      )}
    </div>
  );
}

/**
 * Three or four short lines on one rule — the scale of the thing, stated once,
 * where a paragraph would have taken four sentences to say the same.
 */
function Facts({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul
      className={`mt-10 grid gap-x-8 gap-y-5 border-y py-5 sm:grid-cols-3 ${
        dark ? "border-dark-fg/15" : "border-border"
      }`}
    >
      {items.map((f, i) => (
        <li key={i} className="flex items-baseline gap-3">
          <span className={`mono text-[11px] ${dark ? "text-dark-fg/45" : "text-muted"}`}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className={`text-[17px] font-medium ${dark ? "text-dark-fg" : ""}`}>{f}</span>
        </li>
      ))}
    </ul>
  );
}

/** A gap we have not filled yet, drawn as a gap rather than filled with a stand-in. */
function PendingSlot({ label, tall = false }: { label: string; tall?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-white/50 px-6 text-center ${
        tall ? "py-24" : "py-14"
      }`}
    >
      <ImageOff aria-hidden size={18} className="text-muted" />
      <p className="text-[14px] font-semibold text-muted-strong">{label}</p>
      <p className="mono text-[11px] uppercase tracking-[0.16em] text-muted">Asset to add</p>
    </div>
  );
}

/** Roughly one viewport and a bit — past this a single picture owns the page. */
const MAX_FIGURE_HEIGHT = 1250;

/** Use the logical screen width when an export contains extra pixels for detail. */
const PHONE_WIDTH = 600;

function isPhone(image: ChapterImage) {
  if (image.presentation) return image.presentation === "phone";
  const size = imageDimensions(image);
  return Boolean(size && (image.displayWidth ?? size.width) <= PHONE_WIDTH);
}

/** One screenshot. The label sits above it, not on top of it. */
function Figure({
  image,
  width = 1600,
  sizes = "(max-width: 1280px) 100vw, 1100px",
  className = "",
}: {
  image: ChapterImage;
  width?: number;
  sizes?: string;
  className?: string;
}) {
  const annotated = Boolean(image.annotations?.length);

  const size = imageDimensions(image);

  // Two caps on how wide a picture may run.
  //
  // Never past its own pixels: a 402px phone capture stretched across the
  // column is only a blurrier phone.
  //
  // And never so wide that a portrait image runs for screens — a type sheet
  // two and a half times its own width would be nearly three thousand pixels
  // tall at full measure. Bound the height instead and let the width follow;
  // the whole sheet is still one click away.
  const ratio = image.previewAspect ?? (size ? size.height / size.width : 0);
  const caps = [
    image.maxWidth,
    image.displayWidth ?? size?.width,
    ratio > 1.25 && !isPhone(image) ? Math.round(MAX_FIGURE_HEIGHT / ratio) : undefined,
  ].filter((n): n is number => typeof n === "number" && n < width);
  const cap = caps.length ? Math.min(...caps) : undefined;

  return (
    <figure className={className} style={cap ? { maxWidth: cap } : undefined}>
      {image.label && (
        <span className="mono mb-3 inline-flex rounded-full bg-dark px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-dark-fg">
          {image.label}
        </span>
      )}

      {annotated ? (
        <div className="img-plain group">
          <AnnotatedImage image={image} width={width} sizes={sizes} />
        </div>
      ) : (
        // A full-page screenshot sets previewAspect so it shows its top at a
        // readable height; the lightbox still carries the whole page.
        <ZoomableImage
          image={image}
          width={width}
          sizes={sizes}
          previewAspect={image.previewAspect}
        />
      )}

      {image.caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-muted-strong">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ---- Chapter types ------------------------------------------------------- */

function Statement({ c }: { c: StatementChapter }) {
  const dark = c.tone === "dark";
  const shell =
    c.tone === "dark"
      ? "rounded-[28px] bg-dark px-6 py-12 text-dark-fg sm:px-12 sm:py-16"
      : c.tone === "soft"
        ? "panel-soft rounded-[28px] px-6 py-12 sm:px-12 sm:py-16"
        : "";

  const points = c.points?.length ? (
    <ul className={`mt-8 space-y-3 ${c.layout === "split" ? "" : "max-w-3xl"}`}>
      {c.points.map((p, i) => (
        <li key={i} className="flex gap-3 text-[16px] leading-[1.6]">
          <span
            aria-hidden
            className={`mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full ${dark ? "bg-dark-fg/60" : "bg-accent"}`}
          />
          <span className={dark ? "text-dark-fg/85" : ""}>{p}</span>
        </li>
      ))}
    </ul>
  ) : null;

  const body =
    c.layout === "pull" ? (
      <div className="mx-auto max-w-3xl text-center">
        {c.eyebrow && <Eyebrow>{c.eyebrow}</Eyebrow>}
        {c.heading && (
          <p
            className={`heading text-balance text-3xl font-medium leading-[1.15] tracking-[-0.02em] sm:text-[2.6rem] ${
              c.eyebrow ? "mt-4" : ""
            } ${dark ? "text-dark-fg" : ""}`}
          >
            {c.heading}
          </p>
        )}
        {c.lead && (
          <div className="mt-6">
            <Lead text={c.lead} dark={dark} />
          </div>
        )}
        {points}
      </div>
    ) : c.layout === "split" ? (
      // Near-even columns: a heading squeezed into a narrow rail wraps into
      // a column of two-word lines.
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
        <div>
          {c.eyebrow && <Eyebrow>{c.eyebrow}</Eyebrow>}
          {c.heading && (
            <h2
              className={`text-balance text-3xl font-medium leading-[1.1] tracking-[-0.02em] sm:text-4xl ${
                c.eyebrow ? "mt-3" : ""
              } ${dark ? "text-dark-fg" : ""}`}
            >
              {c.heading}
            </h2>
          )}
        </div>
        <div>
          <Lead text={c.lead} dark={dark} />
          {points}
        </div>
      </div>
    ) : (
      <>
        <Head eyebrow={c.eyebrow} heading={c.heading} lead={c.lead} dark={dark} />
        {points}
      </>
    );

  return (
    <div className={shell}>
      {body}
      {c.facts?.length ? <Facts items={c.facts} dark={dark} /> : null}
    </div>
  );
}

function Cards({ c }: { c: CardsChapter }) {
  const cols = c.columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div>
      <Head eyebrow={c.eyebrow} heading={c.heading} lead={c.lead} />
      <ul className={`mt-10 grid gap-4 ${cols}`}>
        {(c.items ?? []).map((item, i) => (
          <li key={item._key ?? item.title}>
            <Reveal delay={i * 70} className="h-full">
              <div className="card h-full rounded-2xl p-6">
                {c.numbered !== false && (
                  <p className="mono text-[12px] font-medium text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                )}
                <p className="mt-3 text-[17px] font-semibold leading-snug">{item.title}</p>
                {item.body && (
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted-strong">{item.body}</p>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Media({ c }: { c: MediaChapter }) {
  // One column, full width. Two screenshots side by side are two small
  // screenshots, and the work is the point — except for phone captures, which
  // are small already and read as a set.
  const images = [...(c.feature ?? []), ...(c.images ?? [])];
  const pending = [c.featurePending, ...(c.pending ?? [])].filter(Boolean) as string[];
  const hasHead = Boolean(c.eyebrow || c.heading || c.lead);

  // Runs of consecutive phone captures become one row; everything else keeps
  // the whole measure to itself.
  const rows: ChapterImage[][] = [];
  for (const img of images) {
    const last = rows.at(-1);
    if (isPhone(img) && last && isPhone(last[0])) last.push(img);
    else rows.push([img]);
  }

  return (
    <div>
      <Head eyebrow={c.eyebrow} heading={c.heading} lead={c.lead} />
      {c.facts?.length ? <Facts items={c.facts} /> : null}

      <div className={`space-y-12 ${hasHead || c.facts?.length ? "mt-10" : ""}`}>
        {c.layout === "grid" ? (
          <div className="grid items-start gap-8 sm:grid-cols-2">
            {images.map((image, i) => (
              <Reveal key={i} amount={0.12}>
                <Figure
                  image={image}
                  width={900}
                  sizes="(max-width: 640px) 100vw, 540px"
                />
              </Reveal>
            ))}
          </div>
        ) : rows.map((row, i) =>
          row.length > 1 || isPhone(row[0]) ? (
            <Reveal key={i} delay={i * 60} amount={0.12}>
              <div className="flex flex-wrap gap-5 sm:gap-6">
                {row.map((img, j) => (
                  <Figure
                    key={j}
                    image={img}
                    width={700}
                    sizes="(max-width: 640px) 100vw, 260px"
                    className="basis-full sm:basis-[260px]"
                  />
                ))}
              </div>
            </Reveal>
          ) : (
            <Reveal key={i} delay={i * 60} amount={0.12}>
              <Figure image={row[0]} width={1800} />
            </Reveal>
          ),
        )}
        {pending.map((label, i) => (
          <PendingSlot key={`p${i}`} label={label} tall />
        ))}
      </div>

      {c.note && <p className="mono mt-5 text-[12px] tracking-wide text-muted-strong">{c.note}</p>}
    </div>
  );
}

function Flow({ c }: { c: FlowChapter }) {
  const steps = c.steps ?? [];
  const timeline = c.variant === "timeline";

  return (
    <div>
      <Head eyebrow={c.eyebrow} heading={c.heading} lead={c.lead} />

      {steps.length > 0 &&
        (timeline ? (
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s._key ?? s.label}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="relative h-full rounded-2xl border border-border bg-white/70 p-5">
                    <span className="mono text-[12px] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-[16px] font-semibold leading-snug">{s.label}</p>
                    {s.note && (
                      <p className="mt-2 text-[14px] leading-relaxed text-muted-strong">{s.note}</p>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        ) : (
          // Narrow screens scroll the row rather than wrapping it: a wrapped
          // row leaves an arrow pointing at the end of a line.
          <ol className="panel-soft no-scrollbar mt-10 flex items-stretch overflow-x-auto rounded-[28px] p-5 sm:flex-wrap sm:gap-y-3 sm:overflow-visible sm:p-7">
            {steps.map((s, i) => (
              <li key={s._key ?? s.label} className="flex shrink-0 items-center sm:shrink">
                {/* The arrow leads its step rather than trailing the one before,
                    so a wrapped row starts with "→ next" instead of ending on a
                    pointer to nothing. */}
                {i > 0 && (
                  <span aria-hidden className="mx-2 text-muted sm:mx-3">
                    →
                  </span>
                )}
                <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
                  <p className="text-[15px] font-semibold leading-snug">{s.label}</p>
                  {s.note && <p className="mt-0.5 text-[13px] text-muted-strong">{s.note}</p>}
                </div>
              </li>
            ))}
          </ol>
        ))}

      {(c.images?.length || c.pending?.length) && (
        <div className="mt-8 space-y-6">
          {(c.images ?? []).map((img, i) => (
            <Reveal key={i} amount={0.12}>
              <Figure image={img} width={1800} />
            </Reveal>
          ))}
          {(c.pending ?? []).map((label, i) => (
            <PendingSlot key={`p${i}`} label={label} tall />
          ))}
        </div>
      )}
    </div>
  );
}

function Metrics({ c }: { c: MetricsChapter }) {
  const items = c.items ?? [];
  return (
    <div className="rounded-[28px] bg-dark px-6 py-12 text-dark-fg sm:px-12 sm:py-16">
      <Head eyebrow={c.eyebrow} heading={c.heading} lead={c.lead} dark />

      {items.length > 0 && (
        // A pair of figures reads as a pair; only three or more want a third column.
        <ul
          className={`mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 ${
            items.length > 2 ? "lg:grid-cols-3" : ""
          }`}
        >
          {items.map((m, i) => {
            const verified = m.status === "verified" && Boolean(m.value);
            return (
              <li key={m._key ?? m.label}>
                <Reveal delay={i * 80}>
                  {verified ? (
                    <p className="mono text-4xl font-medium tracking-[-0.03em] text-dark-fg sm:text-5xl">
                      {m.value}
                    </p>
                  ) : (
                    <p className="mono inline-flex rounded-lg border border-dashed border-dark-fg/35 px-3 py-1.5 text-[13px] uppercase tracking-[0.14em] text-dark-fg/60">
                      Not yet verified
                    </p>
                  )}
                  <p className="mt-3 text-[15px] font-medium text-dark-fg">{m.label}</p>
                  <p className="mono mt-1.5 text-[11px] leading-relaxed text-dark-muted">
                    {verified ? m.evidence : (m.evidence ?? "Awaiting a figure from Google Analytics")}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      )}

      {c.note && (
        <div className="mt-12 max-w-2xl border-t border-dark-fg/15 pt-8">
          <Lead text={c.note} dark />
        </div>
      )}
    </div>
  );
}

function Team({ c }: { c: TeamChapter }) {
  return (
    <div>
      <Head eyebrow={c.eyebrow} heading={c.heading} lead={c.lead} />

      <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <div className="card rounded-2xl p-6">
          <p className="mono text-[11px] uppercase tracking-[0.16em] text-muted">Lead</p>
          <p className="mt-2 text-[20px] font-semibold">{c.leadName ?? "Me"}</p>
          {c.leadRole && <p className="mt-1 text-[15px] text-muted-strong">{c.leadRole}</p>}

          {c.members?.length ? (
            <>
              <div className="my-5 flex items-center gap-3">
                <span aria-hidden className="h-px flex-1 bg-border" />
                <span className="mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  Worked with
                </span>
                <span aria-hidden className="h-px flex-1 bg-border" />
              </div>
              <ul className="space-y-2.5">
                {c.members.map((m) => (
                  <li key={m._key ?? m.name} className="rounded-xl bg-panel px-4 py-3">
                    <p className="text-[15px] font-semibold">{m.name}</p>
                    {m.role && <p className="text-[13px] text-muted-strong">{m.role}</p>}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        {c.responsibilities?.length ? (
          <div className="panel-soft rounded-2xl p-6 sm:p-8">
            <p className="mono text-[11px] uppercase tracking-[0.16em] text-muted-strong">
              What I held
            </p>
            <ul className="mt-5 divide-y divide-border border-y border-border">
              {c.responsibilities.map((r, i) => (
                <li key={i} className="flex gap-4 py-3.5">
                  <span className="mono shrink-0 text-[12px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ---- Renderer ------------------------------------------------------------ */

export function chapterAnchor(index: number) {
  return `ch-${String(index + 1).padStart(2, "0")}`;
}

function ChapterBody({ chapter }: { chapter: Chapter }) {
  switch (chapter._type) {
    case "statementChapter":
      return <Statement c={chapter} />;
    case "cardsChapter":
      return <Cards c={chapter} />;
    case "mediaChapter":
      return <Media c={chapter} />;
    case "flowChapter":
      return <Flow c={chapter} />;
    case "metricsChapter":
      return <Metrics c={chapter} />;
    case "teamChapter":
      return <Team c={chapter} />;
    default:
      return null;
  }
}

export function Chapters({ chapters }: { chapters: Chapter[] }) {
  return (
    <div className="space-y-20 sm:space-y-28">
      {chapters.map((chapter, i) => (
        <Reveal key={chapter._key ?? i} amount={0.1}>
          <section id={chapterAnchor(i)} className="scroll-mt-28">
            <ChapterBody chapter={chapter} />
          </section>
        </Reveal>
      ))}
    </div>
  );
}
