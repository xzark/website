import type { Metadata } from "next"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { PageHero } from "@/components/site/page-hero"
import { CTA } from "@/components/landing/cta"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Perguntas frequentes sobre xZark: produtos, segurança, compliance, preços e suporte.",
}

const faqs = [
  {
    section: "Plataforma",
    items: [
      {
        q: "Como xZark é diferente de soluções tradicionais de segurança?",
        a: "xZark é uma plataforma unificada com auditoria criptográfica em todos os componentes. Em vez de combinar 5 fornecedores diferentes, você obtém identidade, proteção, criptografia, cloud e rede em uma única arquitetura zero-trust com SLAs unificados.",
      },
      {
        q: "Posso usar apenas um produto ou preciso adotar a plataforma inteira?",
        a: "Cada produto é totalmente standalone com APIs públicas e SDKs. Você pode começar com xAuth, por exemplo, e adicionar outros produtos quando fizer sentido. A integração entre eles é opcional, não obrigatória.",
      },
      {
        q: "Vocês oferecem self-hosted ou apenas SaaS?",
        a: "Oferecemos três modelos: SaaS gerenciado (default), single-tenant em região dedicada (xCloud) e self-hosted via Helm/Terraform para clientes enterprise com restrições jurisdicionais específicas.",
      },
    ],
  },
  {
    section: "Segurança & Compliance",
    items: [
      {
        q: "Quais certificações e frameworks vocês atendem?",
        a: "SOC 2 Type II, ISO 27001, ISO 27701, PCI-DSS Level 1, HIPAA, LGPD, GDPR e CCPA. Auditorias externas anuais por firmas independentes (PwC e Schellman). Relatórios disponíveis sob NDA mínimo.",
      },
      {
        q: "Onde meus dados ficam armazenados?",
        a: "Você escolhe a região na criação da conta. Dados nunca cruzam fronteiras jurisdicionais sem autorização explícita. Suportamos 32 regiões globais com isolamento por hardware e soberania regional total.",
      },
      {
        q: "Vocês têm acesso aos meus dados?",
        a: "Não. Usamos criptografia ponta a ponta com BYOK (Bring Your Own Key). Suas chaves são geradas no nosso HSM FIPS 140-3 Level 3, mas nunca extraídas. Cada acesso administrativo é break-glass auditado e publicado em log imutável.",
      },
      {
        q: "Como funciona o programa de bug bounty?",
        a: "Programa público, sem NDA restritivo. Pagamentos de $200 a $100,000 dependendo da severidade. Já pagamos mais de $2.4M para 1.200+ pesquisadores. Reporte via security@xzark.co com PGP.",
      },
    ],
  },
  {
    section: "Operação & Suporte",
    items: [
      {
        q: "Qual o SLA contratual?",
        a: "99.99% uptime para produtos GA, com créditos de serviço escalonados em caso de breach. SLA de resposta a incidentes P1: < 15min. Suporte 24/7/365 incluso em todos os planos enterprise.",
      },
      {
        q: "Quanto tempo leva para implementar xZark?",
        a: "xAuth e xShield: tipicamente 5-14 dias com migração assistida. xVault: 2-4 semanas dependendo da quantidade de segredos. xCloud: 4-8 semanas. Todos os engajamentos têm engenheiro técnico dedicado.",
      },
      {
        q: "Vocês oferecem migração de outros provedores?",
        a: "Sim. Nossos engenheiros conduzem migrações de Auth0, Okta, Cloudflare, AWS Secrets Manager, HashiCorp Vault e outros. Migração assistida sem downtime, com rollback automático em caso de problema.",
      },
    ],
  },
  {
    section: "Comercial",
    items: [
      {
        q: "Como é a precificação?",
        a: "Modelo enterprise customizado baseado em volume e produtos contratados. Sem letra miúda: tudo é discutido contratualmente, incluindo créditos por SLA e cláusulas de saída. Para startups, oferecemos plano gratuito até 10k MAU em xAuth.",
      },
      {
        q: "Quais formas de pagamento aceitam?",
        a: "Faturamento mensal ou anual via boleto, transferência ACH, SEPA ou cartão corporativo. Para contratos plurianuais, oferecemos descontos progressivos. Aceitamos contratos em BRL, USD e EUR.",
      },
      {
        q: "Posso testar antes de assinar?",
        a: "Sim. POCs guiadas de 30 dias com engenheiro dedicado, ambiente isolado e dados sintéticos. Sem cartão de crédito, sem auto-renovação. Convertemos cerca de 78% dos POCs em contrato.",
      },
    ],
  },
]

/** Página FAQ — perguntas organizadas em seções com accordion */
export default function FAQPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <PageHero
          eyebrow="Perguntas frequentes"
          title={
            <>
              Respostas <span className="font-serif italic text-primary">técnicas</span> e diretas.
            </>
          }
          description="Não encontrou o que procurava? Fale com nosso time de engenharia — respondemos em até 24h úteis."
        />

        <section className="border-b border-border/60 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {faqs.map((section) => (
              <div key={section.section} className="mb-16 last:mb-0">
                <div className="mb-6 inline-flex items-center gap-2">
                  <span aria-hidden className="size-1 rounded-full bg-primary" />
                  <h2 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                    {section.section}
                  </h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {section.items.map((item, i) => (
                    <AccordionItem
                      key={item.q}
                      value={`${section.section}-${i}`}
                      className="border-border/60"
                    >
                      <AccordionTrigger className="py-5 text-left text-base font-medium tracking-tight hover:no-underline data-[state=open]:text-primary">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
