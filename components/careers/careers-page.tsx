"use client"

import { useMemo, useState, type ReactNode } from "react"
import { ArrowLeft, ArrowUpRight, Check, ChevronRight, FileText, Search, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { careerTracks, culturePrinciples, jobOpenings, type JobOpening } from "@/lib/careers"
import { validateApplication, validatePdf, type FormIssue } from "@/lib/validation/forms"

type Filters = { department: string; location: string; model: string }

const emptyFilters: Filters = { department: "Todas", location: "Todas", model: "Todos" }

export function CareersPage() {
  const [filters, setFilters] = useState<Filters>(emptyFilters)
  const [query, setQuery] = useState("")
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null)
  const [applicationJob, setApplicationJob] = useState<JobOpening | null>(null)

  const filteredJobs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return jobOpenings.filter((job) => {
      const matchesQuery = !normalizedQuery || [job.title, job.department, job.location, job.summary, ...job.requirements]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
      return matchesQuery &&
        (filters.department === "Todas" || job.department === filters.department) &&
        (filters.location === "Todas" || job.location === filters.location) &&
        (filters.model === "Todos" || job.model === filters.model)
    })
  }, [filters, query])

  const hasFilters = Boolean(query.trim()) || Object.values(filters).some((value) => value !== "Todas" && value !== "Todos")

  function clearFilters() {
    setQuery("")
    setFilters(emptyFilters)
  }

  return (
    <main>
      <section className="relative overflow-hidden border-b border-border/60 py-20 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.25)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.25)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-primary">Careers at xZark</p>
          <div className="mt-6 grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <h1 className="max-w-4xl text-balance text-5xl font-light tracking-[-0.04em] text-foreground sm:text-6xl md:text-7xl">Construa a próxima camada de <span className="font-serif italic text-primary">confiança</span>.</h1>
              <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">Trabalhe em sistemas onde segurança é um requisito, não uma etapa posterior. Estamos construindo infraestrutura de segurança e privacidade para empresas modernas.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90"><a href="#openings">Ver vagas abertas <ArrowUpRight className="ml-2 size-4" /></a></Button>
                <Button asChild variant="outline" className="rounded-md"><a href="#culture">Nossa cultura</a></Button>
              </div>
            </div>
            <div className="border-l border-border/70 pl-5 md:col-span-4 md:mb-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Como trabalhamos</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">Equipe pequena, problemas difíceis, comunicação direta e espaço para fazer um trabalho cuidadoso.</p>
              <div className="mt-5 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                <span className="border border-border/80 px-2 py-1">Remote-first</span><span className="border border-border/80 px-2 py-1">Engineering-driven</span><span className="border border-border/80 px-2 py-1">Global</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="culture" className="border-b border-border/60 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4"><p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-primary">Princípios</p><h2 className="mt-4 text-3xl font-light tracking-tight">Cultura sem <span className="font-serif italic">teatro</span>.</h2></div>
            <div className="grid gap-px overflow-hidden border border-border/70 bg-border/70 md:col-span-8 md:grid-cols-2">
              {culturePrinciples.map((principle) => <article key={principle.label} className="bg-background p-6"><h3 className="text-sm font-medium">{principle.label}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{principle.description}</p></article>)}
            </div>
          </div>
        </div>
      </section>

      <section id="openings" className="scroll-mt-8 border-b border-border/60 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-primary">Oportunidades</p><h2 className="mt-4 text-3xl font-light tracking-tight">Vagas <span className="font-serif italic">abertas</span>.</h2></div><p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Explore as posições disponíveis e veja o estado atual de cada oportunidade.</p></div>
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-end">
            <label className="block flex-1"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Buscar posições</span><span className="relative block"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cargo, tecnologia ou palavra-chave..." className="h-10 pl-9" /></span></label>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:pb-2">{filteredJobs.length} {filteredJobs.length === 1 ? "posição" : "posições"}</p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <Filter label="Área" value={filters.department} options={["Todas", "Engineering", "Security", "Infrastructure"]} onChange={(value) => setFilters({ ...filters, department: value })} />
            <Filter label="Localização" value={filters.location} options={["Todas", "Global / Americas"]} onChange={(value) => setFilters({ ...filters, location: value })} />
            <Filter label="Modelo" value={filters.model} options={["Todos", "Remoto", "Híbrido", "Presencial"]} onChange={(value) => setFilters({ ...filters, model: value })} />
          </div>
          <div className="mt-6 space-y-3">{filteredJobs.length ? filteredJobs.map((job) => <JobCard key={job.slug} job={job} onOpen={() => setSelectedJob(job)} />) : <EmptyJobs hasFilters={hasFilters} onClear={clearFilters} />}</div>
        </div>
      </section>

      <section className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-4 md:grid-cols-3">{careerTracks.map(({ label, icon: Icon }) => <div key={label} className="flex items-center gap-4 border border-border/70 bg-card/30 p-5"><Icon className="size-5 text-primary" /><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Trilha</p><p className="mt-1 text-sm">{label}</p></div></div>)}</div></div></section>

      {selectedJob && <JobDetail job={selectedJob} onClose={() => setSelectedJob(null)} onApply={() => { setApplicationJob(selectedJob); setSelectedJob(null) }} />}
      {applicationJob && <ApplicationModal job={applicationJob} onClose={() => setApplicationJob(null)} />}
    </main>
  )
}

