import type { Metadata } from 'next'
import Image from 'next/image'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ContactSection from '@/components/shared/ContactSection'
import pageData from '@/content/om-oss.json'

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
}

export default function OmOssPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="relative bg-cream pt-36 pb-28 px-8 md:px-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] border border-navy/5 rounded-full translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="max-w-4xl relative">
            <div className="flex items-center gap-3 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="w-10 h-px bg-gold block" />
              {pageData.hero.tag}
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-navy leading-[1.05] mb-6">
              {pageData.hero.title}{' '}
              <em className="not-italic text-gold">{pageData.hero.titleEmphasis}</em>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">{pageData.hero.body}</p>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 px-8 md:px-20 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image column */}
            <div className="relative">
              <Image
                src="/Advokat 01.jpg"
                alt="Advokat Knut Arne Holthe"
                width={540}
                height={660}
                className="w-full rounded-3xl shadow-card object-cover"
              />
              {/* Experience badge */}
              <div className="absolute bottom-6 right-6 bg-gold text-white px-7 py-5 rounded-2xl text-center shadow-gold">
                <span className="font-serif text-4xl font-bold block leading-none">25+</span>
                <span className="text-xs uppercase tracking-widest opacity-90 block mt-1">Års erfaring</span>
              </div>
              {/* Established badge */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm text-navy px-5 py-3 rounded-2xl shadow-soft">
                <span className="font-serif text-sm font-bold block">Siden 1992</span>
                <span className="text-gray-400 text-xs">Hamar</span>
              </div>
            </div>

            {/* Text column */}
            <div className="pt-4">
              <div className="space-y-5 mb-10">
                {pageData.about.paragraphs.map((p, i) => (
                  <p key={i} className="text-gray-600 text-base leading-[1.85]">{p}</p>
                ))}
              </div>

              {/* Advokatforeningen badge */}
              <div className="flex flex-col md:flex-row md:items-center gap-5 mb-10 p-6 bg-cream rounded-2xl border border-gray-100">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold font-bold mb-1">Medlemskap</p>
                  <h3 className="font-serif font-bold text-navy text-base leading-tight">Den Norske Advokatforening</h3>
                  <p className="text-gray-500 text-sm mt-0.5">Følger strenge yrkesetiske retningslinjer for god advokatskikk</p>
                </div>
                <div className="flex-shrink-0 md:border-l md:border-gray-200 md:pl-6">
                  <Image
                    src="/advokatforeningen-logo.png"
                    alt="Advokatforeningen"
                    width={180}
                    height={52}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Memberships */}
              <div className="space-y-3 mb-6">
                <p className="text-xs uppercase tracking-widest text-gold font-bold mb-4">Øvrige medlemskap & verv</p>
                {pageData.memberships.filter(m => !m.includes('Advokatforening')).map((m) => (
                  <div key={m} className="flex items-center gap-3 text-gray-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {m}
                  </div>
                ))}
              </div>

              {/* AAA — diskret */}
              <p className="text-gray-400 text-xs">
                AAA-kredittvurdering tildelt av Dun & Bradstreet — høyeste kredittverdighet.
              </p>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="py-24 px-8 md:px-20 bg-navy">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
              <span className="w-10 h-px bg-gold block" />
              Karriere
            </div>
            <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-white mb-14">
              {pageData.experience.title}
            </h2>
            <div className="space-y-0">
              {pageData.experience.items.map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-gold mt-1.5 flex-shrink-0 ring-4 ring-gold/15 group-hover:scale-125 transition-transform" />
                    {i < pageData.experience.items.length - 1 && (
                      <div className="w-px flex-1 bg-gold/20 my-1" />
                    )}
                  </div>
                  <div className="pb-8">
                    <span className="text-gold text-sm font-bold font-mono tracking-wide">{item.year}</span>
                    <p className="text-white/70 mt-1.5 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Terms section */}
        <section className="py-20 px-8 md:px-20 bg-cream">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-gold font-bold mb-2">Transparens</p>
                <h3 className="font-serif text-2xl font-bold text-navy mb-2">{pageData.terms.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-md">{pageData.terms.body}</p>
              </div>
              <a
                href="#"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-navy text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-navy/85 transition-all duration-300 whitespace-nowrap"
              >
                {pageData.terms.linkLabel}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
