import HomeScreen from '@/screen/HomeScreen'
import { GetAllVideosDto } from '@/shared/types/typesFromBackend'
import { VIDEO_CATEGORIES } from '@/shared/constants/videoCategories'
import { cookies } from 'next/headers'

export default async function HomePage() {
  const cookiesStore = await cookies()
  const authToken = cookiesStore.get('x-auth-token')

  try {
    const dataFromServer = await fetch(`${process.env.SERVER_API_URL}/api/videos`, {
      method: 'GET',
    })
    const response = await dataFromServer.json() as GetAllVideosDto

    const userFromServer = await fetch(`${process.env.SERVER_API_URL}/api/users`, {
      method: 'GET',
      headers: {
        cookie: `x-auth-token=${authToken?.value}`
      }
    })

    const userResponse = await userFromServer.json()

    console.log('userResponse', userResponse)

    const finalCategories = VIDEO_CATEGORIES
      .filter(({ id }) => response.categories.includes(id))

    return (
      <HomeScreen
        data={response.data}
        categories={finalCategories}
      />
    )
  }
  catch (error) {
    console.error(error)

    return <div>Something went wrong </div>
  }
}