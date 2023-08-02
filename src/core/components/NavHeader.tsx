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
        <Link href="/api/auth/github">
          <Button>Login</Button>
        </Link>
      </>
    )
  }
}

const NavHeader = () => {
  return (
    <Header aria-label="LibScie Manager">
      <HeaderName href="/" prefix="LibScie">
        Manager
      </HeaderName>
      <HeaderNavigation aria-label="Navigation links">
        <HeaderMenu aria-label="Quick Links" menuLinkName="Links">
          <HeaderMenuItem href="https://libscie.org">Blog</HeaderMenuItem>
          <HeaderMenuItem href="https://libscie.org/ghost">Blog editor</HeaderMenuItem>
          <HeaderMenuItem href="https://handbook.libscie.org/">Handbook</HeaderMenuItem>
        </HeaderMenu>
        <HeaderMenu aria-label="Add things to the Manager" menuLinkName="Add">
          <HeaderMenuItem href="/add/activity">Activity</HeaderMenuItem>
          <HeaderMenuItem href="/add/budget">Budget</HeaderMenuItem>
          <HeaderMenuItem href="/add/document">Document</HeaderMenuItem>
          <HeaderMenuItem href="/add/transactions">Transactions</HeaderMenuItem>
        </HeaderMenu>
        <HeaderMenu aria-label="View categories in the manager" menuLinkName="View">
          <HeaderMenuItem href="/activities">Activities</HeaderMenuItem>
          <HeaderMenuItem href="/budgets">Budgets</HeaderMenuItem>
          <HeaderMenuItem href="/documents">Documents</HeaderMenuItem>
          <HeaderMenuItem href="/transactions">Transactions</HeaderMenuItem>
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
