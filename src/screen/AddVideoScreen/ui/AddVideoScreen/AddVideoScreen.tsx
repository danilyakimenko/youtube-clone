'use client'

import { useAddVideoForm } from '@/screen/AddVideoScreen/libs/useAddVideoForm'
import { VIDEO_CATEGORIES } from '@/shared/constants/videoCategories'
import styles from './AddVideoScreen.module.scss'

const AddVideoScreen = () => {
  const {
    register,
    videoId,
    errors,
    onSubmit,
  } = useAddVideoForm()

  const videoUrlErrorMessage = errors.videoUrl?.message
  const hasVideoUrlInputError = Boolean(videoUrlErrorMessage)

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={onSubmit}
      >
        <select {...register(`videoCategory`)}>
          {VIDEO_CATEGORIES.map(({ title, id }) => (
            <option
              value={id}
              key={id}
            >
              {title}
            </option>
          ))}
        </select>
        <label className={styles.label}>
          <input
            className={styles.input}
            type="text"
            placeholder="Insert the link to the video"
            {...register(`videoUrl`)}
          />
          {hasVideoUrlInputError && (
            <p className={styles.error}>{videoUrlErrorMessage}</p>
          )}
        </label>
        <button
          className={styles.button}
          type="submit"
          title="Upload video"
        >
          Upload
        </button>
      </form>

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