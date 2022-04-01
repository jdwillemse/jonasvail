import { useEffect, useState, useCallback } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import CookieConsent, { Cookies } from 'react-cookie-consent'
import cn from 'classnames'

import css from './index.module.scss'

const ANALYTICS_ID = 'G-1PSQHL1WDB'
const ANALYTICS_STORAGE_KEY = 'ANALYTICS_CONSENT'

export default function Analytics() {
  const [permission, setPermission] = useState(false)
  const { asPath, ...props } = useRouter()
  const handleAccept = useCallback(() => {
    setPermission(true)
  }, [])

  // every page load will trigger track event if cookie is set
  useEffect(() => {
    const storedPermission = Cookies.get(ANALYTICS_STORAGE_KEY)
    setPermission(storedPermission === 'true')
  }, [setPermission])

  // every page load will trigger track event if cookie is set
  // useEffect(() => {
  //   console.log({ asPath })
  //   // if (getConsentCookie() === 'true') {
  //   //   ga('create', analyticsId, 'auto');
  //   //   ga('send', 'pageview');
  //   // }
  // }, [asPath])

  return permission ? (
    <Head>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ANALYTICS_ID}');
          `,
        }}
      />
    </Head>
  ) : (
    <CookieConsent
      location="bottom"
      cookieName={ANALYTICS_STORAGE_KEY}
      buttonText="agree"
      declineButtonText="refuse"
      containerClasses={css.wrap}
      enableDeclineButton
      disableButtonStyles
      buttonClasses={css.button}
      declineButtonClasses={cn(css.button, css.declineButton)}
      expires={91}
      onAccept={handleAccept}
    >
      I would like to use data about your interaction with this site for
      analytics purposes only.
    </CookieConsent>
  )
}
