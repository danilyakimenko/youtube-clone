'use client'

import { useAddVideoForm } from '@/screen/AddVideoScreen/libs/useAddVideoForm'
import { VIDEO_CATEGORIES } from '@/shared/constants/videoCategories'
import styles from './AddVideoScreen.module.scss'
import { Input } from '@/shared/ui'
import { FormProvider } from 'react-hook-form'
import { Button } from '@/shared/ui/Button'

type AddVideoScreenProps = {
  userId: string
}

const AddVideoScreen = ({ userId }: AddVideoScreenProps) => {
  const {
    isLoading,
    useFormData,
    videoId,
    onSubmit,
  } = useAddVideoForm({ userId })

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p>Video is loading...</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <FormProvider {...useFormData}>
        <form
          className={styles.form}
          onSubmit={onSubmit}
        >
          <select
            className={styles.select}
            {...useFormData.register(`videoCategory`)}
          >
            {VIDEO_CATEGORIES.map(({ title, id }) => (
              <option
                value={id}
                key={id}
              >
                {title}
              </option>
            ))}
          </select>
          <Input
            name="videoUrl"
            placeholder="Link to the YouTube video"
          />
          <Button
            type="submit"
            label="Upload"
            mode="primary"
          />
        </form>
      </FormProvider>
      {videoId && (
        <iframe
          className={styles.iframe}
          width="500"
          height="300"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      )}
    </div>
  )
}

export default AddVideoScreen  