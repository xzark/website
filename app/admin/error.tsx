"use client"

/**
 * Admin Error Boundary — específico para o painel administrativo.
 * Mantém layout interno sem expor detalhes de infraestrutura.
 */
import { useEffect } from "react"
import { ServerCrash, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[v0] Admin error:", error)
    }
  }, [error])

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex size-12 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10">
          <ServerCrash className="size-5 text-red-400" />
        </div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Backend instável
        </p>
        <h2 className="mb-3 text-2xl font-medium text-foreground">
          Falha ao carregar dashboard
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          Não conseguimos sincronizar com o cluster operacional. Verifique sua
          conexão ou tente novamente em alguns segundos.
        </p>
        {error.digest && (
          <p className="mb-4 font-mono text-[11px] text-muted-foreground/60">
            ID: {error.digest}
          </p>
        )}
        <Button onClick={reset} variant="outline" className="h-9 text-[13px]">
          <RefreshCw className="size-3.5" />
          Reconectar
        </Button>
      </div>
    </div>
  )
}
