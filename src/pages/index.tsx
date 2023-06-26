import { Suspense } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { GlobalRole } from "../../db"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href="api/auth/github">
          <strong>Login</strong>
        </Link>
      </>
    )
  }
}

const AddActivity = () => {
  const currentUser = useCurrentUser()

  if (currentUser?.role == ("USER" as GlobalRole)) {
    return <></>
  } else {
    return <>You do not have sufficient permissions.</>
  }
}

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <main>
        <nav>
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </nav>
        <div>
          <div>
            <h1>Everything in one place.</h1>
            <Suspense fallback="Loading...">
              <AddActivity />
            </Suspense>
          </div>
        </div>
      </main>
      <footer></footer>
    </Layout>
  )
}

export default Home
