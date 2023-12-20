// TODO: remove bootstrap dependency
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/main.scss'

import TestGrid from '../components/TestGrid'
import Head from 'next/head'
import Layout from '../components/Layout'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="app-root">
          <Head>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap"
            />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <link
              rel="preload"
              as="style"
              href="https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap"
            />
          </Head>
          <TestGrid />
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  )
}
