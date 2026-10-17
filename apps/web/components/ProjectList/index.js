import css from './styles.module.css'
import ProjectItem from '../ProjectItem'

const ProjectList = ({ projects = [] }) => {
  return (
    <div className={css.list} data-test-id="masonry-wrap">
      {projects.map((project) => (
        <ProjectItem {...project} key={project.sys.id} />
      ))}
    </div>
  )
}

export default ProjectList
