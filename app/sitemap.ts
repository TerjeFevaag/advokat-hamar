import type { MetadataRoute } from 'next'

const BASE = 'https://advokat-hamar.no'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { url: string; priority: number; changeFrequency: 'yearly' | 'monthly' | 'weekly' }[] = [
    { url: '/',                                                              priority: 1.0, changeFrequency: 'monthly' },
    { url: '/advokat-bedrift',                                               priority: 0.9, changeFrequency: 'monthly' },
    { url: '/advokat-privat',                                                priority: 0.9, changeFrequency: 'monthly' },
    { url: '/om-oss',                                                        priority: 0.7, changeFrequency: 'monthly' },
    { url: '/kontakt',                                                       priority: 0.7, changeFrequency: 'monthly' },
    { url: '/rettsavgjorelser',                                              priority: 0.6, changeFrequency: 'monthly' },
    // Bedrift – næringsliv
    { url: '/advokat-bedrift/naeringsliv/selskapsrett',                      priority: 0.8, changeFrequency: 'monthly' },
    { url: '/advokat-bedrift/naeringsliv/arbeidsrett',                       priority: 0.8, changeFrequency: 'monthly' },
    { url: '/advokat-bedrift/naeringsliv/kontrakt-og-entreprise',            priority: 0.8, changeFrequency: 'monthly' },
    { url: '/advokat-bedrift/naeringsliv/erstatningsrett',                   priority: 0.7, changeFrequency: 'monthly' },
    { url: '/advokat-bedrift/naeringsliv/kjopsrett',                         priority: 0.7, changeFrequency: 'monthly' },
    { url: '/advokat-bedrift/naeringsliv/skatt-naeringsdrivende',            priority: 0.7, changeFrequency: 'monthly' },
    { url: '/advokat-bedrift/naeringsliv/bank-finansiering-og-forsikring',   priority: 0.7, changeFrequency: 'monthly' },
    { url: '/advokat-bedrift/naeringsliv/opphavsrett',                       priority: 0.7, changeFrequency: 'monthly' },
    { url: '/advokat-bedrift/naeringsliv/varemerker',                        priority: 0.7, changeFrequency: 'monthly' },
    // Bedrift – eiendom
    { url: '/advokat-bedrift/eiendom/husleierett',                           priority: 0.8, changeFrequency: 'monthly' },
    { url: '/advokat-bedrift/eiendom/mangler-ved-fast-eiendom',              priority: 0.7, changeFrequency: 'monthly' },
    { url: '/advokat-bedrift/eiendom/plan-og-bygningsrett',                  priority: 0.7, changeFrequency: 'monthly' },
    // Privat – familie og arv
    { url: '/advokat-privat/familie-og-arv/arv-og-skifte',                  priority: 0.8, changeFrequency: 'monthly' },
    { url: '/advokat-privat/familie-og-arv/samlivsbrudd',                   priority: 0.8, changeFrequency: 'monthly' },
    // Privat – arbeid, skatt og erstatning
    { url: '/advokat-privat/skatterett',                                     priority: 0.8, changeFrequency: 'monthly' },
    { url: '/advokat-privat/arbeid-skatt-og-erstatning/arbeidsrett',         priority: 0.7, changeFrequency: 'monthly' },
    { url: '/advokat-privat/arbeid-skatt-og-erstatning/skatterett',          priority: 0.7, changeFrequency: 'monthly' },
    { url: '/advokat-privat/arbeid-skatt-og-erstatning/erstatningsrett',     priority: 0.7, changeFrequency: 'monthly' },
    { url: '/advokat-privat/arbeid-skatt-og-erstatning/trygderett',          priority: 0.7, changeFrequency: 'monthly' },
    // Privat – eiendom
    { url: '/advokat-privat/eiendom/husleierett',                            priority: 0.7, changeFrequency: 'monthly' },
    { url: '/advokat-privat/eiendom/naborett',                               priority: 0.7, changeFrequency: 'monthly' },
    { url: '/advokat-privat/eiendom/plan-og-bygningsrett',                   priority: 0.7, changeFrequency: 'monthly' },
    // Juridisk
    { url: '/personvern',                                                    priority: 0.2, changeFrequency: 'yearly' },
  ]

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
