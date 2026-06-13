"use client"

/**
 * Sidebar de navegação da documentação.
 * Persistente no desktop; colapsável no mobile via toggle.
 * Destaca a página ativa com base no pathname.
 */
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { docsNavigation, slugToHref } from "@/lib/docs/navigation"
import { cn } from "@/lib/utils"

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Navegação da documentação" className="space-y-7">
      {docsNavigation.map((group) => (
        <div key={group.label}>
          <p className="px-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
            {group.label}
          </p>
          <ul className="mt-3 space-y-0.5">
            {group.items.map((item) => {
              const href = slugToHref(item.slug)
              const active = pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-1.5 text-[13px] transition-colors",
                      active
                        ? "bg-accent/50 font-medium text-foreground"
                        : "text-muted-foreground hover:bg-accent/30 hover:text-foreground",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {active && (
                        <span
                          aria-hidden
                          className="size-1 rounded-full bg-primary"
                        />
                      )}
                      <span className={cn(!active && "pl-3")}>{item.title}</span>
                    </span>
                    {item.badge && (
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export function DocsSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle */}
      <div className="mb-6 flex items-center justify-between md:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="inline-flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-[13px] text-foreground/80 transition-colors hover:bg-accent/30"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
          Navegação
          <ChevronDown
            className={cn(
              "size-3.5 transition-transform",
              open && "rotate-180",
            )}
          />
        </button>
      </div>

      {/* Mobile list */}
      {open && (
        <div className="mb-8 rounded-2xl border border-border/60 bg-card p-4 md:hidden">
          <NavList onNavigate={() => setOpen(false)} />
        </div>
      )}

      {/* Desktop list */}
      <aside className="hidden md:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
          <NavList />
        </div>
      </aside>
    </>
  )
}
