/**
 * Footer corporativo — colunas com produtos, serviços, recursos e legal.
 * Inspirado em Vercel/Stripe: tipografia clara, hierarquia óbvia.
 */
import Link from "next/link"
import { Logo } from "./logo"
import { siteConfig, products } from "@/lib/site-config"
import { Github, Linkedin, Twitter } from "lucide-react"

const cols = [
  {
    title: "Produtos",
    links: products.map((p) => ({
      label: p.name,
      href: `/products/${p.slug}`,
    })),
  },
  {
    title: "Serviços",
    links: [
      { label: "Security Audit", href: "/services#security-audit" },
      { label: "Incident Response", href: "/services#incident-response" },
      { label: "Compliance", href: "/services#compliance" },
      { label: "Zero Trust", href: "/services#zero-trust" },
      { label: "Threat Hunting", href: "/services#threat-hunting" },
      { label: "Managed Security", href: "/services#managed-security" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: "/about" },
      { label: "Segurança", href: "/security" },
      { label: "FAQ", href: "/faq" },
      { label: "Contato", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Termos de Uso", href: "/terms" },
      { label: "Política de Privacidade", href: "/privacy" },
      { label: "Política de Cookies", href: "/cookies" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background">
      {/* linha de glow superior */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          {/* Marca + descrição */}
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Infraestrutura de cibersegurança e privacidade engenheirada para empresas que não toleram falhas.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a
                href={siteConfig.github}
                aria-label="GitHub"
                className="inline-flex size-8 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <Github className="size-3.5" />
              </a>
              <a
                href={siteConfig.linkedin}
                aria-label="LinkedIn"
                className="inline-flex size-8 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <Linkedin className="size-3.5" />
              </a>
              <a
                href={`https://twitter.com/${siteConfig.twitter.replace("@", "")}`}
                aria-label="Twitter"
                className="inline-flex size-8 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <Twitter className="size-3.5" />
              </a>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[13px] text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Linha inferior */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 md:flex-row md:items-center">
          <p className="font-mono text-[11px] text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <div className="font-mono text-[11px] text-muted-foreground">
            <span>{siteConfig.domain}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
