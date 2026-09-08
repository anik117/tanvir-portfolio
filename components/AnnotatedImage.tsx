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

const toneDot: Record<string, string> = {
  positive: "bg-emerald-600",
  attention: "bg-amber-600",
  neutral: "bg-muted",
};

/**
 * A screenshot with design decisions pinned to it. The signature device — a
 * screenshot shows what shipped, an annotation shows what was decided.
 *
 * Callouts are absolutely positioned on wide screens and fall back to a plain
 * list underneath on narrow ones, where overlaying them would be unreadable.
 * The text is real DOM in both cases, so it is searchable and screen-readable.
 */
export function AnnotatedImage({
  image,
  annotations = [],
  width = 1600,
  sizes = "100vw",
  priority = false,
}: {
  image: SanityImageType & { annotations?: Annotation[] };
  annotations?: Annotation[];
  width?: number;
  sizes?: string;
  priority?: boolean;
}) {
  const items = annotations.length ? annotations : (image.annotations ?? []);

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface">
        <SanityImage
          image={image}
          width={width}
          sizes={sizes}
          priority={priority}
          className="cover-img"
        />

        {items.map((a, i) => (
          <div
            key={a._key ?? i}
            aria-hidden
            className="annotation absolute hidden -translate-x-1/2 -translate-y-1/2 lg:block"
            style={{
              left: `${a.x}%`,
              top: `${a.y}%`,
              transitionDelay: `${240 + i * 110}ms`,
            }}
          >
            <div className="annotation-card flex max-w-56 items-start gap-2.5 rounded-xl border border-border bg-background/92 px-3 py-2 shadow-sm backdrop-blur">
              <span
                className={`annotation-dot relative mt-1.5 h-2 w-2 shrink-0 rounded-full ${toneDot[a.tone ?? "neutral"]}`}
              />
              <span className="min-w-0">
                <span className="block text-xs font-medium leading-snug">{a.label}</span>
                {a.note && (
                  <span className="mt-0.5 block text-[11px] leading-snug text-muted">
                    {a.note}
                  </span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <ul className="mt-4 grid gap-3 sm:grid-cols-3 lg:hidden">
          {items.map((a, i) => (
            <li key={a._key ?? i} className="flex items-start gap-2.5">
              <span
                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${toneDot[a.tone ?? "neutral"]}`}
              />
              <span>
                <span className="block text-xs font-medium leading-snug">{a.label}</span>
                {a.note && (
                  <span className="mt-0.5 block text-[11px] leading-snug text-muted">
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
