import React, { useCallback, useEffect, useState } from 'react'
import cn from 'classnames'
import { useForm } from 'react-form'
import Select from 'react-select-material-ui'
import { useRouter } from 'next/router'
import _ from 'lodash'

import css from './styles.module.scss'
import countries from './countries.json'
import Input from './Input'
import Login from '../Login'

const DAY_IN_MS = 1000 * 60 * 60 * 24

const InvoiceEditor = ({ setInvoiceDetails }) => {
  const router = useRouter()
  const [count, setCount] = useState(1)
  const [country, setCountry] = useState()
  const handleSubmit = (formData) => {
    setInvoiceDetails({ ...formData, country })
  }
  const { Form, setFieldValue } = useForm({
    onSubmit: handleSubmit,
    debugForm: false,
  })
  const today = new Date().toISOString().substr(0, 10)
  const dueDate = new Date(Date.now() + 22 * DAY_IN_MS)
    .toISOString()
    .substr(0, 10)

  const addInvoiceItem = useCallback(() => {
    setCount(count + 1)
  }, [count, setCount])

  useEffect(() => {
    const savedValues = router.query
    _.keys(savedValues).forEach((key) => {
      setFieldValue(key, savedValues[key])
    })
  }, [router, setFieldValue])

  return (
    <section className={css.wrap}>
      <Login />

      <Form>
        <section className={css.section}>
          <div className="row">
            <fieldset className="col">
              <legend className={css.legend}>Recipient</legend>
              <Input field="recipient" type="text" label="Name" required />
              <Input field="address1" type="text" label="Address line 1" />
              <Input field="address2" type="text" label="Address line 2" />
              <div className={css.selectWrap}>
                <Select
                  id="country"
                  label="Country"
                  options={countries}
                  fullWidth
                  onChange={(value) => {
                    setCountry(value)
                  }}
                />
              </div>
            </fieldset>

            <fieldset className="col">
              <legend className={css.legend}>Invoice details</legend>
              <Input field="number" type="text" label="Number" required />
              <Input
                field="date"
                type="date"
                label="Date"
                defaultValue={today}
              />
              <Input
                field="dueDate"
                type="date"
                label="Payment due"
                defaultValue={dueDate}
              />
              {country && country !== 'de' && (
                <Input
                  field="taxNumber"
                  type="text"
                  label="Tax/VAT ID"
                  required
                />
              )}
            </fieldset>
          </div>
        </section>
        <section className={cn(css.section)}>
          <fieldset>
            <legend className={css.legend}>Invoice item</legend>
            {[...Array(count)].map((_, i) => (
              <div className="row" key={i}>
                <div className="col-6">
                  <Input
                    field={`invoiceItems.${i}.description`}
                    type="text"
                    label="Description"
                  />
                </div>
                <div className="col-3">
                  <Input
                    field={`invoiceItems.${i}.rate`}
                    type="text"
                    label="Day rate"
                  />
                </div>
                <div className="col-3">
                  <Input
                    field={`invoiceItems.${i}.quantity`}
                    type="text"
                    label="Days"
                  />
                </div>
              </div>
            ))}
          </fieldset>
          <button type="button" onClick={addInvoiceItem}>
            Add item
          </button>
        </section>
        <section className={cn(css.section)}>
          <button type="submit">Update Invoice</button>
        </section>
      </Form>
    </section>
  )
}

export default InvoiceEditor
