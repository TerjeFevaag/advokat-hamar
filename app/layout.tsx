import type { Metadata } from 'next'
import './globals.css'
import siteData from '@/content/site.json'

export const metadata: Metadata = {
  metadataBase: new URL('https://advokat-hamar.no'),
  title: 'Advokat Hamar | Advokatfirmaet Holthe & Co AS',
  description: 'Erfaren advokat i Hamar for bedrift og privat. Selskapsrett, skatterett, arv og eiendom. Kontakt Holthe & Co AS – første samtale er gratis.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advokat Hamar | Advokatfirmaet Holthe & Co AS',
    description: 'Erfaren advokat i Hamar for bedrift og privat. Selskapsrett, skatterett, arv og eiendom. Kontakt Holthe & Co AS – første samtale er gratis.',
    images: ['/Advokat%2001.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    siteName: siteData.firm.name,
    locale: 'nb_NO',
    type: 'website',
    images: [
      {
        url: '/Advokat%2001.jpg',
        width: 540,
        height: 660,
        alt: 'Advokat Knut Arne Holthe – Advokatfirmaet Holthe & Co AS, Hamar',
      },
    ],
  },
}


const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Advokatfirmaet Holthe & Co AS',
  alternateName: 'Holthe & Co AS',
  url: 'https://advokat-hamar.no',
  logo: 'https://advokat-hamar.no/logo.png',
  image: 'https://advokat-hamar.no/Advokat%2001.jpg',
  telephone: '+4790550647',
  email: 'post@advh.no',
  taxID: '987902248',
  foundingDate: '1992',
  legalName: 'Advokatfirmaet Holthe & Co AS',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Veståsvegen 311',
    postalCode: '2323',
    addressLocality: 'Ingeberg',
    addressRegion: 'Innlandet',
    addressCountry: 'NO',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '16:00',
    },
  ],
  areaServed: { '@type': 'City', name: 'Hamar' },
  employee: {
    '@type': 'Attorney',
    name: 'Knut Arne Holthe',
    email: 'kah@advh.no',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Juridiske tjenester',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Selskapsrett', url: 'https://advokat-hamar.no/advokat-bedrift/naeringsliv/selskapsrett' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Skatterett', url: 'https://advokat-hamar.no/advokat-privat/skatterett' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Arbeidsrett', url: 'https://advokat-hamar.no/advokat-bedrift/naeringsliv/arbeidsrett' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Arv og skifte', url: 'https://advokat-hamar.no/advokat-privat/familie-og-arv/arv-og-skifte' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Eiendomsrett', url: 'https://advokat-hamar.no/advokat-bedrift/eiendom/mangler-ved-fast-eiendom' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kontrakt og entreprise', url: 'https://advokat-hamar.no/advokat-bedrift/naeringsliv/kontrakt-og-entreprise' } },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  )
}
