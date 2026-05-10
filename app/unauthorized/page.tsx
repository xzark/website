/**
 * Página /unauthorized — exibida quando o middleware bloqueia acesso.
 *
 * Mostra um motivo genérico (não vaza informação sobre o estado do sistema)
 * e oferece caminhos de retorno para o usuário legítimo.
 */
import Link from "next/link"
import { Lock, ArrowLeft, ShieldX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GridBackground } from "@/components/site/grid-background"

interface UnauthorizedPageProps {
  searchParams: Promise<{ reason?: string; from?: string }>
}

const reasonCopy: Record<string, { title: string; body: string }> = {
  role: {
    title: "Permissão insuficiente",
    body: "Sua conta está autenticada, mas não possui o nível de acesso necessário para esta área. Solicite o papel adequado ao administrador da sua organização.",
  },
  default: {
    title: "Acesso restrito",
    body: "Esta área requer autenticação ativa. Você foi redirecionado por proteção de rota — entre com sua conta para continuar.",
  },
}

export default async function UnauthorizedPage({
  searchParams,
}: UnauthorizedPageProps) {
  const { reason } = await searchParams
  const copy = reasonCopy[reason ?? ""] ?? reasonCopy.default
  const Icon = reason === "role" ? ShieldX : Lock

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-4 py-24">
      <GridBackground />
      <div className="relative z-10 flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex size-14 items-center justify-center rounded-full border border-border/60 bg-card/40">
          <Icon className="size-6 text-primary" />
        </div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          401 / 403
        </p>
        <h1 className="mb-3 text-balance font-serif text-3xl italic text-foreground">
          {copy.title}
        </h1>
        <p className="mb-8 text-pretty text-sm leading-relaxed text-muted-foreground">
          {copy.body}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="outline" className="h-9 text-[13px]">
            <Link href="/">
              <ArrowLeft className="size-3.5" />
              Voltar ao início
            </Link>
          </Button>
          <Button
            asChild
            className="h-9 bg-foreground text-[13px] text-background hover:bg-foreground/90"
          >
            <Link href="/contact">Solicitar acesso</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
