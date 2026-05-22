import type { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ContactSection from '@/components/shared/ContactSection'
import pageData from '@/content/oppdragsvilkar.json'

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  alternates: { canonical: 'https://advokat-hamar.no/oppdragsvilkar' },
}

export default function OppdragsvilkarPage() {
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
              Advokatfirmaet Holthe &amp; Co AS
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white leading-[1.05] mb-4">
              Generelle oppdragsvilkår
            </h1>
            <p className="text-white/40 text-sm">{pageData.revised}</p>
          </div>
        </section>

        {/* Document body */}
        <section className="py-20 px-8 md:px-20 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-10">
              {pageData.sections.map((section) => (
                <div key={section.num} className="border-b border-gray-100 pb-10 last:border-0">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="font-serif text-gold font-bold text-lg flex-shrink-0">{section.num}.</span>
                    <h2 className="font-serif text-xl font-bold text-navy">{section.heading}</h2>
                  </div>

                  {'table' in section && section.table && (
                    <div className="mb-5 overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-navy text-white">
                            {section.table.headers.map((h, i) => (
                              <th key={i} className="text-left px-4 py-2.5 font-semibold first:rounded-tl-lg last:rounded-tr-lg">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-cream' : 'bg-white'}>
                              {row.map((cell, j) => (
                                <td key={j} className="px-4 py-2.5 text-gray-700 font-medium first:font-semibold first:text-navy">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="space-y-3 pl-8">
                    {section.body.split('\n\n').map((para, i) => (
                      <p key={i} className="text-gray-600 leading-[1.85] text-[0.95rem]">{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-gray-400 text-xs">{pageData.revised} — Advokatfirmaet Holthe &amp; Co AS</p>
              <a
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-gold text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-gold-dark transition-all duration-300"
              >
                Ta kontakt →
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
