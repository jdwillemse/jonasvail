'use client'

import Masonry from 'react-masonry-css'

import css from './styles.module.css'
import ProjectItem from '../ProjectItem'

const breakpointColumnsObj = {
  default: 4,
  1300: 3,
  900: 2,
}

const ProjectList = ({ projects = [] }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={css.masonryGrid}
      columnClassName={css.masonryColumn}
      data-test-id="masonry-wrap"
    >
      {projects.map((project) => (
        <ProjectItem {...project} key={project.sys.id} />
      ))}
    </Masonry>
  )
}

export default ProjectList
