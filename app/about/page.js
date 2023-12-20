import { getAbout } from '../../lib/api'
import PageDetail from '../../components/PageDetail'
import AboutContent from '../../components/AboutContent'

export default async function AboutPage(props) {
  const aboutPage = await getAbout()

  return (
    <PageDetail content={aboutPage}>
      <AboutContent {...aboutPage} />
    </PageDetail>
  )
}
