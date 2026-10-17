import Hero from '@/components/Hero'
import TextSection from '@/components/TextSection'
import CaseList from '@/components/CaseList'

const href = (slug) => (slug === 'home' ? '/' : `/${slug}`)

// A page from Sanity: the hero, then its sections in the editor's order.
// The hero and first section build up on load; the rest as they scroll in,
// since a load animation below the fold would finish unseen.
export default function PageView({ page }) {
  return (
    <article>
      <Hero heroCopy={page.hero} />
      {page.sections?.map((section, i) => {
        const reveal = i === 0 ? 'reveal' : 'reveal reveal-scroll'
        switch (section._type) {
          case 'textSection':
            return (
              <TextSection key={section._key} {...section} reveal={reveal} />
            )
          case 'projectList':
            return (
              <CaseList
                key={section._key}
                reveal={reveal}
                as="h1"
                list={section._key}
                items={(section.projects ?? []).map((project) => ({
                  label: project.client?.name,
                  title: project.title,
                  href: `/${project.client?.uid}/${project.uid}`,
                  logo: project.client?.logo,
                }))}
              />
            )
          case 'pageLinks':
            return (
              <CaseList
                key={section._key}
                reveal={reveal}
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
