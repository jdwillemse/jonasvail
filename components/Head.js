import Helmet from 'next/head'
// import Helmet from 'react-helmet'
// import { graphql, StaticQuery } from 'gatsby'
// import { withPreview } from 'gatsby-source-prismic-graphql'
import {get } from 'lodash'


// data
// ==========================================================================================
// const query = graphql`
//   query ConfigQuery {
//     prismic {
//       config: allConfigs {
//         edges {
//           node {
//             meta: _meta {
//               id
//               uid
//               lang
//             }
//             companyName: company_name
//             title: title
//             description: description
//             keywords: keywords
//             image: image
//           }
//         }
//       }
//     }
//   }
// `

// component
// ==========================================================================================
const Head = ({prismic,   metaTitle, metaDescription, metaImage }) => {
  const data = get(prismic, 'config.edges[0].node')
  const { title, description, image, companyName } = data
  const pageTitle = metaTitle || title
  const pageDescription = metaDescription || description
  const pageImage = metaImage || image || {}

  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      title={pageTitle}
      titleTemplate={`%s | ${companyName}`}
      meta={[
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no',
        },
        { name: `description`, content: pageDescription },
        { property: `og:title`, content: title },
        { property: `og:description`, content: pageDescription },
        { property: `og:type`, content: `website` },
        { property: `og:image`, content: pageImage.url },
        { property: `og:image:width`, content: pageImage.width },
        { property: `og:image:height`, content: pageImage.height },
        { name: `twitter:card`, content: `summary` },
        { name: `twitter:title`, content: title },
        { name: `twitter:description`, content: pageDescription },
      ]}
      link={[
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: true,
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
      ]}
    />
  )
}

export default Head
