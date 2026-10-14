import React from 'react'

import './footer.css'

const Footer = (data) => (
  <footer className="sections">
    <section style={{ 'min-height': '10vh;' }}>
      <div
        className="content-wrapper"
        style={{
          'padding-top': 'calc(10vmax / 10)',
          'padding-bottom': 'calc(10vmax / 10)',
        }}
      >
        <div className="content">
          <div>
            <div className="fluid-engine fe-6257a28df820e45db453e8f3">
              <div className="fe-block fe-block-6257a28dee509859c7c37310">
                <div className="sqs-block html-block sqs-block-html">
                  <div className="sqs-block-content">
                    <div className="sqs-html-content">
                      <p style={{ 'white-space': 'pre-wrap;' }}>Jonas Vail</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fe-block fe-block-6257a28d16dd2fdecc6bc89b">
                <div className="sqs-block html-block sqs-block-html">
                  <div className="sqs-block-content">
                    <div className="sqs-html-content">
                      <p style={{ 'white-space': 'pre-wrap;' }}>
                        hello@jonasvail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fe-block fe-block-6257a28df2e5f1e5cd59071d">
                <div className="sqs-block html-block sqs-block-html">
                  <div className="sqs-block-content">
                    <div className="sqs-html-content">
                      <p style={{ 'white-space': 'pre-wrap;' }}>
                        Neukölln,
                        <br />
                        12047 Berlin
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
  </footer>
)

export default Footer
