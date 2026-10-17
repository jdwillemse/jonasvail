// Next metadata for a page or project. Empty fields are left out, because
// Next treats an undefined key as "clear", not "use the root layout's", and
// the root layout's come from Settings.
export function seoMetadata({ title, seo, image } = {}) {
  const share = seo?.image ?? image
  const metadata = {
    title: seo?.title ?? title,
    description: seo?.description,
    openGraph: share?.url && {
      images: [{ url: share.url, width: share.width, height: share.height }],
    },
  }
  return Object.fromEntries(Object.entries(metadata).filter(([, v]) => v))
}
