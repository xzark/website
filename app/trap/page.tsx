/**
 * Honeypot Trap — rota de armadilha.
 *
 * Acessada via rewrite do middleware quando um caminho conhecido de scanner
 * é solicitado (/wp-admin, /.env, etc.). Não é linkada em lugar nenhum.
 *
 * Estratégia:
 *  - Atrasa intencionalmente a resposta (tarpit) para desperdiçar tempo do bot.
 *  - Retorna conteúdo neutro que parece legítimo a um scanner ingênuo.
 *  - Aceita análise de requisição via header x-trap-hit no backend Go (logging).
 *
 * Observação: nada de sensível é renderizado nem importado aqui.
 */
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
  description: "Authentication required.",
  robots: { index: false, follow: false, nocache: true },
}

// Tarpit leve: força um delay de ~750ms antes de responder.
async function tarpitDelay() {
  await new Promise((r) => setTimeout(r, 750))
}

export default async function TrapPage() {
  await tarpitDelay()
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-md border border-border/60 bg-card/40 p-6 backdrop-blur">
        <h1 className="mb-4 text-center text-sm font-medium text-foreground">
          Sign in
        </h1>
        <form
          action="/trap"
          method="post"
          className="flex flex-col gap-3"
          aria-label="login"
        >
          <input
            type="text"
            name="user"
            placeholder="Username"
            autoComplete="off"
            className="rounded border border-border/60 bg-background/50 px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
          />
          <input
            type="password"
            name="pass"
            placeholder="Password"
            autoComplete="off"
            className="rounded border border-border/60 bg-background/50 px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
          />
          <button
            type="submit"
            className="rounded bg-foreground/90 px-3 py-2 text-sm font-medium text-background"
          >
            Sign in
          </button>
        </form>
        <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-muted-foreground/60">
          v1.0
        </p>
      </div>
    </main>
  )
}
