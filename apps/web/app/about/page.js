import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAbout } from '@/lib/api'
import { seoMetadata } from '@/lib/metadata'
import Hero from '@/components/Hero'
import TextSection from '@/components/TextSection'

import css from './styles.module.css'

export async function generateMetadata() {
  return seoMetadata(await getAbout())
}

// A section title in the label column beside a list of dated entries.
function DatedList({ title, children }) {
  return (
    <section className={`${css.section} reveal reveal-scroll`}>
      <h2 className={`${css.label} text-label`}>{title}</h2>
      <ul className={css.list}>{children}</ul>
    </section>
  )
}

export default async function AboutPage() {
  const about = await getAbout()
  if (!about) notFound()
  const { title, body, experienceTitle, experience, accoladesTitle, accolades } =
    about

  return (
    <article>
      <Hero heroCopy={title} />
      {body && <TextSection copy={body} reveal="reveal" />}
      {experience?.length > 0 && (
        <DatedList title={experienceTitle}>
          {experience.map(({ _key, dates, jobTitle, employer, description }) => (
            <li key={_key} className={css.item}>
              <p className="text-label">{dates}</p>
              <h3>{jobTitle}</h3>
              {employer && <p className={css.subtitle}>{employer}</p>}
              {description?.split(/\n\s*\n/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </li>
          ))}
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
                  <Link href={`/${project.client?.uid}/${project.uid}`}>
                    {project.title}
                  </Link>
                </p>
              )}
            </li>
          ))}
        </DatedList>
      )}
    </article>
  )
}
