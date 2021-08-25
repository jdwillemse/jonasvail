import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { useSession } from 'next-auth/client'
import _ from 'lodash'

import css from './styles.module.scss'

export const LOCAL_STORAGE_KEY = 'invoice_history'

// get data that was stored in a previous session
const getSavedData = () => {
  try {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY)
    return JSON.parse(storedData) || []
  } catch (err) {
    return []
  }
}

// merge new data into previous session data
const mergeData = (sessionData = [], newData = {}) => {
  const index = _.findIndex(sessionData, { number: newData.number })
  const collated = [...sessionData]
  // if newData has a previously saved invoice number it gets merged with that entry
  if (index > -1) {
    const mergedItem = { ...sessionData[index], ...newData }
    collated.splice(index, 1, mergedItem)
  } else {
    // add new data to the top of the list
    collated.unshift(newData)
  }
  return collated
}

const setUpdatedData = (collatedData) => {
  if (collatedData.length) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(collatedData))
  }
}

const InvoiceHistory = ({ data }) => {
  const [session] = useSession()
  const [history, setHistory] = useState([])

  useEffect(() => {
    const sessionData = getSavedData()
    const mergedData = mergeData(sessionData, data)
    setUpdatedData(mergedData)
    setHistory(_.groupBy(mergedData, 'recipient'))
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
