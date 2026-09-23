import Link from 'next/link'
import Image from 'next/image'
import linkItems from './ui/constants'
import styles from './LeftMenu.module.scss'

const LeftMenu = () => {
  return (
    <aside className={styles.leftMenu}>
      <nav>
        <ul className={styles.list}>
          {linkItems.map(({title, href, linkIcon}, index) => (
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
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default LeftMenu  