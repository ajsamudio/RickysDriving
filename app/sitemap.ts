import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL?.startsWith("http") &&
  !process.env.NEXT_PUBLIC_APP_URL.includes("localhost")
  ? process.env.NEXT_PUBLIC_APP_URL
  : "https://rickysdriving.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/booking", "/faq", "/contact"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/booking" ? 0.9 : 0.8,
  }));
}
