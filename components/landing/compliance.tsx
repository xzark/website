/**
 * Compliance — faixa de certificações e selos regulatórios.
 * Apresentação técnica, sem stickers genéricos.
 */
const certs = [
  { name: "SOC 2 Type II", code: "AICPA / 2026" },
  { name: "ISO/IEC 27001", code: "ISO / 2025" },
  { name: "ISO/IEC 27701", code: "Privacy / 2025" },
  { name: "PCI-DSS Level 1", code: "PCI SSC / 2026" },
  { name: "HIPAA", code: "HHS / U.S." },
  { name: "LGPD", code: "ANPD / Brasil" },
  { name: "GDPR", code: "EU / 2018" },
  { name: "CCPA", code: "California / U.S." },
]

export function Compliance() {
  return (
    <section
      aria-labelledby="compliance-heading"
      className="border-b border-border/60 bg-background py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2
            id="compliance-heading"
            className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground"
          >
            Compliance & Certificações
          </h2>
          <p className="font-mono text-[11px] text-muted-foreground">
            Auditados anualmente por terceiros independentes
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-border/60 md:grid-cols-4">
          {certs.map((c) => (
            <div
              key={c.name}
              className="bg-card px-5 py-6"
              style={{ boxShadow: "0 0 0 1px var(--border)" }}
            >
              <p className="text-sm font-medium tracking-tight text-foreground">
                {c.name}
              </p>
              <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                {c.code}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
