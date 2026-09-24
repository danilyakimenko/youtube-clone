import type { Metadata } from 'next'
import { GetAllVideosDto } from '@/shared/types/typesFromBackend'
import HomeScreen from '@/screen/HomeScreen'
import { VIDEO_CATEGORIES } from '@/shared/constants/videoCategories'

type CategoryPageProps = {
  params: Promise<{ categoryId: string }>
}

export async function generateMetadata(
  { params }: CategoryPageProps,
): Promise<Metadata> {
  const data = await params
  const categoryId = data.categoryId
  const findCategory = VIDEO_CATEGORIES.find((category) => category.id === categoryId)

  if (!findCategory) {
    return {
      title: 'Videos in an unknown category'
    }
  }

  return {
    title: `Videos in category - ${findCategory.title}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const data = await params
  const categoryId = data.categoryId

  try {
    const dataFromServer = await fetch(`${process.env.SERVER_API_URL}/api/videos?categoryId=${categoryId}`)
    const response = await dataFromServer.json() as GetAllVideosDto
    
    if (!response.data) {
      throw new Error('No data about video')
    }

    const finalCategories = VIDEO_CATEGORIES
      .filter(({ id }) => response.categories.includes(id))

    return <HomeScreen data={response.data} categories={finalCategories} />
  }
  catch (error) {
    console.error(error)
    return <div>Something went wrong </div>
  }
}
