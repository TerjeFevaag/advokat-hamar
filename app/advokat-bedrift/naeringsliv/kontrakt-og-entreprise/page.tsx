import type { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ContactSection from '@/components/shared/ContactSection'
import pageData from '@/content/bedrift-kontrakt-entreprise.json'

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
}

export default function KontraktOgEntreprisePage() {
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
              Ta kontakt
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-cream border-b border-gold/15">
          <div className="max-w-6xl mx-auto px-8 md:px-20 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {pageData.stats.map((s) => (
              <div key={s.label} className="text-center">
                <span className="font-serif text-[2rem] font-bold text-navy block leading-none">{s.num}</span>
                <span className="text-gray-500 text-xs uppercase tracking-widest mt-2 block">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Intro */}
        <section className="py-20 px-8 md:px-20 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-5">
              <span className="w-10 h-px bg-gold block" />
              {pageData.intro.tag}
            </div>
            <h2 className="font-serif text-[clamp(1.75rem,3vw,2.75rem)] font-bold text-navy leading-tight mb-6">
              {pageData.intro.title}
            </h2>
            <div className="space-y-4">
              {pageData.intro.paragraphs.map((p, i) => (
                <p key={i} className="text-gray-500 text-lg leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="py-24 px-8 md:px-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-5 mb-10">
              <span className="w-1 h-8 bg-gold rounded-full flex-shrink-0" />
              <h2 className="font-serif text-[1.75rem] font-bold text-navy">Aktuelle problemstillinger</h2>
              <span className="flex-1 h-px bg-gray-100" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pageData.topics.map((topic, idx) => (
                <div
                  key={topic.name}
                  className="group bg-cream rounded-2xl p-8 border border-transparent hover:border-gold hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(201,168,76,0.12)] transition-all duration-300 relative overflow-hidden cursor-default"
                >
                  <span className="absolute top-3 right-5 font-serif text-[4.5rem] font-bold text-navy/5 select-none leading-none group-hover:text-gold/10 transition-colors duration-300">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="w-8 h-1 bg-gold rounded-full mb-5 group-hover:w-12 transition-all duration-300" />
                  <h3 className="font-serif text-xl font-bold text-navy mb-3 relative">{topic.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed relative">{topic.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className="bg-navy py-20 px-8 md:px-20">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-serif text-3xl font-bold text-white mb-2">
                {pageData.cta.title}
              </h2>
              <p className="text-white/55 leading-relaxed">
                {pageData.cta.body}
              </p>
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
