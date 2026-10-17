import Hero from '@/components/Hero'
import TextSection from '@/components/TextSection'

import css from './styles.module.css'

// A section title in the label column beside a list of dated entries.
function DatedList({ title, children }) {
  return (
    <section className={`${css.section} reveal reveal-scroll`}>
      <h2 className={`${css.label} text-label`}>{title}</h2>
      <ul className={css.list}>{children}</ul>
    </section>
  )
}

export default function AboutView({ about }) {
  const {
    title,
    body,
    experienceTitle,
    experience,
    accoladesTitle,
    accolades,
  } = about

  return (
    <article>
      <Hero heroCopy={title} />
      {body && <TextSection copy={body} reveal="reveal" />}
      {experience?.length > 0 && (
        <DatedList title={experienceTitle}>
          {experience.map(
            ({ _key, dates, jobTitle, employer, description }) => (
              <li key={_key} className={css.item}>
                <p className="text-label">{dates}</p>
                <h3>{jobTitle}</h3>
                {employer && <p className={css.subtitle}>{employer}</p>}
                {description?.split(/\n\s*\n/).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </li>
            )
          )}
        </DatedList>
      )}
      {accolades?.length > 0 && (
        <DatedList title={accoladesTitle}>
          {accolades.map(({ _key, year, title, project }) => (
            <li key={_key} className={css.item}>
              <p className="text-label">{year}</p>
              <h3>{title}</h3>
              {project && (
                <p className={css.subtitle}>
                  <a href={`/${project.client?.uid}/${project.uid}`}>
                    {project.title}
                  </a>
                </p>
              )}
            </li>
          ))}
        </DatedList>
      )}
    </article>
  )
}
