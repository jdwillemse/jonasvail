import Notification from '../Notification'
import Head from '../Head'
import Header from '../Header'
import Menu from '../Menu'
import Sidebar from '../Sidebar'
import Analytics from '../Analytics'
import { getSettings } from '../../lib/api'
import css from './styles.module.scss'

const Layout = async ({ children, preview }) => {
  const settings = await getSettings()

  return (
    <div className="container-fluid">
      <Notification preview={preview} />
      <Head settings={settings} />
      <div className="row">
        <div className="col-sm-3 col-lg-2">
          <Sidebar>
            <Header {...settings} />
            <Menu />
          </Sidebar>
        </div>
        <div className="col-sm-9 col-lg-10">
          <main>
            <section className={css.wrap}>{children}</section>
          </main>
        </div>
      </div>
      <Analytics />
    </div>
  )
}

export default Layout
