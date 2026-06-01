import type { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ContactSection from '@/components/shared/ContactSection'
import pageData from '@/content/rettsavgjorelser.json'

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
}

export default function RettsavgjRelserPage() {
  return (
    <>
      <Navigation darkHero />
      <main>
        {/* Hero */}
        <section className="relative bg-navy pt-36 pb-28 px-8 md:px-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            {/* Large faint scales-of-justice icon */}
            <svg
              className="absolute -right-10 top-1/2 -translate-y-1/2 w-[340px] h-[340px] text-gold fill-none stroke-current"
              viewBox="0 0 24 24" strokeWidth="0.4"
            >
              <path d="M12 3v18M5 6h14M3 10l4-4M17 6l4 4M7 18l-4-4M21 14l-4 4M7 18h10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
            <p className="text-white/65 text-lg leading-relaxed max-w-2xl">{pageData.hero.body}</p>
          </div>
        </section>

        {/* Stats strip */}
        <section className="bg-cream border-b border-gold/15 py-8 px-8 md:px-20">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl font-bold text-navy">{pageData.cases.length}</span>
              <span className="text-gray-500 text-sm">Publiserte saker</span>
            </div>
            <span className="h-5 w-px bg-gray-200 hidden sm:block" />
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl font-bold text-navy">30+</span>
              <span className="text-gray-500 text-sm">Års prosedyreerfaring</span>
            </div>
            <span className="h-5 w-px bg-gray-200 hidden sm:block" />
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-gray-500 text-sm">Alle instanser – tingrett til Høyesterett</span>
            </div>
          </div>
        </section>

        {/* Cases */}
        <section className="py-24 px-8 md:px-20 bg-white">
          <div className="max-w-4xl mx-auto space-y-6">
            {pageData.cases.map((c, i) => (
              <article
                key={c.id}
                className="group relative bg-white border border-gray-100 rounded-3xl overflow-hidden hover:border-gold hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(201,168,76,0.10)] transition-all duration-300 flex flex-col md:flex-row"
              >
                {/* Case number sidebar */}
                <div className="bg-cream md:w-20 flex-shrink-0 flex md:flex-col items-center justify-center gap-2 px-6 py-5 md:px-0 md:py-0 border-b md:border-b-0 md:border-r border-gray-100 group-hover:bg-gold/5 transition-colors duration-300">
                  <span className="font-serif text-2xl font-bold text-navy/20 group-hover:text-gold/40 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="p-8 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    <span className="text-gold text-xs font-bold tracking-wide">{c.date}</span>
                    <span className="text-gray-200">·</span>
                    <span className="bg-cream text-navy text-xs font-medium px-3 py-1 rounded-full">{c.category}</span>
                    <span className="bg-navy/5 text-navy text-xs font-medium px-3 py-1 rounded-full">{c.court}</span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-navy mb-3 group-hover:text-gold transition-colors duration-300">
                    {c.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6">{c.body}</p>
                  <a
                    href={c.href}
                    className="inline-flex items-center gap-1.5 text-gold font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                  >
                    Les avgjørelsen
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                {/* Gold bottom accent */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-8 md:px-20 bg-cream">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Har du en sak?</span>
            <h2 className="font-serif text-3xl font-bold text-navy mb-4">
              Vi er erfarne prosedyreadvokater
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 max-w-xl mx-auto">
              Med over 30 års erfaring fra alle rettsinstanser kjenner vi systemet godt. Ta kontakt for en uforpliktende vurdering av din sak.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-gold text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-gold-dark hover:shadow-gold transition-all duration-300"
            >
              Vurder din sak gratis →
            </a>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  )
}