import type { Metadata } from "next"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { CareersPage } from "@/components/careers/careers-page"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Carreiras — Junte-se à xZark",
  description: "Conheça a cultura, os princípios e as oportunidades abertas na xZark.",
}

export default async function CareersRoute() {
  const supabase = await createClient()
  const { data } = await supabase.from("jobs").select("id,slug,title,department,location,work_model,employment_type,summary,published_at").eq("status", "open").not("published_at", "is", null).order("published_at", { ascending: false })
  return <><AnnouncementBar/><Header/><CareersPage jobs={data ?? []}/><Footer/></>
}
