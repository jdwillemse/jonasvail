const SITE = 'https://www.jonasvail.com'

export const data = {
  permalink: '/sitemap.xml',
  eleventyExcludeFromCollections: true,
}

// Vercel serves pages without the trailing slash (vercel.json).
export function render({ collections }) {
  const urls = collections.all
    .map(
      (page) =>
        `<url><loc>${SITE}${page.url.replace(/(.)\/$/, '$1')}</loc></url>`
    )
    .join('')
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
}
