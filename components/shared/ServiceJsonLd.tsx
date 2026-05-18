const BASE = 'https://advokat-hamar.no'

interface Topic {
  name: string
  body: string
}

interface Props {
  path: string
  title: string
  topics?: Topic[]
}

function buildBreadcrumbs(path: string, title: string) {
  const crumbs = [{ name: 'Forside', href: '/' }]
  if (path.startsWith('/advokat-bedrift')) {
    crumbs.push({ name: 'Advokat Bedrift', href: '/advokat-bedrift' })
  } else if (path.startsWith('/advokat-privat')) {
    crumbs.push({ name: 'Advokat Privat', href: '/advokat-privat' })
  }
  crumbs.push({ name: title, href: path })
  return crumbs
}

export default function ServiceJsonLd({ path, title, topics }: Props) {
  const crumbs = buildBreadcrumbs(path, title)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE}${item.href}`,
    })),
  }

  const faqSchema = topics && topics.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: topics.map((t) => ({
          '@type': 'Question',
          name: t.name,
          acceptedAnswer: { '@type': 'Answer', text: t.body },
        })),
      }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  )
}
