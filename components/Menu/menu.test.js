import { render } from '@testing-library/react'

import Menu from './'
import mockData from './mockdata.json'
import { mockNextUseRouter } from '../../utils/testUtils'

describe('Menu', () => {
  beforeEach(() => {
    // Mocks Next.js route
    mockNextUseRouter({
      route: '/',
      pathname: '/',
      query: {},
      asPath: '',
    })
  })

  it('renders the list correctly', () => {
    const { container } = render(<Menu {...mockData} />)
    expect(container).toMatchSnapshot()
  })

  it('does not throw errors when data is not passed', () => {
    const { container } = render(<Menu />)
    expect(container).toMatchSnapshot()
  })
})
