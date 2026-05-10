/**
 * Configuração central do site xZark
 * Centraliza dados de navegação, produtos, serviços e metadados.
 * Mantém código escalável e fácil de manter.
 */

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
  description:
    "Infraestrutura de cibersegurança e privacidade engenheirada para empresas modernas.",
  email: "contact@xzark.co",
  twitter: "@xzark",
  github: "https://github.com/xzark",
  linkedin: "https://linkedin.com/company/xzarkinc",
  // Idiomas suportados
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
  metrics: { label: string; value: string }[]
  status: "GA" | "Beta" | "Preview"
}

/** Catálogo de produtos xZark */
export const products: Product[] = [
  {
    slug: "xauth",
    name: "xAuth",
    category: "Identity",
    tagline: "Autenticação zero-trust de nova geração",
    description:
      "Autenticação multifator, SSO, passkeys e identidade descentralizada. Compatível com OIDC, SAML 2.0 e WebAuthn.",
    icon: Fingerprint,
    features: [
      "Passkeys e WebAuthn nativos",
      "MFA adaptativo com risk scoring",
      "SSO empresarial (SAML, OIDC)",
      "Identidade federada e descentralizada",
      "Audit log imutável",
      "SDKs em 12 linguagens",
    ],
    metrics: [
      { label: "Latência média", value: "8ms" },
      { label: "Uptime SLA", value: "99.99%" },
      { label: "Compliance", value: "SOC 2 / ISO 27001" },
    ],
    status: "GA",
  },
  {
    slug: "xshield",
    name: "xShield",
    category: "Threat Protection",
    tagline: "Proteção contínua contra ameaças avançadas",
    description:
      "WAF de borda, mitigação DDoS L3-L7 e detecção comportamental baseada em ML. Bloqueia em microsegundos.",
    icon: Shield,
    features: [
      "WAF programável com regras customizadas",
      "Mitigação DDoS até 10 Tbps",
      "Bot management com fingerprinting",
      "Rate limiting distribuído",
      "Threat intelligence em tempo real",
      "Modo aprendizado automático",
    ],
    metrics: [
      { label: "Bloqueio médio", value: "< 1ms" },
      { label: "Capacidade", value: "10 Tbps" },
      { label: "Falsos positivos", value: "< 0.01%" },
    ],
    status: "GA",
  },
  {
    slug: "xvault",
    name: "xVault",
    category: "Secrets & Encryption",
    tagline: "Cofre criptográfico de nível militar",
    description:
      "Gerenciamento de segredos, chaves e certificados com criptografia ponta a ponta e HSM dedicado.",
    icon: KeyRound,
    features: [
      "Criptografia AES-256 + ChaCha20",
      "HSM FIPS 140-3 Level 3",
      "Rotação automática de segredos",
      "Envelope encryption",
      "Audit trail criptográfico",
      "Compliance HIPAA, PCI-DSS",
    ],
    metrics: [
      { label: "Throughput", value: "50k ops/s" },
      { label: "Certificação", value: "FIPS 140-3" },
      { label: "Regiões", value: "32 globais" },
    ],
    status: "GA",
  },
  {
    slug: "xcloud",
    name: "xCloud",
    category: "Infrastructure",
    tagline: "Cloud privada e soberana, sob seu controle",
    description:
      "Infraestrutura sob demanda com isolamento total, soberania de dados e conformidade regional.",
    icon: Cloud,
    features: [
      "Isolamento por hardware",
      "Soberania de dados regional",
      "BYOK (Bring Your Own Key)",
      "Network segmentation nativa",
      "Backup imutável geo-redundante",
      "Compliance LGPD, GDPR, CCPA",
    ],
    metrics: [
      { label: "Datacenters", value: "32 regiões" },
      { label: "Isolamento", value: "Hardware-level" },
      { label: "Disponibilidade", value: "99.999%" },
    ],
    status: "Beta",
  },
  {
    slug: "xgate",
    name: "xGate",
    category: "Network",
    tagline: "Gateway seguro com inspeção zero-trust",
    description:
      "API gateway, mesh service e proxy reverso com mTLS, políticas declarativas e observabilidade completa.",
    icon: Network,
    features: [
      "mTLS automático",
      "Políticas declarativas (OPA)",
      "Service mesh nativo",
      "Rate limiting por consumidor",
      "Tracing distribuído",
      "Edge computing global",
    ],
    metrics: [
      { label: "Latência p99", value: "12ms" },
      { label: "Throughput", value: "1M req/s" },
      { label: "PoPs", value: "240+" },
    ],
    status: "Preview",
  },
]

