import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import Masonry from 'react-masonry-css'
import { get } from 'lodash'
import { useRouter } from 'next/router'

import css from './styles.module.scss'
import ProjectItem from '../ProjectItem'

const ProjectList = ({ allProjects = [] }) => {
  const [list, setList] = useState(allProjects)
  const router = useRouter()
  const { client } = router.query

  console.log('===', { client })

  useEffect(() => {
    if (!client) {
      setList(allProjects)
    } else {
      const filter = client?.toLowerCase()
      const filteredList = allProjects.filter(
        (item) => get(item, 'node.client.name', '').toLowerCase() === filter
      )
      setList(filteredList)
    }
  }, [allProjects, client])

  return (
    <section className={css.wrap}>
      <Masonry
        breakpointCols={3}
        className={css.grid}
        columnClassName={css.column}
      >
        {list.map((project) => (
          <ProjectItem {...project} key={project.node._meta.id} />
        ))}
      </Masonry>
    </section>
  )
}

ProjectList.propTypes = {
  // children: PropTypes.node.isRequired,
}

export default ProjectList
