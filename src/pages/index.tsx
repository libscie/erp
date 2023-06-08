import { Suspense, useState } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"

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
        <Link href={Routes.SignupPage()}>
          <strong>Sign Up</strong>
        </Link>
        <Link href="api/auth/github">
          <strong>Login</strong>
        </Link>
      </>
    )
  }
}

const AddActivity = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return <>TEST</>
  } else {
    return <>Please log in to add activities.</>
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
