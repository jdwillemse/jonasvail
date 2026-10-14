import { getAbout } from '../../lib/api'

import styles from '../../styles/sqsp.module.css'

const data = {
  heroCopy:
    'Effective campaigns are built on a deep understanding of what makes a brand tick.',
  sections: [
    {
      title: 'Brand Development and Strategy',
      copy: "Crafting a compelling creative campaign is the ultimate embodiment of a brand in action. However, a strong foundation is crucial. Without a deep understanding of a brand's core identity and values, crafting an effective campaign is impossible. Brand and product are inextricably linked; a well-developed brand informs impactful creative, and vice versa.\n\nHere are some examples of brands where I've developed successful creative strategies and campaigns.",
    },
  ],
}

export default async function AboutPage(props) {
  const aboutPage = await getAbout()

  return (
    <article className="sections">
      <section>
        <div className={styles.headlineWrap}>
          <div className={styles.headline}>
            <h1>{data.heroCopy}</h1>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.titleWrap}>
          <div className={styles.title}>
            <p>
              <strong>{data.sections[0].title}</strong>
            </p>
          </div>
          <div className={styles.intro}>
            <p className="sqsrte-large">{data.sections[0].copy}</p>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.projectWrap}>
          <div className={styles.projectClient}>
            <p>
              <strong>Case Studies</strong>
            </p>
          </div>
          <div className={styles.projectTitle}>
            <h2>
              <a href="/brand-development-and-strategy">
                Brand Development and Strategy
              </a>
            </h2>
          </div>
        </div>
      </section>
    </article>
  )
}
