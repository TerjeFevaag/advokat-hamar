import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ContactSection from '@/components/shared/ContactSection'

export const metadata: Metadata = {
  title: 'Juridiske artikler & innsikt | Advokat Hamar – Holthe & Co AS',
  description: 'Les artikler om norsk juss fra Advokatfirmaet Holthe & Co AS i Hamar. Praktiske råd om skatterett, arv, eiendom og næringslivsjuridiske spørsmål.',
  alternates: { canonical: 'https://advokat-hamar.no/artikler' },
}

const articles = [
  {
    date: 'Mars 2026',
    tag: 'Skatterett',
    title: 'Nye skatteregler for aksjeselskaper i 2026',
    body: 'En oversikt over de viktigste endringene i skattereglene som påvirker norske aksjeselskaper i 2026. Les hva du bør gjøre nå.',
    href: '/artikler/nye-skatteregler-aksjeselskaper-2026',
  },
  {
    date: 'Mars 2026',
    tag: 'Selskapsrett & arv',
    title: 'Slik planlegger du et vellykket generasjonsskifte',
    body: 'Tidlig planlegging er nøkkelen til et smidig generasjonsskifte i familiebedrifter. Råd om struktur, skatt og aksjonæravtaler.',
    href: '/artikler/generasjonsskifte-familiebedrift',
  },
  {
    date: 'Mars 2026',
    tag: 'Eiendomsrett',
    title: 'Dine rettigheter ved mangler i boligkjøp',
    body: 'Hva du kan kreve og hvilke frister som gjelder ved mangler i fast eiendom. Om reklamasjon, prisavslag og heving.',
    href: '/artikler/mangler-ved-boligkjop',
  },
]

export default function ArtiklerPage() {
  return (
    <>
      <Navigation darkHero />
      <main>
        <section className="relative bg-navy pt-36 pb-28 px-8 md:px-20 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] border border-gold/30 rounded-full translate-x-1/2 -translate-y-1/4" />
            <div className="absolute bottom-0 right-40 w-[300px] h-[300px] border border-gold/20 rounded-full" />
          </div>
          <div className="max-w-4xl relative">
            <div className="flex items-center gap-3 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="w-10 h-px bg-gold block" />
              Juridiske artikler
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white leading-[1.05] mb-6">
              Juridiske nyheter{' '}
              <em className="not-italic text-gold">&amp; innsikt</em>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
              Praktiske artikler om norsk juss fra Advokatfirmaet Holthe &amp; Co AS i Hamar — skrevet for å hjelpe deg å forstå rettighetene og pliktene dine.
            </p>
          </div>
        </section>

        <section className="py-24 px-8 md:px-20 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group bg-cream rounded-2xl overflow-hidden border border-transparent hover:border-gold hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(201,168,76,0.12)] transition-all duration-300 flex flex-col"
              >
                <div className="h-36 bg-navy flex items-center justify-center relative flex-shrink-0">
                  <span className="absolute top-3.5 left-3.5 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-md">
                    {article.date}
                  </span>
                  <span className="text-white/10 font-serif text-5xl font-bold select-none">§</span>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <span className="text-gold text-xs font-bold uppercase tracking-widest mb-3 block">{article.tag}</span>
                  <h2 className="font-serif text-xl font-bold text-navy leading-snug mb-3">{article.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{article.body}</p>
                  <span className="text-gold font-semibold text-sm flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">
                    Les mer →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
