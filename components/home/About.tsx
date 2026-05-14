import Image from 'next/image'
import Link from 'next/link'
import homeData from '@/content/home.json'

export default function About() {
  const { about } = homeData

  return (
    <section className="py-24 px-8 md:px-20 bg-white" id="om">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className="relative">
          <Image
            src="/Advokat 02.jpg"
            alt="Advokat Knut Arne Holthe"
            width={600}
            height={700}
            className="w-full rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] object-cover"
          />
          {/* Badge — navy bg, gold number, positioned bottom-right overlapping */}
          <div className="absolute -bottom-5 -right-5 bg-navy text-white px-6 py-5 rounded-2xl text-center shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
            <span className="font-serif text-3xl font-bold text-gold block leading-none">{about.badge.number}</span>
            <span className="text-xs uppercase tracking-wider opacity-70 mt-1 block">{about.badge.label}</span>
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">{about.tag}</p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] text-navy leading-[1.2] mb-6">{about.title}</h2>

          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-gray-500 text-base leading-[1.8] mb-4">{p}</p>
          ))}

          {/* Location — cream bg box */}
          <div className="mt-7 flex items-center gap-4 bg-cream rounded-2xl px-6 py-5">
            <svg className="w-6 h-6 fill-gold flex-shrink-0" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            </svg>
            <div>
              <h4 className="text-navy text-sm font-semibold mb-0.5">{about.location.title}</h4>
              <span className="text-gray-500 text-sm">{about.location.address}</span>
            </div>
          </div>

          <Link
            href={about.cta.href}
            className="mt-7 inline-flex bg-gold text-white px-9 py-4 rounded-full font-semibold text-sm hover:bg-gold-dark hover:-translate-y-0.5 hover:shadow-gold transition-all duration-300"
          >
            {about.cta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
