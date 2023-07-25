import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { useQuery } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { ClickableTile, Heading, Section } from "@carbon/react"
import { Stack } from "carbon-components-react"
import countActivities from "../core/queries/countActivities"

import "@carbon/charts/styles.css"
import React from "react"

const CountsActivities = () => {
  const [act] = useQuery(countActivities, null)

  return <ClickableTile href="/activities">Activities added: {act}</ClickableTile>
}

const AddActivity = () => {
  return (
    <ClickableTile href="/add/activity">
      <Heading>Add activity</Heading>
      <Section>Track a recent, future, or past event in our logbook.</Section>
    </ClickableTile>
  )
}

const AddBudget = () => {
  return (
    <ClickableTile href="/add/budget">
      <Heading>Create budget</Heading>
      <Section>Submit a budget for approval.</Section>
    </ClickableTile>
  )
}

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <main>
        <div className="cds--grid marginal">
          <Stack
            gap={6}
            orientation="horizontal"
            style={{
              overflowX: "scroll",
              width: "100%",
            }}
          >
            <AddActivity />
            <Suspense fallback="Loading..">
              <CountsActivities />
            </Suspense>
            <AddBudget />
          </Stack>
        </div>
      </main>
    </Layout>
  )
}

export default Home
