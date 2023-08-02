import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { useQuery } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { ClickableTile, Heading, Section, Tab, TabList, Tile } from "@carbon/react"
import { Stack } from "carbon-components-react"
import countActivities from "../core/queries/countActivities"
import React from "react"
import { AreaChart, DonutChart, GaugeChart, LineChart } from "@carbon/charts-react"
import getActivitySparklineData from "../core/queries/getActivitySparklineData"
import { gSSP } from "src/blitz-server"
import { activityOpts } from "../core/opts"

import "@carbon/charts/styles.css"
import getBudgetTotals from "src/core/queries/getBudgetTotals"

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

const BudgetTotals = () => {
  const [budgetTotal] = useQuery(getBudgetTotals, undefined)

  return (
    <ClickableTile href={`/budgets`}>
      <Heading>Budgeted</Heading>
      <Section>€{budgetTotal.budgets._sum.totalValue}</Section>
      <Section>{budgetTotal.budgets._sum.totalEmissions} kg CO2</Section>
    </ClickableTile>
  )
}

export const getServerSideProps = gSSP(async () => {
  const { activityData: activity } = await getActivitySparklineData()

  return { props: { activity } }
})

const Home: BlitzPage = (activity, transactions) => {
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
              {/* <Suspense fallback="Loading..">
                <CountsActivities />
              </Suspense> */}
              <Tile style={{ background: "#fff" }}>
                <Suspense fallback={<LineChart data={[]} options={{}}></LineChart>}>
                  <AreaChart data={activity["activity"]} options={activityOpts}></AreaChart>
                </Suspense>
              </Tile>
            </Stack>
            <Stack orientation="horizontal">
              <Suspense fallback="Loading...">
                <BudgetTotals />
              </Suspense>
              {/* <DonutChart data={data} options={opts}></DonutChart>
              <DonutChart data={data} options={opts}></DonutChart> */}
              {/* <GaugeChart data={gaugeData} options={gaugeOpts}></GaugeChart> */}
            </Stack>
          </Stack>
        </div>
      </main>
    </Layout>
  )
}

export default Home

const opts = {
  title: "Donut",
  resizable: true,
  donut: {
    center: {
      label: "Browsers",
    },
    alignment: "center",
  },
  height: "400px",
}

const data = [
  {
    group: "2V2N 9KYPM version 1",
    value: 20000,
  },
  {
    group: "L22I P66EP L22I P66EP L22I P66EP",
    value: 65000,
  },
  {
    group: "JQAI 2M4L1",
    value: 75000,
  },
  {
    group: "J9DZ F37AP",
    value: 1200,
  },
  {
    group: "YEL48 Q6XK YEL48",
    value: 10000,
  },
  {
    group: "Misc",
    value: -25000,
  },
]

const gaugeData = [
  {
    group: "value",
    value: 42,
  },
  {
    group: "delta",
    value: -13.37,
  },
]

const gaugeOpts = {
  title: "Gauge semicircular -- danger status",
  resizable: true,
  height: "250px",
  width: "100%",
  gauge: {
    type: "semi",
    status: "danger",
  },
}
