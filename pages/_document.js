import Document, { Html, Head, Main, NextScript } from 'next/document'

import TestGrid from '../components/TestGrid'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
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
        <body className="app">
          <TestGrid />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
