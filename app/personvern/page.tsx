import type { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Personvernerklæring | Advokatfirma Holthe & Co AS',
  description: 'Personvernerklæring for Advokatfirma Holthe & Co AS.',
}

const sections = [
  {
    heading: '1. Når samler Advokatfirmaet inn personopplysninger?',
    text: 'Advokatfirmaet mottar og innhenter personopplysninger i forbindelse med de tjenester vi yter våre kunder og andre. Vi innhenter kun personopplysning i den utstrekning det er nødvendig for å yte våre tjenester og oppfylle våre plikter overfor kunder og andre.',
  },
  {
    heading: '2. Bruk av databehandlere',
    text: 'Vi benytter oss av tjenesteleverandører som utfører enkelte oppgaver for oss. Noen av disse tjenesteleverandørene vil ha tilgang til personopplysninger. Tjenesteleverandørene er såkalte databehandlere for oss.',
  },
  {
    heading: '3. Hva registreres når du bruker nettsiden vår?',
    text: 'Informasjonskapsler (cookies) er små tekstfiler som plasseres på din datamaskin når du laster ned en nettside. Advokatfirmaet bruker informasjonskapsler for at ulike tjenester på nettsiden vår skal fungere.',
  },
  {
    heading: '4. Dine rettigheter',
    text: 'Du kan utøve dine rettigheter ved å sende en e-post til kah@advh.no. Du har rett til innsyn i de personopplysninger som er registrert om deg, korrigering av feilaktige opplysninger, sletting av opplysninger der det er rettslig grunnlag, og dataportabilitet der det er relevant.',
  },
  {
    heading: '5. Kontakt oss',
    text: 'Dersom du har spørsmål om vår behandling av personopplysninger, kan du kontakte oss på e-post: post@advh.no, eller per post til: Advokatfirma Holthe & Co AS, Veståsvegen 311, 2323 Ingeberg.',
  },
]

export default function PersonvernPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="bg-cream pt-36 pb-20 px-8 md:px-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="w-10 h-px bg-gold block" />
              Personvern
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-bold text-navy leading-[1.1] mb-4">
              Personvern&shy;erklæring
            </h1>
            <p className="text-gray-400 text-sm">Sist oppdatert 06.09.2018 · Advokatfirma Holthe & Co AS</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 px-8 md:px-20 bg-white">
          <div className="max-w-3xl mx-auto">
            {/* Intro */}
            <div className="bg-cream rounded-2xl p-8 border-l-4 border-gold mb-12">
              <p className="text-gray-600 leading-[1.85] text-base">
                Denne personvernerklæringen forteller hvordan Advokatfirma Holthe & Co AS, heretter omtalt som Advokatfirmaet,
                samler inn og bruker personopplysninger. Målet er å gi deg overordnet informasjon om vår behandling av personopplysninger.
                Advokatfirmaet er behandlingsansvarlig for vår behandling av personopplysninger.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {sections.map((section, i) => (
                <div key={i} className="group">
                  <div className="flex items-start gap-5">
                    <span className="flex-shrink-0 w-8 h-8 bg-cream rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-gold/10 transition-colors">
                      <span className="text-gold font-bold text-xs font-mono">{String(i + 1).padStart(2, '0')}</span>
                    </span>
                    <div>
                      <h2 className="font-serif text-xl font-bold text-navy mb-3">{section.heading}</h2>
                      <p className="text-gray-600 leading-[1.85]">{section.text}</p>
                    </div>
                  </div>
                  {i < sections.length - 1 && <div className="h-px bg-gray-100 mt-10 ml-14" />}
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-14 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <p className="font-semibold text-navy text-sm mb-1">Spørsmål om personvern?</p>
                <p className="text-gray-500 text-sm">Vi svarer gjerne på spørsmål om hvordan vi håndterer dine opplysninger.</p>
              </div>
              <a
                href="mailto:kah@advh.no"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-gold text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-gold-dark transition-all duration-300"
              >
                Send e-post
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
