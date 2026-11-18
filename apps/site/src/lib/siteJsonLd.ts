import { absoluteUrl } from "./articles"

/**
 * The site-wide JSON-LD nodes: the Organization behind the site and the
 * WebSite it publishes. Article pages point at them by `@id`.
 */
export function organizationId(site: URL | undefined): string {
  return `${absoluteUrl("/", site)}#organization`
}

export function websiteId(site: URL | undefined): string {
  return `${absoluteUrl("/", site)}#website`
}

export function siteJsonLd(site: URL | undefined) {
  const siteUrl = absoluteUrl("/", site)
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": organizationId(site),
      name: "Lumen",
      url: siteUrl,
      logo: absoluteUrl("/favicon.svg", site),
      description: "Lumen is a docs tool that keeps product docs current.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId(site),
      name: "Lumen",
      url: siteUrl,
      publisher: { "@id": organizationId(site) },
    },
  ]
}
