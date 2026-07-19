"use client"

/**
 * HeaderAuth — bloco de ações de sessão no header do site.
 *
 * Alterna entre "Entrar" (deslogado) e menu do usuário com atalho para o
 * dashboard e logout (logado). Mantém o header desacoplado de RSC via SWR.
 */
import Link from "next/link"
import { useTransition } from "react"
import { ChevronDown, LayoutDashboard, LogOut, Shield } from "lucide-react"
import { logoutAction } from "@/lib/auth/actions"
import { useSession } from "@/lib/auth/use-session"
import { ROLE_LABEL } from "@/lib/auth/types"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function HeaderAuth() {
  const { user, isLoading } = useSession()
  const [isPending, startTransition] = useTransition()

  if (isLoading) {
    return <div className="h-8 w-20 animate-pulse rounded-md bg-card/60" aria-hidden />
  }

  if (!user) {
    return (
      <Button
        asChild
        size="sm"
        className="h-8 rounded-md bg-foreground text-[13px] font-medium text-background hover:bg-foreground/90"
      >
        <Link href="/login">Entrar</Link>
      </Button>
    )
  }

  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-md border border-border/60 bg-card/40 py-1 pl-1 pr-2 transition-colors hover:border-primary/40"
          aria-label="Menu do usuário"
        >
          <span className="flex size-6 items-center justify-center rounded bg-primary/10 font-mono text-[11px] text-primary">
            {initials}
          </span>
          <span className="hidden max-w-24 truncate text-[13px] text-foreground sm:inline">
            {user.name}
          </span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col gap-1">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="font-mono text-[11px] font-normal text-muted-foreground">
            {user.email}
          </span>
          <span className="mt-1 inline-flex w-fit items-center gap-1 rounded border border-border/60 bg-background/60 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
            {ROLE_LABEL[user.role]}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer gap-2">
            <LayoutDashboard className="size-4" strokeWidth={1.5} />
            Dashboard
          </Link>
        </DropdownMenuItem>
        {user.role === "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/admin" className="cursor-pointer gap-2">
              <Shield className="size-4" strokeWidth={1.5} />
              Console SOC
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer gap-2 text-destructive focus:text-destructive"
          disabled={isPending}
          onSelect={(e) => {
            e.preventDefault()
            startTransition(() => {
              void logoutAction()
            })
          }}
        >
          <LogOut className="size-4" strokeWidth={1.5} />
          {isPending ? "Saindo..." : "Sair"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
