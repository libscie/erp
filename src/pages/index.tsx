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

const AddElement = ({ what, blurb }) => {
  return (
    <ClickableTile href={`/add/${what}`}>
      <Heading>Add {what}</Heading>
      <Section>{blurb}</Section>
    </ClickableTile>
  )
}

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <main>
        <div className="cds--grid marginal">
          <Stack gap={6}>
            <Stack
              gap={6}
              orientation="horizontal"
              style={{
                overflowX: "scroll",
                width: "100%",
              }}
            >
              <AddElement what="activity" blurb="Test" />
              <Suspense fallback="Loading..">
                <CountsActivities />
              </Suspense>
            </Stack>
            {/* <AddElement what="budget" blurb="Test" /> */}
            {/* <AddElement what="service" blurb="Test" /> */}
            <AddElement what="document" blurb="Test" />
          </Stack>
        </div>
      </main>
    </Layout>
  )
}

export default Home
