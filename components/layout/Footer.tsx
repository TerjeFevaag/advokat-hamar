import Link from 'next/link'
import Image from 'next/image'
import siteData from '@/content/site.json'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-dark pt-12 pb-6 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/8">

        {/* Brand */}
        <div>
          <Image src="/logo.png" alt={siteData.firm.shortName} width={130} height={50} className="h-12 w-auto object-contain brightness-0 invert mb-4" />
          <p className="text-white/45 text-sm leading-relaxed max-w-xs">{siteData.footer.description}</p>
        </div>

        {/* Tjenester */}
        <div>
          <h4 className="text-gold text-xs font-bold uppercase tracking-widest mb-4">Tjenester</h4>
          <div className="flex flex-col gap-1">
            {siteData.footer.columns.tjenester.map((t) => (
              <Link key={t.href} href={t.href} className="text-white/50 text-sm py-0.5 hover:text-gold transition-colors">
                {t.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Lenker */}
        <div>
          <h4 className="text-gold text-xs font-bold uppercase tracking-widest mb-4">Lenker</h4>
          <div className="flex flex-col gap-1">
            {siteData.footer.columns.lenker.map((l) => (
              <Link key={l.href} href={l.href} className="text-white/50 text-sm py-0.5 hover:text-gold transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Kontakt */}
        <div>
          <h4 className="text-gold text-xs font-bold uppercase tracking-widest mb-4">Kontakt</h4>
          <div className="flex flex-col gap-1">
            <span className="text-white/50 text-sm py-0.5">{siteData.contact.addressFull}</span>
            <span className="text-white/50 text-sm py-0.5">{siteData.contact.poBox}</span>
            <a href={`tel:${siteData.contact.mobile.replace(/\s/g, '')}`} className="text-white/50 text-sm py-0.5 hover:text-gold transition-colors">{siteData.contact.mobile}</a>
            <a href={`mailto:${siteData.contact.email}`} className="text-white/50 text-sm py-0.5 hover:text-gold transition-colors">{siteData.contact.email}</a>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center pt-5 gap-4">
        <p className="text-white/30 text-xs">&copy; {year} {siteData.firm.name}. Alle rettigheter reservert.</p>
        <div className="flex flex-col items-center sm:items-end gap-1">
          <Image
            src="/advokatforeningen-logo.png"
            alt="Medlem av Den Norske Advokatforening"
            width={110}
            height={32}
            className="object-contain"
          />
          <span className="text-white/50 text-xs">Medlem av Advokatforeningen</span>
        </div>
      </div>
      <div className="pt-4 border-t border-white/5 mt-4 text-center">
        <p className="text-white/20 text-xs">
          Utviklet av{' '}
          <a href="https://fevaag.no" target="_blank" rel="noopener noreferrer" className="hover:text-white/40 transition-colors">
            Fevaag Web Consulting
          </a>
        </p>
      </div>
    </footer>
  )
}
