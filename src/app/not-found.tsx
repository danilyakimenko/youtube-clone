import NotFoundPage from '@/screen/NotFoundPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 Not Found'
}

const NotFound = () => {
  return (
    <NotFoundPage />
  )
}

export default NotFound