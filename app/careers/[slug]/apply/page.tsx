import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ApplicationForm } from "@/components/careers/application-form"

export default async function ApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: job } = await supabase.from("jobs").select("id,slug,title,status").eq("slug", slug).maybeSingle()
  if (!job || job.status !== "open") notFound()
  return <ApplicationForm job={job}/>
}
