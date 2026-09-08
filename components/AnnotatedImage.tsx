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

const tone = {
  positive: { Icon: Check, cls: "text-emerald-600 bg-emerald-50 ring-emerald-100" },
  attention: { Icon: TriangleAlert, cls: "text-amber-600 bg-amber-50 ring-amber-100" },
  neutral: { Icon: Minus, cls: "text-muted bg-surface-strong ring-border" },
} as const;

function ToneMark({ t }: { t?: keyof typeof tone }) {
  const { Icon, cls } = tone[t ?? "neutral"] ?? tone.neutral;
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 ${cls}`}
    >
      <Icon aria-hidden size={12} strokeWidth={2.5} />
    </span>
  );
}

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
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-md">
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
            <div className="annotation-card flex max-w-60 items-start gap-2.5 rounded-xl border border-border bg-background/95 px-3 py-2.5 shadow-md backdrop-blur">
              <ToneMark t={a.tone} />
              <span className="min-w-0">
                <span className="block text-xs font-semibold leading-snug">{a.label}</span>
                {a.note && (
                  <span className="mt-0.5 block text-xs leading-snug text-muted">
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
              <ToneMark t={a.tone} />
              <span>
                <span className="block text-[13px] font-semibold leading-snug">{a.label}</span>
                {a.note && (
                  <span className="mt-0.5 block text-xs leading-snug text-muted">
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