/** Configuração de documentação */
export interface Documentation {
  slug: ProductSlug
  title: string
  description: string
  icon: LucideIcon
  category: string
  tagline: string
  status: "GA" | "Beta" | "Preview"
}

export const documentation: Documentation[] = products.map((p) => ({
  slug: p.slug,
  title: `${p.name} Documentation`,
  description: `Guia de integração, referência de API e melhores práticas para ${p.name}.`,
  icon: p.icon,
  category: p.category,
  tagline: p.tagline,
  status: p.status,
}))

/** Serviços profissionais */
export interface Service {
  slug: string
  title: string
  description: string
  icon: LucideIcon
  deliverables: string[]
}

export const services: Service[] = [
  {
    slug: "security-audit",
    title: "Security Audit",
    description:
      "Auditoria completa de postura de segurança com análise de código, infraestrutura e processos.",
    icon: ShieldCheck,
    deliverables: [
      "Pentest infraestrutura + aplicação",
      "Análise SAST/DAST",
      "Relatório executivo + técnico",
      "Plano de remediação priorizado",
    ],
  },
  {
    slug: "incident-response",
    title: "Incident Response",
    description:
      "Resposta 24/7 a incidentes de segurança com equipe forense dedicada e contenção em horas.",
    icon: Radar,
    deliverables: [
      "SOC dedicado 24/7/365",
      "Forensics e cadeia de custódia",
      "Contenção e erradicação",
      "Post-mortem e lições aprendidas",
    ],
  },
  {
    slug: "compliance",
    title: "Compliance & Governance",
    description:
      "Adequação a frameworks regulatórios: LGPD, GDPR, SOC 2, ISO 27001, PCI-DSS e HIPAA.",
    icon: Lock,
    deliverables: [
      "Gap analysis regulatório",
      "Implementação de controles",
      "Preparação para auditoria externa",
      "Treinamento de equipe",
    ],
  },
  {
    slug: "zero-trust",
    title: "Zero Trust Architecture",
    description:
      "Desenho e implementação de arquitetura zero-trust ponta a ponta para sua organização.",
    icon: Users,
    deliverables: [
      "Mapeamento de superfície de ataque",
      "Microsegmentação de rede",
      "Identidade e acesso granular",
      "Migração progressiva sem downtime",
    ],
  },
  {
    slug: "threat-hunting",
    title: "Threat Hunting",
    description:
      "Caça proativa a ameaças avançadas e APTs com inteligência humana e automação.",
    icon: Activity,
    deliverables: [
      "Análise comportamental",
      "Threat intelligence customizada",
      "Detecção de APTs",
      "Hardening contínuo",
    ],
  },
  {
    slug: "managed-security",
    title: "Managed Security",
    description:
      "Operação completa da sua segurança como serviço gerenciado, com SLA e métricas claras.",
    icon: Zap,
    deliverables: [
      "Monitoramento contínuo",
      "Patch management",
      "Vulnerability management",
      "Reports executivos mensais",
    ],
  },
]

/** Navegação principal */
export const mainNav = [
  { label: "Produtos", href: "/products" },
  { label: "Serviços", href: "/services" },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Segurança", href: "/security" },
  { label: "Sobre", href: "/about" },
] as const

/** Mensagens da barra de anúncios */
export const announcements = [
  "INFRAESTRUTURA SOBERANA — DISPONÍVEL EM 32 REGIÕES",
  "SOC 2 TYPE II + ISO 27001 CERTIFICADO",
  "RESPOSTA A INCIDENTES 24/7/365",
  "ZERO TRUST POR DESIGN — SEM EXCEÇÕES",
  "xCLOUD AGORA EM BETA — SOLICITE ACESSO",
  "TLS 1.3 + POST-QUANTUM READY",
] as const

/** Stats globais (homepage) */
export const globalStats = [
  { label: "Requisições inspecionadas", value: "12.4T", suffix: "/ano" },
  { label: "Ameaças bloqueadas", value: "2.8B", suffix: "/mês" },
  { label: "Latência média", value: "< 8", suffix: "ms" },
  { label: "Uptime garantido", value: "99.999", suffix: "%" },
]
