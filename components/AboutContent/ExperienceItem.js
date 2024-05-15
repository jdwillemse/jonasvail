import css from './styles.module.scss'

const ExperienceItem = ({ dates, jobTitle, employer, description }) => {
  return (
    <li className={css.experienceWrap}>
      {dates && <div className={css.awardDate}>{dates}</div>}
      {jobTitle && (
        <div className={!employer && css.experienceEmployer}>{jobTitle}</div>
      )}
      {employer && <div className={css.experienceEmployer}>{employer}</div>}
      {description && (
        <div className={css.experienceDescription}>{description}</div>
      )}
    </li>
  )
}

export default ExperienceItem
