import type { MetadataRoute } from "next"

/**
 * Sitemap dinâmico — apenas rotas públicas.
 * Áreas administrativas e APIs internas são excluídas por design.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://xzark.co"
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/security`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/careers`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ]

  return staticRoutes
}
