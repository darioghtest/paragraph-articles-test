# Lumen web (test fixture)

An Astro site for a fictional docs tool, Lumen. It exists to test tools that
read and edit a team's article pages. All content is placeholder.

- Site: `apps/site/` (Astro, static output, GitHub Pages project site)
- Articles: `apps/site/src/content/articles/<slug>.md`
- Sections: `apps/site/src/lib/sections.ts` (`changelog`, `guides`, `company`)
- Covers: `apps/site/public/images/`

```sh
npm install
npm run dev
```
