import { render } from '@testing-library/react'

import ProjectList from '.'
import data from './mockdata.json'
import { mockNextUseRouter } from '../../utils/testUtils'

describe('ProjectList', () => {
  beforeEach(() => {
    // Mocks Next.js route
    mockNextUseRouter({
      route: '/',
      pathname: '/',
      query: {},
      asPath: '',
    })
  })

  it('renders a list of projects', () => {
    const { container } = render(<ProjectList allProjects={data} />)
    expect(container).toMatchSnapshot()
  })

  it('filters the list based on the route', () => {
    const clientName = 'playstation'
    mockNextUseRouter({
      route: '/',
      pathname: '/',
      query: { client: clientName },
      asPath: '',
    })
    const { container } = render(<ProjectList allProjects={data} />)
    container.querySelectorAll('.client').forEach((element) => {
      expect(element.textContent).toMatchSnapshot(clientName)
    })
  })

  it('does not throw errors when content is not passed', () => {
    const { container } = render(<ProjectList />)
    expect(
      container.querySelector('[data-test-id="masonry-wrap"]').childNodes.length
    ).toBe(0)
  })
})
