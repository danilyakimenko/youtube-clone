'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import styles from './RegisterScreen.module.scss'

const schema = z.object({
  nickname: z.string().min(1, 'Minimum of 1 character'),
  password: z.string().min(5, 'Minimum of 5 character'),
  passwordRepeat: z.string().min(5, 'Passwords must match')
})

type Inputs = {
  nickname: string
  password: string
  passwordRepeat: string
}

export const RegisterScreen = () => {
  const router = useRouter()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })
  const onSubmit = handleSubmit(async (data: Inputs) => {
    console.log('data', data)

    if (data.password !== data.passwordRepeat) {
      setError("passwordRepeat", { type: "custom", message: "Passwords don't match" })
      return
    }

    const {
      nickname,
      password,
    } = data

    try {
      await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ nickname, password }),
      })

      router.replace('/')
    }
    catch (error) {
      console.error(error)
    }
  })
  const nicknameErrorMessage = errors.nickname?.message
  const passwordErrorMessage = errors.password?.message
  const passwordRepeatErrorMessage = errors.passwordRepeat?.message
  const hasNicknameInputError = Boolean(nicknameErrorMessage)
  const hasPasswordInputError = Boolean(passwordErrorMessage)
  const hasPasswordRepeatInputError = Boolean(passwordRepeatErrorMessage)

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
        <label>
          <input
            type="password"
            placeholder="Repeat the password"
            {...register('passwordRepeat')}
          />
          {hasPasswordRepeatInputError && (
            <p className={styles.error}>{passwordRepeatErrorMessage}</p>
          )}
        </label>
        <Link
          href="/auth/register"
          title="Create account"
        >
          Sign in
        </Link>
        <button type="submit">
          Create account
        </button>
      </form>
    </div>
  )
}