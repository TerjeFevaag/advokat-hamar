import Link from 'next/link'
import homeData from '@/content/home.json'

const articleIcons = [
  'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z',
  'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3z',
  'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
]

export default function Articles() {
  const { articles } = homeData

  return (
    <section className="py-24 px-8 md:px-20 bg-cream" id="artikler">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <p className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-2.5">{articles.tag}</p>
            <h2 className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] text-navy leading-[1.2]">{articles.title}</h2>
          </div>
          <Link href="/rettsavgjorelser" className="text-gold font-semibold text-sm flex items-center gap-2 hover:gap-3.5 transition-all duration-300 whitespace-nowrap">
            Alle artikler →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.items.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-transparent transition-all duration-300"
            >
              {/* Navy header block */}
              <div className="h-40 bg-navy flex items-center justify-center relative">
                <span className="absolute top-3.5 left-3.5 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-md">
                  {item.date}
                </span>
                <svg className="w-10 h-10 fill-white/10" viewBox="0 0 24 24">
                  <path d={articleIcons[i % 3]} />
                </svg>
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 className="font-serif text-base text-navy leading-snug mb-2.5">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.body}</p>
                <span className="text-gold font-semibold text-sm group-hover:underline">Les mer →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
