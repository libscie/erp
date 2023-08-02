import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { useQuery } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { ClickableTile } from "@carbon/react"
import { Stack } from "carbon-components-react"

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
    </Layout>
  )
}

export default ActiviesPage
