import type { LucideIcon } from "lucide-react"
import { Activity, Lock, Radar, ShieldCheck, Users, Zap } from "lucide-react"

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

export interface Service { slug: string; title: string; description: string; icon: LucideIcon; deliverables: string[] }
export const services: Service[] = [
  { slug: "security-audit", title: "Auditoria de segurança", description: "Avaliação técnica de postura de segurança, código, infraestrutura e processos.", icon: ShieldCheck, deliverables: ["Avaliação técnica", "Análise de controles", "Relatório executivo", "Plano de melhorias"] },
  { slug: "incident-response", title: "Resposta a incidentes", description: "Apoio especializado para investigação, contenção e recuperação após incidentes.", icon: Radar, deliverables: ["Triagem do incidente", "Investigação técnica", "Contenção", "Lições aprendidas"] },
  { slug: "compliance", title: "Conformidade e governança", description: "Apoio para organizar controles, políticas e evidências de segurança e privacidade.", icon: Lock, deliverables: ["Análise de lacunas", "Mapeamento de controles", "Políticas", "Preparação para auditoria"] },
  { slug: "zero-trust", title: "Zero Trust Architecture", description: "Desenho de arquitetura baseada em identidade, menor privilégio e segmentação.", icon: Users, deliverables: ["Mapeamento de acesso", "Segmentação", "Identidade", "Plano de adoção"] },
  { slug: "threat-hunting", title: "Caça a ameaças", description: "Investigação orientada a hipóteses para identificar sinais de atividade maliciosa.", icon: Activity, deliverables: ["Hipóteses de investigação", "Análise comportamental", "Regras de detecção", "Fortalecimento"] },
  { slug: "managed-security", title: "Segurança gerenciada", description: "Apoio contínuo para organizar operações e processos de segurança.", icon: Zap, deliverables: ["Monitoramento de processos", "Gestão de vulnerabilidades", "Revisões periódicas", "Relatórios executivos"] },
]

export const mainNav = [
  { label: "Serviços", href: "/services" },
  { label: "Segurança", href: "/security" },
  { label: "Sobre", href: "/about" },
  { label: "Careers", href: "/careers" },
] as const

export const announcements = ["INFRAESTRUTURA DE SEGURANÇA — CONCEITOS E PESQUISA", "PRIVACIDADE E SEGURANÇA POR DESIGN", "ARQUITETURA ZERO-TRUST — EM EVOLUÇÃO CONTÍNUA"] as const
export const businessAddress = siteConfig.businessAddress
