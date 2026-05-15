import Link from 'next/link'
import homeData from '@/content/home.json'

const icons: Record<string, string> = {
  '01': 'M12 2L2 7v10l10 5 10-5V7L12 2z',
  '02': 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z',
  '03': 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3z',
  '04': 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  '05': 'M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3z',
  '06': 'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z',
}

export default function Services() {
  const { services } = homeData

  return (
    <section className="py-24 px-8 md:px-20 bg-cream" id="tjenester">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div>
            <p className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-2.5">{services.tag}</p>
            <h2 className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] text-navy leading-[1.2]">{services.title}</h2>
          </div>
          <Link href="/alle-tjenester" className="text-gold font-semibold text-sm flex items-center gap-2 hover:gap-3.5 transition-all duration-300 whitespace-nowrap">
            Se alle tjenester →
          </Link>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.items.map((item) => (
            <Link
              key={item.num}
              href={item.href}
              className="group bg-white rounded-2xl p-9 border border-gray-100 relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(31,52,81,0.1)] hover:border-transparent transition-all duration-300"
            >
              {/* Gold bottom bar on hover */}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

              <div className="flex justify-between items-start mb-5">
                {/* Icon — navy by default, gold on hover */}
                <div className="w-13 h-13 w-[52px] h-[52px] bg-navy group-hover:bg-gold rounded-2xl flex items-center justify-center transition-colors duration-300">
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d={icons[item.num] || icons['06']} />
                  </svg>
                </div>
                <span className="font-serif text-4xl font-bold text-navy/[0.04]">{item.num}</span>
              </div>

              <h3 className="font-serif text-lg text-navy mb-2.5">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.body}</p>
              <span className="text-gold font-semibold text-sm flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">
                Les mer →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
