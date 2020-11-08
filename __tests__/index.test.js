import { render, screen } from '@testing-library/react'

import withTestRouter from '../__mocks__/withTestRouter'
import App from '../pages/index'

describe('App', () => {
  it('renders without crashing', () => {
    render(withTestRouter(<App />, {}))
    expect(screen.getByRole('link', { name: 'Jonas Vail' })).toBeInTheDocument()
  })
})
