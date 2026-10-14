import React from 'react'
import Link from 'next/link'

import './header.css'

const Header = (data) => (
  <header className="header">
    <div className="header-announcement-bar-wrapper">
      <a href="#page" className="header-skip-link sqs-button-element--primary">
        Skip to Content
      </a>
      <div
        className="header-inner container--fluid
            header-mobile-layout-logo-left-nav-right
            header-layout-nav-right
            "
      >
        <div className="header-display-desktop">
          <div className="header-title-nav-wrapper">
            <div
              className="
                     header-title
                     "
            >
              <div className="header-title-text">
                <a href="/home">Jonas Vail</a>
              </div>
            </div>
            <div className="header-nav">
              <div className="header-nav-wrapper">
                <nav className="header-nav-list">
                  <div className="header-nav-item header-nav-item--external">
                    <a href="/brand-development-and-strategy">
                      Brand Development
                    </a>
                  </div>
                  <div className="header-nav-item header-nav-item--external">
                    <a href="/creative-and-campaign-strategy">
                      Creative & Campaign
                    </a>
                  </div>
                  <div className="header-nav-item header-nav-item--external">
                    <a href="mailto:hello@jonasvail.com" target="_blank">
                      Contact
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div
            className="header-burger
                  menu-overlay-has-visible-non-navigation-items
                  no-actions
                  "
          >
            <button className="header-burger-btn burger">
              <span className="js-header-burger-open-title visually-hidden">
                Open Menu
              </span>
              <span className="js-header-burger-close-title visually-hidden">
                Close Menu
              </span>
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
        <div className="header-display-mobile">
          <div className="header-title-nav-wrapper">
            <div
              className="
                     header-title
                     "
            >
              <div className="header-title-text">
                <a href="/">Jonas Vail</a>
              </div>
            </div>
            <div className="header-nav">
              <div className="header-nav-wrapper">
                <nav className="header-nav-list">
                  <div className="header-nav-item header-nav-item--external">
                    <a
                      href="https://www.facebook.com/squarespace"
                      target="_blank"
                    >
                      Facebook
                    </a>
                  </div>
                  <div className="header-nav-item header-nav-item--external">
                    <a
                      href="https://www.linkedin.com/company/squarespace/"
                      target="_blank"
                    >
                      LinkedIn
                    </a>
                  </div>
                  <div className="header-nav-item header-nav-item--external">
                    <a href="https://twitter.com/squarespace" target="_blank">
                      Twitter
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div className="header-burger menu-overlay-has-visible-non-navigation-items no-actions">
            <button className="header-burger-btn burger">
              <span className="js-header-burger-open-title visually-hidden">
                Open Menu
              </span>
              <span className="js-header-burger-close-title visually-hidden">
                Close Menu
              </span>
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
    <div
      className="header-menu header-menu--folder-list
         "
      style={{ 'padding-top': '86.7344px;' }}
    >
      <div className="header-menu-bg theme-bg--primary"></div>
      <div className="header-menu-nav">
        <nav className="header-menu-nav-list">
          <div className="header-menu-nav-folder header-menu-nav-folder--active">
            <div className="header-menu-nav-folder-content">
              <div className="header-menu-nav-wrapper">
                <div className="container header-menu-nav-item header-menu-nav-item--external">
                  <a
                    href="https://www.facebook.com/squarespace"
                    target="_blank"
                  >
                    Facebook
                  </a>
                </div>
                <div className="container header-menu-nav-item header-menu-nav-item--external">
                  <a
                    href="https://www.linkedin.com/company/squarespace/"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                </div>
                <div className="container header-menu-nav-item header-menu-nav-item--external">
                  <a href="https://twitter.com/squarespace" target="_blank">
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
)

export default Header
