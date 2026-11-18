import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

/**
 * Articles are Markdown files in src/content/articles/<slug>.md. The file
 * name is the slug. The first category that names a section (see
 * src/lib/sections.ts) decides where the article is listed; an article with
 * no section category still builds a page but isn't listed.
 */
const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    categories: z.array(z.string()).default([]),
    authors: z
      .array(z.object({ name: z.string(), x: z.string().optional() }))
      .default([]),
    cover: z
      .object({
        src: z.string(),
        alt: z.string(),
        width: z.number().int(),
        height: z.number().int(),
      })
      .optional(),
  }),
})

export const collections = { articles }
