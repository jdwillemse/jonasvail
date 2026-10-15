import Link from 'next/link'

import css from './styles.module.css'

// Large linked titles, each with an optional small label to its left.
// `as` sets the heading level of the titles. `stacked` puts each label above
// its title, both from the label column.
export default function CaseList({ items, as: Heading = 'h2', stacked }) {
  return (
    <ul className={stacked ? `${css.list} ${css.stacked}` : css.list}>
      {items.map(({ label, title, href }) => (
        <li key={href} className={css.item}>
          {label && <p className={`${css.label} text-label`}>{label}</p>}
          <Heading className={css.title}>
            <Link href={href}>{title}</Link>
          </Heading>
        </li>
      ))}
    </ul>
  )
}
