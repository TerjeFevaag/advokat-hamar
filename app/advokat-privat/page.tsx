import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ContactSection from '@/components/shared/ContactSection'
import pageData from '@/content/privat.json'

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
}

const highlights = [
  {
    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    title: 'Konfidensielt',
    body: 'All kontakt og rådgivning behandles strengt konfidensielt under taushetsplikt.',
  },
  {
    icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 1-3-3.87M16 3.13a4 4 0 0 1 0 7.75M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    title: 'Personlig',
    body: 'Du snakker direkte med advokaten – ingen mellomledd, ingen usikkerhet.',
  },
  {
    icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
    title: 'Hele Norge',
    body: 'Vi bistår privatpersoner over hele landet, uansett hvor du befinner deg.',
  },
]

export default function PrivatPage() {
  let globalIndex = 0

  return (
    <>
      <Navigation darkHero />
      <main>
        {/* Hero */}
        <section className="relative bg-navy pt-36 pb-28 px-8 md:px-20 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] border border-gold/30 rounded-full translate-x-1/2 -translate-y-1/4" />
            <div className="absolute bottom-0 right-40 w-[300px] h-[300px] border border-gold/20 rounded-full" />
          </div>
          <div className="max-w-4xl relative">
            <div className="flex items-center gap-3 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="w-10 h-px bg-gold block" />
              {pageData.hero.tag}
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white leading-[1.05] mb-6">
              {pageData.hero.title}{' '}
              <em className="not-italic text-gold">{pageData.hero.titleEmphasis}</em>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-2xl mb-10">
              {pageData.hero.body}
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-gold text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-gold-dark hover:shadow-gold transition-all duration-300"
            >
              Gratis første kontakt
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </section>

        {/* Trust highlights */}
        <section className="py-16 px-8 md:px-20 bg-white border-b border-gray-50">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((h) => (
              <div key={h.title} className="flex gap-5 items-start">
                <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 fill-none stroke-gold stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d={h.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1 text-sm">{h.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{h.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services by category */}
        <section className="py-24 px-8 md:px-20 bg-white">
          <div className="max-w-6xl mx-auto space-y-20">
            {pageData.categories.map((cat) => (
              <div key={cat.title}>
                <div className="flex items-center gap-5 mb-10">
                  <span className="w-1 h-8 bg-gold rounded-full flex-shrink-0" />
                  <h2 className="font-serif text-[1.75rem] font-bold text-navy">{cat.title}</h2>
                  <span className="flex-1 h-px bg-gray-100" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {cat.services.map((svc) => {
                    const idx = globalIndex++
                    return (
                      <Link
                        key={svc.name}
                        href={svc.href}
                        className="group bg-cream rounded-2xl p-8 border border-transparent hover:border-gold hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(201,168,76,0.12)] transition-all duration-300 relative overflow-hidden"
                      >
                        <span className="absolute top-3 right-5 font-serif text-[4.5rem] font-bold text-navy/5 select-none leading-none group-hover:text-gold/10 transition-colors duration-300">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="w-8 h-1 bg-gold rounded-full mb-5 group-hover:w-12 transition-all duration-300" />
                        <h3 className="font-serif text-xl font-bold text-navy mb-3 relative">{svc.name}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed relative mb-4">{svc.body}</p>
                        <span className="text-gold font-semibold text-sm flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">
                          Les mer →
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quote strip */}
        <section className="py-20 px-8 md:px-20 bg-cream">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Vår tilnærming</span>
            <blockquote className="font-serif text-2xl md:text-3xl font-bold text-navy leading-[1.35]">
              &ldquo;Det er gratis å ta kontakt. Vi hjelper deg å forstå situasjonen din – uten forpliktelser.&rdquo;
            </blockquote>
            <div className="w-16 h-px bg-gold mx-auto mt-8" />
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
