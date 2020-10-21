import Document, { Html, Head, Main, NextScript } from 'next/document'

import TestGrid from '../components/TestGrid'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="app">
          <TestGrid />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
