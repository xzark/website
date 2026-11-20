"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Job = { id: string; slug: string; title: string; status: string }
export function ApplicationForm({ job }: { job: Job }) {
  const [busy,setBusy]=useState(false)
  const [error,setError]=useState("")
  const [result,setResult]=useState<{protocol:string;createdAt:string}|null>(null)
  const router=useRouter()
  async function submit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if(busy)return
    setBusy(true); setError("")
    const form=new FormData(event.currentTarget); form.set("jobId",job.id); form.set("consent",String(form.get("consent")==="on"))
    try {
      const response=await fetch("/api/careers/applications",{method:"POST",body:form})
      const body=await response.json()
      if(!response.ok)throw new Error(body.error ?? "Não foi possível enviar a candidatura.")
      setResult(body)
    } catch(caught) { setError(caught instanceof Error?caught.message:"Falha de conexão. Tente novamente.") }
    finally { setBusy(false) }
  }
  if(result)return <main className="mx-auto grid min-h-[70vh] max-w-xl place-items-center px-4 py-16"><section className="w-full border border-border bg-card p-8 text-center"><div className="mx-auto grid size-12 place-items-center border border-primary/40 bg-primary/10"><Check className="size-5 text-primary"/></div><p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Candidatura registrada</p><h1 className="mt-3 text-2xl font-light">Obrigado por se candidatar.</h1><p className="mt-4 text-sm text-muted-foreground">Sua candidatura para <strong className="text-foreground">{job.title}</strong> foi armazenada.</p><div className="mt-6 border border-border p-4"><span className="block font-mono text-[10px] uppercase text-muted-foreground">Protocolo</span><strong className="mt-1 block font-mono text-lg">{result.protocol}</strong><span className="mt-2 block text-xs text-muted-foreground">{new Date(result.createdAt).toLocaleString("pt-BR")}</span></div><p className="mt-5 text-xs leading-relaxed text-muted-foreground">A equipe de recrutamento avaliará seu perfil. Não envie outra candidatura para esta vaga usando o mesmo e-mail.</p><Button asChild variant="outline" className="mt-6"><Link href="/careers">Voltar às vagas</Link></Button></section></main>
  return <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6"><Link href={`/careers/${job.slug}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4"/>Voltar à vaga</Link><div className="mt-8"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Candidatura</p><h1 className="mt-3 text-3xl font-light">{job.title}</h1><p className="mt-3 text-sm text-muted-foreground">Campos com * são obrigatórios. Currículo em PDF, até 10 MB. Seus dados serão tratados conforme a <Link className="text-primary underline" href="/privacy">Política de Privacidade</Link>.</p></div>
    <form onSubmit={submit} className="mt-8 grid gap-5 sm:grid-cols-2">
      <Field label="Nome completo" required><Input name="fullName" required maxLength={150} autoComplete="name"/></Field><Field label="E-mail" required><Input name="email" type="email" required maxLength={254} autoComplete="email"/></Field>
      <Field label="Telefone com código internacional" required><Input name="phone" type="tel" required maxLength={40} placeholder="+55 11 99999-9999" autoComplete="tel"/></Field><Field label="País de residência" required><Input name="country" required maxLength={100} autoComplete="country-name"/></Field>
      <Field label="Cidade" required><Input name="city" required maxLength={120} autoComplete="address-level2"/></Field><Field label="Cargo atual" required><Input name="currentTitle" required maxLength={150}/></Field>
      <Field label="Experiência profissional" required wide><Textarea name="experience" required maxLength={4000} className="min-h-24" placeholder="Resumo do seu histórico profissional"/></Field>
      <Field label="LinkedIn"><Input name="linkedin" type="url" placeholder="https://..." maxLength={500}/></Field><Field label="GitHub"><Input name="github" type="url" placeholder="https://..." maxLength={500}/></Field><Field label="Portfólio ou website"><Input name="portfolio" type="url" placeholder="https://..." maxLength={500}/></Field><Field label="Disponibilidade para início" required><Input name="availability" required maxLength={120} placeholder="Ex.: em 30 dias"/></Field>
      <Field label="Por que deseja trabalhar na xZark?" required wide><Textarea name="motivation" required maxLength={4000} className="min-h-24"/></Field><Field label="Experiência relacionada a esta posição" required wide><Textarea name="jobExperience" required maxLength={4000} className="min-h-24"/></Field>
      <label className="flex cursor-pointer flex-col gap-2 sm:col-span-2"><span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Currículo PDF *</span><span className="flex items-center gap-3 border border-dashed border-border p-4 text-sm"><FileText className="size-4 text-primary"/><input name="cv" type="file" accept="application/pdf,.pdf" required className="min-w-0 flex-1 text-xs file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-foreground"/></span></label>
      <label className="flex items-start gap-3 sm:col-span-2"><input type="checkbox" name="consent" required className="mt-1 accent-primary"/><span className="text-xs leading-relaxed text-muted-foreground">Li e aceito a <Link href="/privacy" className="text-primary underline">Política de Privacidade</Link>. Autorizo o tratamento e armazenamento dos meus dados para fins de recrutamento. Posso solicitar acesso ou exclusão conforme a política de retenção.</span></label>
      <div className="absolute -left-[10000px] top-auto size-px overflow-hidden" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
      {error&&<p role="alert" className="text-sm text-destructive sm:col-span-2">{error}</p>}<Button type="submit" disabled={busy||job.status!=="open"} className="sm:col-span-2">{busy?"Enviando com segurança…":"Enviar candidatura"}</Button>
    </form></main>
}
function Field({label,required,wide,children}:{label:string;required?:boolean;wide?:boolean;children:React.ReactNode}){return <label className={`flex flex-col gap-2 ${wide?"sm:col-span-2":""}`}><span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}{required?" *":""}</span>{children}</label>}
