"use client"

/**
 * ContactForm — formulário de contato controlado, sem backend.
 * Submissão simulada apenas para feedback visual; integração real
 * deve ser plugada em Server Action no momento do deploy.
 */
import { useState } from "react"
import { Check, Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Status = "idle" | "loading" | "success"

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [topic, setTopic] = useState<string>("commercial")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    // Simula envio — em produção, integrar com API protegida + rate limit.
    await new Promise((r) => setTimeout(r, 900))
    setStatus("success")
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-lg border border-success/30 bg-success/5 p-6">
        <div className="inline-flex size-10 items-center justify-center rounded-full border border-success/40 bg-success/10">
          <Check className="size-5 text-success" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Mensagem recebida.</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Um engenheiro do time correspondente responderá em até 24h úteis.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setStatus("idle")}
          className="border border-border/80"
        >
          Enviar nova mensagem
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="name" label="Nome">
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Maria Silva"
            className="h-10 bg-background/60"
          />
        </Field>
        <Field id="email" label="Email corporativo">
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="maria@empresa.com"
            className="h-10 bg-background/60"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="company" label="Empresa">
          <Input
            id="company"
            name="company"
            required
            autoComplete="organization"
            placeholder="Nome da empresa"
            className="h-10 bg-background/60"
          />
        </Field>
        <Field id="topic" label="Assunto">
          <Select value={topic} onValueChange={setTopic} name="topic">
            <SelectTrigger id="topic" className="h-10 bg-background/60">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="commercial">Comercial / POC</SelectItem>
              <SelectItem value="security">Reporte de segurança</SelectItem>
              <SelectItem value="support">Suporte técnico</SelectItem>
              <SelectItem value="press">Imprensa</SelectItem>
              <SelectItem value="career">Carreiras</SelectItem>
              <SelectItem value="other">Outro</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field id="message" label="Mensagem">
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Conte sobre seu desafio de segurança, infraestrutura atual e o que está buscando."
          className="resize-y bg-background/60"
        />
      </Field>

      <div className="flex items-start gap-2.5 pt-2">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 size-4 rounded border-border bg-background/60 text-primary focus:ring-primary/40"
        />
        <label htmlFor="consent" className="text-xs leading-relaxed text-muted-foreground">
          Concordo com a{" "}
          <a href="/privacy" className="text-foreground underline-offset-4 hover:underline">
            Política de Privacidade
          </a>{" "}
          e o tratamento dos meus dados conforme descrito.
        </label>
      </div>

      <div className="flex items-center justify-between gap-4 pt-2">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
          TLS 1.3 · ponta a ponta
        </p>
        <Button
          type="submit"
          disabled={status === "loading"}
          className="h-10 rounded-md bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/90 disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Enviando…
            </>
          ) : (
            <>
              Enviar mensagem
              <Send className="size-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  )
}
