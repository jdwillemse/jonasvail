import { pageColour } from '../components/PageColour'

describe('pageColour', () => {
  it('maps each route to its background', () => {
    expect(pageColour('/')).toEqual(['#ffee99', '#fff7cc'])
    expect(pageColour('/brand-development-and-strategy')).toEqual([
      '#9fd5b1',
      '#cfead8',
    ])
    expect(pageColour('/creative-and-campaign-strategy')).toEqual([
      '#9ec5fe',
      '#cfe2ff',
    ])
    expect(pageColour('/about')).toEqual(['#f7b0d3', '#fbd8e9'])
    expect(pageColour('/ketel-one-vodka/some-project')).toEqual([
      '#cbb0f3',
      '#e5d8f9',
    ])
  })

  it('leaves other routes on the default colour', () => {
    expect(pageColour('/ketel-one-vodka')).toBeNull()
  })
})
