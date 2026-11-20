import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"
import { termsSections } from "@/lib/legal-content"
import { legalMetadata, legalPublicationConfig } from "@/lib/legal-config"

const description = "Terms governing use of the public xZark website, its content, and any features expressly made available."

export const metadata: Metadata = legalMetadata({ title: "Terms of Service", description, path: "/terms" })

export default function TermsPage() {
  const lastUpdated = new Date(`${legalPublicationConfig.lastUpdated}T12:00:00Z`).toLocaleDateString("en-US", { dateStyle: "long", timeZone: "UTC" })
  return <LegalPage eyebrow="Legal document" title="Terms of Service" description={description} lastUpdated={lastUpdated} sections={termsSections} />
}
