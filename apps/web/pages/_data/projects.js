import { getAllProjects, getProject } from '@/lib/api'
import { optimiseMedia } from '@/lib/images'

// Every project with a client, in full, with its images encoded.
export default async function projects() {
  const all = (await getAllProjects()) ?? []
  const projects = await Promise.all(
    all
      .filter((p) => p.client?.uid)
      .map(async ({ uid }) => {
        const project = await getProject(uid)
        if (project) await optimiseMedia(project.mediaBlockList)
        return project
      })
  )
  return projects.filter(Boolean)
}
