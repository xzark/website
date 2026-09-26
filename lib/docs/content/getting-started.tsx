import Link from "next/link"
import { Callout, CardGrid, CardLink, FeatureGrid, Lead, Prose, Step, Steps } from "@/components/docs/doc-primitives"
import { CodeBlock } from "@/components/docs/code-block"
import type { DocContent } from "@/lib/docs/types"

export const introducao: DocContent = {
  eyebrow: "Começar",
  title: "Introdução",
  description: "Bem-vindo à documentação da xZark — conceitos de cibersegurança, privacidade e engenharia de segurança para sistemas digitais modernos.",
  updatedAt: "2026-06-10",
  sections: [
    { id: "visao-geral", title: "Visão geral", content: <Prose><Lead>A xZark explora infraestrutura de identidade e proteção de aplicações com uma abordagem orientada a segurança e privacidade.</Lead><p>Esta documentação apresenta conceitos, direção técnica e exemplos de integração dos produtos em desenvolvimento.</p></Prose> },
    { id: "como-navegar", title: "Como navegar", content: <Prose><p>Use a barra lateral para alternar entre fundamentos, produtos e recursos.</p><CardGrid><CardLink href="/docs/guia-rapido" title="Guia rápido" description="Conheça o fluxo conceitual de uma integração." /><CardLink href="/docs/conceitos" title="Conceitos principais" description="Entenda os modelos de segurança da plataforma." /><CardLink href="/docs/xauth" title="xAuth" description="Veja a direção técnica de identidade e acesso." /><CardLink href="/docs/xshield" title="xShield" description="Explore a visão de proteção de aplicações." /></CardGrid></Prose> },
    { id: "principios", title: "Princípios", content: <Prose><p>Os produtos compartilham princípios de engenharia:</p><FeatureGrid items={["Zero-trust por padrão", "Privacidade por design", "Interfaces explícitas", "Auditoria e rastreabilidade", "Segurança em cada camada", "Evolução guiada por pesquisa"]} /></Prose> },
  ],
}

export const guiaRapido: DocContent = {
  eyebrow: "Começar",
  title: "Guia rápido",
  description: "Um percurso curto para entender como avaliar os conceitos da xZark antes de uma integração.",
  updatedAt: "2026-06-10",
  sections: [
    { id: "contexto", title: "Entenda o contexto", content: <Prose><Steps><Step title="1. Escolha o domínio"><p>Comece por identidade com xAuth ou proteção de aplicações com xShield.</p></Step><Step title="2. Leia os fundamentos"><p>Revise os modelos de identidade, autorização, políticas e sinais de ameaça.</p></Step><Step title="3. Avalie o escopo"><p>Compare os conceitos com os requisitos do seu sistema sem assumir disponibilidade comercial.</p></Step></Steps><Callout variant="info" title="Produtos em desenvolvimento">As páginas de produto são referências conceituais. Interfaces e disponibilidade serão anunciadas quando confirmadas.</Callout></Prose> },
    { id: "proximos-passos", title: "Próximos passos", content: <Prose><CardGrid><CardLink href="/docs/xauth" title="Explorar xAuth" description="Identidade, autenticação e controle de acesso." /><CardLink href="/docs/xshield" title="Explorar xShield" description="Proteção de aplicações e análise de ameaças." /></CardGrid></Prose> },
  ],
}

export const instalacao: DocContent = {
  eyebrow: "Começar",
  title: "Instalação",
  description: "Orientações de instalação serão publicadas quando os SDKs dos produtos estiverem disponíveis.",
  updatedAt: "2026-06-10",
  sections: [{ id: "status", title: "Status", content: <Prose><Callout variant="info">Os produtos xAuth e xShield estão em desenvolvimento. Não há pacotes públicos de produção documentados neste momento.</Callout><p>Para discutir uma integração ou acompanhar a evolução técnica, use a página de contato.</p><Link className="text-primary underline-offset-4 hover:underline" href="/contact">Falar com a xZark</Link></Prose> }],
}

export const configuracao: DocContent = {
  eyebrow: "Começar",
  title: "Configuração",
  description: "Princípios de configuração segura para futuras integrações com a xZark.",
  updatedAt: "2026-06-10",
  sections: [{ id: "seguranca", title: "Configuração segura", content: <Prose><p>Quando as interfaces forem publicadas, credenciais deverão permanecer em variáveis de ambiente no servidor, com escopo mínimo e rotação controlada.</p><CodeBlock language="bash" filename=".env.example" code={`XAUTH_API_KEY=configure_when_available\nXSHIELD_API_KEY=configure_when_available`} /><Callout variant="warning">Os nomes acima são exemplos de configuração futura, não credenciais ativas.</Callout></Prose> }],
}

