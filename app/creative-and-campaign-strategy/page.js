import { getProjectsByTag } from '@/lib/api'
import Hero from '@/components/Hero'
import TextSection from '@/components/TextSection'
import CaseList from '@/components/CaseList'

const data = {
  heroCopy:
    'Effective campaigns are built on a deep understanding of what makes a brand tick.',
  sections: [
    {
      title: 'Creative and Campaign Strategy',
      copy: "Crafting a compelling creative campaign is the ultimate embodiment of a brand in action. However, a strong foundation is crucial. Without a deep understanding of a brand's core identity and values, crafting an effective campaign is impossible. Brand and product are inextricably linked; a well-developed brand informs impactful creative, and vice versa.\n\nHere are some examples of brands where I've developed successful creative strategies and campaigns.",
    },
  ],
}

export default async function CreativeAndCampaignPage() {
  const projects = await getProjectsByTag('campaign-strategy')

  return (
    <article>
      <Hero heroCopy={data.heroCopy} />
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
