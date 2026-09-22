import styles from './LeftMenu.module.css'
import Link from 'next/link'

const LeftMenu = () => {
  return (
    <aside className={styles.leftMenu}>
      <nav className={styles.navigation}>
        <Link href="/editor/addVideo">Добавить видео</Link>
        <Link href="/profile/123">Профиль</Link>
      </nav>
    </aside>
  )
}

export default LeftMenu  