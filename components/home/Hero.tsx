import Image from 'next/image'
import Link from 'next/link'
import homeData from '@/content/home.json'

export default function Hero() {
  const { hero } = homeData

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-[55%_45%]" id="forsiden">
      {/* Left: Text */}
      <div className="flex flex-col justify-center px-10 md:px-20 pt-32 pb-20 bg-white">
        {/* Eyebrow pill */}
        <div className="inline-flex items-center gap-3 bg-cream rounded-full px-5 pl-2 py-2 mb-8 w-fit">
          <div className="w-7 h-7 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
          </div>
          <span className="text-navy text-sm font-semibold tracking-wide">{hero.tag}</span>
        </div>

        <h1 className="font-serif text-[clamp(2.5rem,4.5vw,3.8rem)] text-navy leading-[1.15] mb-6">
          {hero.title}{' '}
          <span className="relative inline">
            <span className="relative z-10">{hero.titleEmphasis} {hero.titleSuffix}</span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-gold/20 rounded -z-0" />
          </span>
        </h1>

        <p className="text-gray-500 text-lg leading-[1.75] max-w-xl mb-10">{hero.body}</p>

        <div className="flex flex-wrap gap-3 items-center">
          <Link
            href={hero.ctaPrimary.href}
            className="bg-gold text-white px-9 py-4 rounded-full font-semibold text-base hover:bg-gold-dark hover:-translate-y-0.5 hover:shadow-gold transition-all duration-300"
          >
            {hero.ctaPrimary.label} →
          </Link>
          <Link
            href={hero.ctaSecondary.href}
            className="bg-navy text-white px-9 py-4 rounded-full font-semibold text-base hover:bg-navy-light hover:-translate-y-0.5 transition-all duration-300"
          >
            {hero.ctaSecondary.label}
          </Link>
        </div>
      </div>

      {/* Right: Image */}
      <div className="relative min-h-[450px] lg:min-h-0 overflow-hidden">
        <Image
          src="/bg3.jpg"
          alt="Advokat i Hamar – Advokatfirmaet Holthe & Co AS"
          fill
          className="object-cover"
          priority
        />
        {/* Glassmorphism overlay card */}
        <div className="absolute bottom-10 left-10 right-10 bg-navy/90 backdrop-blur-lg rounded-2xl px-8 py-7">
          <p className="font-serif italic text-white text-lg leading-snug">
            "Sjå deg ikkje tilbake, <span className="text-gold">du skal ikkje den vegen</span>"
          </p>
        </div>
      </div>
    </section>
  )
}
