import type { APIRoute } from "astro"
import {
  ARTICLES_DESCRIPTION,
  absoluteUrl,
  articlePath,
  listedArticles,
  SITE_NAME,
} from "@/lib/articles"

/** /llms.txt: the site and its listed articles, for AI answer engines. */
export const GET: APIRoute = async ({ site }) => {
  const articles = await listedArticles()
  const lines = articles.map(
    (article) =>
      `- [${article.data.title}](${absoluteUrl(articlePath(article.id), site)}): ${article.data.description}`
  )
  const body = `# ${SITE_NAME}

> ${ARTICLES_DESCRIPTION}

## Articles

${lines.join("\n")}
`
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  })
}
