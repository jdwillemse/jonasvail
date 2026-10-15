import Markdown from 'react-markdown'

import css from './styles.module.css'

// A small label beside large body copy. `aside` replaces the label, such as
// with a portrait. `copy` is Markdown.
export default function TextSection({ title, copy, aside }) {
  return (
    <section className={css.section}>
      <div className={`${css.label} text-label`}>{aside ?? <p>{title}</p>}</div>
      <div className={`${css.body} text-large`}>
        <Markdown>{copy}</Markdown>
      </div>
    </section>
  )
}
