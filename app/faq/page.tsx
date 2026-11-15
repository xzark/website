import type { Metadata } from "next"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { PageHero } from "@/components/site/page-hero"
import { CTA } from "@/components/landing/cta"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = { title: "FAQ", description: "Perguntas frequentes sobre a xZark, sua pesquisa e práticas de segurança." }

const categories = [
  { title: "Geral", items: [
    { q: "O que é a xZark?", a: "A xZark é uma iniciativa de pesquisa em cibersegurança e privacidade. O site apresenta ideias e conceitos técnicos em desenvolvimento." },
    { q: "Para quem é a xZark?", a: "Para equipes que avaliam desafios de identidade, acesso, proteção de aplicações e engenharia de segurança." },
    { q: "Como posso falar com a xZark?", a: "Use o formulário de contato para enviar dúvidas gerais ou mensagens sobre a pesquisa da xZark." },
  ]},
  { title: "Segurança e privacidade", items: [
    { q: "A xZark vende dados de clientes?", a: "Não há indicação no projeto de que dados de clientes sejam vendidos. Não envie segredos, credenciais ou dados pessoais desnecessários pelos formulários." },
    { q: "Como reportar uma questão de segurança?", a: "Envie uma mensagem pela página de contato descrevendo o contexto sem incluir informações sensíveis." },
  ]},
]

export default function FAQPage() {
  return <><AnnouncementBar /><Header /><main><PageHero eyebrow="Perguntas frequentes" title={<>Respostas <span className="font-serif italic text-primary">diretas</span>.</>} description="Informações públicas sobre a xZark, sua pesquisa e práticas de segurança." /><section className="border-b border-border/60 bg-background py-20 md:py-28"><div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"><div className="space-y-12">{categories.map((category) => <section key={category.title} aria-labelledby={`faq-${category.title}`}><h2 id={`faq-${category.title}`} className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{category.title}</h2><Accordion type="single" collapsible className="mt-3 w-full">{category.items.map((item, index) => <AccordionItem key={item.q} value={`${category.title}-${index}`} className="border-border/60"><AccordionTrigger className="py-5 text-left text-base font-medium tracking-tight hover:no-underline data-[state=open]:text-primary">{item.q}</AccordionTrigger><AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</AccordionContent></AccordionItem>)}</Accordion></section>)}</div></div></section><CTA /></main><Footer /></>
}
