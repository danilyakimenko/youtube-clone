'use client'

import Link from 'next/link'
import linkItems from './ui/constants'
import { useRouter } from 'next/navigation'
import signOutIcon from '@/shared/assets/icons/sign-out.svg'
import { signOutRequest } from '@/app/api/users/signOutRequest'
import { ViewTransition } from 'react'
import styles from './LeftMenu.module.scss'

type LeftMenuProps = {
  userId?: string
}

const LeftMenu = ({ userId }: LeftMenuProps) => {
  const router = useRouter()
  const onSignOut = async () => {
    await signOutRequest()
    router.replace('/')
  }
  return (
    <ViewTransition>
      <aside className={styles.leftMenu}>
        <nav>
          <ul className={styles.list}>
            {linkItems.map(({ title, href, linkIcon, isUserProfile }, index) => {
              if (index !== 0 && !userId) {
                return null
              }
              const linkHref = isUserProfile && userId
                ? `/profile/${userId}`
                : href

              return (
                <li
                  className={styles.item}
                  title={title}
                  key={index}
                >
                  <Link
                    className={styles.link}
                    href={linkHref}
                    transitionTypes={['slide-in']}
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
                  onClick={onSignOut}
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
    </ViewTransition>
  )
}

export default LeftMenu  