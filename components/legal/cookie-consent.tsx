"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Analytics } from "@vercel/analytics/next"

const preferenceCookieName = "xzark_cookie_preferences"
type Preferences = { necessary: true; functional: false; analytics: boolean; marketing: false }

function readPreferences(): Preferences | null {
  const value = document.cookie.split("; ").find((cookie) => cookie.startsWith(`${preferenceCookieName}=`))?.slice(preferenceCookieName.length + 1)
  if (!value) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as Partial<Preferences>
    if (parsed.necessary !== true || typeof parsed.analytics !== "boolean") return null
    return { necessary: true, functional: false, analytics: parsed.analytics, marketing: false }
  } catch {
    return null
  }
}

function savePreferences(analytics: boolean) {
  const value = encodeURIComponent(JSON.stringify({ necessary: true, functional: false, analytics, marketing: false }))
  const secure = window.location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `${preferenceCookieName}=${value}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`
  window.dispatchEvent(new Event("xzark:cookie-preferences-changed"))
}

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [customizing, setCustomizing] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    const preferences = readPreferences()
    setVisible(!preferences)
    setAnalytics(preferences?.analytics ?? false)
  }, [])

  function choose(value: boolean) {
    savePreferences(value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside aria-label="Cookie preferences" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl border border-border bg-background/95 p-5 shadow-2xl backdrop-blur sm:inset-x-6 sm:bottom-6 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-base font-medium">Your privacy choices</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">We use a necessary preference cookie. Optional Vercel Web Analytics stays off unless you allow it. No advertising cookies are configured.</p>
          <Link href="/cookies" className="mt-2 inline-block text-xs text-foreground underline underline-offset-4 hover:text-primary">Read the Cookie Policy</Link>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button type="button" onClick={() => choose(true)} className="border border-primary bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90">Accept All</button>
          <button type="button" onClick={() => choose(false)} className="border border-border px-3 py-2 text-xs font-medium transition-colors hover:border-primary/60">Reject Non-Essential</button>
          <button type="button" aria-expanded={customizing} onClick={() => setCustomizing((current) => !current)} className="border border-border px-3 py-2 text-xs font-medium transition-colors hover:border-primary/60">Customize Preferences</button>
        </div>
      </div>
      {customizing && <div className="mt-5 border-t border-border/70 pt-4">
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" checked disabled aria-label="Strictly necessary preference cookie, always active" className="mt-1 accent-primary" />
          <span><span className="font-medium">Strictly necessary</span><span className="block text-xs leading-relaxed text-muted-foreground">Stores your privacy choice and is always active.</span></span>
        </label>
        <label className="mt-4 flex items-start gap-3 text-sm">
          <input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} className="mt-1 accent-primary" />
          <span><span className="font-medium">Analytics</span><span className="block text-xs leading-relaxed text-muted-foreground">Enables cookieless Vercel Web Analytics in production.</span></span>
        </label>
        <p className="mt-3 text-xs text-muted-foreground">Functional and advertising cookies are not currently configured.</p>
        <button type="button" onClick={() => choose(analytics)} className="mt-4 border border-primary px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/10">Save Preferences</button>
      </div>}
    </aside>
  )
}

export function CookiePreferencesManager() {
  const [analytics, setAnalytics] = useState(false)
  const [saved, setSaved] = useState(false)
  const [customizing, setCustomizing] = useState(false)

  useEffect(() => {
    setAnalytics(readPreferences()?.analytics ?? false)
  }, [])

  function choose(value: boolean) {
    savePreferences(value)
    setAnalytics(value)
    setSaved(true)
  }

  return (
    <div className="border border-border/70 bg-card/30 p-5 md:p-6">
      <h3 className="text-base font-medium">Manage your cookie preferences</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Your current selection is shown below. You can change it at any time; the choice takes effect immediately.</p>
      <label className="mt-5 flex items-start gap-3 text-sm">
        <input type="checkbox" checked disabled aria-label="Strictly necessary preference cookie, always active" className="mt-1 accent-primary" />
        <span><span className="font-medium">Strictly necessary</span><span className="block text-xs leading-relaxed text-muted-foreground">Preference storage is always active so the site can remember your choice.</span></span>
      </label>
      {customizing ? <label className="mt-4 flex items-start gap-3 text-sm">
        <input type="checkbox" checked={analytics} onChange={(event) => { setAnalytics(event.target.checked); setSaved(false) }} className="mt-1 accent-primary" />
        <span><span className="font-medium">Analytics</span><span className="block text-xs leading-relaxed text-muted-foreground">Optional, cookieless Vercel Web Analytics in production.</span></span>
      </label> : <p className="mt-4 text-sm text-muted-foreground">Current analytics preference: {analytics ? "allowed" : "off"}.</p>}
      <p className="mt-3 text-xs text-muted-foreground">Functional and advertising cookies are not currently configured.</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={() => choose(true)} className="border border-primary bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90">Accept All</button>
        <button type="button" onClick={() => choose(false)} className="border border-border px-3 py-2 text-xs font-medium transition-colors hover:border-primary/60">Reject Non-Essential</button>
        <button type="button" aria-expanded={customizing} onClick={() => setCustomizing((current) => !current)} className="border border-border px-3 py-2 text-xs font-medium transition-colors hover:border-primary/60">Customize Preferences</button>
        {customizing && <button type="button" onClick={() => choose(analytics)} className="border border-border px-3 py-2 text-xs font-medium transition-colors hover:border-primary/60">Save Preferences</button>}
      </div>
      <p role="status" aria-live="polite" className="mt-3 min-h-5 text-xs text-muted-foreground">{saved ? "Your preferences have been saved." : ""}</p>
    </div>
  )
}

export function CookieAnalytics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const update = () => setEnabled(readPreferences()?.analytics ?? false)
    update()
    window.addEventListener("xzark:cookie-preferences-changed", update)
    return () => window.removeEventListener("xzark:cookie-preferences-changed", update)
  }, [])

  if (process.env.NODE_ENV !== "production" || !enabled) return null
  return <Analytics />
}
