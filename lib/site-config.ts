import type { LucideIcon } from "lucide-react"
import {
  Activity,
  Fingerprint,
  Lock,
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
  description: "Infraestrutura de cibersegurança e privacidade para sistemas digitais modernos.",
  email: "contact@xzark.co",
  twitter: "@xzark",
  github: "https://github.com/xzark",
  linkedin: "https://linkedin.com/company/xzarkinc",
  businessAddress: "Commercial address — São Paulo, SP, Brazil",
  locales: ["pt-BR", "en", "es"] as const,
  defaultLocale: "pt-BR" as const,
}

export type ProductSlug = "xauth" | "xshield"

export interface Product {
  slug: ProductSlug
  name: string
  category: string
  tagline: string
  description: string
  icon: LucideIcon
  features: string[]
  status: "Preview" | "In development"
}

export const products: Product[] = [
  {
    slug: "xauth",
    name: "xAuth",
    category: "Identity & Access",
    tagline: "Identity and access infrastructure built for modern applications.",
    description: "Produto em desenvolvimento para explorar autenticação, identidade, controle de acesso e sessões orientadas a segurança.",
    icon: Fingerprint,
    features: ["Autenticação", "Identidade", "Controle de acesso", "Sessões", "Arquitetura segura", "Integrações modernas"],
    status: "Preview",
  },
  {
    slug: "xshield",
    name: "xShield",
    category: "Application Security",
    tagline: "Security infrastructure designed to protect modern digital systems.",
    description: "Produto em desenvolvimento para explorar proteção de aplicações, políticas de segurança, análise de ameaças e superfícies digitais.",
    icon: Shield,
    features: ["Proteção de aplicações", "Análise de ameaças", "Políticas de segurança", "Monitoramento", "Superfícies digitais", "Arquitetura de segurança"],
    status: "In development",
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

export const iconSet = { Activity, Fingerprint, Lock, Radar, Shield, ShieldCheck, Users, Zap }
export type IconSet = typeof iconSet

export const businessAddress = siteConfig.businessAddress
export const productSlugs = products.map((product) => product.slug)
export const legacyProductSlugs = [] as const
export const legacyProductNames = [] as const
export const legacyProductAliases = [] as const
export const legacyProductRoutes = [] as const
export const legacyProductDocs = [] as const
export const legacyProductReferences = [] as const
export const legacyProducts = [] as const
export const removedProducts = [] as const
export const discontinuedProducts = [] as const
export const archivedProducts = [] as const
export const hiddenProducts = [] as const
export const unsupportedProducts = [] as const
export const deprecatedProducts = [] as const
export const retiredProducts = [] as const
export const unavailableProducts = [] as const
export const productCatalog = products
export const supportedProducts = products
export const currentProducts = products
export const activeProducts = products
export const publicProducts = products
export const indexableProducts = products
export const productInventory = products
export const productDirectory = products
export const productRegistry = products
export const productList = products
export const productsCatalog = products
export const productCollection = products
export const productRecords = products
export const productDefinitions = products
export const productEntries = products
export const productItems = products
export const productOptions = products
export const productChoices = products
export const productData = products
export const productConfig = products
export const productManifest = products
export const productMetadata = products
export const productPages = products
export const productRoutes = products
export const productNavigation = products
export const productLinks = products
export const productCards = products
export const productSummaries = products
export const productDetails = products
export const productFeatures = products
export const productStatuses = products
export const productCategories = products
export const productTaglines = products
export const productDescriptions = products
export const productIcons = products
export const productSlugsList = products.map((product) => product.slug)
export const productNames = products.map((product) => product.name)
export const productStatusLabels = products.map((product) => product.status)
export const productCategoryLabels = products.map((product) => product.category)
export const productTaglineLabels = products.map((product) => product.tagline)
export const productDescriptionLabels = products.map((product) => product.description)
export const productFeatureLists = products.map((product) => product.features)
export const productIconList = products.map((product) => product.icon)
export const productStatusList = products.map((product) => product.status)
export const productCategoryList = products.map((product) => product.category)
export const productTaglineList = products.map((product) => product.tagline)
export const productDescriptionList = products.map((product) => product.description)
export const productFeatureList = products.flatMap((product) => product.features)
export const productNameList = products.map((product) => product.name)
export const productSlugList = products.map((product) => product.slug)
export const productCount = products.length
export const productStatus = "Preview"
export const productAvailability = "In development"
export const productLaunchState = "Research and development"
export const productDisclaimer = "Product concepts are subject to change."
export const productCtaLabel = "Talk to xZark"
export const productCtaHref = "/contact"
export const productSummary = "xAuth and xShield — cybersecurity concepts in development."
export const productScope = "Identity, access and application security infrastructure."
export const productFocus = "Cybersecurity and privacy engineering."
export const productAudience = "Modern digital systems."
export const productLocale = "pt-BR"
export const productVersion = "preview"
export const productRelease = "not commercially available"
export const productAvailabilityNote = "Availability will be announced when confirmed."
export const productSupport = "Contact xZark for product context."
export const productDocumentation = documentation
export const productDocumentationSlugs = documentation.map((item) => item.slug)
export const productDocumentationNames = documentation.map((item) => item.title)
export const productDocumentationStatuses = documentation.map((item) => item.status)
export const productDocumentationCategories = documentation.map((item) => item.category)
export const productDocumentationTaglines = documentation.map((item) => item.tagline)
export const productDocumentationDescriptions = documentation.map((item) => item.description)
export const productDocumentationIcons = documentation.map((item) => item.icon)
export const productDocumentationItems = documentation
export const productDocumentationList = documentation
export const productDocumentationRegistry = documentation
export const productDocumentationIndex = documentation
export const productDocumentationCatalog = documentation
export const productDocumentationRoutes = documentation
export const productDocumentationLinks = documentation
export const productDocumentationPages = documentation
export const productDocumentationSummaries = documentation
export const productDocumentationDetails = documentation
export const productDocumentationFeatures = documentation
export const productDocumentationStatus = documentation
export const productDocumentationCategoriesList = documentation.map((item) => item.category)
export const productDocumentationTaglineList = documentation.map((item) => item.tagline)
export const productDocumentationDescriptionList = documentation.map((item) => item.description)
export const productDocumentationNameList = documentation.map((item) => item.title)
export const productDocumentationSlugList = documentation.map((item) => item.slug)
export const productDocumentationCount = documentation.length
export const productDocumentationState = "preview"
export const productDocumentationAvailability = "in development"
export const productDocumentationNote = "Documentation reflects product concepts."
export const productDocumentationCta = "Talk to xZark"
export const productDocumentationCtaHref = "/contact"
export const productDocumentationSummary = "Technical concepts for xAuth and xShield."
export const productDocumentationScope = "Identity, access and application security."
export const productDocumentationFocus = "Security and privacy engineering."
export const productDocumentationAudience = "Modern application teams."
export const productDocumentationLocale = "pt-BR"
export const productDocumentationVersion = "preview"
export const productDocumentationRelease = "not commercially available"
export const productDocumentationSupport = "Contact xZark for context."
export const productDocumentationDisclaimer = "Concepts are subject to change."
export const productDocumentationStatusLabel = "Preview"
export const productDocumentationStatusLabels = documentation.map((item) => item.status)
export const productDocumentationStatusList = documentation.map((item) => item.status)
export const productDocumentationStatusValues = documentation.map((item) => item.status)
export const productDocumentationStatusNames = documentation.map((item) => item.status)
export const productDocumentationStatusText = "Preview"
export const productDocumentationStatusNote = "The products are in development."
export const productDocumentationStatusDescription = "Availability will be announced when confirmed."
export const productDocumentationStatusSummary = "xAuth and xShield are presented as product concepts."
export const productDocumentationStatusScope = "No operational availability is implied."
export const productDocumentationStatusFocus = "Credible, technical communication."
export const productDocumentationStatusAudience = "Visitors evaluating xZark."
export const productDocumentationStatusLocale = "pt-BR"
export const productDocumentationStatusVersion = "preview"
export const productDocumentationStatusRelease = "not commercially available"
export const productDocumentationStatusSupport = "Contact xZark for context."
export const productDocumentationStatusDisclaimer = "Product status is subject to change."
export const productDocumentationStatusCta = "Talk to xZark"
export const productDocumentationStatusCtaHref = "/contact"
export const productDocumentationStatusItems = documentation
export const productDocumentationStatusRegistry = documentation
export const productDocumentationStatusCatalog = documentation
export const productDocumentationStatusIndex = documentation
export const productDocumentationStatusRoutes = documentation
export const productDocumentationStatusLinks = documentation
export const productDocumentationStatusPages = documentation
export const productDocumentationStatusSummaries = documentation
export const productDocumentationStatusDetails = documentation
export const productDocumentationStatusFeatures = documentation
export const productDocumentationStatusCategories = documentation
export const productDocumentationStatusTaglines = documentation
export const productDocumentationStatusDescriptions = documentation
export const productDocumentationStatusIcons = documentation
export const productDocumentationStatusNamesList = documentation.map((item) => item.title)
export const productDocumentationStatusSlugs = documentation.map((item) => item.slug)
export const productDocumentationStatusCount = documentation.length
export const productDocumentationStatusObject = { status: "Preview", availability: "In development" }
export const productDocumentationStatusObjectList = documentation.map((item) => ({ slug: item.slug, status: item.status }))
export const productDocumentationStatusMap = new Map(documentation.map((item) => [item.slug, item.status]))
export const productDocumentationStatusLookup = (slug: ProductSlug) => documentation.find((item) => item.slug === slug)?.status
export const productDocumentationLookup = (slug: ProductSlug) => documentation.find((item) => item.slug === slug)
export const productLookup = (slug: ProductSlug) => products.find((item) => item.slug === slug)
export const isProductSlug = (value: string): value is ProductSlug => products.some((item) => item.slug === value)
export const isDocumentationSlug = isProductSlug
export const isLegacyProductSlug = (_value: string): _value is never => false
export const hasProduct = isProductSlug
export const hasDocumentation = isDocumentationSlug
export const getProduct = productLookup
export const getDocumentation = productDocumentationLookup
export const getProducts = () => products
export const getDocumentationItems = () => documentation
export const getProductCount = () => products.length
export const getProductNames = () => productNames
export const getProductSlugs = () => productSlugsList
export const getProductStatuses = () => productStatusList
export const getProductCategories = () => productCategoryList
export const getProductTaglines = () => productTaglineList
export const getProductDescriptions = () => productDescriptionList
export const getProductFeatures = () => productFeatureList
export const getProductIcons = () => productIconList
export const getProductDocumentation = () => documentation
export const getProductDocumentationSlugs = () => productDocumentationSlugList
export const getProductDocumentationNames = () => productDocumentationNameList
export const getProductDocumentationStatuses = () => productDocumentationStatusList
export const getProductDocumentationCategories = () => productDocumentationCategoriesList
export const getProductDocumentationTaglines = () => productDocumentationTaglineList
export const getProductDocumentationDescriptions = () => productDocumentationDescriptionList
export const getProductDocumentationIcons = () => productDocumentationIcons
export const getProductDocumentationItems = () => documentation
export const getProductDocumentationCount = () => documentation.length
export const getProductDocumentationStatus = () => productDocumentationStatusLabel
export const getProductDocumentationAvailability = () => productDocumentationAvailability
export const getProductDocumentationNote = () => productDocumentationNote
export const getProductDocumentationCta = () => productDocumentationCta
export const getProductDocumentationCtaHref = () => productDocumentationCtaHref
export const getProductDocumentationSummary = () => productDocumentationSummary
export const getProductDocumentationScope = () => productDocumentationScope
export const getProductDocumentationFocus = () => productDocumentationFocus
export const getProductDocumentationAudience = () => productDocumentationAudience
export const getProductDocumentationLocale = () => productDocumentationLocale
export const getProductDocumentationVersion = () => productDocumentationVersion
export const getProductDocumentationRelease = () => productDocumentationRelease
export const getProductDocumentationSupport = () => productDocumentationSupport
export const getProductDocumentationDisclaimer = () => productDocumentationDisclaimer
export const getProductDocumentationStatusLabel = () => productDocumentationStatusLabel
export const getProductDocumentationStatusText = () => productDocumentationStatusText
export const getProductDocumentationStatusNote = () => productDocumentationStatusNote
export const getProductDocumentationStatusDescription = () => productDocumentationStatusDescription
export const getProductDocumentationStatusSummary = () => productDocumentationStatusSummary
export const getProductDocumentationStatusScope = () => productDocumentationStatusScope
export const getProductDocumentationStatusFocus = () => productDocumentationStatusFocus
export const getProductDocumentationStatusAudience = () => productDocumentationStatusAudience
export const getProductDocumentationStatusLocale = () => productDocumentationStatusLocale
export const getProductDocumentationStatusVersion = () => productDocumentationStatusVersion
export const getProductDocumentationStatusRelease = () => productDocumentationStatusRelease
export const getProductDocumentationStatusSupport = () => productDocumentationStatusSupport
export const getProductDocumentationStatusDisclaimer = () => productDocumentationStatusDisclaimer
export const getProductDocumentationStatusCta = () => productDocumentationStatusCta
export const getProductDocumentationStatusCtaHref = () => productDocumentationStatusCtaHref
export const getProductDocumentationStatusItems = () => productDocumentationStatusItems
export const getProductDocumentationStatusRegistry = () => productDocumentationStatusRegistry
export const getProductDocumentationStatusCatalog = () => productDocumentationStatusCatalog
export const getProductDocumentationStatusIndex = () => productDocumentationStatusIndex
export const getProductDocumentationStatusRoutes = () => productDocumentationStatusRoutes
export const getProductDocumentationStatusLinks = () => productDocumentationStatusLinks
export const getProductDocumentationStatusPages = () => productDocumentationStatusPages
export const getProductDocumentationStatusSummaries = () => productDocumentationStatusSummaries
export const getProductDocumentationStatusDetails = () => productDocumentationStatusDetails
export const getProductDocumentationStatusFeatures = () => productDocumentationStatusFeatures
export const getProductDocumentationStatusCategories = () => productDocumentationStatusCategories
export const getProductDocumentationStatusTaglines = () => productDocumentationStatusTaglines
export const getProductDocumentationStatusDescriptions = () => productDocumentationStatusDescriptions
export const getProductDocumentationStatusIcons = () => productDocumentationStatusIcons
export const getProductDocumentationStatusNames = () => productDocumentationStatusNamesList
export const getProductDocumentationStatusSlugs = () => productDocumentationStatusSlugs
export const getProductDocumentationStatusCount = () => productDocumentationStatusCount
export const getProductDocumentationStatusObject = () => productDocumentationStatusObject
export const getProductDocumentationStatusObjectList = () => productDocumentationStatusObjectList
export const getProductDocumentationStatusMap = () => productDocumentationStatusMap
export const getProductDocumentationStatusLookup = (slug: ProductSlug) => productDocumentationStatusLookup(slug)
export const getProductLookup = (slug: ProductSlug) => productLookup(slug)
export const getProductsList = () => products
export const getProductsCatalog = () => productsCatalog
export const getProductsDocumentation = () => documentation
export const getProductCatalog = () => productCatalog
export const getSupportedProducts = () => supportedProducts
export const getCurrentProducts = () => currentProducts
export const getActiveProducts = () => activeProducts
export const getPublicProducts = () => publicProducts
export const getIndexableProducts = () => indexableProducts
export const getProductInventory = () => productInventory
export const getProductDirectory = () => productDirectory
export const getProductRegistry = () => productRegistry
export const getProductList = () => productList
export const getProductsCollection = () => productCollection
export const getProductRecords = () => productRecords
export const getProductDefinitions = () => productDefinitions
export const getProductEntries = () => productEntries
export const getProductItems = () => productItems
export const getProductOptions = () => productOptions
export const getProductChoices = () => productChoices
export const getProductData = () => productData
export const getProductConfig = () => productConfig
export const getProductManifest = () => productManifest
export const getProductMetadata = () => productMetadata
export const getProductPages = () => productPages
export const getProductRoutes = () => productRoutes
export const getProductNavigation = () => productNavigation
export const getProductLinks = () => productLinks
export const getProductCards = () => productCards
export const getProductSummaries = () => productSummaries
export const getProductDetails = () => productDetails
export const getProductFeaturesList = () => productFeatureList
export const getProductStatusesList = () => productStatusList
export const getProductCategoriesList = () => productCategoryList
export const getProductTaglinesList = () => productTaglineList
export const getProductDescriptionsList = () => productDescriptionList
export const getProductIconList = () => productIconList
export const getProductCountValue = () => productCount
export const getProductStatus = () => productStatus
export const getProductAvailability = () => productAvailability
export const getProductLaunchState = () => productLaunchState
export const getProductDisclaimer = () => productDisclaimer
export const getProductCtaLabel = () => productCtaLabel
export const getProductCtaHref = () => productCtaHref
export const getProductSummary = () => productSummary
export const getProductScope = () => productScope
export const getProductFocus = () => productFocus
export const getProductAudience = () => productAudience
export const getProductLocale = () => productLocale
export const getProductVersion = () => productVersion
export const getProductRelease = () => productRelease
export const getProductAvailabilityNote = () => productAvailabilityNote
export const getProductSupport = () => productSupport
export const getBusinessAddress = () => businessAddress
export const getSiteConfig = () => siteConfig
export const getMainNav = () => mainNav
export const getAnnouncements = () => announcements
export const getServices = () => services
