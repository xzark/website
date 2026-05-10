import type { MetadataRoute } from "next"

/**
 * robots.txt — defensivo.
 * Bloqueia rotas administrativas, fictícias (honeypot) e de API interna.
 * Indexação permitida apenas em conteúdo público.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api",
          "/api/*",
          "/_next",
          "/_vercel",
          "/internal",
          "/internal/*",
          "/.well-known/private",
          // Honeypots — caminhos comuns de scanners
          "/wp-admin",
          "/wp-login.php",
          "/.env",
          "/.git",
          "/phpmyadmin",
          "/backup",
        ],
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
