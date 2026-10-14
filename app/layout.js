import '@/styles/fonts.css'
import '@/styles/static.css'
import '@/styles/stripped-theme.css'
import '@/styles/site-good-colours.css'
import '@/styles/inline.css'
import '@/styles/main.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GetInTouch from '@/components/GetInTouch'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="clearfix site-wrapper">
          <Header />
          <main className="container" role="main">
            {children}
            <GetInTouch />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
