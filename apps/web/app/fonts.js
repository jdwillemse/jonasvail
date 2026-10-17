import localFont from 'next/font/local'

// ABC Laica and ABC Diatype are licensed Dinamo fonts. next/font preloads them
// and sizes a local fallback to match, so the swap doesn't shift the layout.
export const laica = localFont({
  src: './fonts/ABCLaica-Regular.woff2',
  weight: '400',
  variable: '--font-laica',
  adjustFontFallback: 'Times New Roman',
})

export const diatype = localFont({
  src: './fonts/ABCDiatype-Medium.woff2',
  weight: '500',
  variable: '--font-diatype',
})

export const diatypeMono = localFont({
  src: './fonts/ABCDiatypeMono-Regular.woff2',
  weight: '400',
  variable: '--font-diatype-mono',
  adjustFontFallback: false,
  fallback: ['ui-monospace', 'monospace'],
})
