'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<string[] | null>(null)
  useEffect(() => {
    (async () => {
      try {
        const dataFromServer = await fetch('/api/videos', {
          method: 'GET',
        })
        const response = await dataFromServer.json()
        setData(response.data)
      }
      finally {
        setIsLoading(false)
      }
    })()
  }, [])

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      {data && data.length > 0 ?
        data.map((videoId) => (
          <Link
            href={`/video/${videoId}`}
            type="button"
            key={videoId}
          >
            <Image
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              width={500}
              height={300}
              alt="Video from YouTube"

            />
          </Link>
        )) : (
        <div>No videos</div>
      )}
    </div>
  )
}

export default HomeScreen