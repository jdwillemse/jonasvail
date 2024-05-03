import { render } from '@testing-library/react'

import AboutContent from '.'
import data from '../../__mocks__/about.json'


describe('AboutContent', () => {
  it('renders when content is passed', () => {
    const { container } = render(<AboutContent data={data} />)
    expect(container).toMatchSnapshot()
  })

  it('renders when content is not passed', () => {
    const { container } = render(<AboutContent />)
    expect(container.querySelector('ul')).toBeNull()
  })
})
