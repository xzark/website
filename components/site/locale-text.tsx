"use client"

import { useEffect, useState, type ReactNode } from "react"
import { isLocale, type Locale } from "@/lib/i18n"

export function LocaleText({ pt, en }: { pt: ReactNode; en: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt-BR")

  useEffect(() => {
    const readLocale = () => {
      const stored = document.cookie.split("; ").find((item) => item.startsWith("xzark-locale="))?.split("=")[1]
      if (isLocale(stored)) setLocale(stored)
    }
    readLocale()
    window.addEventListener("xzark-locale-change", readLocale)
    return () => window.removeEventListener("xzark-locale-change", readLocale)
  }, [])

  return <>{locale === "en" ? en : pt}</>
}
