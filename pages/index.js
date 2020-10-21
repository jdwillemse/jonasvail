import { useState } from 'react'

import { getAllProjects, getAllClients } from '../lib/api'
import Layout from '../components/Layout'
import ProjectList from '../components/ProjectList'
import { FilterContext } from '../context/FilterProvider'
import Header from '../components/Header'
import Menu from '../components/Menu'
import SubMenu from '../components/SubMenu'
import Sidebar from '../components/Sidebar'

export default function Index(props) {
  // const heroPost = allProjects[0].node
  // const morePosts = allProjects.slice(1)

  const [filter, setFilter] = useState()
  // console.log(props)

  return (
    <FilterContext.Provider value={filter}>
      <Layout {...props} setFilter={setFilter}>
        <div className="row">
          <div className="col-sm-3 col-lg-2">
            <Sidebar>
              <Header />
              <Menu {...props} setFilter={setFilter} />
              <SubMenu />
            </Sidebar>
          </div>
          <div className="col-sm-9 col-lg-10">
            <main>
              <ProjectList {...props} />
            </main>
          </div>
        </div>
      </Layout>
    </FilterContext.Provider>
  )
}

export async function getStaticProps({ preview = false, previewData }) {
  const allProjects = await getAllProjects(previewData)
  const allClients = await getAllClients(previewData)

  return {
    props: { preview, allProjects, allClients },
  }
}
