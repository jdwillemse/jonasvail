import React, { useState } from 'react'
import Link from 'next/link'
import { get } from 'lodash'

import css from './styles.module.scss'
import { asText } from '../../utils/prismic'
import linkResolver from '../../utils/linkResolver'
import MenuButton from '../MenuButton'

// const query = graphql`
//   query {
//     prismic {
//       data: allClients(sortBy:meta_firstPublicationDate_DESC) {
//         clients: edges {
//           node {
//            meta: _meta {
//               id
//               uid
//               type
//             }
//             name
//           }
//         }
//       }
//     }
//   }
// `

// component
// ========================================================================
const Menu = ({ setFilter, allClients = [] }) => {
  if (allClients.length === 0) {
    return <Link href="/">Projects</Link>
  }

  return (
    <nav>
      <MenuButton name="All" setFilter={setFilter} />
      {allClients.map(({ node: { name, _meta } }) => (
        <MenuButton {...{ name, setFilter }} key={_meta.id} />
      ))}
    </nav>
  )
}

export default Menu
