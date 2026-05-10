"use client"

/**
 * Error Boundary — captura erros não tratados em rotas filhas.
 * Não expõe stack trace nem mensagem técnica ao usuário final.
 */
import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GridBackground } from "@/components/site/grid-background"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // TODO: integrar com xObserve (frontend telemetry) quando o backend Go estiver disponível.
    // sendErrorTelemetry({ digest: error.digest, route: window.location.pathname })
    if (process.env.NODE_ENV !== "production") {
      console.error("[v0] Error boundary:", error)
    }
  }, [error])

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-4">
      <GridBackground />
      <div className="relative z-10 flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex size-14 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
          <AlertTriangle className="size-6 text-amber-400" />
        </div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Erro interno
        </p>
        <h1 className="mb-3 text-balance font-serif text-3xl italic text-foreground">
          Algo inesperado aconteceu
        </h1>
        <p className="mb-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          Nossa equipe foi notificada automaticamente. Você pode tentar novamente
          ou voltar para a página inicial.
        </p>
        {error.digest && (
          <p className="mb-6 font-mono text-[11px] text-muted-foreground/60">
            Referência: {error.digest}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={reset} variant="outline" className="h-9 text-[13px]">
            <RotateCcw className="size-3.5" />
            Tentar novamente
          </Button>
          <Button
            asChild
            className="h-9 bg-foreground text-[13px] text-background hover:bg-foreground/90"
          >
            <Link href="/">Voltar ao início</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
