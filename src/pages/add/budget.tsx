import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { BlitzPage } from "@blitzjs/next"
import { GlobalRole } from "../../../db"
import AddActivityForm from "../../core/components/AddActivityForm"
import AddBudgetForm from "../../core/components/AddBudgetForm"

import "@carbon/charts/styles.css"
import React from "react"

const AddActivity = () => {
  const currentUser = useCurrentUser()

  if (currentUser?.role == ("ADMIN" as GlobalRole)) {
    return <AddBudgetForm />
  } else {
    return <>You do not have sufficient permissions.</>
  }
}

const AddBudgetPage: BlitzPage = () => {
  return (
    <Layout title="AddBudgetPage">
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
        </div>
      </div>
    </Layout>
  )
}

export default AddBudgetPage
