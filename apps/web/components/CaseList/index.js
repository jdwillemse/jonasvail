import WaveLink from '@/components/WaveLink'

import css from './styles.module.css'

// Large linked titles, each with an optional small label to its left.
// `as` sets the heading level of the titles. `stacked` puts each label above
// its title, both from the label column. `reveal` is the build-up class,
// put on each item so they arrive one after another.
export default function CaseList({
  items,
  as: Heading = 'h2',
  stacked,
  reveal,
}) {
  return (
    <ul className={stacked ? `${css.list} ${css.stacked}` : css.list}>
      {items.map(({ label, title, href, logo }, i) => (
        <li
          key={href}
          className={reveal ? `${css.item} ${reveal}` : css.item}
          style={{ '--i': i + 1 }}
        >
          {label && <p className={`${css.label} text-label`}>{label}</p>}
          <Heading className={css.title}>
            <WaveLink href={href} logo={logo}>
              {title}
            </WaveLink>
          </Heading>
        </li>
      ))}
    </ul>
  )
}
