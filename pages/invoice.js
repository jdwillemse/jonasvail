import { useEffect } from 'react'
import Invoice from '../components/Invoice'

export default function PageContainer(props) {
  // include script to allow correct printing of pdf document
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/pagedjs/dist/paged.polyfill.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <>
      <Invoice />
    </>
  )
}
