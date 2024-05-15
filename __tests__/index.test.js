import { render, screen } from '@testing-library/react'

import HomePage from '../app/page'
import mockedProjects from '../__mocks__/allProjects.json'

const mockUsePathname = jest.fn(() => '/')

jest.mock('next/navigation', () => ({
  usePathname() {
    return mockUsePathname()
  },
}))

jest.mock('../lib/api', () => ({
  getAllClients: jest.fn(),
  getAllProjects: jest.fn(() => mockedProjects),
}))

describe('HomePage', () => {
  beforeAll(() => {
    // Mock warn & error to catch errors thrown by React into the console
    console.warn = jest.fn()
    console.error = jest.fn()
  })

  afterEach(() => {
    expect(console.warn).not.toHaveBeenCalled()
    expect(console.error).not.toHaveBeenCalled()
  })

  it('renders without crashing', async () => {
    render(await HomePage())
    // expect(screen.getByRole('link', { name: 'Jonas Vail' })).toBeInTheDocument()
  })
})