function Filter({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="h-10 w-full rounded-md border border-border/80 bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60">{options.map((option) => <option key={option}>{option}</option>)}</select></label>
}

function JobCard({ job, onOpen }: { job: JobOpening; onOpen: () => void }) {
  const Icon = job.icon
  return <button type="button" onClick={onOpen} className="group grid w-full gap-5 border border-border/70 bg-card/30 p-5 text-left transition-colors hover:border-primary/50 md:grid-cols-[auto_1fr_auto] md:items-center"><div className="flex size-10 items-center justify-center border border-border/80 bg-background"><Icon className="size-4 text-primary" /></div><div><div className="flex flex-wrap items-center gap-2"><h3 className="text-base font-medium">{job.title}</h3><span className={job.status === "open" ? "font-mono text-[9px] uppercase tracking-[0.15em] text-success" : "font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground"}>{job.status === "open" ? "Aberta" : "Encerrada"}</span></div><p className="mt-1 text-sm text-muted-foreground">{job.summary}</p><div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"><span>{job.department}</span><span>{job.location}</span><span>{job.model}</span></div></div><ChevronRight className="hidden size-4 text-muted-foreground transition-transform group-hover:translate-x-1 md:block" /></button>
}

function EmptyJobs({ hasFilters, onClear }: { hasFilters: boolean; onClear: () => void }) { return <div className="border border-dashed border-border/80 p-10 text-center"><X className="mx-auto size-5 text-muted-foreground" /><h3 className="mt-4 text-base">{hasFilters ? "Nenhuma posição encontrada" : "Nenhuma vaga aberta agora"}</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{hasFilters ? "Tente ajustar sua busca ou seus filtros." : "Enquanto não há posições nesta área, volte em outro momento para acompanhar novas oportunidades."}</p>{hasFilters && <Button variant="outline" size="sm" onClick={onClear} className="mt-5 rounded-md">Limpar filtros</Button>}</div> }

function JobDetail({ job, onClose, onApply }: { job: JobOpening; onClose: () => void; onApply: () => void }) {
  return <div className="fixed inset-0 z-[60] overflow-y-auto bg-background/90 px-4 py-8 backdrop-blur-md"><div className="mx-auto max-w-3xl border border-border/80 bg-card p-6 shadow-2xl md:p-10"><button type="button" onClick={onClose} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3" /> Voltar às vagas</button><div className="mt-10"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Careers / {job.department} / {job.title}</p><span className="mt-5 block font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{job.department} · {job.model}</span><h2 className="mt-3 text-3xl font-light tracking-tight md:text-4xl">{job.title}</h2><p className="mt-4 text-base leading-relaxed text-muted-foreground">{job.description}</p><div className="mt-6 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"><span className="border border-border px-2 py-1">{job.location}</span><span className="border border-border px-2 py-1">{job.type}</span></div></div><div className="mt-10 grid gap-8 md:grid-cols-2"><DetailList title="About the role" items={[job.description]} /><DetailList title="What you’ll do" items={job.responsibilities} /><DetailList title="What we’re looking for" items={job.requirements} /><DetailList title="Nice to have" items={job.niceToHave} /></div><div className="mt-10 border border-border/70 bg-background/40 p-5"><h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Você pode se identificar se...</h3><ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2"><li>• gosta de resolver problemas técnicos complexos;</li><li>• trata segurança como padrão de projeto;</li><li>• assume responsabilidade de ponta a ponta;</li><li>• trabalha bem em ambientes remotos.</li></ul></div>{job.status === "open" ? <Button onClick={onApply} className="mt-10 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">Apply for this position <ArrowUpRight className="ml-2 size-4" /></Button> : <p className="mt-10 border border-border p-4 text-sm text-muted-foreground"><strong className="font-medium text-foreground">Position closed.</strong> Esta vaga não está mais aceitando candidaturas. <button type="button" onClick={onClose} className="ml-1 underline underline-offset-4 hover:text-foreground">Ver outras posições</button></p>}</div></div>
}

function DetailList({ title, items }: { title: string; items: string[] }) { return <div><h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">{title}</h3><ul className="mt-4 space-y-3">{items.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />{item}</li>)}</ul></div> }

function ApplicationModal({ job, onClose }: { job: JobOpening; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)
  const [consent, setConsent] = useState(false)
  const [fileName, setFileName] = useState("")
  const [fileIssue, setFileIssue] = useState("")
  const [issues, setIssues] = useState<FormIssue[]>([])
  if (submitted) return <div className="fixed inset-0 z-[70] grid place-items-center bg-background/95 px-4"><div className="w-full max-w-md border border-border/80 bg-card p-8 text-center"><div className="mx-auto flex size-12 items-center justify-center border border-primary/40 bg-primary/10"><Check className="size-5 text-primary" /></div><p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Validação concluída</p><h2 className="mt-3 text-2xl font-light">Obrigado por se candidatar.</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Os dados foram validados localmente para <span className="text-foreground">{job.title}</span>. O material será avaliado conforme o processo seletivo avançar.</p><Button onClick={onClose} variant="outline" className="mt-7 rounded-md">Fechar</Button></div></div>
  return <div className="fixed inset-0 z-[70] overflow-y-auto bg-background/95 px-4 py-8 backdrop-blur-md"><div className="mx-auto max-w-2xl border border-border/80 bg-card p-6 md:p-10"><div className="flex items-start justify-between gap-4"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Apply now</p><h2 className="mt-3 text-2xl font-light">{job.title}</h2></div><button type="button" onClick={onClose} aria-label="Fechar candidatura" className="text-muted-foreground hover:text-foreground"><X className="size-5" /></button></div><form onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const nextIssues = validateApplication({ name: String(form.get("name") ?? ""), email: String(form.get("email") ?? ""), phone: String(form.get("phone") ?? ""), location: String(form.get("location") ?? ""), linkedin: String(form.get("linkedin") ?? ""), portfolio: String(form.get("portfolio") ?? ""), availability: String(form.get("availability") ?? ""), message: String(form.get("message") ?? ""), consent }); setIssues(nextIssues); if (!fileName || fileIssue || nextIssues.length > 0) return; setSubmitted(true) }} className="mt-8 grid gap-5 md:grid-cols-2"><Field label="Nome" required><Input required name="name" placeholder="Seu nome" /></Field><Field label="E-mail" required><Input required type="email" name="email" placeholder="voce@exemplo.com" /></Field><Field label="Telefone"><Input name="phone" placeholder="+55 00 00000-0000" /></Field><Field label="Localização" required><Input required name="location" placeholder="Cidade, país" /></Field><Field label="LinkedIn"><Input name="linkedin" type="url" placeholder="https://linkedin.com/in/..." /></Field><Field label="GitHub / portfólio"><Input name="portfolio" type="url" placeholder="https://..." /></Field><Field label="Disponibilidade" required><Input required name="availability" placeholder="Quando você poderia começar?" /></Field><Field label="Currículo em PDF" required><label className="flex h-9 cursor-pointer items-center gap-2 rounded-md border border-input px-3 text-sm text-muted-foreground hover:border-primary/60"><Upload className="size-3.5" />{fileName || "Selecionar arquivo"}<input required type="file" accept="application/pdf" className="sr-only" onChange={(event) => {
          const file = event.target.files?.[0] ?? null
          const fileIssue = validatePdf(file)
          setFileIssue(fileIssue ?? "")
          setFileName(fileIssue ? "" : file?.name ?? "")
        }} /></label>{fileIssue && <span role="alert" className="mt-2 block text-xs text-destructive">{fileIssue}</span>}</Field><Field label="Apresentação / mensagem" className="md:col-span-2"><Textarea name="message" placeholder="Conte brevemente sobre seu trabalho e o que gostaria de construir." className="min-h-28" /></Field><label className="flex gap-3 md:col-span-2"><Checkbox checked={consent} onCheckedChange={(checked) => setConsent(checked === true)} /><span className="text-xs leading-relaxed text-muted-foreground">Autorizo o tratamento dos dados desta candidatura exclusivamente para fins de recrutamento e seleção.</span></label>{issues.length > 0 && <p role="alert" className="text-sm text-destructive md:col-span-2">{issues[0].message}</p>}<Button type="submit" disabled={!consent || !fileName || Boolean(fileIssue)} className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90 md:col-span-2">Enviar candidatura <ArrowUpRight className="ml-2 size-4" /></Button></form><div className="mt-6 flex items-start gap-2 border-t border-border/60 pt-5 text-[11px] leading-relaxed text-muted-foreground"><FileText className="mt-0.5 size-3.5 shrink-0" />O formulário é demonstrativo nesta fase. O envio será conectado a um backend de recrutamento em uma próxima etapa.</div></div></div>
}

function Field({ label, required, children, className = "" }: { label: string; required?: boolean; children: ReactNode; className?: string }) { return <label className={`block ${className}`}><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}{required ? " *" : ""}</span>{children}</label> }
