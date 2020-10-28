import React, { useState, useEffect, useRef } from 'react'
// import PropTypes from 'prop-types'
import { get } from 'lodash'
import { useRouter } from 'next/router'

import css from './styles.module.scss'
import ProjectItem from '../ProjectItem'

// Masonry strategy from https://bit.ly/3dVysYj
const ProjectList = ({ allProjects = [] }) => {
  const [list, setList] = useState(allProjects)
  const router = useRouter()
  const gridRef = useRef()
  const allItems = useRef()
  const rowHeight = useRef()
  const rowGap = useRef()
  const { client } = router.query

  // calculate grid item height and apply this to item
  function resizeGridItem(item) {
    const rowSpan = Math.ceil(
      (item.firstChild.getBoundingClientRect().height + rowGap.current) /
        (rowHeight.current + rowGap.current)
    )
    item.style.gridRowEnd = 'span ' + rowSpan
  }

  // loop over grid items and calculate size for each
  function resizeAllGridItems() {
    const gridComputedStyle = window.getComputedStyle(gridRef.current)
    rowHeight.current = parseInt(
      gridComputedStyle.getPropertyValue('grid-auto-rows')
    )
    rowGap.current = parseInt(
      gridComputedStyle.getPropertyValue('grid-row-gap')
    )
    for (let item of allItems.current) {
      resizeGridItem(item)
    }
  }

  // filter list of grid items based on client
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

  // cache grid item list and add window resize listener
  useEffect(() => {
    allItems.current = gridRef.current.children
    resizeAllGridItems()
    window.addEventListener('resize', resizeAllGridItems)

    return () => {
      window.removeEventListener('resize', resizeAllGridItems)
    }
  }, [])

  return (
    <section className={css.wrap}>
      <div className={css.masonryWrapper}>
        <div className={css.masonry} ref={gridRef}>
          {list.map((project) => (
            <div key={project.node._meta.id}>
              <ProjectItem {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectList
