import { getAllProjects } from '../lib/api'
import ProjectList from '../components/ProjectList'

export default async function HomePage() {
  const projects = await getAllProjects()
  // if no ID redirect to 404
  if (!projects || projects.length === 0) {
    throw new Error('Projects not found')
  }

  return (
    <>
      <p>
        For almost 30 years, I've wrangled stories for some of the world's most
        iconic brands and agencies. I help them ditch the fluff and connect with
        people on a real level.
      </p>

      <p>
        As a strategist, I seek the truth. Digging deep for the good stuff: the
        product's heart, the brand's soul, the category’s dynamic, and the human
        connection at the center. The challenge (and the fun part) is weaving
        these truths together to create and tell a brand’s story, where each
        element is authentically represented.
      </p>

      <p>
        San Francisco is my hometown, but wanderlust took me to the world: a few
        years in London, canal-side in Amsterdam for 12 years, a quick 18-month
        stint in weird and wonderful Reykjavík, and finally, Berlin – where I've
        been for five years and one pandemic.
      </p>

      <ProjectList projects={projects} />
    </>
  )
}
