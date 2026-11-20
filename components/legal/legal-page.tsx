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
  content: string
}

interface LegalPageProps {
  eyebrow: string
  title: React.ReactNode
  description: string
  lastUpdated: string
  sections: LegalSection[]
  preferences?: React.ReactNode
}

export function LegalPage({
  eyebrow,
  title,
  description,
  lastUpdated,
  sections,
  preferences,
}: LegalPageProps) {
  const contents = sections.map((section, index) => (
    <Link
      key={section.id}
      href={`#${section.id}`}
      className="block text-sm text-foreground/80 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span className="mr-2 font-mono text-[10.5px] text-muted-foreground">
        {(index + 1).toString().padStart(2, "0")}
      </span>
      {section.title}
    </Link>
  ))

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main lang="en" id="top">
        <PageHero
          eyebrow={eyebrow}
          title={title}
          description={description}
          meta={[{ label: "Last updated", value: lastUpdated }]}
        />

        <section className="border-b border-border/60 bg-background py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-12 md:gap-12">
              <aside className="md:col-span-3">
                <details className="border border-border/70 p-4 md:hidden">
                  <summary className="cursor-pointer font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                    Table of contents
                  </summary>
                  <nav aria-label="Table of contents" className="mt-4 flex flex-col gap-3">
                    {contents}
                  </nav>
                </details>
                <div className="sticky top-24 hidden max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 md:block">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">Table of contents</p>
                  <nav aria-label="Table of contents" className="mt-4 flex flex-col gap-2">{contents}</nav>
                </div>
              </aside>

              <article className="min-w-0 md:col-span-9">
                <div className="max-w-3xl">
                  {sections.map((section, index) => (
                    <section key={section.id} id={section.id} className="mb-12 scroll-mt-24 md:mb-14">
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-primary">
                        {(index + 1).toString().padStart(2, "0")} — Section
                      </p>
                      <h2 className="mt-2 text-2xl font-medium tracking-tight text-foreground md:text-3xl">{section.title}</h2>
                      <div className="mt-5 flex flex-col gap-4 text-sm leading-relaxed text-foreground/85 md:text-base">
                        {section.content.split(/\n\n+/).map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
                      </div>
                      {preferences && section.id === "management" && <div id="manage-preferences" className="mt-8 scroll-mt-24">{preferences}</div>}
                    </section>
                  ))}

                  <nav aria-label="Related legal documents" className="border-t border-border/70 py-6">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">Related documents</p>
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                      <Link className="underline underline-offset-4 hover:text-primary" href="/faq">FAQ</Link>
                      <Link className="underline underline-offset-4 hover:text-primary" href="/terms">Terms of Service</Link>
                      <Link className="underline underline-offset-4 hover:text-primary" href="/privacy">Privacy Policy</Link>
                      <Link className="underline underline-offset-4 hover:text-primary" href="/cookies">Cookie Policy</Link>
                    </div>
                  </nav>
                  <div className="flex justify-end pb-4">
                    <Link href="#top" className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-primary">Back to top</Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
