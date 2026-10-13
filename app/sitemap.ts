import type { MetadataRoute } from "next";
import { site } from "./_content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, changeFrequency: "weekly", priority: 1 }];
}
