import { renderToStaticMarkup } from 'react-dom/server'

import Layout from '@/components/Layout'

// A full HTML page from an 11ty template's data, its content and its
// metadata (see lib/metadata.js).
export default function renderPage(data, content, meta) {
  return `<!DOCTYPE html>${renderToStaticMarkup(
    <Layout
      settings={data.settings}
      meta={meta}
      pathname={data.page.url.replace(/(.)\/$/, '$1')}
    >
      {content}
    </Layout>
  )}`
}
