import Link from 'next/link'

export default async function RegisterPage() {
  try {

    return (
      <div>
        Register Page
        <Link
          href="/auth/login"
          title="Sign in"
        >
          Sign in
        </Link>
      </div>
    )
  }
  catch (error) {
    console.error(error)

    return <div>Something went wrong </div>
  }
}
