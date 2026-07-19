"use client"

/**
 * useSession — hook client para ler o usuário atual via SWR.
 *
 * Usa o endpoint /api/auth/session (no-store). Ideal para UI que precisa
 * reagir ao estado de autenticação sem tornar a página inteira dinâmica.
 */
import useSWR from "swr"
import type { PublicUser } from "./types"

async function fetcher(url: string): Promise<{ user: PublicUser | null }> {
  const res = await fetch(url, { credentials: "same-origin" })
  if (!res.ok) throw new Error("Falha ao carregar sessão")
  return res.json()
}

export function useSession() {
  const { data, error, isLoading, mutate } = useSWR("/api/auth/session", fetcher, {
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  })

  return {
    user: data?.user ?? null,
    isLoading,
    isError: Boolean(error),
    mutate,
  }
}
