import Image from 'next/image'
import Link from 'next/link'

export default function ArticleAuthorBox() {
  return (
    <div className="mt-12 p-6 bg-cream rounded-2xl border border-gray-100 flex flex-col sm:flex-row gap-5 items-start">
      <Image
        src="/Advokat 01.jpg"
        alt="Advokat Knut Arne Holthe"
        width={72}
        height={72}
        className="rounded-full object-cover flex-shrink-0 w-[72px] h-[72px]"
      />
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gold mb-1">Skrevet av</p>
        <p className="font-serif font-bold text-navy text-base leading-tight">Knut Arne Holthe</p>
        <p className="text-gray-500 text-sm mt-0.5 mb-2">
          Advokat (cand.jur.) · Advokatfirmaet Holthe &amp; Co AS, Hamar
        </p>
        <p className="text-gray-400 text-xs leading-relaxed">
          Juridisk embedseksamen, Universitetet i Oslo (1988). Egen advokatvirksomhet siden 1992.
          Medlem av Den Norske Advokatforening, Norsk Forsikringsjuridisk Forening og International Fiscal Association.
        </p>
        <Link href="/om-oss" className="inline-block mt-2 text-gold text-xs font-semibold hover:underline">
          Les mer om advokaten →
        </Link>
      </div>
    </div>
  )
}
