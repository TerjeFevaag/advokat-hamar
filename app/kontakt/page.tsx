import type { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ContactSection from '@/components/shared/ContactSection'
import siteData from '@/content/site.json'

export const metadata: Metadata = {
  title: 'Kontakt Advokat Hamar | Holthe & Co AS',
  description: 'Ta kontakt med advokat i Hamar – første samtale er gratis. Ring, send e-post eller fyll ut skjemaet. Holthe & Co AS hjelper deg raskt.',
}

const infoCards = [
  {
    icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
    label: 'Besøksadresse',
    value: siteData.contact.addressFull,
  },
  {
    icon: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
    label: 'Telefon',
    value: siteData.contact.phone,
    href: `tel:${siteData.contact.phone.replace(/\s/g, '')}`,
  },
  {
    icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
    label: 'E-post',
    value: siteData.contact.email,
    href: `mailto:${siteData.contact.email}`,
  },
  {
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
    label: 'Åpningstider',
    value: siteData.contact.hours,
  },
]

export default function KontaktPage() {
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
              Kontakt oss
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white leading-[1.05] mb-6">
              Det er <em className="not-italic text-gold">gratis</em> å ta kontakt
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
              Vi hjelper deg med å løse dine juridiske utfordringer på en effektiv og profesjonell måte. Første samtale er alltid kostnadsfri.
            </p>
          </div>
        </section>

        {/* Info cards row */}
        <section className="py-16 px-8 md:px-20 bg-white border-b border-gray-50">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {infoCards.map((card) => (
              <div
                key={card.label}
                className="bg-cream rounded-2xl p-7 border border-gray-100 hover:border-gold/40 transition-colors duration-300"
              >
                <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center mb-5 shadow-soft">
                  <svg className="w-5 h-5 fill-gold" viewBox="0 0 24 24">
                    <path d={card.icon} />
                  </svg>
                </div>
                <p className="text-xs uppercase tracking-widest text-gold font-bold mb-1.5">{card.label}</p>
                {card.href ? (
                  <a href={card.href} className="text-navy font-semibold text-sm leading-snug hover:text-gold transition-colors block">
                    {card.value}
                  </a>
                ) : (
                  <p className="text-navy font-semibold text-sm leading-snug">{card.value}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact form section */}
        <ContactSection />

        {/* Google Maps */}
        <section className="h-96 relative overflow-hidden">
          <iframe
            src="https://maps.google.com/maps?q=Veståsvegen+311,+2323+Ingeberg,+Norway&output=embed&z=15"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Advokatfirma Holthe & Co AS – Kart"
            className="grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          />
          {/* Overlay card */}
          <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-6 py-5 shadow-card border border-gray-100">
            <p className="font-serif font-bold text-navy text-sm">{siteData.contact.addressFull}</p>
            <p className="text-gray-400 text-xs mt-0.5">{siteData.contact.poBox}</p>
            <a
              href={`https://maps.google.com/maps?q=${encodeURIComponent(siteData.contact.addressFull)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold text-xs font-semibold mt-2 inline-block hover:underline"
            >
              Åpne i Google Maps →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
