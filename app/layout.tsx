import type { Metadata } from 'next'
import './globals.css'
import siteData from '@/content/site.json'

export const metadata: Metadata = {
  title: {
    default: `${siteData.firm.name} – ${siteData.firm.tagline}`,
    template: `%s | ${siteData.firm.shortName}`,
  },
  description: siteData.firm.tagline,
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
