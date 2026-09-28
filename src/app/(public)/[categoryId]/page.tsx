import type { Metadata } from 'next'
import HomeScreen from '@/screen/HomeScreen'
import { VIDEO_CATEGORIES } from '@/shared/constants/videoCategories'
import { notFound } from 'next/navigation'
import { getVideosDataRequest } from '@/app/api/videos/getVideosDataRequest'

type CategoryPageProps = {
  params: Promise<{ categoryId: string }>
}

export async function generateMetadata(
  { params }: CategoryPageProps,
): Promise<Metadata> {
  const data = await params
  const categoryId = data.categoryId
  const findCategory = VIDEO_CATEGORIES.find((category) => category.id === categoryId)

  if (!findCategory)
    return { title: '404 Not Found' }

  return {
    title: `Videos in category - ${findCategory.title}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const data = await params
  const categoryId = data.categoryId
  const findCategory = VIDEO_CATEGORIES.find((category) => category.id === categoryId)

  if (!findCategory) return notFound()

  try {
    const response = await getVideosDataRequest({ categoryIdParam: categoryId })
    console.log('response', response)

    if (!response.data) {
      throw new Error('No data about video')
    }

    const finalCategories = VIDEO_CATEGORIES
      .filter(({ id }) => response.categories.includes(id))

    return (
      <HomeScreen
        data={response.data}
        categoryId={categoryId}
        categories={finalCategories}
      />
    )
  }
  catch (error) {
    console.error(error)
    return <div>Something went wrong </div>
  }
}
