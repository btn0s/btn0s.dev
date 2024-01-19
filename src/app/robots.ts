import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/api/og/*"],
      disallow: "/private/",
    },
    sitemap: "https://btn0s.dev/sitemap.xml",
  };
}
