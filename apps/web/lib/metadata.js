// A page's <title>, description and share image. The page's own win; Settings
// fills the rest. A page title goes before the company name, and without one
// the site title from Settings stands alone.
export function pageMeta(settings, { title, seo, image } = {}) {
  const name = settings?.companyName
  const pageTitle = seo?.title ?? title
  return {
    title: pageTitle
      ? `${pageTitle} | ${name}`
      : [name, settings?.title].filter(Boolean).join(' | '),
    description: seo?.description ?? settings?.description,
    image: [seo?.image, image, settings?.ogImage].find((i) => i?.url),
  }
}
