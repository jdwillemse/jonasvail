import classNames from 'classnames'

import css from './hero.module.css'

export default function Hero({ heroCopy }) {
  return (
    // TODO: make padding dynamic
    <section style={{ 'padding-top': '86.7344px' }}>
      <div
        className="content-wrapper"
        style={{
          'padding-top': 'calc(10vmax / 10)',
          'padding-bottom': 'calc(10vmax / 10)',
        }}
      >
        <div className="content">
          <div className={classNames('fluid-engine', css.wrapper)}>
            <div className={classNames('fe-block', css.copy)}>
              <div className="sqs-block html-block sqs-block-html">
                <div className="sqs-block-content">
                  <div className="sqs-html-content">
                    <h1 style={{ 'white-space': 'pre-wrap;' }}>{heroCopy}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
