import { describe, expect, it } from 'bun:test'

import { neighbours } from '.'

const p = (id) => ({ sys: { id }, uid: id, title: id, client: { uid: 'c' } })
const pages = [
  { sections: [{ _key: 'x', _type: 'textSection' }] },
  {
    sections: [
      { _key: 'a', _type: 'projectList', projects: [p(1), p(2), p(3)] },
    ],
  },
  { sections: [{ _key: 'b', _type: 'projectList', projects: [p(3), p(4)] }] },
]

describe('neighbours', () => {
  it('finds the projects either side in each list', () => {
    expect(neighbours(pages, p(2))).toEqual([
      { key: 'a', prev: p(1), next: p(3) },
    ])
  })

  it('leaves out the ends of a list', () => {
    expect(neighbours(pages, p(3))).toEqual([
      { key: 'a', prev: p(2), next: undefined },
      { key: 'b', prev: undefined, next: p(4) },
    ])
  })

  it('skips lists without the project', () => {
    expect(neighbours(pages, p(5))).toEqual([])
  })
})
