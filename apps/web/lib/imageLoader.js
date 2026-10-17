// Sanity's image CDN resizes images, so Next's image optimizer is skipped.
export default function imageLoader({ src, width, quality }) {
  if (!src.startsWith('https://cdn.sanity.io/')) return src
  const url = new URL(src)
  url.searchParams.set('w', width)
  url.searchParams.set('q', quality ?? 75)
  url.searchParams.set('fit', 'max')
  url.searchParams.set('auto', 'format')
  return url.href
}
