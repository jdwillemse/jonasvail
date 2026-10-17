import clsx from 'clsx'
import { getAbout } from '../../lib/api'
import styles from './styles.module.css'
import Hero from '@/components/Hero'

const data = {
  heroCopy: 'FREEDM',
  sections: [
    {
      title: 'Dr. Martens',
      copy: 'In 2006/2007, the Dr. Martens brand was in a period of reinvigoration and rebirth, aligning around the brand idea of “liberating creativity”. The strategy was to bring this brand idea to life by creating a cultural movement called FREEDM. The FREEDM Movement was centred around an online community, as well as real‐world events where emerging artists could showcase their own creativity with the possibility of being discovered – and where people could personally experience the Dr. Martens brand.',
    },
    {
      title: 'FREEDM Recruitment',
      copy: 'We commissioned then up-and-coming FREEDM artist Abel Macias to illustrate a recruitment booklet to inspire other artists and creatives to join the FREEDM movement. We distributed the recruitment piece in stores and events in London, New York, and San Francisco.',
    },
  ],
}

export default async function AboutPage(props) {
  const aboutPage = await getAbout()

  return (
    <article
      className="sections"
      id="sections"
      data-page-sections="624b503e5190ea02985eeeac"
    >
      <Hero {...data} />
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
            'padding-top': 'calc(10vmax / 10)',
            'padding-bottom': 'calc(10vmax / 10)',
          }}
        >
          <div className="content">
            <div data-fluid-engine="true">
              {data.sections.map((section) => (
                <div
                  className="fluid-engine fe-6257a02ffd32a61e94511df1"
                  key={section.title}
                >
                  <div className="fe-block fe-block-yui_3_17_2_1_1649909742307_6943">
                    <div
                      className="sqs-block html-block sqs-block-html"
                      data-block-type="2"
                      id="block-6257a02f49cefeef80abf8e5"
                    >
                      {section.id === 'about' ? (
                        <div
                          style={{ borderRadius: '50%', overflow: 'hidden' }}
                        >
                          <img
                            style={{ display: 'block', width: '100%' }}
                            src="https://placehold.co/400"
                            alt=""
                          />
                        </div>
                      ) : (
                        <div className="sqs-block-content">
                          <div className="sqs-html-content">
                            <p style={{ 'white-space': 'pre-wrap;' }}>
                              {section.title}
                            </p>
                          </div>
                        </div>
                      )}
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
                            {section.copy}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles['fluid-engine-wrap']}>
        <div className={styles['fluid-engine-grid']}>
          <div className={styles['fe-block-image-1a']}>
            <div
              className={clsx(
                styles['sqs-block'],
                'image-block sqs-block-image sqs-stretched sqs-text-ready'
              )}
            >
              <button
                className="sqs-block-image-button lightbox content-fill"
                data-lightbox-theme="light"
              >
                <img
                  className={styles.image}
                  alt="Portrait of a young smiling woman of color"
                  elementtiming="system-image-block"
                  src="/assets/freedm-Abel_Page__Page_01.jpg"
                  width="860"
                  height="1220"
                  sizes="100vw"
                  // srcset="https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=100w 100w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=300w 300w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=500w 500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=750w 750w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=1000w 1000w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=1500w 1500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=2500w 2500w"
                  loading="lazy"
                  decoding="async"
                  data-loader="sqs"
                />

                <div className="fluidImageOverlay"></div>
              </button>
            </div>
          </div>
          <div className={styles['fe-block-image-2a']}>
            <div
              className={clsx(
                styles['sqs-block'],
                'image-block sqs-block-image sqs-stretched sqs-text-ready'
              )}
            >
              <button
                className="sqs-block-image-button lightbox content-fill"
                data-lightbox-theme="light"
              >
                <img
                  className={styles.image}
                  elementtiming="system-image-block"
                  src="/assets/freedm-Abel_Page__Page_03.jpg"
                  width="614"
                  height="435"
                  sizes="100vw"
                  // srcset="https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=100w 100w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=300w 300w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=500w 500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=750w 750w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=1000w 1000w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=1500w 1500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=2500w 2500w"
                  loading="lazy"
                  decoding="async"
                  data-loader="sqs"
                />

                <div className="fluidImageOverlay"></div>
              </button>
            </div>
          </div>
        </div>

        <div className={styles['fluid-engine-grid']}>
          <div className={styles['fe-block-image-3a']}>
            <div
              className={clsx(
                styles['sqs-block'],
                'image-block sqs-block-image sqs-stretched sqs-text-ready'
              )}
            >
              <button
                className="sqs-block-image-button lightbox content-fill"
                data-lightbox-theme="light"
              >
                <img
                  className={styles.image}
                  alt="Portrait of a young smiling woman of color"
                  elementtiming="system-image-block"
                  src="/assets/freedm-Abel_Page__Page_04.jpg"
                  width="860"
                  height="1220"
                  sizes="100vw"
                  // srcset="https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=100w 100w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=300w 300w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=500w 500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=750w 750w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=1000w 1000w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=1500w 1500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=2500w 2500w"
                  loading="lazy"
                  decoding="async"
                  data-loader="sqs"
                />

                <div className="fluidImageOverlay"></div>
              </button>
            </div>
          </div>
          <div className={styles['fe-block-image-4a']}>
            <div
              className={clsx(
                styles['sqs-block'],
                'image-block sqs-block-image sqs-stretched sqs-text-ready'
              )}
            >
              <button
                className="sqs-block-image-button lightbox content-fill"
                data-lightbox-theme="light"
              >
                <img
                  className={styles.image}
                  elementtiming="system-image-block"
                  src="/assets/freedm-Abel_Page__Page_06.jpg"
                  width="614"
                  height="435"
                  sizes="100vw"
                  // srcset="https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=100w 100w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=300w 300w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=500w 500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=750w 750w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=1000w 1000w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=1500w 1500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=2500w 2500w"
                  loading="lazy"
                  decoding="async"
                  data-loader="sqs"
                />

                <div className="fluidImageOverlay"></div>
              </button>
            </div>
          </div>
        </div>

        <div className={styles['fluid-engine-grid']}>
          <div className={styles['fe-block-image-5a']}>
            <div
              className={clsx(
                styles['sqs-block'],
                'image-block sqs-block-image sqs-stretched sqs-text-ready'
              )}
            >
              <button
                className="sqs-block-image-button lightbox content-fill"
                data-lightbox-theme="light"
              >
                <img
                  className={styles.image}
                  alt="Portrait of a young smiling woman of color"
                  elementtiming="system-image-block"
                  src="/assets/freedm-Abel_Page__Page_07.jpg"
                  width="860"
                  height="1220"
                  sizes="100vw"
                  // srcset="https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=100w 100w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=300w 300w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=500w 500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=750w 750w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=1000w 1000w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=1500w 1500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=2500w 2500w"
                  loading="lazy"
                  decoding="async"
                  data-loader="sqs"
                />

                <div className="fluidImageOverlay"></div>
              </button>
            </div>
          </div>
        </div>

        <div className={styles['fluid-engine-grid']}>
          <div className={styles['fe-block-image-6a']}>
            <div
              className={clsx(
                styles['sqs-block'],
                'image-block sqs-block-image sqs-stretched sqs-text-ready'
              )}
            >
              <button
                className="sqs-block-image-button lightbox content-fill"
                data-lightbox-theme="light"
              >
                <img
                  className={styles.image}
                  alt="Portrait of a young smiling woman of color"
                  elementtiming="system-image-block"
                  src="/assets/freedm-Abel_Page__Page_08.jpg"
                  width="860"
                  height="1220"
                  sizes="100vw"
                  // srcset="https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=100w 100w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=300w 300w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=500w 500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=750w 750w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=1000w 1000w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=1500w 1500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=2500w 2500w"
                  loading="lazy"
                  decoding="async"
                  data-loader="sqs"
                />

                <div className="fluidImageOverlay"></div>
              </button>
            </div>
          </div>
          <div className={styles['fe-block-image-7a']}>
            <div
              className={clsx(
                styles['sqs-block'],
                'image-block sqs-block-image sqs-stretched sqs-text-ready'
              )}
            >
              <button
                className="sqs-block-image-button lightbox content-fill"
                data-lightbox-theme="light"
              >
                <img
                  className={styles.image}
                  elementtiming="system-image-block"
                  src="/assets/freedm-Abel_Page__Page_09.jpg"
                  width="614"
                  height="435"
                  sizes="100vw"
                  // srcset="https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=100w 100w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=300w 300w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=500w 500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=750w 750w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=1000w 1000w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=1500w 1500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=2500w 2500w"
                  loading="lazy"
                  decoding="async"
                  data-loader="sqs"
                />

                <div className="fluidImageOverlay"></div>
              </button>
            </div>
          </div>
        </div>

        <div className={styles['fluid-engine-grid']}>
          <div className={styles['fe-block-image-8a']}>
            <div
              className={clsx(
                styles['sqs-block'],
                'image-block sqs-block-image sqs-stretched sqs-text-ready'
              )}
            >
              <button
                className="sqs-block-image-button lightbox content-fill"
                data-lightbox-theme="light"
              >
                <img
                  className={styles.image}
                  alt="Portrait of a young smiling woman of color"
                  elementtiming="system-image-block"
                  src="/assets/freedm-Abel_Page__Page_08.jpg"
                  width="860"
                  height="1220"
                  sizes="100vw"
                  // srcset="https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=100w 100w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=300w 300w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=500w 500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=750w 750w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=1000w 1000w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=1500w 1500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=2500w 2500w"
                  loading="lazy"
                  decoding="async"
                  data-loader="sqs"
                />

                <div className="fluidImageOverlay"></div>
              </button>
            </div>
          </div>
          <div className={styles['fe-block-image-9a']}>
            <div
              className={clsx(
                styles['sqs-block'],
                'image-block sqs-block-image sqs-stretched sqs-text-ready'
              )}
            >
              <button
                className="sqs-block-image-button lightbox content-fill"
                data-lightbox-theme="light"
              >
                <img
                  className={styles.image}
                  elementtiming="system-image-block"
                  src="/assets/freedm-Abel_Page__Page_09.jpg"
                  width="614"
                  height="435"
                  sizes="100vw"
                  // srcset="https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=100w 100w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=300w 300w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=500w 500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=750w 750w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=1000w 1000w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=1500w 1500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=2500w 2500w"
                  loading="lazy"
                  decoding="async"
                  data-loader="sqs"
                />

                <div className="fluidImageOverlay"></div>
              </button>
            </div>
          </div>
        </div>

        <div className={styles['fluid-engine-grid']}>
          <div className={styles['fe-block-image-10a']}>
            <div
              className={clsx(
                styles['sqs-block'],
                'image-block sqs-block-image sqs-stretched sqs-text-ready'
              )}
            >
              <button
                className="sqs-block-image-button lightbox content-fill"
                data-lightbox-theme="light"
              >
                <img
                  className={styles.image}
                  alt="Portrait of a young smiling woman of color"
                  elementtiming="system-image-block"
                  src="https://images.ctfassets.net/jnzxx8eydhfs/7CVTKdSpDL0quYsP1LR28H/72c0aa8441a54649d546a8c073bb43c1/freedm-Abel_Page__Page_12.jpg"
                  width="860"
                  height="1220"
                  sizes="100vw"
                  // srcset="https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=100w 100w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=300w 300w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=500w 500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=750w 750w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=1000w 1000w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=1500w 1500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/9a5c7585-41e9-4ae8-95d0-11fac4fc43b0/image-asset.jpeg?format=2500w 2500w"
                  loading="lazy"
                  decoding="async"
                  data-loader="sqs"
                />

                <div className="fluidImageOverlay"></div>
              </button>
            </div>
          </div>
          <div className={styles['fe-block-image-11a']}>
            <div
              className={clsx(
                styles['sqs-block'],
                'image-block sqs-block-image sqs-stretched sqs-text-ready'
              )}
            >
              <button
                className="sqs-block-image-button lightbox content-fill"
                data-lightbox-theme="light"
              >
                <img
                  className={styles.image}
                  elementtiming="system-image-block"
                  src="https://images.ctfassets.net/jnzxx8eydhfs/x2kzKFVR9epn7pcYPgAIN/01325f769c344e6721238b4edd2c5a8f/freedm-Abel_Page__Page_13.jpg"
                  width="614"
                  height="435"
                  sizes="100vw"
                  // srcset="https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=100w 100w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=300w 300w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=500w 500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=750w 750w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=1000w 1000w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=1500w 1500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=2500w 2500w"
                  loading="lazy"
                  decoding="async"
                  data-loader="sqs"
                />

                <div className="fluidImageOverlay"></div>
              </button>
            </div>
          </div>
          <div className={styles['fe-block-image-12a']}>
            <div
              className={clsx(
                styles['sqs-block'],
                'image-block sqs-block-image sqs-stretched sqs-text-ready'
              )}
            >
              <button
                className="sqs-block-image-button lightbox content-fill"
                data-lightbox-theme="light"
              >
                <img
                  className={styles.image}
                  elementtiming="system-image-block"
                  src="https://images.ctfassets.net/jnzxx8eydhfs/4Ltqeo0PX8t2sh0j7GxnVl/45dbb703b077c14cfdaa12010f6c516d/freedm-Abel_Page__Page_02.jpg"
                  width="614"
                  height="435"
                  sizes="100vw"
                  // srcset="https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=100w 100w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=300w 300w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=500w 500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=750w 750w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=1000w 1000w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=1500w 1500w, https://images.squarespace-cdn.com/content/v1/62d86875b19f0b44212ac21b/f134cc87-596e-471e-80d8-69a8972e9d71/image-asset.jpeg?format=2500w 2500w"
                  loading="lazy"
                  decoding="async"
                  data-loader="sqs"
                />

                <div className="fluidImageOverlay"></div>
              </button>
            </div>
          </div>
        </div>

        <p>
          We also commissioned Abel to paint a FREEDM mural in the flagship Dr.
          Martens store in Covent Garden, and hosted an event with bands and DJs
          to unveil the mural and give people the opportunity to interact with
          Abel, the brand, and the shoes all at the same time.
        </p>

        <div className={styles['fluid-engine-grid']}>
          <div className={styles['fe-block-image-13a']}>
            <div
              className={clsx(
                styles['sqs-block'],
                'image-block sqs-block-image sqs-stretched sqs-text-ready'
              )}
            >
              <iframe
                className={styles.video}
                width="560"
                height="315"
                src="https://www.youtube.com/embed/lTzJDZqU_aQ?si=-ihWqwqDCwntAhk2"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>

        <h2>FREEDM Zine</h2>
        <p>
          We published a zine featuring the work of four different FREEDM
          artists and distributed it in New York, San Francisco, and London.
        </p>
      </section>

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
        data-section-id="6257a0b5d75d586e03fdc036"
        data-controller="SectionWrapperController"
        style={{ 'min-height': '10vh;' }}
        data-controllers-bound="SectionWrapperController"
        data-active="true"
      >
        <div
          className="content-wrapper"
          style={{
            'padding-top': 'calc(10vmax / 10)',
            'padding-bottom': 'calc(10vmax / 10)',
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
                          Case Studies
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
                          <a href="/creative-and-campaign-strategy">
                            Creative and Campaign Strategy
                          </a>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
