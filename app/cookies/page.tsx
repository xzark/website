import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"
import { CookiePreferencesManager } from "@/components/legal/cookie-consent"
import { cookieSections } from "@/lib/legal-content"
import { legalMetadata, legalPublicationConfig } from "@/lib/legal-config"

const description = "Learn which cookies and similar technologies the xZark website uses and manage your privacy preferences."

export const metadata: Metadata = legalMetadata({ title: "Cookie Policy", description, path: "/cookies" })

export default function CookiesPage() {
  const lastUpdated = new Date(`${legalPublicationConfig.lastUpdated}T12:00:00Z`).toLocaleDateString("en-US", { dateStyle: "long", timeZone: "UTC" })
  return <LegalPage eyebrow="Legal document" title="Cookie Policy" description={description} lastUpdated={lastUpdated} sections={cookieSections} preferences={<CookiePreferencesManager />} />
}
