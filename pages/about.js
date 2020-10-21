import React, { useState } from 'react'

import { getAbout } from '../lib/api'
import Layout from '../components/Layout'
import PageDetail from '../components/PageDetail'
import { FilterContext } from '../context/FilterProvider'
import Header from '../components/Header'
import Menu from '../components/Menu'
import SubMenu from '../components/SubMenu'
import AboutContent from '../components/AboutContent'

const css = {}

// eslint-disable-next-line react/jsx-props-no-spreading
export default function PageContainer(props) {
  const [filter, setFilter] = useState()

  return (
    <FilterContext.Provider value={filter}>
      <Layout {...props} setFilter={setFilter}>
        <div className="row">
          <div className="col-sm-3 col-lg-2">
            <Header />
            <Menu />
            <SubMenu />
          </div>
          <div className="col-sm-9 col-lg-10">
            <main>
              <PageDetail {...props.data}>
                <AboutContent {...props.data} />
              </PageDetail>
            </main>
          </div>
        </div>
      </Layout>
    </FilterContext.Provider>
  )
}

export async function getStaticProps({ preview = false, previewData }) {
  const { node } = await getAbout(previewData)

  return {
    props: { preview, data: node },
  }
}
