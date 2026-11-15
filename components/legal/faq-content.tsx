"use client"

import { isValidElement, useMemo, useState, type ReactNode } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"

const categories = [
  { title: "General", items: [
    { q: "What is xZark?", a: "xZark is a cybersecurity and privacy infrastructure initiative. The public site currently presents research, technical concepts, and institutional information." },
    { q: "What does xZark do?", a: "The site describes research interests in identity, encryption, privacy, and application security. It does not currently offer a public production product or managed security service." },
    { q: "Who is xZark built for?", a: "The material may be useful to developers, engineering teams, startups, and organizations exploring digital security. This does not imply that a product or service is currently available to them." },
    { q: "Is xZark available globally?", a: "The public website can be visited online. Availability of any product, service, or support in a particular country has not been established on this site." },
    { q: "Is xZark currently available?", a: "The public website is available. It does not currently expose account registration or a generally available xZark product. Research and preview descriptions are not commitments to launch." },
    { q: "How can I contact xZark?", a: <>Use the <Link className="underline underline-offset-4" href="/contact">institutional contact page</Link>. The public contact form currently validates in your browser and does not transmit the message; direct email options are listed on that page.</> },
  ]},
  { title: "Security & Infrastructure", items: [
    { q: "How does xZark approach cybersecurity?", a: "The site describes research-led, secure-by-design principles. It does not claim that a specific operational control or product is available unless expressly documented." },
    { q: "What is Zero Trust architecture?", a: "Zero Trust is an architectural approach that avoids implicit trust based on network location and evaluates access using identity, context, and least privilege. xZark’s references to it are conceptual, not a claim of a deployed xZark product." },
    { q: "How does xZark approach data protection?", a: <>The public site minimizes form transmission: the general contact form currently performs local validation only. See the <Link className="underline underline-offset-4" href="/privacy">Privacy Policy</Link> for platform, analytics, and careers data flows that may apply.</> },
    { q: "How are security incidents handled?", a: "The public site does not describe an operational incident-response service or publish a response-time commitment. To report a vulnerability, use the security contact shown on the contact page and avoid sending exploit payloads or unnecessary sensitive data." },
    { q: "Does xZark guarantee complete protection?", a: "No. No system or security measure can guarantee complete protection. The site makes no such guarantee, and conceptual material is not a substitute for an organization’s own controls." },
    { q: "What security standards does xZark follow?", a: "The project does not publish a verified certification or a list of formally adopted standards. We do not claim a certification or audit that is not documented here." },
  ]},
  { title: "Privacy & Data", items: [
    { q: "What personal information does xZark collect?", a: "The general contact form currently does not send the values entered. If the careers form is connected and submitted, it can send applicant details and a résumé to the configured application endpoint. Hosting and opted-in analytics may process technical request or usage information." },
    { q: "How does xZark process personal data?", a: <>Processing depends on the feature and the role for that activity. Read the <Link className="underline underline-offset-4" href="/privacy">Privacy Policy</Link> for the distinction between controller and processor roles and current project limitations.</> },
    { q: "Does xZark sell personal information?", a: "The project contains no personal-information sale workflow or advertising network, and xZark does not sell personal information through this website." },
    { q: "How can I request deletion of my data?", a: <>Email contact@xzark.co with the subject “Privacy request,” or use the <Link className="underline underline-offset-4" href="/contact">contact page</Link>. Requests are handled subject to applicable law and verification; the formal privacy contact is pending confirmation.</> },
    { q: "Does xZark share information with third parties?", a: "Vercel platform components provide hosting and opted-in web analytics. If the careers application endpoint is configured, applicant data is sent there. The endpoint operator and its location must be verified before applications are enabled. See the Privacy Policy for detail." },
    { q: "Where is data processed and stored?", a: "The project does not establish a single storage region or a verified retention schedule. Locations depend on the platform and any configured careers endpoint; these details must be confirmed before publication or operation." },
  ]},
  { title: "Accounts & Services", items: [
    { q: "Do I need an account to use xZark?", a: "No account is currently required to browse the public website, and the site does not expose xZark account registration or login." },
    { q: "How does account security work?", a: "The public site currently has no xZark account system, so it does not provide account-security features. Never send credentials or private keys through public forms." },
    { q: "How can I manage my account?", a: "There is no public xZark account-management feature at this time. If that changes, account settings and applicable terms will be documented before release." },
    { q: "How can I report a vulnerability?", a: <>Use the security contact listed on the <Link className="underline underline-offset-4" href="/contact">contact page</Link>. Share only the information needed to explain the issue; do not access, alter, or extract data without authorization.</> },
    { q: "How can businesses contact xZark?", a: "Organizations may use the institutional contact page for general questions. Contacting xZark does not create a service commitment, offer, or guarantee of availability." },
  ]},
  { title: "Legal & Compliance", items: [
    { q: "Which privacy laws apply to xZark?", a: "Applicable laws depend on the relevant entity, activity, and individuals’ locations. The Privacy Policy addresses Brazil’s LGPD and the GDPR where it applies; it does not claim that either law applies to every visitor or activity." },
    { q: "What is the Privacy Policy?", a: <>It explains the project’s data categories, purposes, roles, rights, and known limitations. Read the <Link className="underline underline-offset-4" href="/privacy">Privacy Policy</Link>.</> },
    { q: "What are the Terms of Service?", a: <>They set rules for using the public site and explain that future products or services require separate terms. Read the <Link className="underline underline-offset-4" href="/terms">Terms of Service</Link>.</> },
    { q: "How does cookie consent work?", a: <>The preference cookie is necessary to remember your choice. Optional analytics is disabled until you opt in; no advertising cookies are configured. See the <Link className="underline underline-offset-4" href="/cookies">Cookie Policy</Link> and use the preference link in the footer to change your choice.</> },
    { q: "How can I exercise my privacy rights?", a: <>Email contact@xzark.co with the subject “Privacy request” or use the <Link className="underline underline-offset-4" href="/contact">contact page</Link>. Rights and available remedies depend on applicable law.</> },
  ]},
]

