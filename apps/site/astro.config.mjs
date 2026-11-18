import { defineConfig } from "astro/config"

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")

const textOf = (node) =>
  node.type === "text"
    ? node.value
    : (node.children ?? []).map(textOf).join("")

/** Gives h2/h3 headings an id from their text and a visible link anchor. */
function rehypeHeadingAnchors() {
  return (tree) => {
    const used = new Map()
    const visit = (node) => {
      if (node.type === "element" && (node.tagName === "h2" || node.tagName === "h3")) {
        const base = slugify(textOf(node)) || "section"
        const count = used.get(base) ?? 0
        used.set(base, count + 1)
        const id = node.properties?.id ?? (count ? `${base}-${count}` : base)
        node.properties = { ...node.properties, id }
        node.children.push({
          type: "element",
          tagName: "a",
          properties: {
            href: `#${id}`,
            className: ["heading-anchor"],
            ariaLabel: `Link to ${textOf(node)}`,
          },
          children: [{ type: "text", value: "#" }],
        })
        return
      }
      ;(node.children ?? []).forEach(visit)
    }
    visit(tree)
  }
}

export default defineConfig({
  site: "https://darioghtest.github.io",
  base: "/paragraph-articles-test",
  trailingSlash: "always",
  output: "static",
  markdown: {
    rehypePlugins: [rehypeHeadingAnchors],
  },
})
