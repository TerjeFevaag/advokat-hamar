import type { Metadata } from 'next'
import './globals.css'
import siteData from '@/content/site.json'

export const metadata: Metadata = {
  title: 'Advokat Hamar | Holthe & Co AS',
  description: 'Erfaren advokat i Hamar for bedrift og privat. Selskapsrett, skatterett, arv og eiendom. Kontakt Holthe & Co AS – første samtale er gratis.',
  openGraph: {
    siteName: siteData.firm.name,
    locale: 'nb_NO',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  )
}
