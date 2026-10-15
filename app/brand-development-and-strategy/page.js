import { getPage, getProjectsByTag } from '@/lib/api'
import Hero from '@/components/Hero'
import TextSection from '@/components/TextSection'
import CaseList from '@/components/CaseList'

import css from './styles.module.css'

export default async function BrandDevelopmentPage() {
  const data = await getPage('brand-development-and-strategy')
  const order = data.projects ?? []
  const projects = (await getProjectsByTag('brand-strategy')).sort(
    (a, b) => order.indexOf(a.uid) - order.indexOf(b.uid)
  )

  return (
    <article>
      <Hero heroCopy={data.hero} />
      {data.sections.map((section) => (
        <TextSection
          key={section.title}
          {...section}
          aside={
            section.id === 'about' ? (
              <img
                className={css.portrait}
                src="https://placehold.co/400"
                alt=""
              />
            ) : undefined
          }
        />
      ))}
      <CaseList
        as="h1"
        items={projects.map((project) => ({
          label: project.client?.name,
          title: project.title,
          href: `/${project.client?.name}/${project.uid}`,
        }))}
      />
      <CaseList
        stacked
        items={[
          {
            label: 'See what else I do',
            title: 'Creative and Campaign Strategy',
            href: '/creative-and-campaign-strategy',
          },
        ]}
      />
    </article>
  )
}
