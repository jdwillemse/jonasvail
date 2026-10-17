import { describe, expect, it } from 'bun:test'

import { pageMeta } from './metadata'

const settings = {
  companyName: 'Jonas Vail',
  title: 'Strategist',
  description: 'Site description',
}
const image = (url) => ({ url, width: 10, height: 5 })

describe('pageMeta', () => {
  it('uses the site title and Settings without a page title', () => {
    expect(pageMeta(settings, {})).toEqual({
      title: 'Jonas Vail | Strategist',
      description: 'Site description',
      image: undefined,
    })
  })

  it("prefers the page's SEO fields, then its own", () => {
    expect(
      pageMeta(
        { ...settings, ogImage: image('settings') },
        {
          title: 'Page',
          seo: { description: 'SEO description', image: image('seo') },
          image: image('page'),
        }
      )
    ).toEqual({
      title: 'Page | Jonas Vail',
      description: 'SEO description',
      image: image('seo'),
    })
    expect(
      pageMeta(settings, { title: 'Page', seo: { title: 'SEO' } }).title
    ).toBe('SEO | Jonas Vail')
    expect(pageMeta(settings, { image: image('page') }).image).toEqual(
      image('page')
    )
  })
})
