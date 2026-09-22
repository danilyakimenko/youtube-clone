import styles from './NotFoundPage.module.css'
import NotFoundImage from './404.png'
import Image from 'next/image'
const NotFoundPage = () => {
  return (
    <div>
      <Image
        src={NotFoundImage}
        width={500}
        alt="Page not found"
      />
    </div>
  )
}

export default NotFoundPage  