import { useMutation } from "@blitzjs/rpc"
import logout from "src/auth/mutations/logout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { Button, Header } from "@carbon/react"
import Link from "next/link"
import { Suspense } from "react"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Button
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
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

const NavHeader = () => {
  return (
    <>
      <Header>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </Header>
    </>
  )
}

export default NavHeader
