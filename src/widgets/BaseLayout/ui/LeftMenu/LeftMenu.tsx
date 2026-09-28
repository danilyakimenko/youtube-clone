'use client'

import Link from 'next/link'
import linkItems from './ui/constants'
import { useRouter } from 'next/navigation'
import signOutIcon from '@/shared/assets/icons/sign-out.svg'
import styles from './LeftMenu.module.scss'

type LeftMenuProps = {
  userId?: string
}

const LeftMenu = ({ userId }: LeftMenuProps) => {
  const router = useRouter()
  const onLogOut = async () => {
    await fetch(`/api/users/signout`)
    router.refresh()
  }
  return (
    <aside className={styles.leftMenu}>
      <nav>
        <ul className={styles.list}>
          {linkItems.map(({title, href, linkIcon}, index) => {
            if (index !== 0 && !userId) {
              return null
            }

            return (
              <li
                className={styles.item}
                title={title}
                key={index}
              >
                <Link
                  className={styles.link}
                  href={href}
                >
                  <img
                    className={styles.icon}
                    src={linkIcon.src}
                    width={24}
                    height={24}
                    alt=""
                    aria-hidden={true}
                  />
                  {title}
                </Link>
              </li>
            )
          })}
          {userId && (
            <li className={styles.item}>
              <button
                className={styles.link}
                type="button"
                onClick={onLogOut}
              >
                <img
                  className={styles.icon}
                  src={signOutIcon.src}
                  width={24}
                  height={24}
                  alt=""
                  aria-hidden={true}
                />
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  )
}

export default LeftMenu  