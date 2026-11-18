import type { APIRoute } from "astro"
import {
  absoluteUrl,
  ARTICLES_DESCRIPTION,
  articlePath,
  listedArticles,
  SITE_NAME,
} from "@/lib/articles"

/** /llms.txt: a Markdown index of the site's articles for AI assistants. */
export const GET: APIRoute = async ({ site }) => {
  const articles = await listedArticles()
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${ARTICLES_DESCRIPTION}`,
    "",
    "## Articles",
    "",
    ...articles.map(
      (article) =>
        `- [${article.data.title}](${absoluteUrl(articlePath(article.id), site)}): ${article.data.description}`
    ),
    "",
  ]
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  })
}
