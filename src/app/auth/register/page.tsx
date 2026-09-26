import { RegisterScreen } from '@/screen/RegisterScreen'

export default async function RegisterPage() {
  try {

    return (
      <RegisterScreen />
    )
  }
  catch (error) {
    console.error(error)

    return <div>Something went wrong </div>
  }
}
