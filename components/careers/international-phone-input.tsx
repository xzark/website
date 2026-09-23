"use client"

import { useMemo, useState } from "react"
import { AsYouType, getCountries, getCountryCallingCode, getExampleNumber, parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js"
import examples from "libphonenumber-js/examples.mobile.json"
import { Search, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type InternationalPhoneInputProps = {
  country: CountryCode
  value: string
  onCountryChange: (country: CountryCode) => void
  onChange: (displayValue: string, e164Value: string, isValid: boolean) => void
  onBlur?: () => void
}

const countryNames = new Intl.DisplayNames(["en"], { type: "region" })
const preferredCountries: CountryCode[] = ["BR", "US", "GB", "PT", "CA", "ES", "FR", "DE"]

function flag(country: CountryCode) {
  return country.toUpperCase().replace(/./g, (letter) => String.fromCodePoint(letter.charCodeAt(0) + 127397))
}

function label(country: CountryCode) {
  return countryNames.of(country) ?? country
}

function placeholder(country: CountryCode) {
  const example = getExampleNumber(country, examples)
  return example ? new AsYouType(country).input(example.nationalNumber) : "Número de telefone"
}

export function InternationalPhoneInput({ country, value, onCountryChange, onChange, onBlur }: InternationalPhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const countries = useMemo(() => {
    const all = getCountries()
    const query = search.trim().toLowerCase()
    return [...preferredCountries, ...all.filter((item) => !preferredCountries.includes(item))].filter((item, index, list) => {
      if (list.indexOf(item) !== index) return false
      return !query || label(item).toLowerCase().includes(query) || item.toLowerCase().includes(query)
    })
  }, [search])

  const callingCode = getCountryCallingCode(country)
  const handleChange = (raw: string) => {
    const digits = raw.replace(/[^\d+]/g, "")
    const hasCallingCode = digits.startsWith(`+${callingCode}`)
    const nationalInput = hasCallingCode ? digits.slice(callingCode.length + 1) : digits.replace(/^\+/, "")
    const formatter = new AsYouType(country)
    const displayValue = formatter.input(nationalInput)
    const parsed = parsePhoneNumberFromString(displayValue, country)
    onChange(displayValue, parsed?.number ?? "", Boolean(parsed?.isValid()))
  }

  return <div className="flex min-w-0 gap-2">
    <div className="relative shrink-0">
      <button type="button" aria-expanded={isOpen} aria-haspopup="listbox" onClick={() => setIsOpen((open) => !open)} className="flex h-10 items-center gap-2 border border-input bg-background px-3 text-sm hover:bg-accent" aria-label={`País: ${label(country)}`}>
        <span aria-hidden="true" className="text-lg">{flag(country)}</span><span className="font-mono text-xs">+{callingCode}</span><ChevronDown className="size-3.5 text-muted-foreground" />
      </button>
      {isOpen && <div className="absolute left-0 top-12 z-20 w-72 border border-border bg-popover p-2 shadow-xl">
        <div className="relative"><Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" /><Input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search country" className="h-9 pl-8 text-xs" /></div>
        <div role="listbox" aria-label="Countries" className="mt-2 max-h-56 overflow-y-auto">
          {countries.map((item) => <button key={item} type="button" role="option" aria-selected={item === country} onClick={() => { onCountryChange(item); setIsOpen(false); setSearch(""); }} className="flex w-full items-center gap-2 px-2 py-2 text-left text-xs hover:bg-accent"><span className="text-base">{flag(item)}</span><span className="flex-1">{label(item)}</span><span className="font-mono text-muted-foreground">+{getCountryCallingCode(item)}</span></button>)}
        </div>
      </div>}
    </div>
    <Input inputMode="tel" autoComplete="tel-national" value={value} onChange={(event) => handleChange(event.target.value)} onBlur={onBlur} placeholder={placeholder(country)} aria-label={`Número de telefone em ${label(country)}`} className={cn("min-w-0 flex-1", value && "font-mono")} />
  </div>
}

export function getPhonePlaceholder(country: CountryCode) {
  return placeholder(country)
}
