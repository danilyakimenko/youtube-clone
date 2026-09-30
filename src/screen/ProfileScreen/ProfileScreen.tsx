import styles from './ProfileScreen.module.scss'
import Link from 'next/link'
import { AuthUserDto } from '@/shared/types/typesFromBackend'
import Image from 'next/image'

type ProfileScreenProps = {
  user: AuthUserDto
  isAuthorized: boolean
}

export const ProfileScreen = ({ user, isAuthorized }: ProfileScreenProps) => {
  const {
    nickname,
    bio,
    youtubeLink,
    avatarUrl
  } = user

  return (
    <div>
      {isAuthorized && (
        <Link href={`/profile/${user.id}/edit`}>
          Edit profile
        </Link>
      )}
      <h1>{nickname}</h1>
      {bio && (
        <p>{bio}</p>
      )}
      {youtubeLink && (
        <a
          href={youtubeLink}
          target='_blank'
          rel="noopener noreferrer"
        >
          YouTube channel link
        </a>
      )}
      {avatarUrl && (
        <Image
          src={avatarUrl}
          alt={`Avatar ${nickname}`}
          width={150}
          height={150}
          unoptimized
        />
      )}
    </div>
  )
}