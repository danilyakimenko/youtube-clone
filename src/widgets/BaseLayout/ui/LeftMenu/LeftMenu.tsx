'use client'

import Link from 'next/link'
import Image from 'next/image'
import linkItems from './ui/constants'
import styles from './LeftMenu.module.scss'
import { useRouter } from 'next/navigation'

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
                  <Image
                    className={styles.icon}
                    src={linkIcon}
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
          <li>
            <button
              type="button"
              className={styles.button}
              onClick={onLogOut}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default LeftMenu  