import { Check, Minus, TriangleAlert } from "lucide-react";
import { SanityImage } from "@/components/SanityImage";
import type { SanityImage as SanityImageType } from "@/sanity/types";

export type Annotation = {
  _key?: string;
  label: string;
  note?: string;
  tone?: "positive" | "attention" | "neutral";
  x: number;
  y: number;
};

/* Blue is the colour of a decision. Amber stays for a flagged problem — that
   is a meaning, not a decoration — and neutral notes are grey. */
const tone = {
  positive: { Icon: Check, cls: "text-white bg-accent ring-accent/30" },
  attention: { Icon: TriangleAlert, cls: "text-foreground bg-panel ring-border" },
  neutral: { Icon: Minus, cls: "text-muted-strong bg-foreground/[0.06] ring-border" },
} as const;

export function ToneMark({ t, size = 20 }: { t?: keyof typeof tone; size?: number }) {
  const { Icon, cls } = tone[t ?? "neutral"] ?? tone.neutral;
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full ring-2 ${cls}`}
      style={{ width: size, height: size }}
    >
      <Icon aria-hidden size={Math.round(size * 0.58)} strokeWidth={2.75} />
    </span>
  );
}

/**
 * One callout, positioned by the caller. Anchored away from whichever edge
 * it is nearest, so a note pinned at 80% grows leftwards instead of being
 * squeezed against the frame.
 */
export function Callout({
  annotation,
  compact = false,
  delay = 0,
}: {
  annotation: Annotation;
  compact?: boolean;
  delay?: number;
}) {
  const anchorX = annotation.x > 62 ? "-100%" : annotation.x < 38 ? "0%" : "-50%";
  return (
    <div
      aria-hidden
      className="absolute"
      style={{
        left: `${annotation.x}%`,
        top: `${annotation.y}%`,
        transform: `translate(${anchorX}, -50%)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        className={`annotation-card card flex items-start gap-2 rounded-lg text-foreground ${
          compact ? "w-max max-w-52 whitespace-nowrap px-2 py-1.5" : "w-max max-w-60 rounded-xl px-3 py-2.5"
        }`}
      >
        <ToneMark t={annotation.tone} size={compact ? 16 : 20} />
        <span className="min-w-0">
          <span
            className={`block font-semibold leading-snug ${compact ? "text-[11px]" : "text-xs"}`}
          >
            {annotation.label}
          </span>
          {!compact && annotation.note && (
            <span className="mt-0.5 block text-xs leading-snug text-muted-strong">
              {annotation.note}
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

/**
 * In a small frame two callouts pinned close together overlap. Walk them in
 * vertical order and push each one down until it clears the last, keeping
 * the Studio's positions where they already have room.
 */
function spaced(items: Annotation[], gap = 16): Annotation[] {
  const order = items
    .map((a, i) => ({ a, i }))
    .sort((p, q) => p.a.y - q.a.y);
  let floor = -Infinity;
  const out: Annotation[] = [...items];
  for (const { a, i } of order) {
    const y = Math.min(92, Math.max(a.y, floor));
    out[i] = { ...a, y };
    floor = y + gap;
  }
  return out;
}

/**
 * A screenshot with design decisions pinned to it. The signature device — a
 * screenshot shows what shipped, an annotation shows what was decided.
 *
 * Callouts float over the image on wide screens and fall back to a plain
 * list underneath on narrow ones. `compact` keeps them to a label and shows
 * them from tablet width, for the smaller frames on cards.
 */
export function AnnotatedImage({
  image,
  annotations = [],
  width = 1600,
  sizes = "100vw",
  priority = false,
  className = "",
  compact = false,
  list = true,
}: {
  image: SanityImageType & { annotations?: Annotation[] };
  annotations?: Annotation[];
  width?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  compact?: boolean;
  list?: boolean;
}) {
  const raw = annotations.length ? annotations : (image.annotations ?? []);
  const items = compact ? spaced(raw) : raw;
  const show = compact ? "hidden md:block" : "hidden lg:block";
  const hideList = compact ? "md:hidden" : "lg:hidden";

  return (
    <div className={className}>
      <div className="relative">
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          <SanityImage
            image={image}
            width={width}
            sizes={sizes}
            priority={priority}
            className="cover-img"
          />
        </div>

        {items.map((a, i) => (
          <div key={a._key ?? i} className={show}>
            <Callout annotation={a} compact={compact} delay={i * 90} />
          </div>
        ))}
      </div>

      {list && items.length > 0 && (
        <ul className={`mt-4 grid gap-3 sm:grid-cols-3 ${hideList}`}>
          {items.map((a, i) => (
            <li key={a._key ?? i} className="flex items-start gap-2.5">
              <ToneMark t={a.tone} />
              <span>
                <span className="block text-[13px] font-semibold leading-snug">{a.label}</span>
                {a.note && (
                  <span className="mt-0.5 block text-xs leading-snug text-muted-strong">
                    {a.note}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
