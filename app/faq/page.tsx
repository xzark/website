import type { Metadata } from "next"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { PageHero } from "@/components/site/page-hero"
import { FaqContent } from "@/components/legal/faq-content"

const description = "Answers about xZark’s public website, cybersecurity research, privacy practices, and current availability."

export const metadata: Metadata = {
  title: "FAQ",
  description,
  alternates: { canonical: "/faq" },
  openGraph: { type: "website", locale: "en_US", url: "https://xzark.co/faq", siteName: "xZark", title: "FAQ — xZark", description },
}

export default function FAQPage() {
  return <><AnnouncementBar /><Header /><main lang="en"><PageHero eyebrow="Frequently asked questions" title={<>Clear answers. <span className="font-serif italic text-primary">No assumptions.</span></>} description={description} /><FaqContent /></main><Footer /></>
}
