import React from 'react'

import Notification from './Notification'
import Head from './Head'
// import Header from './Header'
// import Menu from './Menu'

const Layout = ({ children, preview }) => {
  return (
    <div className="container">
      <Notification preview={preview} />

      {/* <Head {...data} /> */}
      {children}
    </div>
  )
}

export default Layout
