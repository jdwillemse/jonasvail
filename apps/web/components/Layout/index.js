import Notification from '../Notification'
import Head from '../Head'
import Header from '../Header'
import Menu from '../Menu'
import Sidebar from '../Sidebar'
import { getSettings } from '../../lib/api'
import css from './styles.module.scss'

const Layout = async ({ children, preview }) => {
  const settings = await getSettings()

  return (
    <div className="container-fluid">
      <Notification preview={preview} />
      <Head settings={settings} />

      <div className="sidebar">
        <Sidebar>
          <Header {...settings} />
          <Menu />
        </Sidebar>
      </div>
      <main className="content">
        <section className={css.wrap}>{children}</section>
      </main>
    </div>
  )
}

export default Layout
