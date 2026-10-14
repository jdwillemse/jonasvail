import Link from 'next/link'

import css from './styles.module.css'

// Large linked titles, each with an optional small label to its left.
// `as` sets the heading level of the titles.
export default function CaseList({ items, as: Heading = 'h2' }) {
  return (
    <ul className={css.list}>
      {items.map(({ label, title, href }) => (
        <li key={href} className={css.item}>
          {label && <p className={css.label}>{label}</p>}
          <Heading className={css.title}>
            <Link href={href}>{title}</Link>
          </Heading>
        </li>
      ))}
    </ul>
  )
}
