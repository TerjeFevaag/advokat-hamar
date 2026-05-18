import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ContactSection from '@/components/shared/ContactSection'
import pageData from '@/content/alle-tjenester.json'

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
}

const stats = [
  { num: '25+', label: 'Års erfaring' },
  { num: 'Medlem', label: 'Advokatforeningen' },
  { num: '1992', label: 'Etablert' },
  { num: '100%', label: 'Taushetsplikt' },
]

function ServiceGrid({ categories }: { categories: typeof pageData.naeringsliv.categories }) {
  let globalIndex = 0
  return (
    <div className="space-y-16">
      {categories.map((cat) => (
        <div key={cat.title}>
          <div className="flex items-center gap-5 mb-8">
            <span className="w-1 h-8 bg-gold rounded-full flex-shrink-0" />
            <h3 className="font-serif text-[1.5rem] font-bold text-navy">{cat.title}</h3>
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
                  <h4 className="font-serif text-xl font-bold text-navy mb-3 relative">{svc.name}</h4>
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
  )
}

export default function AlleTjenesterPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="relative bg-cream pt-36 pb-28 px-8 md:px-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] border border-navy/5 rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none" />
          <div className="max-w-4xl relative">
            <div className="flex items-center gap-3 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="w-10 h-px bg-gold block" />
              {pageData.hero.tag}
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-navy leading-[1.05] mb-6">
              {pageData.hero.title}{' '}
              <em className="not-italic text-gold">{pageData.hero.titleEmphasis}</em>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mb-10">
              {pageData.hero.body}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/advokat-bedrift"
                className="inline-flex items-center gap-2 bg-navy text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-navy/85 transition-all duration-300"
              >
                Tjenester for bedrift →
              </Link>
              <Link
                href="/advokat-privat"
                className="inline-flex items-center gap-2 border-2 border-navy text-navy px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-navy hover:text-white transition-all duration-300"
              >
                Tjenester for privat →
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-8 md:px-20 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <span className="font-serif text-[2rem] font-bold text-navy block leading-none">{s.num}</span>
                <span className="text-gray-500 text-xs uppercase tracking-widest mt-2 block">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 px-8 md:px-20 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-5">
              <span className="w-10 h-px bg-gold block" />
              {pageData.intro.tag}
            </div>
            <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-navy leading-tight mb-6">
              {pageData.intro.title}
            </h2>
            <div className="space-y-4 max-w-3xl">
              {pageData.intro.paragraphs.map((p, i) => (
                <p key={i} className="text-gray-500 text-lg leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Næringsliv section */}
        <section className="py-24 px-8 md:px-20 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
              <span className="w-10 h-px bg-gold block" />
              {pageData.naeringsliv.tag}
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-navy leading-tight">
                {pageData.naeringsliv.title}
              </h2>
              <Link
                href="/advokat-bedrift"
                className="text-gold font-semibold text-sm flex items-center gap-2 hover:gap-3.5 transition-all duration-300 whitespace-nowrap"
              >
                Se bedriftstjenester →
              </Link>
            </div>
            <ServiceGrid categories={pageData.naeringsliv.categories} />
          </div>
        </section>

        {/* Privat section */}
        <section className="py-24 px-8 md:px-20 bg-cream">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
              <span className="w-10 h-px bg-gold block" />
              {pageData.privat.tag}
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-navy leading-tight">
                {pageData.privat.title}
              </h2>
              <Link
                href="/advokat-privat"
                className="text-gold font-semibold text-sm flex items-center gap-2 hover:gap-3.5 transition-all duration-300 whitespace-nowrap"
              >
                Se privattjenester →
              </Link>
            </div>
            <ServiceGrid categories={pageData.privat.categories} />
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
