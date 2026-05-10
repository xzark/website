"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Activity,
  Cloud,
  Fingerprint,
  KeyRound,
  LayoutDashboard,
  Network,
  Settings,
  Shield,
  Terminal,
  Users,
} from "lucide-react"
import { Logo } from "@/components/site/logo"

const nav = [
  {
    label: "Operações",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Ameaças", href: "/admin/threats", icon: Shield },
      { label: "Atividade", href: "/admin/activity", icon: Activity },
    ],
  },
  {
    label: "Identidade",
    items: [
      { label: "Usuários", href: "/admin/users", icon: Users },
      { label: "Sessões", href: "/admin/sessions", icon: Fingerprint },
      { label: "Cofre", href: "/admin/vault", icon: KeyRound },
    ],
  },
  {
    label: "Infraestrutura",
    items: [
      { label: "Cloud", href: "/admin/cloud", icon: Cloud },
      { label: "Rede", href: "/admin/network", icon: Network },
      { label: "Logs", href: "/admin/logs", icon: Terminal },
    ],
  },
  {
    label: "Sistema",
    items: [{ label: "Configurações", href: "/admin/settings", icon: Settings }],
  },
] as const

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border/60 bg-card/40 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-3 border-b border-border/60 px-5">
        <Logo size="sm" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          / SOC
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <div className="flex flex-col gap-6">
          {nav.map((group) => (
            <div key={group.label}>
              <div className="px-3 pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                {group.label}
              </div>
              <ul className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const active =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-card/60 hover:text-foreground",
                        )}
                      >
                        <Icon className="size-4" strokeWidth={1.5} />
                        <span>{item.label}</span>
                        {active && (
                          <span className="ml-auto size-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      <div className="border-t border-border/60 p-4">
        <div className="rounded-md border border-border/60 bg-card/60 p-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-success shadow-[0_0_8px_var(--success)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Sistemas operacionais
            </span>
          </div>
          <p className="mt-2 font-mono text-xs text-foreground/80">All green · 99.999%</p>
        </div>
      </div>
    </aside>
  )
}
