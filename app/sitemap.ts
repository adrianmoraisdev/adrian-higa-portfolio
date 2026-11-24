import type { MetadataRoute } from "next";
import { cases } from "@/lib/cases";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", ...cases.map((c) => `/cases/${c.slug}/`)];
  return routes.map((route, index) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "monthly" : "yearly",
    priority: index === 0 ? 1 : 0.8
  }));
}
