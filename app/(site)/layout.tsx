import type { ReactNode } from "react";

/**
 * Regenerate every minute so Studio edits reach the live site without a
 * redeploy. Without this the pages are frozen at build time and content
 * changes would only appear on the next push.
 */
export const revalidate = 60;

import { safeFetch } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const settings = await safeFetch<SiteSettings>(SITE_SETTINGS_QUERY);

  return (
    <>
      <SiteHeader
        name={settings?.siteTitle ?? "Tanvir Ahassan"}
        availability={
          settings?.availabilityShow ? settings.availabilityLabel : undefined
        }
      />
      <div className="flex-1">{children}</div>
      <SiteFooter settings={settings} />
    </>
  );
}
