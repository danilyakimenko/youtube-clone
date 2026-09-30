'use client'

import { useFormContext } from 'react-hook-form'
import styles from './Input.module.scss'

type InputProps = {
  name: string
  placeholder: string
}

export const Input = ({ name, placeholder }: InputProps) => {
  const { register, formState: { errors } } = useFormContext<Record<string, string>>()
  const errorMessage = errors[name]?.message
  const hasError = !!errorMessage

  return (
    <label className={styles.label}>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        {...register(name)}
      />
      {hasError && (
        <p className={styles.error}>{errorMessage}</p>
      )}
    </label>
  )
}