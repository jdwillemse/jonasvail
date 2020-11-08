import { render, screen } from '@testing-library/react'

import withTestRouter from '../__mocks__/withTestRouter'
import App from '../pages/index'

describe('App', () => {
  beforeAll(() => {
    // Mock warn & error to catch errors thrown by React into the console
    console.warn = jest.fn()
    console.error = jest.fn()
  })

  afterEach(() => {
    expect(console.warn).not.toBeCalled()
    expect(console.error).not.toBeCalled()
  })

  it('renders without crashing', () => {
    render(withTestRouter(<App />, {}))
    expect(screen.getByRole('link', { name: 'Jonas Vail' })).toBeInTheDocument()
  })
})
