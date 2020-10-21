import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import Masonry from 'react-masonry-css'
import { get } from 'lodash'

import css from './styles.module.scss'
import ProjectItem from '../ProjectItem'
import { FilterContext } from '../../context/FilterProvider'

const ProjectList = ({ allProjects = [] }) => {
  const [list, setList] = useState(allProjects)
  const filter = useContext(FilterContext)
  // const filter = "EA Sports";

  useEffect(() => {
    // console.log({filter});

    if (!filter || filter === 'All') {
      setList(allProjects)
    } else {
      const filteredList = allProjects.filter(
        (item) => get(item, 'node.client.name', 'noFilter') === filter
      )
      setList(filteredList)
    }
  }, [allProjects, filter])

  // console.log(list)

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
