import { render } from '@testing-library/react'

import AboutContent from '.'
import data from './mockdata.json'

describe('AboutContent', () => {
  it('renders when content is passed', () => {
    const { container } = render(<AboutContent {...data} />)
    expect(container).toMatchSnapshot()
  })

  it('renders when content is not passed', () => {
    const { container } = render(<AboutContent />)
    expect(container.querySelector('.col-sm-12').childNodes.length).toBe(0)
  })
})
