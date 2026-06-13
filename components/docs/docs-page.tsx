/**
 * DocsPage — wrapper visual para páginas de documentação.
 * Estrutura sidebar TOC + conteúdo, tipografia legível.
 */
import Link from "next/link";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";

export interface DocsSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface DocsNavigationItem {
  title: string;
  href: string;
}

export type DocNavItem = {
  title: string;
  href: string;
};

interface DocsPageProps {
  eyebrow: string;
  title: React.ReactNode;
  description: string;

  sections: DocsSection[];

  sidebar?: DocNavItem[];
  previousPage?: DocsNavigationItem;
  nextPage?: DocsNavigationItem;
}

export function DocsPage({
  eyebrow,
  title,
  description,
  sections,
  previousPage,
  nextPage,
}: DocsPageProps) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <PageHero
          eyebrow={eyebrow}
          title={
            <>
              {title} ·{" "}
              <span className="font-serif italic text-primary">
                Documentação
              </span>
              .
            </>
          }
          description={description}
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
                    <section
                      key={s.id}
                      id={s.id}
                      className="mb-14 scroll-mt-24"
                    >
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
        {/* Minimal Docs Navigation */}
        <div className="mt-24 border-t border-border/50 pt-6">
          <div className="grid gap-3 md:grid-cols-2">
            {previousPage ? (
              <Link
                href={previousPage.href}
                className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-4 transition-all duration-200 hover:border-border hover:bg-muted/20"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[11px] text-muted-foreground transition-transform duration-200 group-hover:-translate-x-0.5">
                    ←
                  </span>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Previous
                    </p>

                    <h3 className="mt-1 text-sm font-medium text-foreground/90 transition-colors group-hover:text-foreground">
                      {previousPage.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextPage ? (
              <Link
                href={nextPage.href}
                className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-4 text-right transition-all duration-200 hover:border-border hover:bg-muted/20"
              >
                <div className="ml-auto">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Next
                  </p>

                  <h3 className="mt-1 text-sm font-medium text-foreground/90 transition-colors group-hover:text-foreground">
                    {nextPage.title}
                  </h3>
                </div>

                <span className="ml-4 font-mono text-[11px] text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            ) : null}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
