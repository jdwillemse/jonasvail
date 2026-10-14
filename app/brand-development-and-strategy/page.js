import { getProjectsByTag } from '@/lib/api'
import Hero from '@/components/Hero'
import TextSection from '@/components/TextSection'
import CaseList from '@/components/CaseList'

import css from './styles.module.css'

const data = {
  heroCopy:
    "A strong brand is the emotional echo of a customer's journey with a company or product.",
  sections: [
    {
      title: 'Brand Development and Strategy',
      copy: "A brand transcends the company or product itself. It's the dynamic connection a customer fosters with what you offer. Like any strong relationship, brands require dedicated investment to build trust and emotional resonance. They evolve and flourish over time, occupying a cherished space within the customer's experience — not just their mind, but their heart as well.\n\nBelow, you'll find examples of brands I've had the privilege of collaborating with to develop their core positioning, purpose, character, voice, and behavior.",
    },
  ],
}

// Project order as laid out in the v0.2 site deck.
const order = [
  'ps4-launch-this-is-for-the-players',
  'ketel-one-do-one-thing-well',
  'diabetes-uk',
  'freedm',
  'you-plus-hp',
  'hp-everything-is-possible',
]

export default async function BrandDevelopmentPage() {
  const projects = (await getProjectsByTag('brand-strategy')).sort(
    (a, b) => order.indexOf(a.uid) - order.indexOf(b.uid)
  )

  return (
    <article>
      <Hero heroCopy={data.heroCopy} />
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
        items={[
          {
            label: <strong>See what else I do</strong>,
            title: 'Creative and Campaign Strategy',
            href: '/creative-and-campaign-strategy',
          },
        ]}
      />
    </article>
  )
}
