import Link from 'next/link'
import Logo from '@/shared/ui/Logo'
import styles from './Header.module.scss'

type HeaderProps = {
  userId?: string
}

const Header = ({ userId }: HeaderProps) => {
  console.log('header userId', userId)
  return (
    <header className={`${styles.header} container`}>
      <Logo />
      <div className={styles.wrapper}>
        {userId ? (
          <>
            <Link
              className={styles.addVideoLink}
              href="/editor/addVideo"
              title="Create Video"
            >
              Create
            </Link>
            <Link
              className={styles.profileLink}
              href={`/profile/${userId}`}
              aria-label="Go to your profile"
              title="Profile"
            />
          </>
        ) : (
          <Link
            className={styles.addVideoLink}
            href="/auth/login"
            title="Sign in"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header  