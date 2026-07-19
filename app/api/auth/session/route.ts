/**
 * GET /api/auth/session — retorna o perfil público do usuário atual (ou null).
 *
 * Consumido pelo Header (client) via SWR para alternar entre "Entrar" e o
 * menu autenticado sem precisar tornar cada página um Server Component
 * consciente de sessão.
 */
import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function GET() {
  const user = await getCurrentUser()
  return NextResponse.json(
    { user },
    { headers: { "cache-control": "no-store" } },
  )
}
