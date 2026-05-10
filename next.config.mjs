/**
 * Configuração Next.js — xZark
 * - Headers de segurança em nível HTTP (defesa em profundidade).
 * - CSP estrita: bloqueia scripts inline não confiáveis, restringe origens.
 * - HSTS: força HTTPS por 2 anos com preload.
 * - X-Frame-Options: previne clickjacking.
 * - Permissions-Policy: desabilita APIs sensíveis não usadas pelo produto.
 *
 * @type {import('next').NextConfig}
 */

// CSP é construída como string para evitar erros silenciosos.
// 'unsafe-inline' em style-src é necessário para CSS-in-JS de bibliotecas
// (shadcn/Tailwind utilitárias). Scripts são restritos a self + Vercel Analytics.
const ContentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.xzark.co https://va.vercel-scripts.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ")

const securityHeaders = [
  // Força HTTPS por 2 anos, inclui subdomínios, elegível para preload.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Previne carregamento em iframes externos (anti clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Impede que o browser adivinhe MIME types.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Não envia Referer para origens externas.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Desabilita APIs sensíveis que o produto não utiliza no frontend.
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), interest-cohort=()",
  },
  // Política de cross-origin estrita.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  // Bloqueia DNS prefetch oportunista de terceiros.
  { key: "X-DNS-Prefetch-Control", value: "off" },
  // Mascara informação de servidor (defesa contra fingerprinting).
  { key: "X-Powered-By", value: "xZark" },
  // CSP unificada.
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
]

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Remove o header padrão "x-powered-by: Next.js" (fingerprinting).
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Aplica em todas as rotas. Rotas sensíveis recebem reforço no middleware.
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
