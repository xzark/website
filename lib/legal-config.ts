import type { Metadata } from "next"

export const legalPublicationConfig = {
  lastUpdated: "2026-11-15",
  legalEntityName: "[LEGAL_ENTITY_NAME]",
  companyRegistrationNumber: "[COMPANY_REGISTRATION_NUMBER]",
  registeredAddress: "[REGISTERED_ADDRESS]",
  countryOfIncorporation: "[COUNTRY_OF_INCORPORATION]",
  legalContactEmail: "[LEGAL_CONTACT_EMAIL]",
  privacyContactEmail: "[PRIVACY_CONTACT_EMAIL]",
  dataProtectionOfficer: "[DATA_PROTECTION_OFFICER]",
  governingLaw: "[GOVERNING_LAW]",
} as const

export const pendingLegalPublicationDetails = [
  { field: "LEGAL_ENTITY_NAME", reason: "Confirm the legal entity responsible for xZark." },
  { field: "COMPANY_REGISTRATION_NUMBER", reason: "Confirm the applicable company registration or tax identifier." },
  { field: "REGISTERED_ADDRESS", reason: "Confirm the registered office address." },
  { field: "COUNTRY_OF_INCORPORATION", reason: "Confirm the place of incorporation and relevant establishment." },
  { field: "LEGAL_CONTACT_EMAIL", reason: "Confirm a monitored legal-notice contact." },
  { field: "PRIVACY_CONTACT_EMAIL", reason: "Confirm a monitored privacy-rights contact and request process." },
  { field: "DATA_PROTECTION_OFFICER", reason: "Determine whether an officer or representative must be identified and confirm their details." },
  { field: "GOVERNING_LAW", reason: "Obtain legal advice and confirm applicable law and jurisdiction without limiting mandatory rights." },
  { field: "DATA_RETENTION_AND_RECIPIENTS", reason: "Verify actual retention schedules, hosting/analytics roles, any careers API recipient, subprocessors, and processing locations." },
  { field: "POLICY_REVIEW", reason: "Validate the published policy against actual operations and obtain qualified legal review before launch." },
] as const

export function legalMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index: false, follow: true },
    openGraph: { type: "article", locale: "en_US", url: `https://xzark.co${path}`, siteName: "xZark", title: `${title} — xZark`, description },
  }
}
