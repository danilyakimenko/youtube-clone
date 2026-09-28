import { cookies } from 'next/headers'
import { AUTH_COOKIE_NAME } from '@/shared/constants/cookiesNames'
import { getUsersDataRequest } from '@/app/api/users/getUsersDataRequest'

export const withUserInfo = <T extends object>(Component: React.FC<T>) => {
  return async (props: T) => {
    try {
      const cookiesStore = await cookies()
      const authToken = cookiesStore.get(AUTH_COOKIE_NAME)

      if (!authToken) {
        throw new Error()
      }

      const dataFromBackend = await getUsersDataRequest()

      return <Component user={dataFromBackend.user} {...props} />
    }
    catch {
      return <Component {...props} />
    }
  }
}