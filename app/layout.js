import '@/styles/fonts.css'
import '@/styles/static.css'
import '@/styles/site-good-colours.css'
import '@/styles/inline.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="siteWrapper" className="clearfix site-wrapper">
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
                      <span className="js-header-burger-close-title visually-hidden">Close Menu</span>
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
                      <span className="js-header-burger-close-title visually-hidden">Close Menu</span>
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
         " data-section-id="overlay-nav" data-show-account-login="true" data-test="header-menu" style={{ "padding-top": "86.7344px;" }}>
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
          {children}
          <section data-test="page-section" className="page-section 
            full-bleed-section
            layout-engine-section
            background-width--full-bleed
            section-height--custom
            content-width--wide
            horizontal-alignment--center
            vertical-alignment--middle
            "    style={{ "min-height": "10vh;" }}>
            <div className="content-wrapper" style={{ "padding-top": "calc(10vmax / 10)", "padding-bottom": "calc(10vmax / 10)" }}>
               <div className="content">
                  <div data-fluid-engine="true">
                     <div className="fluid-engine fe-6257a2122fd09dda5f471400">
                        <div className="fe-block fe-block-6257a2128d82506f53774ae1">
                           <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a2128d82506f53774ae1">
                              <div className="sqs-block-content">
                                 <div className="sqs-html-content">
                                    <h1 style={{ "white-space": "pre-wrap;" }}><a href="mailto:hello@jonasvail.com" target="_blank">Get in Touch</a></h1>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
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
         "  style={{ "min-height": "10vh;" }} data-controllers-bound="SectionWrapperController" data-active="true">
              <div className="content-wrapper" style={{ "padding-top": "calc(10vmax / 10)", "padding-bottom": "calc(10vmax / 10)" }}>
                <div className="content">
                  <div data-fluid-engine="true">
                    <div className="fluid-engine fe-6257a28df820e45db453e8f3">
                      <div className="fe-block fe-block-6257a28dee509859c7c37310">
                        <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a28dee509859c7c37310">
                          <div className="sqs-block-content">
                            <div className="sqs-html-content">
                              <p style={{ "white-space": "pre-wrap;" }}>Jonas Vail</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="fe-block fe-block-6257a28d16dd2fdecc6bc89b">
                        <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a28d16dd2fdecc6bc89b">
                          <div className="sqs-block-content">
                            <div className="sqs-html-content">
                              <p style={{ "white-space": "pre-wrap;" }}>hello@jonasvail.com</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="fe-block fe-block-6257a28df2e5f1e5cd59071d">
                        <div className="sqs-block html-block sqs-block-html" data-block-type="2" id="block-6257a28df2e5f1e5cd59071d">
                          <div className="sqs-block-content">
                            <div className="sqs-html-content">
                              <p style={{ "white-space": "pre-wrap;" }}>Neukölln,<br />Berlin</p>
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
      </body>
    </html>
  )
}
