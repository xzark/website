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

export type ProductSlug =
  | "xauth"
  | "xshield"
  | "xvault"
  | "xcloud"
  | "xgate"

export interface PricingPlan {
  name: string
  price: string
  description: string
  highlight?: boolean
  badge?: string
  features: string[]
  cta: string
}

export interface Product {
  slug: ProductSlug
  name: string
  category: string
  tagline: string
  description: string
  icon: LucideIcon
  features: string[]
  metrics: { label: string; value: string }[]
  pricing?: PricingPlan[]
  status: "GA" | "Beta" | "Preview"
  button?: {
    text: string
    link?: string
  }
}

/** Catálogo de produtos xZark */
export const products: Product[] = [
  {
    slug: "xauth",
    name: "xAuth",
    category: "Identity",
    tagline: "Autenticação zero-trust moderna para aplicações escaláveis",
    description:
      "Infraestrutura completa de autenticação com MFA, passkeys, SSO, sessões inteligentes e segurança enterprise.",

    icon: Fingerprint,

    features: [
      "Passkeys e WebAuthn nativos",
      "MFA adaptativo com análise de risco",
      "SSO empresarial (OIDC/SAML)",
      "Sessões seguras com rotação automática",
      "Audit logs avançados",
      "SDKs modernos e type-safe",
    ],

    metrics: [
      { label: "Latência média", value: "8ms" },
      { label: "Uptime", value: "99.99%" },
      { label: "SDKs", value: "12 linguagens" },
    ],

    button: {
      text: "Planos e preços",
      link: "#pricing",
    },

    pricing: [
      {
        name: "Free",
        price: "R$0",
        description: "Ideal para MVPs e projetos pessoais.",
        badge: "Starter",

        cta: "Começar grátis",

        features: [
          "Até 10.000 usuários ativos",
          "JWT e login social",
          "MFA básico",
          "SDKs oficiais",
          "Sessões seguras",
          "Rate limiting",
        ],
      },

      {
        name: "Pro",
        price: "R$79/mês",

        description: "Escala segura para startups e SaaS modernos.",

        badge: "Popular",

        highlight: true,

        cta: "Fazer upgrade",

        features: [
          "Até 100.000 usuários ativos",
          "Passkeys e WebAuthn",
          "SSO OIDC/SAML",
          "Risk scoring avançado",
          "Logs e auditoria",
          "Organizações e RBAC",
          "Webhooks",
          "Analytics de sessões",
          "Suporte prioritário",
        ],
      },

      {
        name: "Enterprise",

        price: "Sob consulta",

        description: "Infraestrutura corporativa crítica.",

        badge: "Custom",

        cta: "Falar com vendas",

        features: [
          "Usuários ilimitados",
          "Cluster dedicado",
          "Compliance avançado",
          "SLA 24/7",
          "Deploy híbrido/on-premise",
          "SIEM integrations",
          "Threat intelligence",
          "Engenheiro dedicado",
        ],
      },
    ],

    status: "GA",
  },

  {
    slug: "xshield",

    name: "xShield",

    category: "Threat Protection",

    tagline: "Proteção contínua contra ataques e ameaças modernas",

    description:
      "Firewall inteligente, mitigação DDoS e proteção comportamental em tempo real.",

    icon: Shield,

    features: [
      "WAF programável",
      "Mitigação DDoS distribuída",
      "Bot management",
      "Threat intelligence",
      "Rate limiting avançado",
      "Detecção comportamental",
    ],

    metrics: [
      { label: "Mitigação", value: "< 1ms" },
      { label: "Capacidade", value: "10 Tbps" },
      { label: "Precisão", value: "99.99%" },
    ],

    status: "GA",
  },

  {
    slug: "xvault",

    name: "xVault",

    category: "Secrets & Encryption",

    tagline: "Gerenciamento seguro de segredos e criptografia avançada",

    description:
      "Cofre criptográfico moderno para segredos, tokens, certificados e chaves.",

    icon: KeyRound,

    features: [
      "AES-256 e ChaCha20",
      "Rotação automática",
      "HSM integrado",
      "Audit trail criptográfico",
      "Envelope encryption",
      "API segura",
    ],

    metrics: [
      { label: "Throughput", value: "50k ops/s" },
      { label: "Criptografia", value: "FIPS 140-3" },
      { label: "Regiões", value: "32 globais" },
    ],

    pricing: [
      {
        name: "Free",

        price: "R$0",

        description: "Cofre básico para desenvolvimento.",

        badge: "Starter",

        cta: "Usar grátis",

        features: [
          "100 segredos",
          "Criptografia padrão",
          "API básica",
          "Logs simples",
        ],
      },

      {
        name: "Pro",

        price: "R$99/mês",

        description: "Proteção robusta para aplicações modernas.",

        badge: "Popular",

        highlight: true,

        cta: "Upgrade premium",

        features: [
          "Rotação automática",
          "Audit logs",
          "HSM integrado",
          "Backups seguros",
          "Segredos ilimitados",
        ],
      },

      {
        name: "Enterprise",

        price: "Sob consulta",

        description: "Infraestrutura criptográfica corporativa.",

        badge: "Custom",

        cta: "Falar com especialista",

        features: [
          "HSM dedicado",
          "Compliance completo",
          "Multi-região",
          "SLA corporativo",
          "Infraestrutura isolada",
        ],
      },
    ],

    button: {
      text: "Planos e preços",
      link: "#pricing",
    },

    status: "GA",
  },

  {
    slug: "xcloud",

    name: "xCloud",

    category: "Infrastructure",

    tagline: "Cloud privada moderna com soberania de dados",

    description:
      "Infraestrutura segura, escalável e preparada para workloads críticos.",

    icon: Cloud,

    features: [
      "Isolamento por hardware",
      "Backups imutáveis",
      "Compliance LGPD/GDPR",
      "Segmentação de rede",
      "Geo redundância",
      "BYOK",
    ],

    metrics: [
      { label: "Regiões", value: "32 globais" },
      { label: "Disponibilidade", value: "99.999%" },
      { label: "Isolamento", value: "Hardware-level" },
    ],

    pricing: [
      {
        name: "Free",

        price: "R$0",

        description: "Sandbox para testes e desenvolvimento.",

        badge: "Starter",

        cta: "Criar ambiente",

        features: [
          "1 instância",
          "Recursos limitados",
          "Storage básico",
          "Deploy simples",
        ],
      },

      {
        name: "Pro",

        price: "R$297/mês",

        description: "Infraestrutura privada escalável.",

        badge: "Popular",

        highlight: true,

        cta: "Solicitar cloud",

        features: [
          "Cluster privado",
          "Backups automáticos",
          "Rede dedicada",
          "Compliance regional",
          "Monitoramento avançado",
        ],
      },

      {
        name: "Enterprise",

        price: "Sob consulta",

        description: "Cloud soberana corporativa.",

        badge: "Custom",

        cta: "Arquitetura dedicada",

        features: [
          "Datacenter dedicado",
          "Deploy híbrido",
          "Operação personalizada",
          "SLA máximo",
          "Infraestrutura isolada",
        ],
      },
    ],

    status: "Beta",
  },

  {
    slug: "xgate",

    name: "xGate",

    category: "Network",

    tagline: "Gateway seguro com arquitetura zero-trust",

    description:
      "API gateway e service mesh moderno com observabilidade completa.",

    icon: Network,

    features: [
      "mTLS automático",
      "Tracing distribuído",
      "Políticas declarativas",
      "Service mesh",
      "Edge global",
      "Rate limiting",
    ],

    metrics: [
      { label: "Latência p99", value: "12ms" },
      { label: "Throughput", value: "1M req/s" },
      { label: "PoPs", value: "240+" },
    ],

    pricing: [
      {
        name: "Free",

        price: "R$0",

        description: "Gateway básico para APIs pequenas.",

        badge: "Starter",

        cta: "Começar",

        features: [
          "10k requests/dia",
          "mTLS básico",
          "Dashboard simples",
          "Logs básicos",
        ],
      },

      {
        name: "Pro",

        price: "R$129/mês",

        description: "Alta performance para aplicações modernas.",

        badge: "Popular",

        highlight: true,

        cta: "Ativar premium",

        features: [
          "1M requests/s",
          "Observabilidade completa",
          "Rate limiting avançado",
          "Mesh distribuído",
          "Analytics avançado",
        ],
      },

      {
        name: "Enterprise",

        price: "Sob consulta",

        description: "Rede corporativa global.",

        badge: "Custom",

        cta: "Contato comercial",

        features: [
          "PoPs dedicados",
          "Edge privado",
          "Arquitetura customizada",
          "SLA enterprise",
          "Suporte dedicado",
        ],
      },
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
