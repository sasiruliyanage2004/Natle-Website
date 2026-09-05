import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://natle.com";
  const currentDate = new Date();

  const routes = [
    { url: "", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/solutions", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/projects", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/blog", priority: 0.8, changeFrequency: "daily" as const },
    { url: "/careers", priority: 0.75, changeFrequency: "weekly" as const },
    { url: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.url}`,
    lastModified: currentDate,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
