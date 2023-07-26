import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { BlitzPage } from "@blitzjs/next"
import { GlobalRole } from "../../../db"
import AddDocumentForm from "../../core/components/AddDocumentForm"

import "@carbon/charts/styles.css"
import React from "react"

const AddDocument = () => {
  const currentUser = useCurrentUser()

  if (currentUser?.role == ("ADMIN" as GlobalRole)) {
    return <AddDocumentForm />
  } else {
    return <>You do not have sufficient permissions.</>
  }
}

const AddDocumentPage: BlitzPage = () => {
  return (
    <Layout title="AddDocumentPage">
      <div className="cds--grid marginal">
        <div className="cds--row">
          <div className="cds--col">
            <div className="outside">
              <div className="inside">
                <Suspense fallback="Loading...">
                  <AddDocument />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AddDocumentPage
