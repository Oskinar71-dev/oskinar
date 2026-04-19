const SITE = 'https://oskinar.es'
const SITE_NAME = 'Oskinar'

export function buildTitle(page: string) {
  return `${page} | ${SITE_NAME}`
}

export const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE,
  logo: `${SITE}/favicon.svg`,
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hola@oskinar.es',
    contactType: 'customer service',
  },
  sameAs: [
    'https://linkedin.com/in/oskinar',
    'https://github.com/oskinar',
  ],
}

export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export function portfolioSchema(item: {
  title: string
  description: string
  url: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: item.title,
    description: item.description,
    url: item.url,
    ...(item.image ? { image: item.image } : {}),
    author: { '@type': 'Organization', name: SITE_NAME },
  }
}

export function articleSchema(article: {
  title: string
  description: string
  url: string
  publishedAt: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.publishedAt,
    ...(article.image ? { image: article.image } : {}),
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE}/favicon.svg` },
    },
  }
}
