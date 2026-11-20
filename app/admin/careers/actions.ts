"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/careers/login")
  const { data: admin } = await supabase.from("admin_users").select("role").eq("user_id", user.id).maybeSingle()
  if (!admin) redirect("/admin/careers/login?error=unauthorized")
  return supabase
}

export async function signInAction(formData: FormData) {
  const supabase = await createClient()
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  if (!email || !password) redirect("/admin/careers/login?error=invalid")
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) redirect("/admin/careers/login?error=invalid")
  const { data: { user } } = await supabase.auth.getUser()
  const { data: admin } = user ? await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle() : { data: null }
  if (!admin) {
    await supabase.auth.signOut()
    redirect("/admin/careers/login?error=unauthorized")
  }
  redirect("/admin/careers")
}

export async function signOutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/admin/careers/login")
}

export async function saveJobAction(formData: FormData) {
  const supabase = await requireAdmin()
  const asList = (key: string) => String(formData.get(key) ?? "").split("\n").map((line) => line.trim()).filter(Boolean)
  const title = String(formData.get("title") ?? "").trim()
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase()
  const status = String(formData.get("status") ?? "draft")
  if (!title || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !["draft", "open", "paused", "closed"].includes(status)) return
  const payload = {
    title, slug, department: String(formData.get("department") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    work_model: String(formData.get("work_model") ?? "Remote"),
    employment_type: String(formData.get("employment_type") ?? "Full-time"),
    seniority: String(formData.get("seniority") ?? "Mid-level"),
    summary: String(formData.get("summary") ?? "").trim(), description: String(formData.get("description") ?? "").trim(),
    responsibilities: asList("responsibilities"), requirements: asList("requirements"), nice_to_have: asList("nice_to_have"), benefits: asList("benefits"), process: asList("process"), status,
    published_at: status === "open" ? new Date().toISOString() : null,
    closed_at: status === "closed" ? new Date().toISOString() : null,
  }
  const id = String(formData.get("id") ?? "")
  if (id) await supabase.from("jobs").update(payload).eq("id", id)
  else await supabase.from("jobs").insert(payload)
  revalidatePath("/careers")
  revalidatePath("/admin/careers")
}

export async function updateApplicationStatusAction(formData: FormData) {
  const supabase = await requireAdmin()
  const id = String(formData.get("id") ?? "")
  const status = String(formData.get("status") ?? "")
  const note = String(formData.get("note") ?? "").slice(0, 1000)
  const { error } = await supabase.rpc("update_careers_application_status", { p_application_id: id, p_new_status: status, p_note: note || null })
  if (error) throw new Error("Não foi possível atualizar o status da candidatura.")
  revalidatePath("/admin/careers")
  revalidatePath(`/admin/careers/applications/${id}`)
}
