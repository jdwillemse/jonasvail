import { getPage } from '@/lib/api'
import Hero from '@/components/Hero'
import TextSection from '@/components/TextSection'
import CaseList from '@/components/CaseList'

export default async function HomePage() {
  const data = await getPage('home')
  const [work, about, sideHustle] = data.sections

  return (
    <article>
      <Hero heroCopy={data.hero} />
      <TextSection {...work} />
      <TextSection {...about} />
      <CaseList
        items={[
          {
            label: <strong>Case Studies</strong>,
            title: 'Brand Development and Strategy',
            href: '/brand-development-and-strategy',
          },
          {
            title: 'Creative and Campaign Strategy',
            href: '/creative-and-campaign-strategy',
          },
        ]}
      />
      <TextSection {...sideHustle} />
    </article>
  )
}
