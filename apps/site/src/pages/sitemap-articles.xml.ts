import type { APIRoute } from "astro"
import {
  ARTICLES_PATH,
  absoluteUrl,
  articlePath,
  listedArticles,
  modifiedAt,
  sectionPath,
  sectionsWithPosts,
} from "@/lib/articles"

/** Every listed article, plus the index and each section that has one. */
export const GET: APIRoute = async ({ site }) => {
  const articles = await listedArticles()
  const latest = articles[0] ? modifiedAt(articles[0]) : new Date()
  const entries = [
    { loc: absoluteUrl(ARTICLES_PATH, site), lastmod: latest },
    ...sectionsWithPosts(articles).map((section) => ({
      loc: absoluteUrl(sectionPath(section), site),
      lastmod: latest,
    })),
    ...articles.map((article) => ({
      loc: absoluteUrl(articlePath(article.id), site),
      lastmod: modifiedAt(article),
    })),
  ]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    ({ loc, lastmod }) =>
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod.toISOString()}</lastmod>\n  </url>`
  )
  .join("\n")}
</urlset>
`
  return new Response(xml, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  })
}
