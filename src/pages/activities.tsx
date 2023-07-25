import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { useQuery } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { Link, Tile, ClickableTile, Heading, Section } from "@carbon/react"
import { Stack, Tag } from "carbon-components-react"
import { CalendarAdd } from "@carbon/icons-react"

import { GlobalRole } from "../../db"
import AddActivityForm from "../core/components/AddActivityForm"
import countActivities from "../core/queries/countActivities"
import getActivities from "../core/queries/getActivities"

import "@carbon/charts/styles.css"
import React from "react"

const Activities = () => {
  const [activities] = useQuery(getActivities, null)

  return (
    <Stack gap={5}>
      {activities.map((activity) => {
        return (
          <ClickableTile href={`/activity/${activity.id}`} key={activity.id}>
            {activity.title}
          </ClickableTile>
        )
      })}
    </Stack>
  )
}

const ActiviesPage: BlitzPage = () => {
  return (
    <Layout title="ActiviesPage">
      <main>
        <div className="cds--grid marginal">
          <Suspense fallback="Loading..">
            <Activities />
          </Suspense>
        </div>
      </main>
      <footer></footer>
    </Layout>
  )
}

export default ActiviesPage
