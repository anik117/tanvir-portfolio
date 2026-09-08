import type { ReactNode } from "react";

// Route config and metadata live here because page.tsx is a client component:
// sanity.config.ts builds objects with methods, which cannot cross the
// server/client boundary as props.
export const dynamic = "force-static";

export const metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: ReactNode }) {
  return children;
}
