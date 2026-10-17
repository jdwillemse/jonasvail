import { beforeAll, afterEach, describe, expect, it, mock } from 'bun:test'
import { render, screen } from '@testing-library/react'

const text = (value) => [
  {
    _key: value,
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [{ _key: 's', _type: 'span', text: value, marks: [] }],
  },
]

mock.module('../lib/api', () => ({
  getPage: mock(async () => ({
    title: 'Home',
    hero: 'Hero copy',
    sections: [
      {
        _key: 'a',
        _type: 'textSection',
        title: 'Work',
        copy: text('Work copy'),
      },
      {
        _key: 'b',
        _type: 'pageLinks',
        label: 'Case Studies',
        pages: [
          { title: 'Brand', slug: 'brand-development-and-strategy' },
          { title: 'Home again', slug: 'home' },
        ],
      },
    ],
  })),
}))

// Imported after the mock, so the page never loads the Sanity client.
const { default: HomePage } = await import('../app/page')

describe('HomePage', () => {
  beforeAll(() => {
    // Mock warn & error to catch errors thrown by React into the console
    console.warn = mock()
    console.error = mock()
  })

  afterEach(() => {
    expect(console.warn).not.toHaveBeenCalled()
    expect(console.error).not.toHaveBeenCalled()
  })

  it('renders the sections in order', async () => {
    render(await HomePage())
    expect(screen.getByText('Hero copy')).toBeInTheDocument()
    expect(screen.getByText('Work copy')).toBeInTheDocument()
    expect(screen.getByText('Case Studies')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Brand' })).toHaveAttribute(
      'href',
      '/brand-development-and-strategy'
    )
    expect(screen.getByRole('link', { name: 'Home again' })).toHaveAttribute(
      'href',
      '/'
    )
  })
})
