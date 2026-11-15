import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"
import { privacySections } from "@/lib/legal-content"
import { legalMetadata, legalPublicationConfig } from "@/lib/legal-config"

const description = "How xZark handles personal data on its public website, including known data flows, individual rights, and current limitations."

export const metadata: Metadata = legalMetadata({ title: "Privacy Policy", description, path: "/privacy" })

export default function PrivacyPage() {
  const lastUpdated = new Date(`${legalPublicationConfig.lastUpdated}T12:00:00Z`).toLocaleDateString("en-US", { dateStyle: "long", timeZone: "UTC" })
  return <LegalPage eyebrow="Legal document" title="Privacy Policy" description={description} lastUpdated={lastUpdated} sections={privacySections} />
}
