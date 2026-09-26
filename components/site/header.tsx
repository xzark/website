"use client"

/**
 * Header principal — navegação top com glassmorphism, busca e CTA.
 * Esconde anúncios em scroll para foco no conteúdo.
 */
import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, Search, X, Languages } from "lucide-react"
import { isLocale, t, type Locale } from "@/lib/i18n"
import { Logo } from "./logo"
import { mainNav } from "@/lib/site-config"
import { cn } from "@/lib/utils"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [locale, setLocale] = useState<Locale>("pt-BR")

  useEffect(() => {
    const stored = document.cookie.split("; ").find((item) => item.startsWith("xzark-locale="))?.split("=")[1]
    if (isLocale(stored)) setLocale(stored)
  }, [])

  function changeLocale(nextLocale: Locale) {
    setLocale(nextLocale)
    document.cookie = `xzark-locale=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Esquerda — logo + nav */}
        <div className="flex items-center gap-8">
          <Logo />
          <nav
            aria-label={locale === "en" ? "Main navigation" : "Navegação principal"}
            className="hidden items-center gap-1 md:flex"
          >
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
              >
                {locale === "en" ? ({ Produtos: "Products", Serviços: "Services", Segurança: "Security", Sobre: "About", Careers: "Careers" } as Record<string, string>)[item.label] ?? item.label : item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Direita — ações */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={locale === "en" ? "Search" : "Buscar"}
            className="hidden size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground md:inline-flex"
          >
            <Search className="size-4" />
          </button>
          <label className="hidden items-center gap-1.5 text-[11px] text-muted-foreground md:flex" title={t(locale, "language")}>
            <Languages className="size-3.5" />
            <select aria-label={t(locale, "language")} value={locale} onChange={(event) => changeLocale(event.target.value as Locale)} className="bg-transparent text-[11px] text-foreground outline-none">
              <option value="pt-BR">PT-BR</option>
              <option value="en">EN</option>
            </select>
          </label>
          <Link
            href="/contact"
            className="hidden text-[13px] text-muted-foreground transition-colors hover:text-foreground md:inline-flex md:items-center md:px-3 md:py-1.5"
          >
            {t(locale, "contact")}
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground md:hidden"
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden">
          <nav
            aria-label="Navegação móvel"
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
          >
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
              >
                {locale === "en" ? ({ Produtos: "Products", Serviços: "Services", Segurança: "Security", Sobre: "About", Careers: "Careers" } as Record<string, string>)[item.label] ?? item.label : item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
            >
              {t(locale, "contact")}
            </Link>
            <label className="mt-2 flex items-center justify-between border-t border-border/60 px-3 pt-3 text-sm text-muted-foreground">
              <span>{t(locale, "language")}</span>
              <select aria-label={t(locale, "language")} value={locale} onChange={(event) => changeLocale(event.target.value as Locale)} className="bg-transparent text-foreground outline-none">
                <option value="pt-BR">{t(locale, "portuguese")}</option>
                <option value="en">{t(locale, "english")}</option>
              </select>
            </label>
          </nav>
        </div>
      )}
    </header>
  )
}
