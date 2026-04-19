import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'lhbckojg',
  dataset:   'production',
  apiVersion: '2026-04-19',
  useCdn:    true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

// ── Blog ────────────────────────────────────────────────────
export const POSTS_QUERY = `
  *[_type == "post" && draft != true] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    tags,
    "image": image.asset->url
  }
`

export const POST_QUERY = `
  *[_type == "post" && slug.current == $slug && draft != true][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    tags,
    "image": image.asset->url,
    body
  }
`

// ── Portfolio ───────────────────────────────────────────────
export const PORTFOLIO_QUERY = `
  *[_type == "portfolio" && draft != true] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    tags,
    metric,
    "image": thumbnail.asset->url
  }
`

export const PORTFOLIO_ITEM_QUERY = `
  *[_type == "portfolio" && slug.current == $slug && draft != true][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    tags,
    metric,
    "image": thumbnail.asset->url,
    challenge,
    solution
  }
`

// ── Types ───────────────────────────────────────────────────
export interface SanityPost {
  _id:         string
  title:       string
  slug:        string
  description: string
  publishedAt: string
  tags:        string[]
  image?:      string
  body?:       any[]
}

export interface SanityPortfolioItem {
  _id:         string
  title:       string
  slug:        string
  description: string
  publishedAt: string
  tags:        string[]
  metric?:     { value: string; label: string }
  image?:      string
  challenge?:  any[]
  solution?:   any[]
}
