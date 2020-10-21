import React, { useCallback } from 'react'
// import PropTypes from "prop-types"

import css from './styles.module.scss'



// component
// ========================================================================
const MenuButton = ({ name, setFilter }) => {
  const handleFilter = useCallback(() => {
    setFilter(name)
  }, [name])

  return (
    <div className={css.wrap}>
      <button className={css.button} onClick={handleFilter} type="button">{name}</button>
    </div>
  )
}


// Menu.propTypes = {
//   description: PropTypes.string,
//   lang: PropTypes.string,
//   meta: PropTypes.arrayOf(PropTypes.object),
//   title: PropTypes.string,
//   image: PropTypes.shape({
//     width: PropTypes.number.isRequired,
//     height: PropTypes.number.isRequired,
//     url: PropTypes.string.isRequired,
//   }),
// }

// Menu.defaultProps = {
//   lang: "en-gb",
//   meta: [],
//   title: "Page",
//   description: "",
//   image: undefined,
// }

export default MenuButton
