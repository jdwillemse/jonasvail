import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'

// the amount to scale retina images with
const SCALE = 1.5

const Image = ({ image, className }) => {
  const alt = get(image, 'alt', '')
  const dimensions = get(image, 'dimensions', {})
  const sizes = [375, 510, 690, 825]
  const srcSet = sizes.map(
    (size) => `${image.url}?auto=compress,format&w=${size} ${size}w`
  )

  {
    /* <img srcset="elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 600px) 480px,
            800px"
     src="elva-fairy-800w.jpg"
     alt="Elva dressed as a fairy"> */
  }
  return (
    <img
      srcSet={srcSet}
      src={`${image.url}?auto=compress,format&w=50&blur=400`}
      alt={alt}
      className={className}
      // {...dimensions}
    />
  )
}

Image.propTypes = {
  image: PropTypes.shape({
    alt: PropTypes.string,
    url: PropTypes.string,
  }),
  childImageSharp: PropTypes.shape({
    fluid: PropTypes.object,
  }),
  className: PropTypes.string,
}

Image.defaultProps = {
  image: null,
  childImageSharp: {},
  className: '',
}

export default Image
