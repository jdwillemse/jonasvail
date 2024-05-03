import { render } from '@testing-library/react'

import Menu from './'
import mockData from '../../__mocks__/clients.json'


const mockedGetAllClients = jest.fn()
const mockUsePathname = jest.fn(() => '/')

jest.mock('../../lib/api', () => ({
  getAllClients() {
    return mockedGetAllClients()
  },
}))

jest.mock('next/navigation', () => ({
  usePathname() {
    return mockUsePathname()
  },
}))

describe('Menu', () => {
  it('does not throw errors when data is not passed', async () => {
    const { container } = render(await Menu())
    expect(container).toMatchSnapshot()
  })

  it('renders the list correctly', async () => {
    mockedGetAllClients.mockImplementationOnce(() => mockData)
    const { container } = render(await Menu())

    expect(container).toMatchSnapshot()
  })
})
