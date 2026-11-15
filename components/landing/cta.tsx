/**
 * CTA — chamada final premium com glow e composição editorial.
 */
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { GridBackground } from "@/components/site/grid-background"
import { Button } from "@/components/ui/button"
import { LocaleText } from "@/components/site/locale-text"

export function CTA() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background">
      <GridBackground variant="small" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-primary">
            <LocaleText pt="Pesquisa em andamento" en="Research in progress" />
          </p>
          <h2 className="mt-6 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            <LocaleText pt={<>Segurança não é{" "}<span className="font-serif italic text-primary text-glow">opcional</span>.</>} en={<>Security is not{" "}<span className="font-serif italic text-primary text-glow">optional</span>.</>} />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            <LocaleText pt="Conheça as ideias e os princípios que orientam a pesquisa da xZark em cibersegurança e privacidade." en="Explore the ideas and principles guiding xZark research in cybersecurity and privacy." />
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-md bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/90"
            >
              <Link href="/about">
                <LocaleText pt="Conheça a xZark" en="About xZark" />
                <ArrowUpRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-11 rounded-md border border-border/80 bg-transparent px-5 text-sm font-medium text-foreground hover:bg-accent/40"
            >
              <Link href="/security"><LocaleText pt="Ver postura de segurança" en="View security posture" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
