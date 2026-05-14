'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import siteData from '@/content/site.json'

export default function Navigation({ darkHero = false }: { darkHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* ── Slide-in Side Menu ── */}
      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/50 z-[1999] transition-opacity duration-400 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-[min(400px,100vw)] bg-navy-dark z-[2000] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${menuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col px-12 py-20 overflow-y-auto`}>
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-gold flex items-center justify-center text-white text-xl transition-colors"
        >
          ×
        </button>

        {/* Logo */}
        <div className="mb-12">
          <Image src="/logo.png" alt={siteData.firm.shortName} width={120} height={48} className="h-12 w-auto object-contain brightness-0 invert" />
        </div>

        {/* Nav links */}
        <nav className="flex flex-col">
          {siteData.nav.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-white/70 hover:text-gold text-2xl font-semibold py-3.5 border-b border-white/[0.06] hover:pl-3 transition-all duration-300 block"
              >
                {item.label}
              </Link>
              {'children' in item && item.children && item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/45 hover:text-gold text-base font-medium py-2.5 pl-4 border-b border-white/[0.04] hover:pl-7 transition-all duration-300 flex items-center gap-2 block"
                >
                  <span className="w-3 h-px bg-gold/50 flex-shrink-0" />
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer links */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col gap-3">
          <a href={`tel:${siteData.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2.5 text-white/50 text-sm hover:text-white/80 transition-colors">
            <svg className="w-4 h-4 fill-gold flex-shrink-0" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            {siteData.contact.phone}
          </a>
          <a href={`mailto:${siteData.contact.email}`} className="flex items-center gap-2.5 text-white/50 text-sm hover:text-white/80 transition-colors">
            <svg className="w-4 h-4 fill-gold flex-shrink-0" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            {siteData.contact.email}
          </a>
          <a href="#" className="flex items-center gap-2.5 text-white/50 text-sm hover:text-white/80 transition-colors">
            <svg className="w-4 h-4 fill-gold flex-shrink-0" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
            {siteData.contact.addressFull}
          </a>
        </div>
      </div>

      {/* ── Floating Header ── */}
      <header className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-8 md:px-12 transition-all duration-400 ${
        scrolled
          ? 'py-3.5 bg-white/95 backdrop-blur-xl shadow-soft'
          : 'py-5'
      }`}>
        {/* Left: burger + logo (logo hidden on mobile) */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => setMenuOpen(true)}
            className="w-11 h-11 bg-navy hover:bg-gold rounded-xl flex flex-col items-center justify-center gap-[5px] transition-colors duration-300"
            aria-label="Åpne meny"
          >
            <span className="w-5 h-0.5 bg-white rounded-sm transition-all" />
            <span className="w-4 h-0.5 bg-white rounded-sm transition-all" />
            <span className="w-3 h-0.5 bg-white rounded-sm transition-all" />
          </button>
          <Link href="/" className="hidden md:block">
            <Image
              src="/logo.png"
              alt={siteData.firm.shortName}
              width={130}
              height={48}
              className={`object-contain transition-all duration-300 ${scrolled ? 'h-10' : 'h-12'} w-auto ${!scrolled && darkHero ? 'brightness-0 invert' : ''}`}
              priority
            />
          </Link>
        </div>

        {/* Centre: quick links (only visible when scrolled) */}
        <ul className={`hidden lg:flex items-center gap-1 transition-opacity duration-400 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {[{ label: 'Tjenester', href: '#tjenester' }, { label: 'Om oss', href: '/om-oss' }, { label: 'Artikler', href: '/rettsavgjorelser' }, { label: 'Kontakt', href: '/kontakt' }].map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-navy hover:bg-light-bg hover:text-gold text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: logo (mobile only) + phone + CTA */}
        <div className="flex items-center gap-4">
          {/* Logo on right — mobile only */}
          <Link href="/" className="block md:hidden">
            <Image
              src="/logo.png"
              alt={siteData.firm.shortName}
              width={120}
              height={44}
              className={`object-contain transition-all duration-300 ${scrolled ? 'h-9' : 'h-11'} w-auto ${!scrolled && darkHero ? 'brightness-0 invert' : ''}`}
              priority
            />
          </Link>
          <a href={`tel:${siteData.contact.phone.replace(/\s/g, '')}`} className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${!scrolled && darkHero ? 'text-white' : 'text-navy'}`}>
            <svg className="w-4 h-4 fill-gold" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            {siteData.contact.phone}
          </a>
          <Link href="/kontakt" className="hidden md:inline-flex bg-gold text-white px-7 py-3 rounded-xl text-sm font-semibold hover:bg-gold-dark hover:-translate-y-px hover:shadow-gold transition-all duration-300">
            Kontakt oss
          </Link>
        </div>
      </header>
    </>
  )
}
