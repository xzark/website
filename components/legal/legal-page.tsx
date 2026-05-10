/**
 * LegalPage — wrapper visual para páginas legais (Terms, Privacy, Cookies).
 * Estrutura sidebar TOC + conteúdo, tipografia legível.
 */
import Link from "next/link"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { PageHero } from "@/components/site/page-hero"

export interface LegalSection {
  id: string
  title: string
  content: React.ReactNode
}

interface LegalPageProps {
  eyebrow: string
  title: React.ReactNode
  description: string
  lastUpdated: string
  sections: LegalSection[]
}

export function LegalPage({
  eyebrow,
  title,
  description,
  lastUpdated,
  sections,
}: LegalPageProps) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <PageHero
          eyebrow={eyebrow}
          title={title}
          description={description}
          meta={[{ label: "Última atualização", value: lastUpdated }]}
        />

        <section className="border-b border-border/60 bg-background py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 md:grid-cols-12">
              {/* TOC */}
              <aside className="md:col-span-3">
                <div className="sticky top-24">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                    Sumário
                  </p>
                  <nav className="mt-4 space-y-1.5">
                    {sections.map((s, i) => (
                      <Link
                        key={s.id}
                        href={`#${s.id}`}
                        className="block text-sm text-foreground/80 transition-colors hover:text-primary"
                      >
                        <span className="mr-2 font-mono text-[10.5px] text-muted-foreground">
                          {(i + 1).toString().padStart(2, "0")}
                        </span>
                        {s.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Content */}
              <div className="md:col-span-9">
                <article className="prose prose-invert max-w-none">
                  {sections.map((s, i) => (
                    <section key={s.id} id={s.id} className="mb-14 scroll-mt-24">
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-primary">
                        {(i + 1).toString().padStart(2, "0")} — Seção
                      </p>
                      <h2 className="mt-2 text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                        {s.title}
                      </h2>
                      <div className="mt-5 space-y-4 text-sm leading-relaxed text-foreground/85 md:text-base">
                        {s.content}
                      </div>
                    </section>
                  ))}
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
