/**
 * The blog's sections, in tab order. Each is a category tag: the Changelog
 * agent publishes under `changelog`, the SEO/AEO agent under `guides`, and a
 * person tags `company` posts. A section with no posts gets no tab, and an
 * article with no section tag isn't listed.
 */
export const SECTIONS = [
  {
    tag: "changelog",
    label: "Product",
    description: "What's new in Lumen, as it ships.",
  },
  {
    tag: "guides",
    label: "Guides",
    description: "Practical guides to writing docs your team keeps current.",
  },
  {
    tag: "company",
    label: "Company",
    description: "News and notes from the team building Lumen.",
  },
] as const

export type Section = (typeof SECTIONS)[number]

/** The section an article belongs to: the first section tag it carries. */
export function sectionOf(categories: readonly string[]): Section | null {
  for (const category of categories) {
    const section = SECTIONS.find(({ tag }) => tag === category)
    if (section) return section
  }
  return null
}
