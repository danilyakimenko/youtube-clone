import HomeScreen from '@/screen/HomeScreen'
import { VIDEO_CATEGORIES } from '@/shared/constants/videoCategories'
import { getVideosData } from '@/app/api/videos/getVideosData'

export default async function HomePage() {
  try {
    const response = await getVideosData()
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