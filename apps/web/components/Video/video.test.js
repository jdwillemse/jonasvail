import { render } from '@testing-library/react'
import getYouTubeID from 'get-youtube-id'

import Video from './'

const data = {
  url: 'https://www.youtube.com/watch?v=JYs2cC5mt5M',
}

describe('Video', () => {
  it('renders when content passed', () => {
    const { container } = render(<Video {...data} />)
    const id = getYouTubeID(data.url)
    expect(container.querySelector('iframe').src.includes(id)).toBe(true)
  })

  it('renders when content not passed', () => {
    const { container } = render(<Video />)
    expect(container.childNodes.length).toBe(0)
  })
})
