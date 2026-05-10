/**
 * Loading global — exibido durante navegação suspensa entre rotas.
 * Renderiza uma barra superior animada minimalista (estilo Vercel/Linear).
 */
export default function Loading() {
  return (
    <div className="fixed inset-x-0 top-0 z-[100] h-px overflow-hidden">
      <div className="h-full w-1/3 animate-[loading_1.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-primary to-transparent" />
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  )
}
