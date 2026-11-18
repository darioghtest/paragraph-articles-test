import type { APIRoute, GetStaticPaths } from "astro"
import {
  type Article,
  absoluteUrl,
  allArticles,
  articlePath,
  modifiedAt,
} from "@/lib/articles"

/**
 * /articles/<slug>.md: the article as Markdown, for AI assistants and agents,
 * with a short header naming the canonical HTML page.
 */
export const getStaticPaths = (async () => {
  const articles = await allArticles()
  return articles.map((article) => ({
    params: { slug: article.id },
    props: { article },
  }))
}) satisfies GetStaticPaths

export const GET: APIRoute<{ article: Article }> = ({ props, site }) => {
  const { article } = props
  const { title, description, publishedAt, authors } = article.data
  const lines = [
    `# ${title}`,
    "",
    `> ${description}`,
    "",
    `- URL: ${absoluteUrl(articlePath(article.id), site)}`,
    `- Published: ${publishedAt.toISOString().slice(0, 10)}`,
    `- Updated: ${modifiedAt(article).toISOString().slice(0, 10)}`,
    ...(authors.length
      ? [`- Authors: ${authors.map((author) => author.name).join(", ")}`]
      : []),
    "",
    (article.body ?? "").trim(),
    "",
  ]
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
