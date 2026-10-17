import '@/styles/tokens.css'
import '@/styles/base.css'
import '@/styles/typography.css'

import { laica, diatype, diatypeMono } from './fonts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GetInTouch from '@/components/GetInTouch'
import PageColour from '@/components/PageColour'
import Squiggle from '@/components/Squiggle'
import { getSettings } from '@/lib/api'

export async function generateMetadata() {
  const settings = await getSettings()
  const name = settings?.companyName
  return {
    title: {
      default: [name, settings?.title].filter(Boolean).join(' | '),
      template: `%s | ${name}`,
    },
    description: settings?.description,
    ...(settings?.ogImage?.url && {
      openGraph: { images: [settings.ogImage.url] },
    }),
  }
}

export default async function RootLayout({ children }) {
  const settings = (await getSettings()) ?? {}

  return (
    <html
      lang="en"
      className={`${laica.variable} ${diatype.variable} ${diatypeMono.variable}`}
    >
      <body>
        <PageColour />
        <Squiggle />
        <Header email={settings.email} />
        <main id="main">
          {children}
          <GetInTouch email={settings.email} />
        </main>
        <Footer {...settings} />
      </body>
    </html>
  )
}
