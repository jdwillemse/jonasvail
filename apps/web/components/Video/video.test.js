import { beforeEach, describe, expect, it } from 'bun:test'
import { render, fireEvent } from '@testing-library/react'
import getYouTubeID from 'get-youtube-id'

import Video from './'
import video from './client'

const data = {
  url: 'https://www.youtube.com/watch?v=JYs2cC5mt5M',
  thumbnail: {
    webp: [
      {
        url: '/img/thumb-480.webp',
        srcset: '/img/thumb-480.webp 480w',
        sourceType: 'image/webp',
        width: 480,
        height: 360,
      },
    ],
  },
}
const id = getYouTubeID(data.url)

describe('Video', () => {
  beforeEach(() => localStorage.clear())

  it('shows a local thumbnail and loads nothing from YouTube until clicked', () => {
    const { container } = render(<Video {...data} />)
    video()
    expect(container.querySelector('iframe')).toBeNull()
    expect(container.querySelector('img').getAttribute('src')).toBe(
      '/img/thumb-480.webp'
    )
  })

  it('loads every video once one is clicked, and remembers it', () => {
    const { container } = render(
      <>
        <Video {...data} />
        <Video {...data} />
      </>
    )
    video()
    fireEvent.click(container.querySelector('button'))
    const iframes = container.querySelectorAll('iframe')
    expect(iframes.length).toBe(2)
    expect(iframes[0].src).toContain(`${id}?autoplay=1`)
    expect(iframes[1].src).not.toContain('autoplay')
    expect(localStorage.getItem('youtube-consent')).toBe('yes')
  })

  it('loads straight away when consent is stored', () => {
    localStorage.setItem('youtube-consent', 'yes')
    const { container } = render(<Video {...data} />)
    video()
    expect(container.querySelector('iframe')).not.toBeNull()
  })

  it('renders when content not passed', () => {
    const { container } = render(<Video />)
    expect(container.childNodes.length).toBe(0)
  })
})
