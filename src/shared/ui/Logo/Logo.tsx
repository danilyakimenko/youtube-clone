import styles from './Logo.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'

type LogoProps = {
  isBig?: boolean
}

const Logo = (props: LogoProps) => {
  const {
    isBig,
  } = props

  return (
    <Link
      className={clsx(styles.logo, {
        [styles.big]: isBig
      })}
      href="/"
      title="YouTube Home"
    >
      <Image
        className={styles.logoImage}
        width={93}
        height={20}
        src="/logo.svg"
        alt="YouTube Logo"
      />
    </Link>
  )
}

export default Logo  