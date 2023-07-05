import Head from 'next/head'

// component
// ==========================================================================================
const HeadComponent = ({ project, data, settings = {} }) => {
  const { title, description, image, company_name } = settings.data
  // project pages passed in project. about page passed data
  const { meta_title, meta_description, meta_image } = project || data || {}
  const pageDescription = meta_description || description
  const pageImage = meta_image || image || {}
  const meta = [
    { name: 'description', content: pageDescription },
    // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: pageImage.url },
    { property: 'og:image:width', content: pageImage.width },
    { property: 'og:image:height', content: pageImage.height },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: pageDescription },
  ]

  // Favicon created by Adrien Coquet from the Noun Project
  return (
    <Head>
      <title>
        {meta_title || title} | {company_name}
      </title>
      {meta.map((props, i) => (
        <meta {...props} key={i} />
      ))}
    </Head>
  )
}

export default HeadComponent
