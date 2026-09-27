'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import googleLogoIcon from '@/shared/assets/icons/google.svg'
import styles from './LoginScreen.module.scss'

const schema = z.object({
  nickname: z.string().min(1, 'Minimum of 1 character'),
  password: z.string().min(1, 'Minimum of 5 character')
})

type Inputs = {
  nickname: string
  password: string
}

export const LoginScreen = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  const onSubmit = handleSubmit(async (data: Inputs) => {
    const {nickname, password} = data

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({nickname, password}),
      })

      if (response.ok) {
        router.replace('/')
      }
    }
    catch (error) {
      console.error(error)
    }
  })
  const nicknameErrorMessage = errors.nickname?.message
  const passwordErrorMessage = errors.password?.message
  const hasNicknameInputError = Boolean(nicknameErrorMessage)
  const hasPasswordInputError = Boolean(passwordErrorMessage)

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <img
            className={styles.logo}
            src={googleLogoIcon.src}
            alt=""
            width="48"
            height="48"
            loading="lazy"
          />
          <h1 className={styles.title}>Sign in</h1>
          <p className={styles.description}>to continue to YouTube</p>
        </div>
        <form
          className={styles.form}
          onSubmit={onSubmit}
        >
          <label className={styles.label}>
            <input
              type="text"
              placeholder="Nickname"
              {...register('nickname')}
            />
            {hasNicknameInputError && (
              <p className={styles.error}>{nicknameErrorMessage}</p>
            )}
          </label>
          <label className={styles.label}>
            <input
              type="password"
              placeholder="Password"
              {...register('password')}
            />
            {hasPasswordInputError && (
              <p className={styles.error}>{passwordErrorMessage}</p>
            )}
          </label>
          <Link
            href="/auth/register"
            title="Create account"
          >
            Create account
          </Link>
          <button type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}