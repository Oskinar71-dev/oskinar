import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    publishedAt: z.date(),
    tags:        z.array(z.string()),
    metric:      z.object({ label: z.string(), value: z.string() }).optional(),
    image:       z.string().optional(),
    draft:       z.boolean().default(false),
  }),
})

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    publishedAt: z.date(),
    tags:        z.array(z.string()),
    image:       z.string().optional(),
    draft:       z.boolean().default(false),
  }),
})

export const collections = { portfolio, blog }
