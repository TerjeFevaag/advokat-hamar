import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ContactSection from '@/components/shared/ContactSection'
import ArticleAuthorBox from '@/components/shared/ArticleAuthorBox'
import pageData from '@/content/artikkel-generasjonsskifte.json'

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  alternates: { canonical: 'https://advokat-hamar.no/artikler/generasjonsskifte-familiebedrift' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Slik planlegger du et vellykket generasjonsskifte',
  description: pageData.meta.description,
  datePublished: '2026-03-01',
  dateModified: '2026-03-01',
  author: {
    '@type': 'Person',
    name: 'Knut Arne Holthe',
    jobTitle: 'Advokat',
    url: 'https://advokat-hamar.no/om-oss',
    worksFor: {
      '@type': 'LegalService',
      name: 'Advokatfirmaet Holthe & Co AS',
      url: 'https://advokat-hamar.no',
    },
  },
  publisher: {
    '@type': 'LegalService',
    name: 'Advokatfirmaet Holthe & Co AS',
    url: 'https://advokat-hamar.no',
    logo: { '@type': 'ImageObject', url: 'https://advokat-hamar.no/logo.png' },
  },
  mainEntityOfPage: 'https://advokat-hamar.no/artikler/generasjonsskifte-familiebedrift',
}

export default function ArtikkelGenerasjonsskifte() {
  const { article } = pageData
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Navigation darkHero />
      <main>
        <section className="relative bg-navy pt-36 pb-28 px-8 md:px-20 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] border border-gold/30 rounded-full translate-x-1/2 -translate-y-1/4" />
          </div>
          <div className="max-w-3xl relative">
            <div className="flex items-center gap-3 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="w-10 h-px bg-gold block" />
              {article.tag}
              <span className="text-white/30 font-normal normal-case tracking-normal">— {article.date}</span>
            </div>
            <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-[1.1] mb-6">
              {article.title}
            </h1>
            <p className="text-white/65 text-lg leading-relaxed">{article.intro}</p>
          </div>
        </section>

        <section className="py-20 px-8 md:px-20 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-10">
              {article.sections.map((s) => (
                <div key={s.heading}>
                  <h2 className="font-serif text-2xl font-bold text-navy mb-3">{s.heading}</h2>
                  <p className="text-gray-600 leading-[1.85]">{s.body}</p>
                </div>
              ))}
            </div>

            {/* Author box */}
            <ArticleAuthorBox />

            {/* External resources */}
            <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-xs font-bold uppercase tracking-widest text-navy mb-3">Relevante ressurser</p>
              <ul className="space-y-2">
                <li>
                  <a href="https://lovdata.no/dokument/NL/lov/1972-03-03-5" target="_blank" rel="noopener noreferrer" className="text-gold text-sm font-medium hover:underline">
                    Arveloven — Lovdata.no →
                  </a>
                </li>
                <li>
                  <a href="https://www.advokatforeningen.no/verktoy/finn-advokat/" target="_blank" rel="noopener noreferrer" className="text-gold text-sm font-medium hover:underline">
                    Finn advokat — Den Norske Advokatforening →
                  </a>
                </li>
                <li>
                  <a href="https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/arv-og-gaver/" target="_blank" rel="noopener noreferrer" className="text-gold text-sm font-medium hover:underline">
                    Arv og gaver — Skatteetaten.no →
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-100">
              <Link href="/artikler" className="text-gold font-semibold text-sm hover:underline">
                ← Tilbake til alle artikler
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-navy py-20 px-8 md:px-20">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-serif text-3xl font-bold text-white mb-2">{article.cta.title}</h2>
              <p className="text-white/55 leading-relaxed">{article.cta.body}</p>
            </div>
            <a
              href="/kontakt"
              className="flex-shrink-0 inline-flex items-center gap-2 border-2 border-gold text-gold px-8 py-4 rounded-full font-semibold text-sm hover:bg-gold hover:text-white transition-all duration-300 whitespace-nowrap"
            >
              Kontakt oss →
            </a>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
