// import 'bootstrap/dist/css/bootstrap.css'
// npm package version of bootstrap causes invoice print size to be incorrect
// TODO: remove bootstrap dependency
import '../styles/bootstrap.css'
import '../styles/main.scss'
import '../styles/pdf.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
