import HomeScreen from '@/screen/HomeScreen'
import { GetAllVideosDto } from '@/shared/types/typesFromBackend'

export default async function HomePage() {
  try {
    const dataFromServer = await fetch(`${process.env.SERVER_API_URL}/api/videos`, {
      method: 'GET',
    })
    const response = await dataFromServer.json() as GetAllVideosDto

    console.log('response', response)

    return <HomeScreen data={response.data} />
  }
  catch (error) {
    console.error(error)

    return <div>Something went wrong </div>
  }
}
