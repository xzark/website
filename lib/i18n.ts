export const locales = ["pt-BR", "en"] as const
export type Locale = (typeof locales)[number]

export const translations = {
  "pt-BR": {
    language: "Idioma",
    portuguese: "Português (Brasil)",
    english: "English",
    contact: "Contato",
    products: "Produtos",
    services: "Serviços",
    security: "Segurança",
    about: "Sobre",
    careers: "Careers",
    faq: "FAQ",
    terms: "Termos de Uso",
    privacy: "Política de Privacidade",
    cookies: "Política de Cookies",
    cookieSettings: "Configurações de cookies",
    menuOpen: "Abrir menu",
    menuClose: "Fechar menu",
  },
  en: {
    language: "Language",
    portuguese: "Português (Brasil)",
    english: "English",
    contact: "Contact",
    products: "Products",
    services: "Services",
    security: "Security",
    about: "About",
    careers: "Careers",
    faq: "FAQ",
    terms: "Terms of Use",
    privacy: "Privacy Policy",
    cookies: "Cookie Policy",
    cookieSettings: "Cookie Settings",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
} as const

export type TranslationKey = keyof typeof translations["pt-BR"]
export function t(locale: Locale, key: TranslationKey) { return translations[locale][key] }
export function isLocale(value: string | undefined): value is Locale { return value === "pt-BR" || value === "en" }
