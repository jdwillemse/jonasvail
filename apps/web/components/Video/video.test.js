import { beforeEach, describe, expect, it } from 'bun:test'
import { act, render, fireEvent } from '@testing-library/react'
import getYouTubeID from 'get-youtube-id'

import Video from './'

const data = {
  url: 'https://www.youtube.com/watch?v=JYs2cC5mt5M',
}
const id = getYouTubeID(data.url)

describe('Video', () => {
  beforeEach(() => localStorage.clear())

  it('shows a local thumbnail and loads nothing from YouTube until clicked', () => {
    const { container } = render(<Video {...data} />)
    expect(container.querySelector('iframe')).toBeNull()
    expect(container.querySelector('img').getAttribute('src')).toBe(
      `/api/youtube-thumbnail/${id}`
    )
  })

  it('loads every video once one is clicked, and remembers it', () => {
    const { container } = render(
      <>
        <Video {...data} />
        <Video {...data} />
      </>
    )
    fireEvent.click(container.querySelector('button'))
    const iframes = container.querySelectorAll('iframe')
    expect(iframes.length).toBe(2)
    expect(iframes[0].src).toContain(`${id}?autoplay=1`)
    expect(iframes[1].src).not.toContain('autoplay')
    expect(localStorage.getItem('youtube-consent')).toBe('yes')
  })

  it('loads straight away when consent is stored', async () => {
    localStorage.setItem('youtube-consent', 'yes')
    const { container } = render(<Video {...data} />)
    await act(() => {})
    expect(container.querySelector('iframe')).not.toBeNull()
  })

  it('renders when content not passed', () => {
    const { container } = render(<Video />)
    expect(container.childNodes.length).toBe(0)
  })
})
