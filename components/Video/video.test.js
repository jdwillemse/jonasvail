import { render } from '@testing-library/react'

import Video from './'

const data = {
  embed_url: 'https://vimeo.com/470656424',
  height: 240,
  html:
    '<iframe src="https://player.vimeo.com/video/470656424?app_id=122963" width="426" height="240" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>',
  provider_name: 'Vimeo',
  provider_url: 'https://vimeo.com/',
  type: 'video',
  uri: '/videos/470656424',
  video_id: 470656424,
  width: 426,
}

describe('Video', () => {
  it('renders when content passed', () => {
    const { container } = render(<Video {...data} />)
    expect(container.querySelector('iframe').src.includes(data.video_id)).toBe(
      true
    )
  })

  it('renders when content passed', () => {
    const { container } = render(<Video />)
    expect(container.childNodes.length).toBe(0)
  })
})
