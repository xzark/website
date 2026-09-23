import type { LucideIcon } from "lucide-react"
import {
  Activity,
  Cloud,
  Fingerprint,
  KeyRound,
  Lock,
  Network,
  Radar,
  Shield,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react"

export const siteConfig = {
  name: "xZark",
  domain: "xzark.co",
  url: "https://xzark.co",
  tagline: "Cybersecurity & Privacy Infrastructure",
  description: "Infraestrutura de cibersegurança e privacidade para empresas modernas.",
  email: "contact@xzark.co",
  twitter: "@xzark",
  github: "https://github.com/xzark",
  linkedin: "https://linkedin.com/company/xzarkinc",
  locales: ["pt-BR", "en", "es"] as const,
  defaultLocale: "pt-BR" as const,
}

export type ProductSlug = "xauth" | "xshield" | "xvault" | "xcloud" | "xgate"

export interface Product {
  slug: ProductSlug
  name: string
  category: string
  tagline: string
  description: string
  icon: LucideIcon
  features: string[]
  status: "GA" | "Beta" | "Preview"
}

export const products: Product[] = [
  {
    slug: "xauth",
    name: "xAuth",
    category: "Identity",
    tagline: "Autenticação zero-trust moderna para aplicações escaláveis",
    description: "Conceito de infraestrutura de identidade com passkeys, MFA, SSO e sessões seguras.",
    icon: Fingerprint,
    features: ["Passkeys e WebAuthn", "MFA adaptativo", "SSO empresarial", "Sessões seguras", "Auditoria de eventos", "SDKs type-safe"],
    status: "Preview",
  },
  {
    slug: "xshield",
    name: "xShield",
    category: "Threat Protection",
    tagline: "Proteção contínua contra ataques e ameaças modernas",
    description: "Conceito de camada de proteção para aplicações, APIs e workloads expostos.",
    icon: Shield,
    features: ["WAF programável", "Mitigação DDoS", "Bot management", "Inteligência de ameaças", "Rate limiting", "Detecção comportamental"],
    status: "Preview",
  },
  {
    slug: "xvault",
    name: "xVault",
    category: "Secrets & Encryption",
    tagline: "Gerenciamento seguro de segredos e criptografia avançada",
    description: "Conceito de cofre para segredos, tokens, certificados e chaves criptográficas.",
    icon: KeyRound,
    features: ["Criptografia moderna", "Rotação de segredos", "Integração com HSM", "Auditoria de eventos", "Envelope encryption", "API segura"],
    status: "Preview",
  },
  {
    slug: "xcloud",
    name: "xCloud",
    category: "Infrastructure",
    tagline: "Cloud privada moderna com soberania de dados",
    description: "Conceito de infraestrutura isolada para workloads que exigem controle operacional.",
    icon: Cloud,
    features: ["Isolamento de workloads", "Backups imutáveis", "Políticas de dados", "Segmentação de rede", "Redundância planejada", "BYOK"],
    status: "Preview",
  },
  {
    slug: "xgate",
    name: "xGate",
    category: "Network",
    tagline: "Gateway seguro com arquitetura zero-trust",
    description: "Conceito de API gateway e service mesh com políticas de tráfego observáveis.",
    icon: Network,
    features: ["mTLS", "Tracing distribuído", "Políticas declarativas", "Service mesh", "Edge networking", "Rate limiting"],
    status: "Preview",
  },
]

export interface Documentation {
  slug: ProductSlug
  title: string
  description: string
  icon: LucideIcon
  category: string
  tagline: string
  status: Product["status"]
}

export const documentation: Documentation[] = products.map((product) => ({
  slug: product.slug,
  title: `${product.name} Documentation`,
  description: `Conceitos e visão técnica de ${product.name}.`,
  icon: product.icon,
  category: product.category,
  tagline: product.tagline,
  status: product.status,
}))

export interface Service {
  slug: string
  title: string
  description: string
  icon: LucideIcon
  deliverables: string[]
}

export const services: Service[] = [
  { slug: "security-audit", title: "Security Audit", description: "Avaliação técnica de postura de segurança, código, infraestrutura e processos.", icon: ShieldCheck, deliverables: ["Avaliação técnica", "Análise de controles", "Relatório executivo", "Plano de melhorias"] },
  { slug: "incident-response", title: "Incident Response", description: "Apoio especializado para investigação, contenção e recuperação após incidentes.", icon: Radar, deliverables: ["Triagem do incidente", "Investigação técnica", "Contenção", "Lições aprendidas"] },
  { slug: "compliance", title: "Compliance & Governance", description: "Apoio para organizar controles, políticas e evidências de segurança e privacidade.", icon: Lock, deliverables: ["Gap analysis", "Mapeamento de controles", "Políticas", "Preparação para auditoria"] },
  { slug: "zero-trust", title: "Zero Trust Architecture", description: "Desenho de arquitetura baseada em identidade, menor privilégio e segmentação.", icon: Users, deliverables: ["Mapeamento de acesso", "Segmentação", "Identidade", "Plano de adoção"] },
  { slug: "threat-hunting", title: "Threat Hunting", description: "Investigação orientada a hipóteses para identificar sinais de atividade maliciosa.", icon: Activity, deliverables: ["Hipóteses de investigação", "Análise comportamental", "Regras de detecção", "Hardening"] },
  { slug: "managed-security", title: "Managed Security", description: "Apoio contínuo para organizar operações e processos de segurança.", icon: Zap, deliverables: ["Monitoramento de processos", "Gestão de vulnerabilidades", "Revisões periódicas", "Relatórios executivos"] },
]

export const mainNav = [
  { label: "Produtos", href: "/products" },
  { label: "Serviços", href: "/services" },
  { label: "Docs", href: "/docs" },
  { label: "Segurança", href: "/security" },
  { label: "Sobre", href: "/about" },
  { label: "Careers", href: "/careers" },
] as const

export const announcements = [
  "INFRAESTRUTURA DE SEGURANÇA — CONCEITOS E PESQUISA",
  "PRIVACIDADE E SEGURANÇA POR DESIGN",
  "ARQUITETURA ZERO-TRUST — EM EVOLUÇÃO CONTÍNUA",
] as const

export const iconSet = { Activity, Cloud, Fingerprint, KeyRound, Lock, Network, Radar, Shield, ShieldCheck, Users, Zap }
export type IconSet = typeof iconSet
