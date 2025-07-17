import React from 'react'
import styles from './FormInput.module.css'

type FormInputProps = {
  type: React.HTMLInputTypeAttribute;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
}

function FormInput({ type, onChange, placeHolder }: FormInputProps) {
  return (
    <input 
      type={type}
      onChange={onChange}
      placeholder={placeHolder ?? ''}
      className={styles.formInput}
    />
  )
}

export default FormInput;