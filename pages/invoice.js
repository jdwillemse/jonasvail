import { Fragment, useState } from 'react'

import InvoiceHistory from '../components/InvoiceHistory'
import InvoiceEditor from '../components/InvoiceEditor'
import Invoice from '../components/Invoice'

export default function PageContainer() {
  const [invoiceDetails, setInvoiceDetails] = useState({})

  return (
    <Fragment>
      <div className="invoiceWrap">
        <InvoiceEditor setInvoiceDetails={setInvoiceDetails} />
        <Invoice {...invoiceDetails} />
      </div>
      <InvoiceHistory data={invoiceDetails} />
    </Fragment>
  )
}
