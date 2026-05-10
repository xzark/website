import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// Fontes — Geist Sans (UI), Geist Mono (código/acentos), Instrument Serif (acentos editoriais)
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
})

// Metadata global — SEO otimizado, defensivo
export const metadata: Metadata = {
  metadataBase: new URL("https://xzark.co"),
  title: {
    default: "xZark — Cybersecurity & Privacy Infrastructure",
    template: "%s — xZark",
  },
  description:
    "Infraestrutura de cibersegurança e privacidade para empresas que não toleram falhas. Autenticação, proteção, vault, cloud e gateway em uma única plataforma.",
  keywords: [
    "cybersecurity",
    "cibersegurança",
    "privacy",
    "privacidade",
    "zero trust",
    "xAuth",
    "xShield",
    "xVault",
    "xCloud",
    "xGate",
    "infrastructure",
    "enterprise security",
  ],
  authors: [{ name: "xZark" }],
  creator: "xZark",
  publisher: "xZark",
  generator: "xZark Platform",
  applicationName: "xZark",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES"],
    url: "https://xzark.co",
    siteName: "xZark",
    title: "xZark — Cybersecurity & Privacy Infrastructure",
    description:
      "Infraestrutura de cibersegurança e privacidade engenheirada para empresas modernas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "xZark — Cybersecurity & Privacy Infrastructure",
    description:
      "Infraestrutura de cibersegurança e privacidade engenheirada para empresas modernas.",
    creator: "@xzark",
  },
  // Robots — defensivo, sem indexar áreas sensíveis (configurado via robots.ts)
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      en: "/en",
      es: "/es",
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  category: "technology",
}

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} dark bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased min-h-screen bg-background text-foreground selection:bg-primary/30">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
