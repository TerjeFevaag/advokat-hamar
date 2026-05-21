'use client'
import { useState } from 'react'
import homeData from '@/content/home.json'
import siteData from '@/content/site.json'

export default function ContactSection() {
  const { contact } = homeData
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const contactItems = [
    { icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z', title: 'Adresse', text: siteData.contact.addressFull },
    { icon: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z', title: 'Telefon', text: siteData.contact.phone },
    { icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z', title: 'E-post', text: siteData.contact.email, href: `mailto:${siteData.contact.email}` },
    { icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z', title: 'Åpningstider', text: siteData.contact.hours },
  ]

  return (
    <section className="py-24 px-8 md:px-20 bg-white" id="kontakt">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <p className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">{contact.tag}</p>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] font-bold text-navy leading-[1.2] mb-4">{contact.title}</h2>
          <p className="text-gray-500 leading-relaxed mb-10">{contact.body}</p>

          <div className="flex flex-col gap-6">
            {contactItems.map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 fill-gold" viewBox="0 0 24 24">
                    <path d={item.icon} />
                  </svg>
                </div>
                <div>
                  <h4 className="text-navy text-sm font-semibold mb-1">{item.title}</h4>
                  {item.href ? (
                    <a href={item.href} className="text-gray-500 text-sm hover:text-gold transition-colors">{item.text}</a>
                  ) : (
                    <p className="text-gray-500 text-sm">{item.text}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-cream rounded-3xl p-11">
          <h3 className="font-serif text-2xl font-bold text-navy mb-6">{contact.formTitle}</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy mb-1.5">Navn</label>
                <input name="name" type="text" placeholder="Ditt navn" required className="w-full px-4 py-3 border-[1.5px] border-gray-200 rounded-xl text-sm font-sans focus:outline-none focus:border-gold transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy mb-1.5">E-post</label>
                <input name="email" type="email" placeholder="din@epost.no" required className="w-full px-4 py-3 border-[1.5px] border-gray-200 rounded-xl text-sm font-sans focus:outline-none focus:border-gold transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5">Telefon</label>
              <input name="phone" type="tel" placeholder="+47 000 00 000" className="w-full px-4 py-3 border-[1.5px] border-gray-200 rounded-xl text-sm font-sans focus:outline-none focus:border-gold transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5">Melding</label>
              <textarea name="message" rows={4} placeholder="Beskriv din sak kort..." required className="w-full px-4 py-3 border-[1.5px] border-gray-200 rounded-xl text-sm font-sans focus:outline-none focus:border-gold transition-colors resize-vertical" />
            </div>

            {status === 'sent' && (
              <p className="text-green-600 text-sm font-medium">Takk! Vi tar kontakt snart.</p>
            )}
            {status === 'error' && (
              <p className="text-red-500 text-sm">Noe gikk galt. Send oss en e-post direkte på {siteData.contact.email}.</p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-gold text-white py-4 rounded-full font-semibold text-sm hover:bg-gold-dark hover:shadow-gold transition-all duration-300 disabled:opacity-60"
            >
              {status === 'sending' ? 'Sender...' : 'Send henvendelse →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
