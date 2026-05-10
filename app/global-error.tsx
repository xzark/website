"use client"

/**
 * Global Error — fallback de último recurso quando o root layout falha.
 * Não pode importar nada do tema; renderiza HTML/CSS auto-contido.
 */
export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          color: "#fafafa",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: 420, textAlign: "center" }}>
          <div
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#888",
              marginBottom: 8,
            }}
          >
            Falha crítica
          </div>
          <h1
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 28,
              margin: "0 0 12px",
            }}
          >
            Servico indisponível
          </h1>
          <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.6, margin: "0 0 24px" }}>
            Houve um problema crítico ao carregar a aplicação. Tente recarregar
            a página ou volte mais tarde.
          </p>
          <button
            onClick={reset}
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              border: "1px solid #333",
              background: "#fafafa",
              color: "#050505",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Recarregar
          </button>
        </div>
      </body>
    </html>
  )
}
