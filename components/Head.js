import Head from 'next/head'

// component
// ==========================================================================================
const HeadComponent = ({ project, data, settings = {} }) => {
  const { title, description, image, companyName } = settings
  // project pages passed in project. about page passed data
  const { metaTitle, metaDescription, metaImage } = project || data || {}
  const pageDescription = metaDescription || description
  const pageImage = metaImage || image || {}
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
  const links = [
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'true',
    },
    {
      rel: 'preload',
      as: 'style',
      href: encodeURI(
        'https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap'
      ),
    },
    {
      rel: 'stylesheet',
      href: encodeURI(
        'https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap'
      ),
    },
  ]

  // Favicon created by Adrien Coquet from the Noun Project
  return (
    <Head>
      <title>
        {metaTitle || title} | {companyName}
      </title>
      {meta.map((props, i) => (
        <meta {...props} key={i} />
      ))}
      {links.map((props, i) => (
        <link {...props} key={i} />
      ))}
    </Head>
  )
}

export default HeadComponent
