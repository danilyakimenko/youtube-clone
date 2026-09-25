import Link from 'next/link'

export default async function LoginPage() {
  try {

    return (
      <div>
        Login Page
        <Link
          href="/auth/register"
          title="Create account"
        >
          Create account
        </Link>
      </div>
    )
  }
  catch (error) {
    console.error(error)

    return <div>Something went wrong </div>
  }
}
