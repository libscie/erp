import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { useQuery } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { ClickableTile, Heading, Section, Tile } from "@carbon/react"
import { Stack } from "carbon-components-react"
import countActivities from "../core/queries/countActivities"
import React from "react"
import { AreaChart, LineChart } from "@carbon/charts-react"
import getActivitySparklineData from "../core/queries/getActivitySparklineData"
import { gSSP } from "src/blitz-server"
import { activityOpts } from "../core/opts"

import "@carbon/charts/styles.css"

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

export const getServerSideProps = gSSP(async () => {
  const activity = await getActivitySparklineData()

  return { props: { activity } }
})

const Home: BlitzPage = (activity) => {
  console.log(activity)
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
              <Tile style={{ background: "#fff" }}>
                <Suspense fallback={<LineChart data={[]} options={{}}></LineChart>}>
                  <AreaChart data={activity["activity"]} options={activityOpts}></AreaChart>
                </Suspense>
              </Tile>
            </Stack>
            <AddElement what="document" blurb="Test" />
          </Stack>
        </div>
      </main>
    </Layout>
  )
}

export default Home
