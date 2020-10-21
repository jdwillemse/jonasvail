import React from 'react'

import { getAllProjects, getProjectAndMoreProjects } from '../lib/api'
import Layout from '../components/Layout'
import PageDetail from '../components/PageDetail'
import Header from '../components/Header'
import Menu from '../components/Menu'
import SubMenu from '../components/SubMenu'
import Slices from '../components/Slices'

export default function ProjectTemplate(props) {
  return (
    <Layout {...props}>
      <div className="row">
        <div className="col-sm-3 col-lg-2">
          <Header />
          <Menu />
          <SubMenu />
        </div>
        <div className="col-sm-9 col-lg-10">
          <main>
            <PageDetail {...props.project}>
              <Slices {...props.project} />
            </PageDetail>
          </main>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const data = await getProjectAndMoreProjects(params.uid, previewData)

  return {
    props: {
      preview,
      project: data.node,
      // morePosts: data?.morePosts ?? [],
    },
  }
}

export async function getStaticPaths() {
  const allProjects = await getAllProjects()
  return {
    paths: (allProjects || []).map(({ node }) => `/${node._meta.uid}`),
    fallback: true,
  }
}
