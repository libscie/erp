import { useMutation } from "@blitzjs/rpc"
import logout from "src/auth/mutations/logout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import {
  Button,
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderMenuItem,
  HeaderMenu,
  HeaderNavigation,
} from "carbon-components-react"
import Link from "next/link"
import { Suspense } from "react"

const LogInOut = () => {
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
      </>
    )
  } else {
    return (
      <>
        <Link href="api/auth/github">
          <Button>Login</Button>
        </Link>
      </>
    )
  }
}

const NavHeader = () => {
  return (
    <Header aria-label="LibScie Manager">
      <HeaderName href="#" prefix="LibScie">
        Manager
      </HeaderName>
      <HeaderNavigation aria-label="Navigation links">
        <HeaderMenu aria-label="Quick Links" menuLinkName="Quick Links">
          <HeaderMenuItem href="https://libscie.org">Blog</HeaderMenuItem>
          <HeaderMenuItem href="https://libscie.org/ghost">Blog editor</HeaderMenuItem>
          <HeaderMenuItem href="https://handbook.libscie.org/">Handbook</HeaderMenuItem>
        </HeaderMenu>
      </HeaderNavigation>
      <HeaderGlobalBar>
        <Suspense fallback="Loading...">
          <LogInOut />
        </Suspense>
      </HeaderGlobalBar>
    </Header>
  )
}

export default NavHeader
