import { Suspense } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { Button, Tile } from "@carbon/react"
import { GlobalRole } from "../../db"

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
        <Suspense fallback="Loading...">
          <AddActivity />
        </Suspense>

        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col">
              <div className="outside">
                <div className="inside">
                  <Tile>Test</Tile>
                </div>
              </div>
            </div>
            <div className="cds--col">
              <div className="outside">
                <div className="inside">
                  {" "}
                  <Tile>Test</Tile>
                </div>
              </div>
            </div>
            <div className="cds--col">
              <div className="outside">
                <div className="inside">
                  {" "}
                  <Tile>Test</Tile>
                </div>
              </div>
            </div>
            <div className="cds--col">
              <div className="outside">
                <div className="inside">
                  {" "}
                  <Tile>Test</Tile>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </Layout>
  )
}

export default Home
