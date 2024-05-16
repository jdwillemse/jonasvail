
import { getAbout } from '@/lib/api'


const data = {
   heroCopy: "I help iconic brands and agencies wrangle stories to connect with people on a real level.",
   sections: [
      {
         title: "Work",
         copy: "As a brand and creative strategist, I seek the truth. Digging deep for the good stuff; the product's heart, the brand's soul, the category’s dynamic, and the human connection at the center. The challenge (and the fun part) is weaving these truths together to create and tell a brand’s story, where each element is authentically represented."
      },
      {
         title: "About",
         copy: "For almost 30 years, I've wrangled stories for some of the world's most iconic brands and agencies. I help them ditch the fluff and connect with people on a real level.\n\nSan Francisco is my hometown, but wanderlust took me to the world: a few years in London, canal-side in Amsterdam for 12 years, a quick 18-month stint in weird and wonderful Reykjavík, and finally, Berlin – where I've been for five years and one pandemic."
      },
      {
         title: "Side Hustle",
         copy: "When I'm not styling and directing, I provide creative consulting for luxury fashion brands across the globe. My travels have inspired my first book project, a coffee table book featuring street photography of the most fashionable people waiting for public transit."
      }
   ]
}

export default async function AboutPage(props) {
   const aboutPage = await getAbout()

   return (
      <article className="sections" id="sections" data-page-sections="624b503e5190ea02985eeeac">
         <section data-test="page-section" data-section-id="6257a010aa3761dc51fb4382" data-controller="SectionWrapperController" style={{ "min-height": "10vh", "padding-top": "86.7344px" }} data-controllers-bound="SectionWrapperController" data-active="true">
            <div className="content-wrapper" style={{ "padding-top": "calc(10vmax / 10)", "padding-bottom": "calc(10vmax / 10)" }}>
               <div className="content">
                  <div data-fluid-engine="true">
                     <div className="fluid-engine fe-6257a010f3f192cadb19506c">
                        <div className="fe-block fe-block-6257a010aff28dd687afbc78">
                           <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a010aff28dd687afbc78">
                              <div className="sqs-block-content">
                                 <div className="sqs-html-content">
                                    <h1 style={{ "white-space": "pre-wrap;" }}>{data.heroCopy}</h1>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section data-test="page-section" className="page-section 
            full-bleed-section
            layout-engine-section
            background-width--full-bleed
            section-height--custom
            content-width--wide
            horizontal-alignment--center
            vertical-alignment--middle
            ">
            <div className="content-wrapper" style={{ "padding-top": "calc(10vmax / 10)", "padding-bottom": "calc(10vmax / 10)" }}>
               <div className="content">
                  <div data-fluid-engine="true">
                     <div className="fluid-engine fe-6257a02ffd32a61e94511df1">
                        <div className="fe-block fe-block-yui_3_17_2_1_1649909742307_6943">
                           <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a02f49cefeef80abf8e5">
                              <div className="sqs-block-content">
                                 <div className="sqs-html-content">
                                    <p style={{ "white-space": "pre-wrap;" }}><strong>{data.sections[0].title}</strong></p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="fe-block fe-block-6257a02f7d0de6c7bf4c074d">
                           <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a02f7d0de6c7bf4c074d">
                              <div className="sqs-block-content">
                                 <div className="sqs-html-content">
                                    <p className="sqsrte-large" style={{ "white-space": "pre-wrap;" }}>{data.sections[0].copy}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="fe-block fe-block-6257a02fa1bfe319f57fa5d5">
                           <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a02ff2737d19a4c53f52">
                              <div className="sqs-block-content">
                                 <div className="sqs-html-content">
                                    <p style={{ "white-space": "pre-wrap;" }}><strong>{data.sections[1].title}</strong></p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="fe-block fe-block-6257a02f490417fbb8bc6b4a">
                           <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a02f490417fbb8bc6b4a">
                              <div className="sqs-block-content">
                                 <div className="sqs-html-content">

                                    <p className="sqsrte-large" style={{ "white-space": "pre-wrap;" }}>
                                       {data.sections[1].copy}

                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section data-test="page-section" className="page-section 
            full-bleed-section
            layout-engine-section
            background-width--full-bleed
            section-height--custom
            content-width--wide
            horizontal-alignment--center
            vertical-alignment--middle
            " data-section-id="6257a0b5d75d586e03fdc036" data-controller="SectionWrapperController" style={{ "min-height": "10vh;" }} data-controllers-bound="SectionWrapperController" data-active="true">
            <div className="content-wrapper" style={{ "padding-top": "calc(10vmax / 10)", "padding-bottom": "calc(10vmax / 10)" }}>
               <div className="content">
                  <div data-fluid-engine="true">
                     <div className="fluid-engine fe-6257a0b5ce52f8561cc36e50">
                        <div className="fe-block fe-block-6257a0b58e700cd4dcdbed23">
                           <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a0b58e700cd4dcdbed23">
                              <div className="sqs-block-content">
                                 <div className="sqs-html-content">
                                    <p style={{ "white-space": "pre-wrap;" }}><strong>Case Studies</strong></p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="fe-block fe-block-6257a0b5668e8b40d0acfaf8">
                           <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a0b5668e8b40d0acfaf8">
                              <div className="sqs-block-content">
                                 <div className="sqs-html-content">
                                    <h2 style={{ "white-space": "pre-wrap;" }}><a href="#">Brand Development and Strategy</a></h2>
                                    <br />
                                    <h2 style={{ "white-space": "pre-wrap;" }}><a href="#">Creative and Campaign Strategy</a></h2>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section data-test="page-section" className="page-section 
            full-bleed-section
            layout-engine-section
            background-width--full-bleed
            section-height--custom
            content-width--wide
            horizontal-alignment--center
            vertical-alignment--middle
            " data-section-id="6257a02fbebc32125528f36b" data-controller="SectionWrapperController" style={{ "min-height": "10vh", "padding-top": "86.7344px" }} data-controllers-bound="SectionWrapperController" data-active="true">
            <div className="content-wrapper" style={{ "padding-top": "calc(10vmax / 10)", "padding-bottom": "calc(10vmax / 10)" }}>
               <div className="content">
                  <div data-fluid-engine="true">
                     <div className="fluid-engine fe-6257a02ffd32a61e94511df1">
                        <div className="fe-block fe-block-yui_3_17_2_1_1649909742307_6943">
                           <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a02f49cefeef80abf8e5">
                              <div className="sqs-block-content">
                                 <div className="sqs-html-content">
                                    <p style={{ "white-space": "pre-wrap;" }}><strong>{data.sections[2].title}</strong></p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="fe-block fe-block-6257a02f7d0de6c7bf4c074d">
                           <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a02f7d0de6c7bf4c074d">
                              <div className="sqs-block-content">
                                 <div className="sqs-html-content">
                                    <p className="sqsrte-large" style={{ "white-space": "pre-wrap;" }}>
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
         </section>
  
      </article>

   )
}
