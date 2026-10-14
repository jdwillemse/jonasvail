import Markdown from 'react-markdown'
import { getProject } from '../../../lib/api'

import styles from '../../../styles/sqsp.module.css'
import MediaBlock from '@/components/MediaBlock'
import Hero from '@/components/Hero'
import { notFound } from 'next/navigation'

const data = {
  awards: { items: [] },
  title: 'Twitch Creators Campaign',
  uid: 'creators-campaign',
  date: '2020-09-28T00:00:00.000Z',
  body: 'Though Twitch is a live-streaming powerhouse in the US, its presence and growth in Europe to date had mostly been organic. As a first step in a concerted brand-building effort in Europe, the strategy was to celebrate some of the most interesting Twitch Creators from the UK, France, and Germany who go live on the platform, and help make it the weird, wonderful, and diverse community it is.\n\nThough starting relatively small—online, in social, and on outdoor spaces across London, Paris, Berlin, and beyond—the campaign was a sign of exciting things to come from Twitch in Europe.',
  client: { uid: 'twitch', name: 'Twitch' },
  mediaBlockList: {
    items: [
      {
        sys: { id: '4vyRBVgV5zfNRNDenvJoAv' },
        mediaCollection: { items: [] },
        text: null,
        video: 'https://youtu.be/d_DTYNMhkDg',
      },
      {
        sys: { id: '6zx7PkkQPoXwn645MLpxsu' },
        mediaCollection: { items: [] },
        text: null,
        video: 'https://youtu.be/HMdfhl0ZLvw',
      },
      {
        sys: { id: '7qFlvo8cOS8dmVZdm4ZSa' },
        text: null,
        video: null,
        mediaCollection: {
          items: [
            {
              sys: { id: '1oR6qZfv7EuzwPt0P2cNhm' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/1oR6qZfv7EuzwPt0P2cNhm/2bbda63bb2b00e18bc269909c116ada3/3cdb6e9a-5364-4361-825e-58c8ad9473aa_Twitch_benjyfishy.png',
              width: 1938,
              height: 980,
              description: null,
            },
            {
              sys: { id: '2NXyhH0Eg8tGN7SHopgoDW' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/2NXyhH0Eg8tGN7SHopgoDW/59b3a192be4cb9e5968ac5b96a723df7/Twitch_KigJae_Static.png',
              width: 1936,
              height: 982,
              description: null,
            },
          ],
        },
      },
      {
        sys: { id: '3pfg7y9tQ6Aa0xACzTvFmq' },
        text: null,
        video: null,
        mediaCollection: {
          items: [
            {
              sys: { id: '6ZQmqLvDg626V9XZRNEPGL' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/6ZQmqLvDg626V9XZRNEPGL/7513792610231ca09fda122ab896e206/b64a8142-10eb-49ba-bc04-1b7d626181ca_Twitch_Berlin_posters.jpeg',
              width: 4032,
              height: 3024,
              description: null,
            },
          ],
        },
      },
    ],
  },
}

export default async function ProjectPage({ params }) {
  const project = await getProject(params.project)
  console.log('---project: ', JSON.stringify(project))

  return <MediaBlock />

  if (project.constructor === Object && Object.keys(project).length === 0) {
    return notFound
  }

  // {content.client && (
  //   <div className={css.chapeau}>{content.client?.name}</div>
  // )}
  // <h1 className={css.title}>{content.title}</h1>
  // <div className={css.body}>
  //   <Markdown>{content.body}</Markdown>
  // </div>
  // {/* only relevant on project pages */}
  // {content.awards?.items.length > 0 && (
  //   <div className={css.awardsWrap}>
  //     <h2 className={css.title2}>Awards</h2>
  //     {content.awards.items.map((award) => (
  //       <div key={award.sys.id}>
  //         {award.year} {award.title}
  //       </div>
  //     ))}
  //   </div>
  // )}

  return (
    // <ModalContext.Provider value={{ image, setImage }}>
    <article
      className="sections"
      id="sections"
      data-page-sections="624b503e5190ea02985eeeac"
    >
      <Hero heroCopy={project.title} />
      <section
        data-test="page-section"
        className="page-section 
                full-bleed-section
                layout-engine-section
                background-width--full-bleed
                section-height--custom
                content-width--wide
                horizontal-alignment--center
                vertical-alignment--middle
                "
      >
        <div
          className="content-wrapper"
          style={{
            paddingTop: 'calc(10vmax / 10)',
            paddingBottom: 'calc(10vmax / 10)',
          }}
        >
          <div className="content">
            <div data-fluid-engine="true">
              <div className="fluid-engine fe-6257a02ffd32a61e94511df1">
                <div className="fe-block fe-block-yui_3_17_2_1_1649909742307_6943">
                  <div
                    className="sqs-block html-block sqs-block-html"
                    data-block-type="2"
                    id="block-6257a02f49cefeef80abf8e5"
                  >
                    <div className="sqs-block-content">
                      <div className="sqs-html-content">
                        <p style={{ 'white-space': 'pre-wrap;' }}>
                          <strong>Something here</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fe-block fe-block-6257a02f7d0de6c7bf4c074d">
                  <div
                    className="sqs-block html-block sqs-block-html"
                    data-block-type="2"
                    id="block-6257a02f7d0de6c7bf4c074d"
                  >
                    <div className="sqs-block-content">
                      <div className="sqs-html-content">
                        <Markdown className="sqsrte-large">
                          {project.body}
                        </Markdown>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="fe-block fe-block-6257a02fa1bfe319f57fa5d5">
                  <div
                    className="sqs-block html-block sqs-block-html"
                    data-block-type="2"
                    id="block-6257a02ff2737d19a4c53f52"
                  >
                    <div className="sqs-block-content">
                      <div className="sqs-html-content">
                        <p style={{ 'white-space': 'pre-wrap;' }}>
                          <strong>{data.sections[1].title}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fe-block fe-block-6257a02f490417fbb8bc6b4a">
                  <div
                    className="sqs-block html-block sqs-block-html"
                    data-block-type="2"
                    id="block-6257a02f490417fbb8bc6b4a"
                  >
                    <div className="sqs-block-content">
                      <div className="sqs-html-content">
                        <p
                          className="sqsrte-large"
                          style={{ 'white-space': 'pre-wrap;' }}
                        >
                          {data.sections[1].copy}
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <MediaBlock {...project} />
      {/* <section
        data-test="page-section"
        className="page-section 
                full-bleed-section
                layout-engine-section
                background-width--full-bleed
                section-height--custom
                content-width--wide
                horizontal-alignment--center
                vertical-alignment--middle
                "
        style={{ 'min-height': '10vh;' }}
      >
        <div
          className="content-wrapper"
          style={{
            'paddingTop': 'calc(10vmax / 10)',
            'paddingBottom': 'calc(10vmax / 10)',
          }}
        >
          <div className="content">
            <div data-fluid-engine="true">
              <div className="fluid-engine fe-6257a0b5ce52f8561cc36e50">
                <div className="fe-block fe-block-6257a0b58e700cd4dcdbed23">
                  <div
                    className="sqs-block html-block sqs-block-html"
                    data-block-type="2"
                    id="block-6257a0b58e700cd4dcdbed23"
                  >
                    <div className="sqs-block-content">
                      <div className="sqs-html-content">
                        <p style={{ 'white-space': 'pre-wrap;' }}>
                          <strong>Case Studies</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fe-block fe-block-6257a0b5668e8b40d0acfaf8">
                  <div
                    className="sqs-block html-block sqs-block-html"
                    data-block-type="2"
                    id="block-6257a0b5668e8b40d0acfaf8"
                  >
                    <div className="sqs-block-content">
                      <div className="sqs-html-content">
                        <h2 style={{ 'white-space': 'pre-wrap;' }}>
                          <a href="#">Brand Development and Strategy</a>
                        </h2>
                        <br />
                        <h2 style={{ 'white-space': 'pre-wrap;' }}>
                          <a href="#">Creative and Campaign Strategy</a>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <section
        data-test="page-section"
        className="page-section 
                full-bleed-section
                layout-engine-section
                background-width--full-bleed
                section-height--custom
                content-width--wide
                horizontal-alignment--center
                vertical-alignment--middle
                "
        data-section-id="6257a02fbebc32125528f36b"
        data-controller="SectionWrapperController"
        style={{ 'min-height': '10vh', 'paddingTop': '86.7344px' }}
        data-controllers-bound="SectionWrapperController"
        data-active="true"
      >
        <div
          className="content-wrapper"
          style={{
            'paddingTop': 'calc(10vmax / 10)',
            'paddingBottom': 'calc(10vmax / 10)',
          }}
        >
          <div className="content">
            <div data-fluid-engine="true">
              <div className="fluid-engine fe-6257a02ffd32a61e94511df1">
                <div className="fe-block fe-block-yui_3_17_2_1_1649909742307_6943">
                  <div
                    className="sqs-block html-block sqs-block-html"
                    data-block-type="2"
                    id="block-6257a02f49cefeef80abf8e5"
                  >
                    <div className="sqs-block-content">
                      <div className="sqs-html-content">
                        <p style={{ 'white-space': 'pre-wrap;' }}>
                          <strong>{data.sections[2].title}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fe-block fe-block-6257a02f7d0de6c7bf4c074d">
                  <div
                    className="sqs-block html-block sqs-block-html"
                    data-block-type="2"
                    id="block-6257a02f7d0de6c7bf4c074d"
                  >
                    <div className="sqs-block-content">
                      <div className="sqs-html-content">
                        <p
                          className="sqsrte-large"
                          style={{ 'white-space': 'pre-wrap;' }}
                        >
                          {data.sections[2].copy}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </article>
    // </ModalContext.Provider>
  )
}
