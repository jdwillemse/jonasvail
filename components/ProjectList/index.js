import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import get from 'lodash.get'
import debounce from 'lodash.debounce'

import css from './styles.module.scss'
import ProjectItem from '../ProjectItem'

const ProjectList = ({ allProjects = [] }) => {
  const [list, setList] = useState(allProjects)
  const router = useRouter()
  const gridRef = useRef()
  const allItems = useRef()
  const { client } = router.query
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

  // filter list of grid items based on client
  useEffect(() => {
    if (!client) {
      setList(allProjects)
    } else {
      const filter = client?.toLowerCase()
      const filteredList = allProjects.filter(
        (project) =>
          get(project, 'data.client.data.name', '').toLowerCase() === filter
      )
      setList(filteredList)
    }
  }, [allProjects, client])

  // cache grid item list and add window resize listener
  useEffect(() => {
    window.addEventListener('resize', resizeAllGridItems)
    return () => {
      window.removeEventListener('resize', resizeAllGridItems)
    }
  }, [resizeAllGridItems])

  // update masonry layout if list updates
  useEffect(() => {
    if (!allItems.current) {
      allItems.current = gridRef.current.children
    }
    setTimeout(() => {
      resizeAllGridItems()
    }, 1000)
  }, [list, resizeAllGridItems])

  return (
    <section className={css.wrap}>
      <div className={css.masonry} ref={gridRef} data-test-id="masonry-wrap">
        {list.map((project) => (
          <div className={css.item} key={project.id}>
            <ProjectItem {...project} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProjectList
