import PageView from '@/components/PageView'
import { pageMeta } from '@/lib/metadata'
import renderPage from '@/lib/render'

export const data = {
  pagination: { data: 'pages', size: 1, alias: 'sanityPage' },
  permalink: ({ sanityPage }) =>
    sanityPage.slug === 'home' ? '/' : `/${sanityPage.slug}/`,
}

export function render({ sanityPage, ...data }) {
  // The homepage keeps the site title from Settings.
  const meta = sanityPage.slug === 'home' ? { seo: sanityPage.seo } : sanityPage
  return renderPage(
    data,
    <PageView page={sanityPage} />,
    pageMeta(data.settings, meta)
  )
}
