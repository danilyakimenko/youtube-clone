import styles from './ProfileScreen.module.scss'
import Link from 'next/link'

type ProfileScreenProps = {
  userId: string
}

export const ProfileScreen = ({ userId }: ProfileScreenProps) => {
  return (
    <div>
      <Link href={`/profile/${userId}/edit`}>
        Edit profile
      </Link>
    </div>
  )
}
