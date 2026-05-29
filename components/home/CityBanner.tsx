import Image from 'next/image'
import homeData from '@/content/home.json'

export default function CityBanner() {
  const { cityBanner } = homeData

  return (
    <div className="relative h-[350px] overflow-hidden">
      <Image
        src="/Hamar City.webp"
        alt="Hamar sentrum – lokal advokat siden 1992"
        fill
        className="object-cover"
      />
      {/* Diagonal gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy/85 via-navy/30 to-transparent flex items-center justify-center">
        <div className="text-center px-6">
          <blockquote className="font-serif italic text-white text-[clamp(1.6rem,3vw,2.2rem)] leading-snug">
            "Dit ein ser, <span className="text-gold">dit kjem ein</span>"
          </blockquote>
        </div>
      </div>
    </div>
  )
}
