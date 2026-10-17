const KEY = 'projectList'

// Following a link in a project list remembers the list, so a project page
// shows its previous and next projects in that list (see ./index.js).
// Without storage it keeps the first list.
export default function projectNav() {
  document.addEventListener('click', (e) => {
    const list = e.target.closest('a')?.closest('[data-project-list]')
    try {
      if (list) sessionStorage.setItem(KEY, list.dataset.projectList)
    } catch {}
  })

  let current
  try {
    current = sessionStorage.getItem(KEY)
  } catch {}
  const navs = [...document.querySelectorAll('nav[data-project-list]')]
  const match = navs.find((nav) => nav.dataset.projectList === current)
  if (match) for (const nav of navs) nav.hidden = nav !== match
}
