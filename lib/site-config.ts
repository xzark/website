
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

export const mainNav = [
  { label: "Segurança", href: "/security" },
  { label: "Sobre", href: "/about" },
  { label: "Careers", href: "/careers" },
] as const

export const announcements = ["INFRAESTRUTURA DE SEGURANÇA — CONCEITOS E PESQUISA", "PRIVACIDADE E SEGURANÇA POR DESIGN", "ARQUITETURA ZERO-TRUST — EM EVOLUÇÃO CONTÍNUA"] as const
export const businessAddress = siteConfig.businessAddress
