import '@/styles/vars.css'
import '@/styles/index.css'
import '@/styles/main.css'

import Layout from '@/components/Layout'
import { Karla } from 'next/font/google'

const karla = Karla({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={karla.className}>
      <body>
        <div id="app-root">
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  )
}
