import type { LucideIcon } from "lucide-react"
import { Code2, LockKeyhole, Network, Radar } from "lucide-react"

export type WorkModel = "Remoto" | "Híbrido" | "Presencial"
export type JobStatus = "open" | "closed"

export interface JobOpening {
  slug: string
  title: string
  department: string
  location: string
  model: WorkModel
  type: string
  status: JobStatus
  summary: string
  description: string
  responsibilities: string[]
  requirements: string[]
  niceToHave: string[]
  icon: LucideIcon
}

export const culturePrinciples = [
  {
    label: "Clareza antes de velocidade",
    description: "Decisões explícitas, documentação objetiva e espaço para fazer as perguntas difíceis.",
  },
  {
    label: "Segurança como prática",
    description: "Tratamos segurança e privacidade como propriedades do produto, não como uma etapa final.",
  },
  {
    label: "Trabalho com autonomia",
    description: "Responsabilidade próxima do contexto, com confiança, rigor e comunicação assíncrona.",
  },
  {
    label: "Curiosidade aplicada",
    description: "Investigamos sistemas complexos e transformamos aprendizados em decisões melhores.",
  },
]

export const jobOpenings: JobOpening[] = [
  {
    slug: "security-platform-engineer",
    title: "Security Platform Engineer",
    department: "Engineering",
    location: "Global / Americas",
    model: "Remoto",
    type: "Full-time",
    status: "open",
    summary: "Construa os primitives que tornam segurança e privacidade parte natural do desenvolvimento.",
    description: "Você trabalhará na fundação técnica dos produtos xZark, criando sistemas claros, resilientes e observáveis para equipes que operam aplicações críticas.",
    responsibilities: [
      "Projetar e implementar componentes de plataforma com foco em identidade, políticas e observabilidade.",
      "Colaborar com produto e engenharia para transformar problemas de segurança em interfaces simples.",
      "Revisar decisões técnicas e contribuir para padrões de qualidade e operação.",
    ],
    requirements: [
      "Experiência profissional com sistemas distribuídos ou infraestrutura de produção.",
      "Domínio de uma linguagem de backend e fundamentos de redes e sistemas operacionais.",
      "Comunicação escrita clara e interesse genuíno por segurança aplicada.",
    ],
    niceToHave: ["Experiência com Go, Rust ou TypeScript", "Familiaridade com zero-trust e cloud infrastructure"],
    icon: Code2,
  },
  {
    slug: "application-security-researcher",
    title: "Application Security Researcher",
    department: "Security",
    location: "Global / Americas",
    model: "Remoto",
    type: "Full-time",
    status: "open",
    summary: "Investigue como aplicações falham e ajude a criar defesas melhores.",
    description: "A posição combina pesquisa prática, análise de produtos e colaboração próxima com engenharia para elevar o nível de segurança das soluções xZark.",
    responsibilities: [
      "Pesquisar classes de vulnerabilidade e padrões de abuso em aplicações modernas.",
      "Criar reproduções, recomendações e ferramentas que acelerem a correção de riscos.",
      "Compartilhar descobertas com clareza, dentro e fora da equipe.",
    ],
    requirements: [
      "Experiência com segurança de aplicações, pentest ou engenharia reversa.",
      "Capacidade de explicar riscos técnicos para diferentes públicos.",
      "Postura ética e cuidadosa ao lidar com informações sensíveis.",
    ],
    niceToHave: ["Pesquisa pública ou participação em comunidades de segurança", "Conhecimento de supply chain security"],
    icon: LockKeyhole,
  },
  {
    slug: "network-reliability-engineer",
    title: "Network Reliability Engineer",
    department: "Infrastructure",
    location: "Global / Americas",
    model: "Híbrido",
    type: "Full-time",
    status: "closed",
    summary: "Ajude a desenhar redes previsíveis para sistemas que não podem depender de suposições.",
    description: "Esta posição está temporariamente encerrada, mas mantemos o perfil publicado para sinalizar as competências que buscamos em futuras aberturas.",
    responsibilities: ["Modelar topologias e políticas de tráfego", "Criar ferramentas de diagnóstico", "Participar de revisões de confiabilidade"],
    requirements: ["Experiência com redes e sistemas distribuídos", "Pensamento sistemático e documentação clara"],
    niceToHave: ["Experiência com service mesh", "Automação de infraestrutura"],
    icon: Network,
  },
]

export const careerTracks = [
  { label: "Engineering", icon: Code2 },
  { label: "Security", icon: Radar },
  { label: "Infrastructure", icon: Network },
]

export function getJobBySlug(slug: string) {
  return jobOpenings.find((job) => job.slug === slug)
}
