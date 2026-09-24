import HomeScreen from '@/screen/HomeScreen'
import { GetAllVideosDto } from '@/shared/types/typesFromBackend'
import VIDEO_CATEGORIES from '@/shared/constants/videoCategories'

export default async function HomePage() {
  try {
    const dataFromServer = await fetch(`${process.env.SERVER_API_URL}/api/videos`, {
      method: 'GET',
    })
    const response = await dataFromServer.json() as GetAllVideosDto
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
