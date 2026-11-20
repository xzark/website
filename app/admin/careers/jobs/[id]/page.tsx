import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { saveJobAction } from "@/app/admin/careers/actions"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default async function EditJobPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)redirect("/admin/careers/login")
 const {data:admin}=await supabase.from("admin_users").select("user_id").eq("user_id",user.id).maybeSingle();if(!admin)redirect("/admin/careers/login?error=unauthorized")
 const {data:job}=await supabase.from("jobs").select("*").eq("id",id).maybeSingle();if(!job)notFound()
 const list=(items:string[])=>items.join("\n")
 return <main className="mx-auto max-w-3xl px-4 py-10"><Link href="/admin/careers" className="text-sm text-muted-foreground">← Painel Careers</Link><h1 className="mt-6 text-3xl font-light">Editar oportunidade</h1><form action={saveJobAction} className="mt-7 flex flex-col gap-4"><input type="hidden" name="id" value={job.id}/><Input name="title" required defaultValue={job.title}/><Input name="slug" required defaultValue={job.slug}/><div className="grid gap-3 sm:grid-cols-2"><Input name="department" required defaultValue={job.department}/><Input name="location" required defaultValue={job.location}/></div><div className="grid gap-3 sm:grid-cols-2"><select name="work_model" defaultValue={job.work_model} className="h-9 rounded-md border border-border bg-background px-3 text-sm"><option value="Remote">Remoto</option><option value="Hybrid">Híbrido</option><option value="On-site">Presencial</option></select><Input name="employment_type" required defaultValue={job.employment_type}/></div><Input name="seniority" required defaultValue={job.seniority}/><Input name="summary" required defaultValue={job.summary}/><Textarea name="description" required defaultValue={job.description}/><Textarea name="responsibilities" defaultValue={list(job.responsibilities)}/><Textarea name="requirements" defaultValue={list(job.requirements)}/><Textarea name="nice_to_have" defaultValue={list(job.nice_to_have)}/><Textarea name="benefits" defaultValue={list(job.benefits)}/><Textarea name="process" defaultValue={list(job.process)}/><select name="status" defaultValue={job.status} className="h-9 rounded-md border border-border bg-background px-3 text-sm"><option value="draft">Rascunho</option><option value="open">Aberta / publicada</option><option value="paused">Pausada</option><option value="closed">Encerrada</option></select><Button type="submit">Salvar alterações</Button></form></main>
}
