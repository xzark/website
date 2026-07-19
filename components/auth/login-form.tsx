"use client"

/**
 * LoginForm — formulário de autenticação.
 *
 * Validação client-side com react-hook-form + zod (mesmo schema do servidor).
 * O envio chama a server action `loginAction`, que valida novamente, cria a
 * sessão (cookie HttpOnly) e redireciona. Erros retornam como estado.
 */
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { ArrowRight, Loader2, Lock, Mail } from "lucide-react"
import { loginAction } from "@/lib/auth/actions"
import { loginSchema, type LoginInput } from "@/lib/auth/validation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/** Credenciais de demonstração — preenchimento rápido por papel. */
const DEMO_ACCOUNTS = [
  { role: "Admin", email: "admin@xzark.co" },
  { role: "Developer", email: "dev@xzark.co" },
  { role: "Viewer", email: "viewer@xzark.co" },
] as const

const DEMO_PASSWORD = "xzark2025"

export function LoginForm({ from }: { from?: string }) {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  function onSubmit(values: LoginInput) {
    const formData = new FormData()
    formData.set("email", values.email)
    formData.set("password", values.password)
    if (from) formData.set("from", from)

    startTransition(async () => {
      // Em caso de sucesso a action redireciona (NEXT_REDIRECT). Só retorna em erro.
      const result = await loginAction({ ok: false }, formData)
      if (result && !result.ok) {
        if (result.fieldErrors?.email) setError("email", { message: result.fieldErrors.email })
        if (result.fieldErrors?.password)
          setError("password", { message: result.fieldErrors.password })
        if (result.error) toast.error(result.error)
      }
    })
  }

  function fillDemo(email: string) {
    setValue("email", email, { shouldValidate: true })
    setValue("password", DEMO_PASSWORD, { shouldValidate: true })
    toast.info(`Credenciais de ${email} preenchidas.`)
  }

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            E-mail
          </Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="voce@empresa.com"
              className={cn(
                "h-11 border-border/60 bg-card/40 pl-9 text-sm",
                errors.email && "border-destructive/70",
              )}
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="font-mono text-[11px] text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              Senha
            </Label>
            <button
              type="button"
              className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-primary"
              onClick={() => toast.info("Contate o administrador para redefinir sua senha.")}
            >
              Esqueceu?
            </button>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className={cn(
                "h-11 border-border/60 bg-card/40 pl-9 text-sm",
                errors.password && "border-destructive/70",
              )}
              aria-invalid={Boolean(errors.password)}
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="font-mono text-[11px] text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="group mt-1 h-11 rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Autenticando...
            </>
          ) : (
            <>
              Entrar na plataforma
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </form>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-border/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
            Acesso de demonstração
          </span>
          <span className="h-px flex-1 bg-border/60" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {DEMO_ACCOUNTS.map((acc) => (
            <button
              key={acc.email}
              type="button"
              onClick={() => fillDemo(acc.email)}
              className="flex flex-col items-center gap-1 rounded-md border border-border/60 bg-card/40 px-2 py-3 text-center transition-colors hover:border-primary/40 hover:bg-card/70"
            >
              <span className="text-xs font-medium text-foreground">{acc.role}</span>
              <span className="font-mono text-[9px] text-muted-foreground">{acc.email}</span>
            </button>
          ))}
        </div>
        <p className="text-center font-mono text-[10px] text-muted-foreground/60">
          Senha para todas as contas: <span className="text-muted-foreground">{DEMO_PASSWORD}</span>
        </p>
      </div>
    </div>
  )
}
