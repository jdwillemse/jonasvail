import { getPage, getProjectsByTag } from '@/lib/api'
import Hero from '@/components/Hero'
import TextSection from '@/components/TextSection'
import CaseList from '@/components/CaseList'

export default async function CreativeAndCampaignPage() {
  const data = await getPage('creative-and-campaign-strategy')
  const projects = await getProjectsByTag('campaign-strategy')

  return (
    <article>
      <Hero heroCopy={data.hero} />
      <TextSection {...data.sections[0]} />
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
            label: <strong>See what else I do</strong>,
            title: 'Brand Development and Strategy',
            href: '/brand-development-and-strategy',
          },
        ]}
      />
    </article>
  )
}
