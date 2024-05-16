import { getAbout } from '../../lib/api'

const data = {
   heroCopy: "Effective campaigns are built on a deep understanding of what makes a brand tick.",
   sections: [
      {
         title: "Brand Development and Strategy",
         copy: "Crafting a compelling creative campaign is the ultimate embodiment of a brand in action. However, a strong foundation is crucial. Without a deep understanding of a brand's core identity and values, crafting an effective campaign is impossible. Brand and product are inextricably linked; a well-developed brand informs impactful creative, and vice versa.\n\nHere are some examples of brands where I've developed successful creative strategies and campaigns."
      },
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
                                 <h2 style={{ "white-space": "pre-wrap;" }}><a href="/brand-development-and-strategy">Brand Development and Strategy</a></h2>
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
