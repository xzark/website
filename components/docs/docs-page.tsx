/**
 * DocsPage — shell de página da documentação.
 *
 * Layout profissional de docs: sidebar de navegação persistente à esquerda,
 * conteúdo central e índice da página (TOC) à direita. Mantém a identidade
 * visual existente (PageHero, header/footer, eyebrows em font-mono, acentos
 * serif em primary).
 */
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { DocsToc } from "@/components/docs/docs-toc"
import { GridBackground } from "@/components/site/grid-background"

export interface DocsSection {
  id: string
  title: string
  content: React.ReactNode
}

export interface DocsPagerItem {
  title: string
  href: string
}

interface DocsPageProps {
  eyebrow: string
  title: string
  description: string
  updatedAt?: string
  sections: DocsSection[]
  previousPage?: DocsPagerItem
  nextPage?: DocsPagerItem
}

export function DocsPage({
  eyebrow,
  title,
  description,
  updatedAt,
  sections,
  previousPage,
  nextPage,
}: DocsPageProps) {
  const tocItems = sections.map((s) => ({ id: s.id, title: s.title }))

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        {/* Cabeçalho da página */}
        <section className="relative overflow-hidden border-b border-border/60">
          <GridBackground />
          <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8 lg:pt-20">
            {/* Breadcrumb */}
            <nav
              aria-label="Trilha de navegação"
              className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              <Link href="/docs" className="transition-colors hover:text-foreground">
                Docs
              </Link>
              <ChevronRight className="size-3" />
              <span className="text-foreground/70">{eyebrow}</span>
            </nav>

            <h1 className="mt-5 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
              {title} ·{" "}
              <span className="font-serif italic text-primary">
                Documentação
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
            {updatedAt && (
              <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                Atualizado em {updatedAt}
              </p>
            )}
          </div>
        </section>

        {/* Corpo: sidebar + conteúdo + TOC */}
        <section className="bg-background">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)_13rem] lg:gap-12">
              {/* Sidebar */}
              <DocsSidebar />

              {/* Conteúdo */}
              <div className="min-w-0">
                <article className="max-w-none">
                  {sections.map((s, i) => (
                    <section
                      key={s.id}
                      id={s.id}
                      className="mb-12 scroll-mt-24"
                    >
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-primary">
                        {(i + 1).toString().padStart(2, "0")}
                      </p>
                      <h2 className="mt-2 text-2xl font-medium tracking-tight text-foreground md:text-[1.75rem]">
                        {s.title}
                      </h2>
                      <div className="mt-5">{s.content}</div>
                    </section>
                  ))}
                </article>

                {/* Paginador */}
                {(previousPage || nextPage) && (
                  <div className="mt-16 grid gap-3 border-t border-border/50 pt-8 sm:grid-cols-2">
                    {previousPage ? (
                      <Link
                        href={previousPage.href}
                        className="group rounded-2xl border border-border/60 px-4 py-4 transition-colors hover:border-primary/40 hover:bg-muted/20"
                      >
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          Anterior
                        </p>
                        <p className="mt-1 text-sm font-medium text-foreground/90 transition-colors group-hover:text-foreground">
                          {previousPage.title}
                        </p>
                      </Link>
                    ) : (
                      <div className="hidden sm:block" />
                    )}

                    {nextPage ? (
                      <Link
                        href={nextPage.href}
                        className="group rounded-2xl border border-border/60 px-4 py-4 text-right transition-colors hover:border-primary/40 hover:bg-muted/20"
                      >
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          Próximo
                        </p>
                        <p className="mt-1 text-sm font-medium text-foreground/90 transition-colors group-hover:text-foreground">
                          {nextPage.title}
                        </p>
                      </Link>
                    ) : null}
                  </div>
                )}
              </div>

              {/* TOC */}
              <div className="hidden lg:block">
                <DocsToc items={tocItems} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
