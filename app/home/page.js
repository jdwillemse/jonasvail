import Hero from '@/components/Hero'
import TextSection from '@/components/TextSection'
import CaseList from '@/components/CaseList'

const data = {
  heroCopy:
    'I help iconic brands and agencies wrangle stories to connect with people on a real level.',
  sections: [
    {
      title: 'Work',
      copy: "As a brand and creative strategist, I seek the truth. Digging deep for the good stuff; the product's heart, the brand's soul, the category’s dynamic, and the human connection at the center. The challenge (and the fun part) is weaving these truths together to create and tell a brand’s story, where each element is authentically represented.",
    },
    {
      title: 'About',
      copy: "For almost 30 years, I've wrangled stories for some of the world's most iconic brands and agencies. I help them ditch the fluff and connect with people on a real level.\n\nSan Francisco is my hometown, but wanderlust took me to the world: a few years in London, canal-side in Amsterdam for 12 years, a quick 18-month stint in weird and wonderful Reykjavík, and finally, Berlin – where I've been for five years and one pandemic.",
    },
    {
      title: 'Side Hustle',
      copy: "When I'm not styling and directing, I provide creative consulting for luxury fashion brands across the globe. My travels have inspired my first book project, a coffee table book featuring street photography of the most fashionable people waiting for public transit.",
    },
  ],
}

export default async function HomePage() {
  const [work, about, sideHustle] = data.sections

  return (
    <article>
      <Hero heroCopy={data.heroCopy} />
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
