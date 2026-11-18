import { defineConfig } from "astro/config"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"

export default defineConfig({
  site: "https://darioghtest.github.io",
  base: "/paragraph-articles-test",
  trailingSlash: "always",
  output: "static",
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          test: ["h2", "h3"],
          properties: { class: "heading-anchor", ariaLabel: "Link to this section" },
          content: { type: "text", value: "#" },
        },
      ],
    ],
  },
})
