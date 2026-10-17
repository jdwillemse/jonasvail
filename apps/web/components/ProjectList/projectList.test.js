import { describe, expect, it } from 'bun:test'
import { prettyDOM, render } from '@testing-library/react'

import ProjectList from '.'
import data from '../../__mocks__/allProjects.json'

describe('ProjectList', () => {
  it('renders a list of projects', () => {
    const { container } = render(<ProjectList projects={data} />)
    // Bun can't serialise a DOM node, so this snapshots its markup.
    expect(
      prettyDOM(container, Infinity, { highlight: false })
    ).toMatchSnapshot()
  })

  it('filters the list based on the route', () => {
    const clientName = 'playstation'
    const { container } = render(<ProjectList projects={data} />)
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
