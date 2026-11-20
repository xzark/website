import { createHash, randomUUID } from "node:crypto"
import { NextResponse, type NextRequest } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"

export const runtime = "nodejs"
const MAX_FILE_BYTES = 10 * 1024 * 1024
const text = (form: FormData, key: string, max = 4000) => String(form.get(key) ?? "").trim().slice(0, max)
const validUrl = (value: string) => !value || (value.length <= 500 && /^https:\/\//i.test(value))

export async function POST(request: NextRequest) {
  const length = Number(request.headers.get("content-length") ?? 0)
  if (length > MAX_FILE_BYTES + 100_000) return NextResponse.json({ error: "O currículo excede o limite de 10 MB." }, { status: 413 })
  const form = await request.formData()
  if (text(form, "website", 200)) return NextResponse.json({ error: "Não foi possível processar a candidatura." }, { status: 400 })
  const file = form.get("cv")
  if (!(file instanceof File) || file.size <= 0 || file.size > MAX_FILE_BYTES || !file.name.toLowerCase().endsWith(".pdf") || file.type !== "application/pdf") {
    return NextResponse.json({ error: "Anexe um currículo PDF de até 10 MB." }, { status: 415 })
  }
  const bytes = Buffer.from(await file.arrayBuffer())
  if (bytes.subarray(0, 5).toString() !== "%PDF-") return NextResponse.json({ error: "O arquivo enviado não é um PDF válido." }, { status: 415 })
  const jobId = text(form, "jobId", 36)
  const fields = {
    p_full_name: text(form, "fullName", 150), p_email: text(form, "email", 254).toLowerCase(),
    p_phone: text(form, "phone", 40), p_country: text(form, "country", 100), p_city: text(form, "city", 120),
    p_current_title: text(form, "currentTitle", 150), p_experience: text(form, "experience", 4000),
    p_linkedin: text(form, "linkedin", 500), p_github: text(form, "github", 500), p_portfolio: text(form, "portfolio", 500),
    p_motivation: text(form, "motivation", 4000), p_job_experience: text(form, "jobExperience", 4000),
    p_availability: text(form, "availability", 120), p_file_name: file.name,
  }
  if (!jobId || Object.values(fields).some((value) => !value) || form.get("consent") !== "true" || !validUrl(fields.p_linkedin) || !validUrl(fields.p_github) || !validUrl(fields.p_portfolio)) {
    return NextResponse.json({ error: "Revise os campos obrigatórios e os links informados." }, { status: 422 })
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  const fingerprint = createHash("sha256").update(`${ip}:${process.env.SUPABASE_JWT_SECRET ?? "careers"}`).digest("hex")
  const supabase = createServiceClient()
  const { data: allowed, error: limitError } = await supabase.rpc("consume_careers_submission_limit", { p_fingerprint: fingerprint })
  if (limitError || !allowed) return NextResponse.json({ error: "Muitas tentativas. Tente novamente mais tarde." }, { status: 429 })
  const path = `incoming/${randomUUID()}.pdf`
  const { error: uploadError } = await supabase.storage.from("careers-private").upload(path, bytes, { contentType: "application/pdf", upsert: false })
  if (uploadError) return NextResponse.json({ error: "Não foi possível armazenar o currículo. Tente novamente." }, { status: 503 })
  const { data, error } = await supabase.rpc("submit_careers_application", {
    p_job_id: jobId, ...fields, p_storage_path: path, p_size_bytes: file.size,
  })
  if (error || !data?.[0]) {
    await supabase.storage.from("careers-private").remove([path])
    const duplicate = error?.code === "23505"
    return NextResponse.json({ error: duplicate ? "Já existe uma candidatura com este e-mail para esta vaga." : "Não foi possível registrar a candidatura." }, { status: duplicate ? 409 : 400 })
  }
  return NextResponse.json({ protocol: data[0].protocol, createdAt: data[0].created_at, jobId }, { status: 201 })
}
