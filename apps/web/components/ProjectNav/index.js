import WaveLink from '@/components/WaveLink'

import css from './styles.module.css'

const href = (project) => `/${project.client?.uid}/${project.uid}`

// The project before and after `project` in each page's project list that
// holds it, keyed by the list's section key. The first project has no
// previous one, and the last no next one.
export function neighbours(pages, project) {
  return pages.flatMap((page) =>
    (page.sections ?? [])
      .filter((section) => section._type === 'projectList')
      .flatMap(({ _key, projects = [] }) => {
        const i = projects.findIndex((p) => p?.sys.id === project.sys.id)
        if (i === -1) return []
        return [{ key: _key, prev: projects[i - 1], next: projects[i + 1] }]
      })
  )
}

// Links to the previous and next projects side by side, one set per list
// the project is in. The first shows until ./client.js swaps in the list the
// visitor came from.
export default function ProjectNav({ pages, project }) {
  return neighbours(pages, project).map(({ key, prev, next }, i) => {
    if (!prev && !next) return null
    return (
      <nav
        key={key}
        className={`${css.nav} reveal reveal-scroll`}
        aria-label="More projects"
        data-project-list={key}
        hidden={i > 0}
      >
        {prev && (
          <Link className={css.prev} label="Previous project" project={prev} />
        )}
        {next && (
          <Link className={css.next} label="Next project" project={next} />
        )}
      </nav>
    )
  })
}

// No client logo: its stamps need empty space left of the row, as in
// components/CaseList, and these links start at the page edge.
function Link({ className, label, project }) {
  return (
    <div className={className}>
      <p className="text-label">{label}</p>
      <h2 className={css.title}>
        <WaveLink href={href(project)}>{project.title}</WaveLink>
      </h2>
    </div>
  )
}
