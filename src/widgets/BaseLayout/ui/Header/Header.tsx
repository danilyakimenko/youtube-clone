import styles from './Header.module.css'
import Image from 'next/image'

import Link from 'next/link'

type HeaderProps = {
  profileId: string
}

const Header = (props: HeaderProps) => {
  const {
    profileId,
  } = props

  return (
    <header className={styles.header}>
      <Link
        href="/"
        title="YouTube Home"
      >
        <Image
          width={93}
          height={20}
          src="/logo.svg"
          alt="YouTube Logo"
        />
      </Link>
      <div className={styles.wrapper}>
        <Link
          className={styles.addVideoLink}
          href="/editor/addVideo"
        >
          Create
        </Link>
        <Link
          className={styles.profileLink}
          href={`/profile/${profileId}`}
          aria-label="Go to your profile"
        >
        </Link>
      </div>
    </header>
  )
}

export default Header  