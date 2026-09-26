import type { LucideIcon } from "lucide-react"
import { Activity, Fingerprint, Lock, Radar, Shield, ShieldCheck, Users, Zap } from "lucide-react"

export const siteConfig = {
  name: "xZark",
  domain: "xzark.co",
  url: "https://xzark.co",
  tagline: "Cybersecurity & Privacy Infrastructure",
  description: "Infraestrutura de cibersegurança e privacidade para sistemas digitais modernos.",
  email: "contact@xzark.co",
  twitter: "@xzark",
  github: "https://github.com/xzark",
  linkedin: "https://linkedin.com/company/xzarkinc",
  businessAddress: "[ENDEREÇO COMERCIAL A CONFIRMAR]",
  locales: ["pt-BR", "en"] as const,
  defaultLocale: "pt-BR" as const,
}

export type ProductSlug = "xauth" | "xshield"
export interface Product { slug: ProductSlug; name: string; category: string; tagline: string; description: string; icon: LucideIcon; features: string[]; status: "Preview" | "In development" }

export const products: Product[] = [
  { slug: "xauth", name: "xAuth", category: "Identity & Access", tagline: "Identity and access infrastructure built for modern applications.", description: "Produto em desenvolvimento para explorar autenticação, identidade, controle de acesso e sessões orientadas a segurança.", icon: Fingerprint, features: ["Autenticação", "Identidade", "Controle de acesso", "Sessões", "Arquitetura segura", "Integrações modernas"], status: "Preview" },
  { slug: "xshield", name: "xShield", category: "Application Security", tagline: "Security infrastructure designed to protect modern digital systems.", description: "Produto em desenvolvimento para explorar proteção de aplicações, políticas de segurança, análise de ameaças e superfícies digitais.", icon: Shield, features: ["Proteção de aplicações", "Análise de ameaças", "Políticas de segurança", "Monitoramento", "Superfícies digitais", "Arquitetura de segurança"], status: "In development" },
]

export interface Service { slug: string; title: string; description: string; icon: LucideIcon; deliverables: string[] }
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
  { label: "Segurança", href: "/security" },
  { label: "Sobre", href: "/about" },
  { label: "Careers", href: "/careers" },
] as const

export const announcements = ["INFRAESTRUTURA DE SEGURANÇA — CONCEITOS E PESQUISA", "PRIVACIDADE E SEGURANÇA POR DESIGN", "ARQUITETURA ZERO-TRUST — EM EVOLUÇÃO CONTÍNUA"] as const
export const productSlugs = products.map((product) => product.slug)
export const businessAddress = siteConfig.businessAddress
