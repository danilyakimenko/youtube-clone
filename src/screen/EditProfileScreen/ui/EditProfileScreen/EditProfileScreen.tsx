'use client'

import styles from './EditProfileScreen.module.scss'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from '../../constants/editProfileSchema'
import { AuthUserDto } from '@/shared/types/typesFromBackend'
import { updateUserProfile } from '@/app/api/users/updateUserInfo'

type EditProfileScreen = {
  user: AuthUserDto
}

type Inputs = {
  bio: string
  youtubeLink: string
  avatarUrl: string
}

export const EditProfileScreen = ({ user }: EditProfileScreen) => {
  const {
    id: userId,
    ...rest
  } = user

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: rest,
  })
  const biographyErrorMessage = errors.bio?.message
  const hasBiographyInputError = Boolean(biographyErrorMessage)
  const youtubeLinkErrorMessage = errors.youtubeLink?.message
  const hasYoutubeLinkInputError = Boolean(youtubeLinkErrorMessage)
  const avatarUrlErrorMessage = errors.avatarUrl?.message
  const hasAvatarUrlInputError = Boolean(avatarUrlErrorMessage)

  const onSubmit = async(values: Inputs) => {
    console.log('values', values)
    await updateUserProfile(values)
  }

  return (
    <div>
      <Link href={`/profile/${userId}`}>
        Back
      </Link>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className={styles.label}>
          <textarea
            className={styles.input}
            placeholder="Biography"
            {...register(`bio`)}
          />
          {hasBiographyInputError && (
            <p className={styles.error}>{biographyErrorMessage}</p>
          )}
        </label>
        <label className={styles.label}>
          <input
            className={styles.input}
            type="text"
            placeholder="Your youtube channel link"
            {...register(`youtubeLink`)}
          />
          {hasYoutubeLinkInputError && (
            <p className={styles.error}>{youtubeLinkErrorMessage}</p>
          )}
        </label>
        <label className={styles.label}>
          <input
            className={styles.input}
            type="text"
            placeholder="Link on image"
            {...register(`avatarUrl`)}
          />
          {hasAvatarUrlInputError && (
            <p className={styles.error}>{avatarUrlErrorMessage}</p>
          )}
        </label>
        <button
          className={styles.button}
          type="submit"
          title="Upload video"
        >
          Upload
        </button>
      </form>
    </div>
  )
}