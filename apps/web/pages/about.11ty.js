import AboutView from '@/components/AboutView'
import { pageMeta } from '@/lib/metadata'
import renderPage from '@/lib/render'

export const data = {
  permalink: ({ about }) => (about ? '/about/' : false),
}

export function render(data) {
  return renderPage(
    data,
    <AboutView about={data.about} />,
    pageMeta(data.settings, data.about)
  )
}
