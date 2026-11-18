import type { APIRoute } from "astro"
import { absoluteUrl } from "@/lib/articles"

/** The sitemap index: the site's own pages and the articles sitemap. */
export const GET: APIRoute = ({ site }) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${absoluteUrl("/sitemap-articles.xml", site)}</loc>
  </sitemap>
</sitemapindex>
`
  return new Response(xml, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  })
}
