import Image from 'next/image'
import Logo from '@/shared/ui/Logo'
import styles from './NotFoundPage.module.scss'

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <Image
        src="/monkey.png"
        width={186}
        height={174}
        alt="Page not found"
      />
      <div className={styles.wrapper}>
        <Logo className={styles.logo} />
        <p>
          This page isn't available. Sorry about that.<br/>
          Try searching for something else.
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage  