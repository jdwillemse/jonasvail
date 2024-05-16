import { getAbout } from '../../lib/api'
import PageDetail from '../../components/PageDetail'
import AboutContent from '../../components/AboutContent'

export default async function AboutPage(props) {
  const aboutPage = await getAbout()

  return (
    <div id="siteWrapper" className="clearfix site-wrapper">
   <div id="floatingCart" className="floating-cart hidden">
      <a href="/cart" className="icon icon--stroke icon--fill icon--cart sqs-custom-cart">
         <span className="Cart-inner">
            <svg className="icon icon--cart" width="61" height="49" viewBox="0 0 61 49">
               <path fillRule="evenodd" clipRule="evenodd" d="M0.5 2C0.5 1.17157 1.17157 0.5 2 0.5H13.6362C14.3878 0.5 15.0234 1.05632 15.123 1.80135L16.431 11.5916H59C59.5122 11.5916 59.989 11.8529 60.2645 12.2847C60.54 12.7165 60.5762 13.2591 60.3604 13.7236L50.182 35.632C49.9361 36.1614 49.4054 36.5 48.8217 36.5H18.0453C17.2937 36.5 16.6581 35.9437 16.5585 35.1987L12.3233 3.5H2C1.17157 3.5 0.5 2.82843 0.5 2ZM16.8319 14.5916L19.3582 33.5H47.8646L56.6491 14.5916H16.8319Z"></path>
               <path d="M18.589 35H49.7083L60 13H16L18.589 35Z"></path>
               <path d="M21 49C23.2091 49 25 47.2091 25 45C25 42.7909 23.2091 41 21 41C18.7909 41 17 42.7909 17 45C17 47.2091 18.7909 49 21 49Z"></path>
               <path d="M45 49C47.2091 49 49 47.2091 49 45C49 42.7909 47.2091 41 45 41C42.7909 41 41 42.7909 41 45C41 47.2091 42.7909 49 45 49Z"></path>
            </svg>
            <div className="legacy-cart icon-cart-quantity">
               <span className="sqs-cart-quantity">0</span>
            </div>
         </span>
      </a>
   </div>
   <header data-test="header" id="header" className="header theme-col--primary" data-controller="Header" data-section-id="header" data-header-style="theme" tabIndex="-1" data-controllers-bound="Header">
      <div className="header-announcement-bar-wrapper">
         <a href="#page" className="header-skip-link sqs-button-element--primary">
         Skip to Content
         </a>
         <div className="header-inner container--fluid
            header-mobile-layout-logo-left-nav-right
            header-layout-nav-right
            "  data-test="header-inner">
            {/* <!-- Background --> */}
            <div className="header-display-desktop" data-content-field="site-title">
               {/* <!-- Social --> */}
               {/* <!-- Title and nav wrapper --> */}
               <div className="header-title-nav-wrapper">
                  {/* <!-- Title --> */}
                  <div className="
                     header-title
                     " data-animation-role="header-element">
                     <div className="header-title-text">
                        <a id="site-title" href="/home" data-animation-role="header-element">Jonas Vail</a>
                     </div>
                  </div>
                  {/* <!-- Nav --> */}
                  <div className="header-nav">
                     <div className="header-nav-wrapper">
                        <nav className="header-nav-list">
                           <div className="header-nav-item header-nav-item--external">
                              <a href="/brand-development-and-strategy" data-animation-role="header-element">Brand Development</a>
                           </div>
                           <div className="header-nav-item header-nav-item--external">
                              <a href="/creative-and-campaign-strategy" data-animation-role="header-element">Creative & Campaign</a>
                           </div>
                           <div className="header-nav-item header-nav-item--external">
                              <a href="mailto:hello@jonasvail.com" target="_blank" data-animation-role="header-element">Contact</a>
                           </div>
                        </nav>
                     </div>
                  </div>
               </div>
               {/* <!-- Burger --> */}
               <div className="header-burger
                  menu-overlay-has-visible-non-navigation-items
                  no-actions
                  " data-animation-role="header-element">
                  <button className="header-burger-btn burger" data-test="header-burger">
                     <span className="js-header-burger-open-title visually-hidden">Open Menu</span>
                     <span  className="js-header-burger-close-title visually-hidden">Close Menu</span>
                     <div className="burger-box">
                        <div className="burger-inner header-menu-icon-doubleLineHamburger">
                           <div className="top-bun"></div>
                           <div className="patty"></div>
                           <div className="bottom-bun"></div>
                        </div>
                     </div>
                  </button>
               </div>
            </div>
            <div className="header-display-mobile" data-content-field="site-title">
               {/* <!-- Social --> */}
               {/* <!-- Title and nav wrapper --> */}
               <div className="header-title-nav-wrapper">
                  {/* <!-- Title --> */}
                  <div className="
                     header-title
                     " data-animation-role="header-element">
                     <div className="header-title-text">
                        <a id="site-title" href="/" data-animation-role="header-element">Jonas Vail</a>
                     </div>
                  </div>
                  {/* <!-- Nav --> */}
                  <div className="header-nav">
                     <div className="header-nav-wrapper">
                        <nav className="header-nav-list">
                           <div className="header-nav-item header-nav-item--external">
                              <a href="https://www.facebook.com/squarespace" target="_blank" data-animation-role="header-element">Facebook</a>
                           </div>
                           <div className="header-nav-item header-nav-item--external">
                              <a href="https://www.linkedin.com/company/squarespace/" target="_blank" data-animation-role="header-element">LinkedIn</a>
                           </div>
                           <div className="header-nav-item header-nav-item--external">
                              <a href="https://twitter.com/squarespace" target="_blank" data-animation-role="header-element">Twitter</a>
                           </div>
                        </nav>
                     </div>
                  </div>
               </div>
               {/* <!-- Burger --> */}
               <div className="header-burger menu-overlay-has-visible-non-navigation-items no-actions" data-animation-role="header-element">
                  <button className="header-burger-btn burger" data-test="header-burger">
                     <span className="js-header-burger-open-title visually-hidden">Open Menu</span>
                     <span  className="js-header-burger-close-title visually-hidden">Close Menu</span>
                     <div className="burger-box">
                        <div className="burger-inner header-menu-icon-doubleLineHamburger">
                           <div className="top-bun"></div>
                           <div className="patty"></div>
                           <div className="bottom-bun"></div>
                        </div>
                     </div>
                  </button>
               </div>
            </div>
         </div>
      </div>
      {/* <!-- (Mobile) Menu Navigation --> */}
      <div className="header-menu header-menu--folder-list
         " data-section-id="overlay-nav" data-show-account-login="true" data-test="header-menu" style={{"padding-top": "86.7344px;"}}>
         <div className="header-menu-bg theme-bg--primary"></div>
         <div className="header-menu-nav">
            <nav className="header-menu-nav-list">
               <div data-folder="root" className="header-menu-nav-folder header-menu-nav-folder--active">
                  <div className="header-menu-nav-folder-content">
                     {/* <!-- Menu Navigation --> */}
                     <div className="header-menu-nav-wrapper">
                        <div className="container header-menu-nav-item header-menu-nav-item--external">
                           <a href="https://www.facebook.com/squarespace" target="_blank">Facebook</a>
                        </div>
                        <div className="container header-menu-nav-item header-menu-nav-item--external">
                           <a href="https://www.linkedin.com/company/squarespace/" target="_blank">LinkedIn</a>
                        </div>
                        <div className="container header-menu-nav-item header-menu-nav-item--external">
                           <a href="https://twitter.com/squarespace" target="_blank">Twitter</a>
                        </div>
                     </div>
                  </div>
               </div>
            </nav>
         </div>
      </div>
   </header>
   <main id="page" className="container" role="main">
      <article className="sections" id="sections" data-page-sections="624b503e5190ea02985eeeac">
         <section data-test="page-section"  data-section-id="6257a010aa3761dc51fb4382" data-controller="SectionWrapperController"   style={{"min-height": "10vh","padding-top": "86.7344px"}} data-controllers-bound="SectionWrapperController" data-active="true">
            <div className="content-wrapper" style={{"padding-top": "calc(10vmax / 10)","padding-bottom": "calc(10vmax / 10)"}}>
               <div className="content">
                  <div data-fluid-engine="true">
                     <div className="fluid-engine fe-6257a010f3f192cadb19506c">
                        <div className="fe-block fe-block-6257a010aff28dd687afbc78">
                           <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a010aff28dd687afbc78">
                              <div className="sqs-block-content">
                                 <div className="sqs-html-content">
                                    <h1 style={{"white-space":"pre-wrap;"}}>
                                       I believe that a brand represents the relationship someone has with that company or product.
                                    </h1>
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
            " data-section-id="6257a02fbebc32125528f36b" data-controller="SectionWrapperController"   style={{"min-height": "10vh","padding-top": "86.7344px"}} data-controllers-bound="SectionWrapperController" data-active="true">
            <div className="content-wrapper" style={{"padding-top": "calc(10vmax / 10)","padding-bottom": "calc(10vmax / 10)"}}>
               <div className="content">
                  <div data-fluid-engine="true">
                     <div className="fluid-engine fe-6257a02ffd32a61e94511df1">
                        <div className="fe-block fe-block-yui_3_17_2_1_1649909742307_6943">
                        <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a02f49cefeef80abf8e5">
                              <div className="sqs-block-content">
                                 <div className="sqs-html-content">
                                    <p  style={{"white-space":"pre-wrap;"}}><strong>Brand Development and Strategy</strong></p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="fe-block fe-block-6257a02f7d0de6c7bf4c074d">
                           <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a02f7d0de6c7bf4c074d">
                              <div className="sqs-block-content">
                                 <div className="sqs-html-content">
                                    <p className="sqsrte-large" style={{"white-space":"pre-wrap;"}}>
                                    A brand transcends the company or product itself. It's the dynamic connection a customer fosters with what you offer. Like any strong relationship, brands require dedicated investment to build trust and emotional resonance. They evolve and flourish over time, occupying a cherished space within the customer's experience — not just their mind, but their heart as well.
                                      </p>
                                      <p className="sqsrte-large" style={{"white-space":"pre-wrap;"}}>
                                      Below, you'll find examples of brands I've had the privilege of collaborating with to develop their core positioning, purpose, character, voice, and behavior.
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
            " data-section-id="6257a0b5d75d586e03fdc036" data-controller="SectionWrapperController"   style={{"min-height": "10vh;"}} data-controllers-bound="SectionWrapperController" data-active="true">
            <div className="content-wrapper" style={{"padding-top": "calc(10vmax / 10)","padding-bottom": "calc(10vmax / 10)"}}>
               <div className="content">
                  <div data-fluid-engine="true">
                     <div className="fluid-engine fe-6257a0b5ce52f8561cc36e50">
                        <div className="fe-block fe-block-6257a0b58e700cd4dcdbed23">
                           <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a0b58e700cd4dcdbed23">
                              <div className="sqs-block-content">
                                 <div className="sqs-html-content">
                                  <p  style={{"white-space":"pre-wrap;"}}><strong>Case Studies</strong></p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="fe-block fe-block-6257a0b5668e8b40d0acfaf8">
                           <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a0b5668e8b40d0acfaf8">
                              <div className="sqs-block-content">
                                 <div className="sqs-html-content">
                                    <h2 style={{"white-space":"pre-wrap;"}}><a href="#">Brand Development and Strategy</a></h2>
                                    <br/>
                                    <h2 style={{"white-space":"pre-wrap;"}}><a href="#">Creative and Campaign Strategy</a></h2>
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
            " data-section-id="6257a02fbebc32125528f36b" data-controller="SectionWrapperController"   style={{"min-height": "10vh","padding-top": "86.7344px"}} data-controllers-bound="SectionWrapperController" data-active="true">
            <div className="content-wrapper" style={{"padding-top": "calc(10vmax / 10)","padding-bottom": "calc(10vmax / 10)"}}>
               <div className="content">
                  <div data-fluid-engine="true">
                     <div className="fluid-engine fe-6257a02ffd32a61e94511df1">
                        <div className="fe-block fe-block-yui_3_17_2_1_1649909742307_6943">
                        <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a02f49cefeef80abf8e5">
                              <div className="sqs-block-content">
                                 <div className="sqs-html-content">
                                    <p  style={{"white-space":"pre-wrap;"}}><strong>Side Hustle</strong></p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="fe-block fe-block-6257a02f7d0de6c7bf4c074d">
                           <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a02f7d0de6c7bf4c074d">
                              <div className="sqs-block-content">
                                 <div className="sqs-html-content">
                                    <p className="sqsrte-large" style={{"white-space":"pre-wrap;"}}>
                                      When I'm not styling and directing, I provide creative consulting for luxury fashion brands across the globe. My travels have inspired my first book project, a coffee table book featuring street photography of the most fashionable people waiting for public transit.
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
            " data-section-id="6257a212475a570d2c3cd373" data-controller="SectionWrapperController" data-current-context="{
            &quot;video&quot;: {
            &quot;playbackSpeed&quot;: 0.5,
            &quot;filter&quot;: 1,
            &quot;filterStrength&quot;: 0,
            &quot;zoom&quot;: 0,
            &quot;videoSourceProvider&quot;: &quot;none&quot;
            },
            &quot;backgroundImageId&quot;: null,
            &quot;backgroundMediaEffect&quot;: null,
            &quot;divider&quot;: null,
            &quot;typeName&quot;: &quot;page&quot;
            }"   style={{"min-height": "10vh;"}} data-controllers-bound="SectionWrapperController" data-active="true">
            <div className="content-wrapper" style={{"padding-top": "calc(10vmax / 10)","padding-bottom": "calc(10vmax / 10)"}}>
               <div className="content">
                  <div data-fluid-engine="true">
                     <div className="fluid-engine fe-6257a2122fd09dda5f471400">
                        <div className="fe-block fe-block-6257a2128d82506f53774ae1">
                           <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a2128d82506f53774ae1">
                              <div className="sqs-block-content">
                                 <div className="sqs-html-content">
                                    <h1 style={{"white-space":"pre-wrap;"}}><a href="mailto:hello@jonasvail.com" target="_blank">Get in Touch</a></h1>
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
   </main>
   <footer className="sections" id="footer-sections">
      <section data-test="page-section" className="page-section 
         full-bleed-section
         layout-engine-section
         background-width--full-bleed
         section-height--custom
         content-width--wide
         horizontal-alignment--center
         vertical-alignment--middle
         " data-section-id="6257a28de42a324f7991be6b" data-controller="SectionWrapperController" data-current-styles="{
         &quot;imageOverlayOpacity&quot;: 0.15,
         &quot;backgroundWidth&quot;: &quot;background-width--full-bleed&quot;,
         &quot;sectionHeight&quot;: &quot;section-height--custom&quot;,
         &quot;customSectionHeight&quot;: 10,
         &quot;horizontalAlignment&quot;: &quot;horizontal-alignment--center&quot;,
         &quot;verticalAlignment&quot;: &quot;vertical-alignment--middle&quot;,
         &quot;contentWidth&quot;: &quot;content-width--wide&quot;,
         &quot;customContentWidth&quot;: 50,
         &quot;sectionTheme&quot;: &quot;&quot;,
         &quot;sectionAnimation&quot;: &quot;none&quot;,
         &quot;backgroundMode&quot;: &quot;image&quot;
         }" data-current-context="{
         &quot;video&quot;: {
         &quot;playbackSpeed&quot;: 0.5,
         &quot;filter&quot;: 2,
         &quot;filterStrength&quot;: 0,
         &quot;zoom&quot;: 0,
         &quot;videoSourceProvider&quot;: &quot;none&quot;
         },
         &quot;backgroundImageId&quot;: null,
         &quot;backgroundMediaEffect&quot;: null,
         &quot;divider&quot;: null,
         &quot;typeName&quot;: &quot;page&quot;
         }"   style={{"min-height": "10vh;"}} data-controllers-bound="SectionWrapperController" data-active="true">
         <div className="content-wrapper" style={{"padding-top": "calc(10vmax / 10)","padding-bottom": "calc(10vmax / 10)"}}>
            <div className="content">
               <div data-fluid-engine="true">
                  <div className="fluid-engine fe-6257a28df820e45db453e8f3">
                     <div className="fe-block fe-block-6257a28dee509859c7c37310">
                        <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a28dee509859c7c37310">
                           <div className="sqs-block-content">
                              <div className="sqs-html-content">
                                 <p  style={{"white-space":"pre-wrap;"}}>Jonas Vail</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="fe-block fe-block-6257a28d16dd2fdecc6bc89b">
                        <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a28d16dd2fdecc6bc89b">
                           <div className="sqs-block-content">
                              <div className="sqs-html-content">
                                 <p  style={{"white-space":"pre-wrap;"}}>hello@jonasvail.com</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="fe-block fe-block-6257a28df2e5f1e5cd59071d">
                        <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a28df2e5f1e5cd59071d">
                           <div className="sqs-block-content">
                              <div className="sqs-html-content">
                                 <p  style={{"white-space":"pre-wrap;"}}>Neukölln,<br/>Berlin</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   </footer>
</div>
  )
}
