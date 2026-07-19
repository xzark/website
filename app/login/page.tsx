import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ShieldCheck, Lock, Fingerprint } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { Logo } from "@/components/site/logo"
import { GridBackground } from "@/components/site/grid-background"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Entrar",
  description: "Acesse o console da plataforma xZark.",
  robots: { index: false, follow: false },
}

const HIGHLIGHTS = [
  { icon: Fingerprint, label: "Autenticação zero-trust com MFA adaptativo" },
  { icon: Lock, label: "Sessões assinadas e cookies HttpOnly" },
  { icon: ShieldCheck, label: "SOC 2 Type II · ISO 27001 · LGPD" },
] as const

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>
}) {
  const { from } = await searchParams

  // Já autenticado? Vai direto para o destino ou dashboard.
  const user = await getCurrentUser()
  if (user) {
    const dest = from && from.startsWith("/") && !from.startsWith("//") ? from : "/dashboard"
    redirect(dest)
  }

  return (
    <main className="relative flex min-h-screen flex-col lg:flex-row">
      {/* Painel de marca — esquerda (desktop) */}
      <aside className="relative hidden overflow-hidden border-r border-border/60 lg:flex lg:w-1/2 lg:flex-col lg:justify-between lg:p-12">
        <GridBackground />
        <div className="relative z-10">
          <Logo />
        </div>

        <div className="relative z-10 flex flex-col gap-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              Console seguro
            </p>
            <h1 className="mt-4 text-balance font-serif text-4xl font-light leading-tight tracking-tight xl:text-5xl">
              Infraestrutura de <span className="italic text-primary">segurança</span> que não tolera falhas.
            </h1>
            <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Autentique-se para operar autenticação, cofre de segredos, gateway e observabilidade
              em uma única plataforma soberana.
            </p>
          </div>

          <ul className="flex flex-col gap-3">
            {HIGHLIGHTS.map((h) => {
              const Icon = h.icon
              return (
                <li key={h.label} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex size-8 items-center justify-center rounded-md border border-border/60 bg-card/40">
                    <Icon className="size-4 text-primary" strokeWidth={1.5} />
                  </span>
                  {h.label}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
          xzark.co · sa-east-1 · TLS 1.3
        </div>
      </aside>

      {/* Formulário — direita */}
      <section className="relative flex flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col gap-2 lg:hidden">
            <Logo />
          </div>

          <div className="mb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Acesso ao console
            </p>
            <h2 className="mt-2 font-serif text-3xl font-light tracking-tight">
              Bem-vindo de <span className="italic text-primary">volta</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Entre com suas credenciais para continuar.
            </p>
          </div>

          <LoginForm from={from} />

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Não tem acesso?{" "}
            <Link href="/contact" className="text-primary transition-colors hover:text-primary/80">
              Fale com nosso time
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
