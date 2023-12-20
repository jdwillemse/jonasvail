'use client'

import React, { useEffect, useRef, useCallback } from 'react'
import debounce from 'lodash.debounce'

import css from './styles.module.scss'
import ProjectItem from '../ProjectItem'

const ProjectList = ({ projects = [] }) => {
  const gridRef = useRef()
  // loop over grid items and calculate size for each to conclude container height
  const debounced = useRef(
    debounce(() => {
      const winWidth = window.innerWidth
      const columnCount = winWidth >= 768 ? 3 : 2
      const columnHeight = Array.from(gridRef.current.children).reduce(
        (sum, element) => sum + element.getBoundingClientRect().height,
        0
      )

      gridRef.current.style.height = `${
        columnHeight / columnCount + winWidth * 0.4
      }px`
    }, 200)
  )

  // pattern from https://stackoverflow.com/questions/54666401/how-to-use-throttle-or-debounce-with-react-hook
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resizeAllGridItems = useCallback(debounced.current, [gridRef])

  // cache grid item list and add window resize listener
  useEffect(() => {
    window.addEventListener('resize', resizeAllGridItems)
    return () => {
      window.removeEventListener('resize', resizeAllGridItems)
    }
  }, [resizeAllGridItems])

  return (
    <div className={css.masonry} ref={gridRef} data-test-id="masonry-wrap">
      {projects.map((project) => (
        <div className={css.item} key={project.id}>
          <ProjectItem {...project} />
        </div>
      ))}
    </div>
  )
}

export default ProjectList
