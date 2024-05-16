import '@/styles/fonts.css'
import '@/styles/static.css'
import '@/styles/site-good-colours.css'
import '@/styles/inline.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
