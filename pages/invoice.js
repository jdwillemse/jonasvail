import { useState } from 'react'

import InvoiceEditor from '../components/InvoiceEditor'
import Invoice from '../components/Invoice'

export default function PageContainer() {
  const [invoiceDetails, setInvoiceDetails] = useState({})

  return (
    <div className="invoiceWrap">
      <InvoiceEditor setInvoiceDetails={setInvoiceDetails} />
      <Invoice {...invoiceDetails} />
    </div>
  )
}
