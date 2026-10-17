// [top of page, bottom of page]. The page fades between them as it scrolls.
const colours = {
  '/': ['#ffee99', '#fff7cc'],
  '/brand-development-and-strategy': ['#9fd5b1', '#cfead8'],
  '/creative-and-campaign-strategy': ['#9ec5fe', '#cfe2ff'],
  '/about': ['#f7b0d3', '#fbd8e9'],
}
const projectColour = ['#cbb0f3', '#e5d8f9']

// Project pages are the only two-segment routes: /[client]/[project].
export function pageColour(pathname) {
  if (colours[pathname]) return colours[pathname]
  if (/^\/[^/]+\/[^/]+\/?$/.test(pathname)) return projectColour
  return null
}

// Sets the page background for `pathname`. Between pages a cross-document
// view transition fades the old colour into the new one (styles/base.css).
export default function PageColour({ pathname }) {
  const colour = pageColour(pathname)
  if (!colour) return null
  const [top, bottom] = colour
  return (
    <style>{`:root { --color-accent: ${top}; --color-accent-end: ${bottom}; }`}</style>
  )
}
