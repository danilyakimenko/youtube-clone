import styles from './LeftMenu.module.css'

const LeftMenu = () => {
  return (
    <aside className={styles.leftMenu}>
      <nav className={styles.navigation}>
        <a href="#">Главная</a>
        <a href="#">Тренды</a>
        <a href="#">Мои видео</a>
      </nav>
    </aside>
  )
}

export default LeftMenu  