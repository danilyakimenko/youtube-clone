import { cookies } from 'next/headers'

export const withUserInfo = <T extends object>(Component: React.FC<T>) => {
  return async (props: T) => {
    try {
      const cookiesStore = await cookies()
      const authToken = cookiesStore.get('x-auth-token')

      if (!authToken) {
        throw new Error()
      }

      const rawData = await fetch(`${process.env.SERVER_API_URL}/api/users`, {
        method: 'GET',
        headers: {
          cookie: `x-auth-token=${authToken.value}`
        }
      })
      const dataFromBackend = await rawData.json()

      return <Component user={dataFromBackend.user} {...props} />
    }
    catch {
      return <Component {...props} />
    }
  }
}