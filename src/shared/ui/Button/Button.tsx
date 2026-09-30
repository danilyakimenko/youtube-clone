import styles from './Button.module.scss'
import clsx from 'clsx'

type ButtonProps = {
  label: string
  mode: 'primary' | 'secondary'
} & Pick<HTMLButtonElement, 'type'>

export const Button = ({ type, label, mode }: ButtonProps) => {
  return (
    <button
      className={clsx(styles.button, {
        [styles.primary]: mode === 'primary',
        [styles.secondary]: mode === 'secondary',
      })}
      type={type}
      title="Upload video"
    >
      {label}
    </button>
  )
}