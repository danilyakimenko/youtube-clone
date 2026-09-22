import styles from './Header.module.css'
import Image from 'next/image'
import LogoImage from './logo.svg'
import Link from 'next/link'

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          width={40}
          src={LogoImage}
          alt="YouTube Logo"
        />
      </Link>
    </header>
  )
}

export default Header  