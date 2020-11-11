/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import { useField, splitFormProps } from 'react-form'

import css from './styles.module.scss'

const InputField = React.forwardRef(({ label, ...props }, ref) => {
  // Let's use splitFormProps to get form-specific props
  const [field, fieldOptions, rest] = splitFormProps({
    // default added to prevent react "controlled input" warning
    defaultValue: '',
    ...props,
  })

  // Use the useField hook with a field and field options
  // to access field state
  const { getInputProps } = useField(field, fieldOptions)

  return (
    <div className={css.inputWrap}>
      <input {...getInputProps({ ref, ...rest })} className={css.input} />
      <span className={css.bar}></span>
      <label className={css.label}>{label}</label>
    </div>
  )
})

export default InputField
