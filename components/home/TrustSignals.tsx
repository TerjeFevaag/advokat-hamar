import homeData from '@/content/home.json'

const trustIcons = [
  'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z',
  'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  'M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
]

export default function TrustSignals() {
  const { trust } = homeData

  return (
    <section className="bg-navy py-20 px-8 md:px-20">
      {/* 1/3 + 2/3 split layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-14 items-center">

        {/* Left: heading */}
        <div>
          <p className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">{trust.tag}</p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] text-white leading-[1.2] mb-4">{trust.title}</h2>
          <p className="text-white/60 leading-relaxed">Kvalitet, engasjement og personlig oppfølging er grunnlaget for alt vi gjør.</p>
        </div>

        {/* Right: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {trust.items.map((item, i) => (
            <div
              key={item.title}
              className="bg-white/[0.05] border border-white/[0.06] rounded-2xl p-8 text-center hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Circular gold-tinted icon */}
              <div className="w-13 h-13 w-[52px] h-[52px] bg-gold/15 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 fill-gold" viewBox="0 0 24 24">
                  <path d={trustIcons[i]} />
                </svg>
              </div>
              <h3 className="text-white text-sm font-semibold mb-2">{item.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
