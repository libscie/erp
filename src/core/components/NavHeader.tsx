import { useMutation } from "@blitzjs/rpc"
import logout from "src/auth/mutations/logout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import {
  Button,
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
  SwitcherItem,
  SwitcherDivider,
  HeaderMenuItem,
  HeaderMenu,
  HeaderNavigation,
} from "@carbon/react"
import Link from "next/link"
import { Suspense, useState } from "react"
import { Search, Notification, Switcher } from "@carbon/react/icons"

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
  const [notifications, openNotifications] = useState(false)

  return (
    <Header aria-label="LibScie Manager">
      <HeaderName href="#" prefix="LibScie">
        Manager
      </HeaderName>
      <HeaderNavigation aria-label="IBM [Platform]">
        <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
        <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
        <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
        <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
          <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
          <HeaderMenuItem isActive href="#">
            Sub-link 2
          </HeaderMenuItem>
          <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
        </HeaderMenu>
      </HeaderNavigation>
      <HeaderGlobalBar>
        <Suspense fallback="Loading...">
          <LogInOut />
        </Suspense>
        <HeaderGlobalAction
          aria-label="Search"
          onClick={() => {
            alert("search click")
          }}
        >
          <Search size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="Notifications"
          isActive={notifications}
          onClick={() => {
            openNotifications(!notifications)
          }}
        >
          <Notification size={20} />
          {/* <HeaderPanel
              expanded={notifications}
              onHeaderPanelFocus={notifications}
              href="#switcher-button"
            >
              <SwitcherItem aria-label="Link 1" href="#">
                Link 1
              </SwitcherItem>
              <SwitcherDivider />
              <SwitcherItem href="#" aria-label="Link 2">
                Link 2
              </SwitcherItem>
              <SwitcherItem href="#" aria-label="Link 3">
                Link 3
              </SwitcherItem>
              <SwitcherItem href="#" aria-label="Link 4">
                Link 4
              </SwitcherItem>
              <SwitcherItem href="#" aria-label="Link 5">
                Link 5
              </SwitcherItem>
              <SwitcherDivider />
              <SwitcherItem href="#" aria-label="Link 6">
                Link 6
              </SwitcherItem>
            </HeaderPanel> */}
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="App Switcher"
          onClick={() => {
            alert("app-switcher click")
          }}
          tooltipAlignment="end"
        >
          <Switcher size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  )
}

export default NavHeader
