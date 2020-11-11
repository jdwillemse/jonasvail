import React, { useCallback, useRef, useState } from 'react'
import cn from 'classnames'
import { useForm, useField, splitFormProps } from 'react-form'
import Select from 'react-select-material-ui'

import css from './styles.module.scss'
import countries from './countries.json'
import Input from './Input'

const DAY_IN_MS = 1000 * 60 * 60 * 24

const InputField = React.forwardRef((props, ref) => {
  // Let's use splitFormProps to get form-specific props
  const [field, fieldOptions, rest] = splitFormProps({
    // default added to prevent react "controlled input" warning
    defaultValue: '',
    ...props,
  })

  // Use the useField hook with a field and field options
  // to access field state
  const { getInputProps } = useField(field, fieldOptions)

  // Build the field
  return <input {...getInputProps({ ref, ...rest })} />
})

const InvoiceEditor = ({ setInvoiceDetails }) => {
  const [count, setCount] = useState(1)
  const [country, setCountry] = useState()
  const handleSubmit = (formData) => {
    setInvoiceDetails(formData)
  }
  const { Form } = useForm({ onSubmit: handleSubmit, debugForm: false })
  const today = new Date().toISOString().substr(0, 10)
  const dueDate = new Date(Date.now() + 22 * DAY_IN_MS)
    .toISOString()
    .substr(0, 10)

  const addInvoiceItem = useCallback(() => {
    setCount(count + 1)
  }, [count, setCount])

  return (
    <section className={css.wrap}>
      <Form>
        <section className={css.section}>
          <div className="row">
            <fieldset className="col">
              <legend className={css.legend}>Invoice details</legend>
              <Input field="number" type="text" label="Number" />
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
            </fieldset>

            <fieldset className="col">
              <legend className={css.legend}>Recipient</legend>
              <Input field="recipient" type="text" label="Name" />
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
                <InputField
                  field="country"
                  type="hidden"
                  defaultValue={country}
                />
              </div>
              <Input field="taxNumber" type="text" label="Tax/VAT ID" />
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
