'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import styles from './LoginScreen.module.scss'

const schema = z.object({
  nickname: z.string().min(1, 'Minimum of 1 character'),
  password: z.string().min(5, 'Minimum of 5 character')
})

type Inputs = {
  nickname: string
  password: string
}

export const LoginScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  const onSubmit = handleSubmit((data: Inputs) => {
    console.log('data', data)
  })
  const nicknameErrorMessage = errors.nickname?.message
  const passwordErrorMessage = errors.password?.message
  const hasNicknameInputError = Boolean(nicknameErrorMessage)
  const hasPasswordInputError = Boolean(passwordErrorMessage)

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <label>
          <input
            type="text"
            placeholder="Nickname"
            {...register('nickname')}
          />
          {hasNicknameInputError && (
            <p className={styles.error}>{nicknameErrorMessage}</p>
          )}
        </label>
        <label>
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
  )
}