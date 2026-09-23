import Link from 'next/link'
import homeIcon from '@/shared/assets/icons/home.svg'
import AddVideoIcon from '@/shared/assets/icons/arrow-top.svg'
import ProfileIcon from '@/shared/assets/icons/profile.svg'
import YourVideosIcon from '@/shared/assets/icons/your-videos.svg'
import Image from 'next/image'
import styles from './LeftMenu.module.scss'


const linkItems = [
  {
    title: 'Home',
    href: '/',
    linkIcon: homeIcon,
  },

  {
    title: 'Add video',
    href: '/editor/addVideo',
    linkIcon: AddVideoIcon,
  },

  {
    title: 'Profile',
    href: '/profile/123',
    linkIcon: ProfileIcon,
  },

  {
    title: 'Your videos',
    href: '/',
    linkIcon: YourVideosIcon,
  },
]

const LeftMenu = () => {
  return (
    <aside className={styles.leftMenu}>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          {linkItems.map(({title, href, linkIcon}, index) => (
            <li
              className={styles.listItem}
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