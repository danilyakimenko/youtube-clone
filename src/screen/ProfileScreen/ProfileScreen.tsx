import styles from './ProfileScreen.module.scss'
import Link from 'next/link'
import { AuthUserDto } from '@/shared/types/typesFromBackend'

type ProfileScreenProps = {
  user: AuthUserDto
  isAuthorized: boolean
}

export const ProfileScreen = ({ user, isAuthorized }: ProfileScreenProps) => {
  return (
    <div>
      {isAuthorized && (
        <Link href={`/profile/${user.id}/edit`}>
          Edit profile
        </Link>
      )}
      <p>{user.nickname}</p>
      <p>{user.bio}</p>
      <p>{user.youtubeLink}</p>
      <img
        src={user.avatarUrl}
        alt={`Avatar ${user.nickname}`}
        width={150}
        height={150}
      />
    </div>
  )
}