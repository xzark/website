import type { Metadata } from "next"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { CareersPage } from "@/components/careers/careers-page"

export const metadata: Metadata = {
  title: "Careers — Join xZark",
  description: "Conheça a cultura, os princípios e as oportunidades abertas na xZark.",
}

export default function CareersRoute() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <CareersPage />
      <Footer />
    </>
  )
}
