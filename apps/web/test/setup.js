import { plugin } from 'bun'
import { afterEach, expect } from 'bun:test'
import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'

expect.extend(matchers)
afterEach(cleanup)

// A CSS module's class names come back as their own keys, like
// identity-obj-proxy, so snapshots stay readable.
plugin({
  name: 'css-modules',
  setup(build) {
    build.onLoad({ filter: /\.s?css$/ }, () => ({
      exports: { default: new Proxy({}, { get: (_, key) => key }) },
      loader: 'object',
    }))
  },
})
