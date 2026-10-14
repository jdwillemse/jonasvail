import '@/styles/tokens.css'
import '@/styles/fonts.css'
import '@/styles/base.css'
import '@/styles/typography.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GetInTouch from '@/components/GetInTouch'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main id="main">
          {children}
          <GetInTouch />
        </main>
        <Footer />
      </body>
    </html>
  )
}
