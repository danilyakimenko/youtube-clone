import styles from './Logo.module.css'
import Link from 'next/link'
import Image from 'next/image'

type LogoProps = {
  className: string
}

const Logo = (props: LogoProps) => {
  const {
    className,
  } = props

  return (
    <Link
      href="/"
      title="YouTube Home"
    >
      <Image
        className={className}
        width={93}
        height={20}
        src="/logo.svg"
        alt="YouTube Logo"
      />
    </Link>
  )
}

export default Logo  