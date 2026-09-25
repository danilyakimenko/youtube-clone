'use client'

import Link from 'next/link'
import { GetAllVideosDto } from '@/shared/types/typesFromBackend'
import { VIDEO_CATEGORIES, DEFAULT_CATEGORY } from '@/shared/constants/videoCategories'
import { VideosList } from '@/widgets/VideosList/ui'

import styles from './HomeScreen.module.scss'
import clsx from 'clsx'

type HomeScreenProps = {
  data: GetAllVideosDto['data']
  categoryId: string
  categories: typeof VIDEO_CATEGORIES
}

const HomeScreen = ({data, categoryId, categories}: HomeScreenProps) => {
  return (
    <div className={styles.container}>
      {categories.length > 0 && (
        <ul className={styles.categoriesList}>
          <li>
            <Link
              className={clsx(styles.categoryLink, {
                [styles.activeCategoryLink]: !categoryId
              })}
              href="/"
            >
              {DEFAULT_CATEGORY.title}
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                className={clsx(styles.categoryLink, {
                  [styles.activeCategoryLink]: category.id === categoryId
                })}
                href={`/${category.id}`}
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <VideosList data={data} />
    </div>
  )
}

export default HomeScreen