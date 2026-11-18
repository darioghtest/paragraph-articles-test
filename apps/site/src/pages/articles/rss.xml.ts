import type { APIRoute } from "astro"
import {
  ARTICLES_DESCRIPTION,
  ARTICLES_PATH,
  ARTICLES_TITLE,
  absoluteUrl,
  articlePath,
  escapeXml,
  FEED_PATH,
  listedArticles,
} from "@/lib/articles"
import { sectionOf } from "@/lib/sections"

/** RSS for /articles: every listed article, newest first. */
export const GET: APIRoute = async ({ site }) => {
  const articles = await listedArticles()
  const items = articles.map((article) => {
    const url = absoluteUrl(articlePath(article.id), site)
    const section = sectionOf(article.data.categories)
    return [
      "    <item>",
      `      <title>${escapeXml(article.data.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <description>${escapeXml(article.data.description)}</description>`,
      `      <pubDate>${article.data.publishedAt.toUTCString()}</pubDate>`,
      section ? `      <category>${escapeXml(section.tag)}</category>` : "",
      "    </item>",
    ]
      .filter(Boolean)
      .join("\n")
  })
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(ARTICLES_TITLE)}</title>
    <link>${absoluteUrl(ARTICLES_PATH, site)}</link>
    <description>${escapeXml(ARTICLES_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${absoluteUrl(FEED_PATH, site)}" rel="self" type="application/rss+xml" />
${items.join("\n")}
  </channel>
</rss>
`
  return new Response(xml, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  })
}
