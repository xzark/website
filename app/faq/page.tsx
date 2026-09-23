import type { Metadata } from "next"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { PageHero } from "@/components/site/page-hero"
import { CTA } from "@/components/landing/cta"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = { title: "FAQ", description: "Perguntas frequentes sobre os conceitos e produtos da xZark." }

const faqs = [
  { q: "O que é a xZark?", a: "A xZark é uma iniciativa de cibersegurança e privacidade. O site apresenta conceitos de produtos, arquitetura e serviços em desenvolvimento." },
  { q: "Os produtos estão disponíveis?", a: "Os produtos apresentados estão em diferentes estágios de pesquisa e desenvolvimento. O status exibido em cada produto indica sua situação conceitual atual; disponibilidade comercial será anunciada quando confirmada." },
  { q: "Posso falar com a equipe?", a: "Sim. Use o formulário de contato para enviar dúvidas, propostas ou interesse comercial." },
  { q: "A xZark oferece certificações ou SLAs?", a: "Não apresentamos certificações, métricas operacionais ou SLAs como fatos neste site. Qualquer compromisso comercial deverá ser confirmado em documentação específica." },
  { q: "Como reportar uma questão de segurança?", a: "Envie uma mensagem pela página de contato descrevendo o contexto sem incluir segredos, credenciais ou dados pessoais desnecessários." },
]

export default function FAQPage() {
  return <><AnnouncementBar /><Header /><main><PageHero eyebrow="Perguntas frequentes" title={<>Respostas <span className="font-serif italic text-primary">diretas</span>.</>} description="Informações públicas sobre a iniciativa xZark e o status conceitual dos produtos." /><section className="border-b border-border/60 bg-background py-20 md:py-28"><div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"><Accordion type="single" collapsible className="w-full">{faqs.map((item, index) => <AccordionItem key={item.q} value={`faq-${index}`} className="border-border/60"><AccordionTrigger className="py-5 text-left text-base font-medium tracking-tight hover:no-underline data-[state=open]:text-primary">{item.q}</AccordionTrigger><AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</AccordionContent></AccordionItem>)}</Accordion></div></section><CTA /></main><Footer /></>
}
