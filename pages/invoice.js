import { useEffect, useRef, useState } from 'react'
import { Previewer } from 'pagedjs'

import InvoiceEditor from '../components/InvoiceEditor'
import Invoice from '../components/Invoice'

export default function PageContainer(props) {
  const [invoiceDetails, setInvoiceDetails] = useState({})
  const paged = useRef()
  const sourceRef = useRef()
  const outputRef = useRef()
  // process
  useEffect(() => {
    // only instantiate once
    if (!paged.current) {
      paged.current = new Previewer()
    }
    paged.current.preview(sourceRef.current, [], outputRef.current)
  }, [sourceRef.current, outputRef.current, invoiceDetails])

  return (
    <div className="invoiceWrap">
      <InvoiceEditor setInvoiceDetails={setInvoiceDetails} />
      <div ref={sourceRef} style={{ display: 'none' }}>
        <Invoice {...invoiceDetails} />
      </div>
      <div ref={outputRef} />
    </div>
  )
}
