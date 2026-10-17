// Opens and closes the phone menu. Following a link closes it, for a link
// to the page already open.
export default function header() {
  const burger = document.querySelector('[aria-controls="site-nav"]')
  const nav = document.getElementById('site-nav')
  if (!burger || !nav) return

  const setOpen = (open) => {
    burger.setAttribute('aria-expanded', open)
    burger.firstChild.textContent = `${open ? 'Close' : 'Open'} menu`
    nav.dataset.open = open
  }
  burger.addEventListener('click', () => setOpen(nav.dataset.open !== 'true'))
  nav.addEventListener('click', (e) => e.target.closest('a') && setOpen(false))
}
