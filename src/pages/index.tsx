import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { useQuery } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { Tile } from "@carbon/react"
import { GlobalRole } from "../../db"
import AddActivityForm from "../core/components/AddActivityForm"
import countActivities from "../core/queries/countActivities"
import Editor from "../core/lexical/Editor"

import "@carbon/charts/styles.css"
import React from "react"

const AddActivity = () => {
  const currentUser = useCurrentUser()

  if (currentUser?.role == ("ADMIN" as GlobalRole)) {
    return <AddActivityForm />
  } else {
    return <>You do not have sufficient permissions.</>
  }
}

const CountsActivities = () => {
  const [act] = useQuery(countActivities, null)

  return <Tile>Activities added: {act}</Tile>
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
                </div>
              </div>
            </div>
            <div className="cds--col">
              <div className="outside">
                <div className="inside">
                  <Suspense fallback="Loading..">
                    <CountsActivities />
                  </Suspense>
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