const allCategories = "All topics"

function getSearchableText(value: ReactNode): string {
  if (typeof value === "string" || typeof value === "number") return String(value)
  if (Array.isArray(value)) return value.map(getSearchableText).join(" ")
  if (isValidElement<{ children?: ReactNode }>(value)) return getSearchableText(value.props.children)
  return ""
}

export function FaqContent() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState(allCategories)
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const filteredCategories = useMemo(() => categories
    .filter((category) => activeCategory === allCategories || category.title === activeCategory)
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => !normalizedQuery || `${category.title} ${item.q} ${getSearchableText(item.a)}`.toLocaleLowerCase().includes(normalizedQuery)),
    }))
    .filter((category) => category.items.length > 0), [activeCategory, normalizedQuery])
  const resultCount = filteredCategories.reduce((count, category) => count + category.items.length, 0)

  return (
    <section lang="en" className="border-b border-border/60 bg-background py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <label htmlFor="faq-search" className="sr-only">Search frequently asked questions</label>
        <div className="relative max-w-xl">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="faq-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search questions and answers" className="h-11 pl-10" />
        </div>
        <div role="group" className="mt-5 flex flex-wrap gap-2" aria-label="Filter questions by category">
          {[allCategories, ...categories.map((category) => category.title)].map((category) => (
            <button key={category} type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)} className="rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:border-primary/60 aria-pressed:border-primary aria-pressed:text-primary">
              {category}
            </button>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground" aria-live="polite">{`${resultCount} ${resultCount === 1 ? "answer" : "answers"}`}</p>
        <div className="mt-8 flex flex-col gap-10">
          {filteredCategories.length > 0 ? filteredCategories.map((category) => (
            <section key={category.title} aria-labelledby={`faq-${category.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`}>
              <h2 id={`faq-${category.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`} className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{category.title}</h2>
              <Accordion type="single" collapsible className="mt-3 w-full">
                {category.items.map((item, index) => <AccordionItem key={item.q} value={`${category.title}-${index}`} className="border-border/60"><AccordionTrigger className="py-5 text-left text-base font-medium tracking-tight hover:no-underline data-[state=open]:text-primary">{item.q}</AccordionTrigger><AccordionContent className="max-w-3xl pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</AccordionContent></AccordionItem>)}
              </Accordion>
            </section>
          )) : <div className="border border-border/70 p-6 text-sm text-muted-foreground">No matching questions. Try another search or select a different category.</div>}
        </div>
      </div>
    </section>
  )
}
