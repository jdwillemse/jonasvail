// TODO: remove bootstrap dependency
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/main.scss'

import TestGrid from '../components/TestGrid'
import Head from 'next/head'
import Layout from '../components/Layout'
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
          <TestGrid />
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  )
}