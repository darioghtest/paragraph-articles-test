import { type CollectionEntry, getCollection } from "astro:content"
import { SECTIONS, type Section, sectionOf } from "./sections"

export type Article = CollectionEntry<"articles">

export const SITE_NAME = "Lumen"
export const ARTICLES_TITLE = "Lumen articles"
export const ARTICLES_DESCRIPTION =
  "Product updates, guides, and company news from the team building Lumen."

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "")

/** A site path with the GitHub Pages project base in front. */
export function withBase(path: string): string {
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`
}

/** The absolute URL of a site path. */
export function absoluteUrl(path: string, site: URL | undefined): string {
  return new URL(withBase(path), site ?? "https://darioghtest.github.io").href
}

export const articlePath = (slug: string) => `/articles/${slug}/`
export const articleMarkdownPath = (slug: string) => `/articles/${slug}.md`
export const sectionPath = (section: Section) =>
  `/articles/category/${section.tag}/`
export const ARTICLES_PATH = "/articles/"
export const FEED_PATH = "/articles/rss.xml"

/** Every article, newest first, listed or not. */
export async function allArticles(): Promise<Article[]> {
  const entries = await getCollection("articles")
  return entries.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  )
}

/** The articles the blog lists: those with a section tag. */
export async function listedArticles(): Promise<Article[]> {
  return (await allArticles()).filter((a) => sectionOf(a.data.categories))
}

/** The sections that have at least one listed article, in tab order. */
export function sectionsWithPosts(articles: Article[]): Section[] {
  return SECTIONS.filter((section) =>
    articles.some((a) => sectionOf(a.data.categories)?.tag === section.tag)
  )
}

export function modifiedAt(article: Article): Date {
  return article.data.updatedAt ?? article.data.publishedAt
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}
