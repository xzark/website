import { Callout, CardGrid, CardLink, DefinitionList, FeatureGrid, Lead, Prose } from "@/components/docs/doc-primitives"
import type { DocContent } from "@/lib/docs/types"

export const conceitos: DocContent = {
  eyebrow: "Fundamentos",
  title: "Conceitos principais",
  description: "Os modelos que orientam a engenharia de segurança da xZark: identidade, autorização, políticas, sinais e auditoria.",
  updatedAt: "2026-06-10",
  sections: [{ id: "modelo", title: "Modelo mental", content: <Prose><Lead>Uma integração segura começa definindo quem pode agir, em qual contexto e com quais sinais de confiança.</Lead><DefinitionList items={[{ term: "Identidade", description: "Representação verificável de uma pessoa, serviço ou aplicação." }, { term: "Autorização", description: "Decisão explícita sobre quais ações uma identidade pode executar." }, { term: "Política", description: "Regra versionada que transforma contexto e risco em uma decisão." }, { term: "Sinal", description: "Evidência técnica usada para avaliar comportamento e superfície de ataque." }, { term: "Auditoria", description: "Registro contextual de decisões e alterações relevantes." }]} /></Prose> }, { id: "seguranca", title: "Modelo de segurança", content: <Prose><p>A abordagem considera menor privilégio, defesa em profundidade, separação de ambientes e transparência sobre o estado de cada produto.</p><FeatureGrid items={["Menor privilégio", "Políticas explícitas", "Superfície reduzida", "Observabilidade contextual", "Privacidade por design", "Evolução verificável"]} /><Callout variant="tip" title="Boa prática">Comece documentando ativos, identidades e decisões de acesso antes de escolher uma implementação.</Callout></Prose> }],
}

export const exemplos: DocContent = {
  eyebrow: "Fundamentos",
  title: "Exemplos práticos",
  description: "Padrões conceituais para organizar identidade e proteção de aplicações.",
  updatedAt: "2026-06-10",
  sections: [{ id: "acesso", title: "Acesso por contexto", content: <Prose><p>Modele uma decisão de acesso considerando identidade, recurso, ação, ambiente e sinais disponíveis.</p><CardGrid><CardLink href="/docs/xauth" title="Identidade e acesso" description="Explore os conceitos do xAuth." /><CardLink href="/docs/xshield" title="Proteção de aplicações" description="Explore os conceitos do xShield." /></CardGrid></Prose> }, { id: "checklist", title: "Checklist inicial", content: <Prose><FeatureGrid columns={1} items={["Defina o recurso protegido", "Liste as identidades autorizadas", "Escolha o menor escopo possível", "Registre decisões relevantes"]} /></Prose> }],
}

export const referencia: DocContent = {
  eyebrow: "Fundamentos",
  title: "Referência técnica",
  description: "Estrutura de referência para as interfaces públicas que serão documentadas conforme os produtos evoluírem.",
  updatedAt: "2026-06-10",
  sections: [{ id: "status", title: "Status da referência", content: <Prose><Callout variant="info">A referência técnica de APIs e SDKs será publicada quando as interfaces dos produtos forem validadas.</Callout><p>Por enquanto, use esta seção para acompanhar os conceitos estáveis e entre em contato para discutir requisitos específicos.</p></Prose> }],
}
