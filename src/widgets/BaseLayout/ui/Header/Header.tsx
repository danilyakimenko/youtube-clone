import styles from './Header.module.scss'

import Link from 'next/link'
import Logo from '@/shared/ui/Logo'

type HeaderProps = {
  profileId: string
}

const Header = ({ profileId }: HeaderProps) => {
  return (
    <header className={`${styles.header} container`}>
      <Logo />
      <div className={styles.wrapper}>
        <Link
          className={styles.addVideoLink}
          href="/auth/login"
          title="Sign in"
        >
          Sign in
        </Link>
        {/*<Link
          className={styles.addVideoLink}
          href="/editor/addVideo"
          title="Create Video"
        >
          Create
        </Link>
        <Link
          className={styles.profileLink}
          href={`/profile/${profileId}`}
          aria-label="Go to your profile"
          title="Profile"
        />*/}
      </div>
    </header>
  )
}

export default Header  