import type { MetadataRoute } from "next"

/**
 * robots.txt para o site público.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api", "/api/*", "/_next", "/_vercel", "/.env", "/.git"],
      },
      {
        // Bots agressivos / scrapers de IA não autorizados
        userAgent: ["GPTBot", "ClaudeBot", "anthropic-ai", "CCBot", "Google-Extended"],
        disallow: "/",
      },
    ],
    sitemap: "https://xzark.co/sitemap.xml",
    host: "https://xzark.co",
  }
}
