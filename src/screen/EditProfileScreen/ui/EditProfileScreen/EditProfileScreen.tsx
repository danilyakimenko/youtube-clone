'use client'

import styles from './EditProfileScreen.module.scss'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from '../../constants/editProfileSchema'

type EditProfileScreen = {
  userId: string
}

type Inputs = {
  nickname: string
  bio: string
  youtubeLink: string
  avatarUrl: string
}

export const EditProfileScreen = ({ userId }: EditProfileScreen) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  const nicknameErrorMessage = errors.nickname?.message
  const hasNicknameInputError = Boolean(nicknameErrorMessage)
  const biographyErrorMessage = errors.bio?.message
  const hasBiographyInputError = Boolean(biographyErrorMessage)
  const youtubeLinkErrorMessage = errors.youtubeLink?.message
  const hasYoutubeLinkInputError = Boolean(youtubeLinkErrorMessage)
  const avatarUrlErrorMessage = errors.avatarUrl?.message
  const hasAvatarUrlInputError = Boolean(avatarUrlErrorMessage)

  const onSubmit = (values: Inputs) => {
    console.log('values', values)
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
          <input
            className={styles.input}
            type="text"
            placeholder="Your nickname"
            {...register(`nickname`)}
          />
          {hasNicknameInputError && (
            <p className={styles.error}>{nicknameErrorMessage}</p>
          )}
        </label>
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