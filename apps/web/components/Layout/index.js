// Global styles first, so components' styles come after them.
import 'modern-normalize/modern-normalize.css'
import '@/styles/fonts.css'
import '@/styles/tokens.css'
import '@/styles/base.css'
import '@/styles/typography.css'
import '@/components/Squiggle/styles.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GetInTouch from '@/components/GetInTouch'
import PageColour from '@/components/PageColour'
import { assets } from '@/lib/assets'
import { stylesheet } from '@/lib/hooks'

const FONTS = [
  'ABCDiatypeMono-Regular.woff2',
  'ABCDiatype-Medium.woff2',
  'ABCLaica-Regular.woff2',
]

// Prefetches a same-site page when its link is hovered, so moving between
// pages stays quick without a client-side router.
const SPECULATION = JSON.stringify({
  prefetch: [{ where: { href_matches: '/*' }, eagerness: 'moderate' }],
})

// The page's <title>, description and share image, from lib/metadata.js.
function Meta({ title, description, image, noindex }) {
  return (
    <>
      {noindex && <meta name="robots" content="noindex" />}
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {image && (
        <>
          <meta property="og:title" content={title} />
          {description && (
            <meta property="og:description" content={description} />
          )}
          <meta property="og:image" content={image.url} />
          {image.width && (
            <meta property="og:image:width" content={image.width} />
          )}
          {image.height && (
            <meta property="og:image:height" content={image.height} />
          )}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          {description && (
            <meta name="twitter:description" content={description} />
          )}
          <meta name="twitter:image" content={image.url} />
          {image.width && (
            <meta name="twitter:image:width" content={image.width} />
          )}
          {image.height && (
            <meta name="twitter:image:height" content={image.height} />
          )}
        </>
      )}
    </>
  )
}

export default function Layout({ settings = {}, meta, pathname, children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {FONTS.map((font) => (
          <link
            key={font}
            rel="preload"
            href={`/fonts/${font}`}
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
        ))}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: our own CSS */}
        <style dangerouslySetInnerHTML={{ __html: stylesheet() }} />
        <Meta {...meta} />
        <link rel="icon" href="/icon.svg" sizes="any" type="image/svg+xml" />
        <link
          rel="apple-touch-icon"
          href="/apple-icon.png"
          sizes="180x180"
          type="image/png"
        />
        <script
          type="speculationrules"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: a constant
          dangerouslySetInnerHTML={{ __html: SPECULATION }}
        />
        <script type="module" src={assets.script} />
      </head>
      <body>
        <PageColour pathname={pathname} />
        <Header email={settings.email} />
        <main>
          {children}
          <GetInTouch email={settings.email} />
        </main>
        <Footer {...settings} />
      </body>
    </html>
  )
}
