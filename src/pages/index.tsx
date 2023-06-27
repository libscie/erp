import { Suspense } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { Button, Tile } from "@carbon/react"
import { GlobalRole } from "../../db"
import AddActivityForm from "../core/components/AddActivityForm"

const AddActivity = () => {
  const currentUser = useCurrentUser()

  if (currentUser?.role == ("ADMIN" as GlobalRole)) {
    return <AddActivityForm />
  } else {
    return <>You do not have sufficient permissions.</>
  }
}

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <main>
        <div className="cds--grid marginal">
          <div className="cds--row">
            <div className="cds--col">
              <div className="outside">
                <div className="inside">
                  <Suspense fallback="Loading...">
                    <AddActivity />
                  </Suspense>
                  {/* <Tile>Test</Tile> */}
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
