import styles from './Header.module.scss'

import Link from 'next/link'
import Logo from '@/shared/ui/Logo'

type HeaderProps = {
  profileId: string
}

const Header = (props: HeaderProps) => {
  const {
    profileId,
  } = props

  return (
    <header className={styles.header}>
      <Logo />
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