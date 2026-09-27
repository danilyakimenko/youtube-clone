import Link from 'next/link'
import Logo from '@/shared/ui/Logo'
import styles from './Header.module.scss'
import signInIcon from '@/shared/assets/icons/sign-in.svg'

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
            className={styles.signInLink}
            href="/auth/login"
            title="Sign in"
          >
            <img
              className={styles.icon}
              src={signInIcon.src}
              width={24}
              height={24}
              alt=""
            />
            Sign in
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header  