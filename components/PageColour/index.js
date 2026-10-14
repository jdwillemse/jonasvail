'use client'

import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { usePathname } from 'next/navigation'

// [top of page, bottom of page]. The page fades between them as it scrolls.
const colours = {
  '/home': ['#ffee99', '#fff7cc'],
  '/brand-development-and-strategy': ['#9fd5b1', '#cfead8'],
  '/creative-and-campaign-strategy': ['#9ec5fe', '#cfe2ff'],
}
const projectColour = ['#cbb0f3', '#e5d8f9']

// Project pages are the only two-segment routes: /[client]/[project].
export function pageColour(pathname) {
  if (colours[pathname]) return colours[pathname]
  if (/^\/[^/]+\/[^/]+\/?$/.test(pathname)) return projectColour
  return null
}

// Sets the page background per route. On client navigation the new page
// renders first, then a view transition fades the old colour into the new one.
export default function PageColour() {
  const pathname = usePathname()
  const [colour, setColour] = useState(() => pageColour(pathname))

  useEffect(() => {
    const next = pageColour(pathname)
    if (next === colour) return
    if (!document.startViewTransition) return setColour(next)
    document.startViewTransition(() => flushSync(() => setColour(next)))
  }, [pathname, colour])

  if (!colour) return null
  const [top, bottom] = colour
  return (
    <style>{`:root { --color-accent: ${top}; --color-accent-end: ${bottom}; }`}</style>
  )
}
