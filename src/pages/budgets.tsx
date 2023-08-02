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
import getBudgets from "src/core/queries/getBudgets"

const Budgets = () => {
  const [budgets] = useQuery(getBudgets, null)

  return (
    <Stack gap={5}>
      {budgets.map((budget) => {
        return (
          <ClickableTile href={`/budget/${budget.id}`} key={budget.id}>
            {budget.title}
          </ClickableTile>
        )
      })}
    </Stack>
  )
}

const BudgetsPage: BlitzPage = () => {
  return (
    <Layout title="BudgetsPage">
      <main>
        <div className="cds--grid marginal">
          <Suspense fallback="Loading..">
            <Budgets />
          </Suspense>
        </div>
      </main>
    </Layout>
  )
}

export default BudgetsPage
