import css from './styles.module.scss'
import { getAllClients } from '../../lib/api'
import ClientList from './ClientList'
import HeaderItem from './HeaderItem'
import SecondaryItem from './SecondaryItem'

// component
// ========================================================================
const Menu = async () => {
  const clients = (await getAllClients()) || []

  return (
    <nav>
      <HeaderItem />
      <ClientList clients={clients} />
      <SecondaryItem label="About" />
      <a
        href="mailto:jonasvail@gmail.com?Subject=Hoi%20Hoi%20Hello!"
        className={css.link}
      >
        <span className={css.linkInner}>Contact</span>
      </a>
    </nav>
  )
}

export default Menu
