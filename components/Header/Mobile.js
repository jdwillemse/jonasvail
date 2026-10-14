import React from 'react'
import Link from 'next/link'

import css from './mobile.module.css'

const Mobile = (data) => (
  <div className={css['header-display-mobile']}>
    <div className={css['header-title-nav-wrapper']}>
      <div className={css['header-title']}>
        <div className={css['header-title-text']}>
          <a href="/">Jonas Vail</a>
        </div>
      </div>
      <div className={css['header-nav']}>
        <div className={css['header-nav-wrapper']}>
          <nav className={css['header-nav-list']}>
            <div className={css['header-nav-item']}>
              <a href="https://www.facebook.com/squarespace" target="_blank">
                Facebook
              </a>
            </div>
            <div className={css['header-nav-item']}>
              <a
                href="https://www.linkedin.com/company/squarespace/"
                target="_blank"
              >
                LinkedIn
              </a>
            </div>
            <div className={css['header-nav-item']}>
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
)

export default Mobile
