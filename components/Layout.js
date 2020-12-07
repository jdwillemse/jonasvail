import React from 'react'

import Notification from './Notification'
import Head from './Head'
import Header from './Header'
import Menu from './Menu'
import Sidebar from './Sidebar'
import Analytics from './Analytics'

const Layout = ({ children, preview, ...props }) => {
  return (
    <div className="container-fluid">
      <Notification preview={preview} />
      <Head {...props} />
      <div className="row">
        <div className="col-sm-3 col-lg-2">
          <Sidebar>
            <Header />
            <Menu {...props} />
          </Sidebar>
        </div>
        <div className="col-sm-9 col-lg-10">
          <main>{children}</main>
        </div>
      </div>
      <Analytics />
    </div>
  )
}

export default Layout
