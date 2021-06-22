import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { useSession } from 'next-auth/client'
import _ from 'lodash'

import css from './styles.module.scss'

export const LOCAL_STORAGE_KEY = 'invoice_history'

const mergeData = (newData = {}) => {
  try {
    const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
    if (newData.recipient) {
      const collated = [newData, ...storedData]
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(collated))
      return collated
    }
    return storedData
  } catch (err) {}
}

const InvoiceHistory = ({ data }) => {
  const [session] = useSession()
  const [history, setHistory] = useState([])

  useEffect(() => {
    const collatedData = mergeData(data)
    setHistory(_.groupBy(collatedData, 'recipient'))
  }, [data, setHistory])

  // do not show invoice if not logged in
  return session || process.env.NODE_ENV === 'development' ? (
    <article className={cn('page', css.wrap)}>
      <header className={cn(css.header, css.twoColumn)}>
        <h1>Invoice history</h1>
      </header>

      <section className={cn(css.section, css.twoColumn)}>
        <dl>
          {_.keys(history).map((client) => (
            <div key={client}>
              <dt>{client}</dt>
              {history[client].map((item) => (
                <dd className={cn(css.dd)} key={item.number}>
                  <Link
                    href={{
                      pathname: '/invoice',
                      query: item,
                    }}
                  >
                    <a>
                      <span>{item.date}</span>
                      <span>{item.number}</span>
                    </a>
                  </Link>
                </dd>
              ))}
            </div>
          ))}
        </dl>
      </section>
    </article>
  ) : null
}

export default InvoiceHistory
