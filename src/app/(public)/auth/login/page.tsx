import { LoginScreen } from '@/screen/LoginScreen'

export default async function LoginPage() {
  try {

    return (
      <LoginScreen />
    )
  }
  catch (error) {
    console.error(error)

    return <div>Something went wrong </div>
  }
}
