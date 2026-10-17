import Hero from '@/components/Hero'
import TextSection from '@/components/TextSection'
import CaseList from '@/components/CaseList'

const href = (slug) => (slug === 'home' ? '/' : `/${slug}`)

// A page from Sanity: the hero, then its sections in the editor's order.
export default function PageView({ page }) {
  return (
    <article>
      <Hero heroCopy={page.hero} />
      {page.sections?.map((section) => {
        switch (section._type) {
          case 'textSection':
            return <TextSection key={section._key} {...section} />
          case 'projectList':
            return (
              <CaseList
                key={section._key}
                as="h1"
                items={(section.projects ?? []).map((project) => ({
                  label: project.client?.name,
                  title: project.title,
                  href: `/${project.client?.uid}/${project.uid}`,
                }))}
              />
            )
          case 'pageLinks':
            return (
              <CaseList
                key={section._key}
                stacked={section.stacked}
                items={(section.pages ?? []).map((linked, i) => ({
                  label: i === 0 ? section.label : undefined,
                  title: linked.title,
                  href: href(linked.slug),
                }))}
              />
            )
        }
      })}
    </article>
  )
}
