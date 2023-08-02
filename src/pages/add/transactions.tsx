import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { BlitzPage } from "@blitzjs/next"
import { GlobalRole } from "../../../db"

import "@carbon/charts/styles.css"
import React from "react"
import AddTransactionsForm from "src/core/components/AddTransactionsForm"

const AddTransactions = () => {
  const currentUser = useCurrentUser()

  if (currentUser?.role == ("ADMIN" as GlobalRole)) {
    return <AddTransactionsForm />
  } else {
    return <>You do not have sufficient permissions.</>
  }
}

const AddTransactionsPage: BlitzPage = () => {
  return (
    <Layout title="AddTransactionsPage">
      <div className="cds--grid marginal">
        <div className="cds--row">
          <div className="cds--col">
            <div className="outside">
              <div className="inside">
                <Suspense fallback="Loading...">
                  <AddTransactions />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AddTransactionsPage
