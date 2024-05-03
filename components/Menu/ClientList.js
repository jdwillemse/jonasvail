'use client'

import css from './styles.module.scss'
import ClientItem from './ClientItem'
import { usePathname } from 'next/navigation'

// component
// ========================================================================
export default function ClientList({ clients }) {
  // the pathname includes a leading /
  const pathname = usePathname().split('/').pop()

  return (
    <div className={css.clientWrap}>
      {(clients || []).map((client) => (
        <ClientItem
          {...client}
          isActive={client.uid === pathname}
          key={client.sys.id}
        />
      ))}
    </div>
  )
}
