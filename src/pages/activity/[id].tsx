import { BlitzPage } from "@blitzjs/next"
import { gSSP } from "src/blitz-server"
import getActivity from "../../core/queries/getActivity"
import Layout from "src/core/layouts/Layout"

export const getServerSideProps = gSSP(async ({ params }) => {
  const activity = await getActivity(parseInt(params!.id as any), undefined as any)

  return { props: { activity } }
})

const ActivityViewer: BlitzPage = (activity) => {
  return (
    <Layout title="Home">
      <main>
        <div className="cds--grid marginal">
          <div className="cds--row">
            <div className="cds--col">
              <div className="outside">
                <div className="inside">
                  {/* <Suspense fallback="Loading...">
                    <AddActivity />
                  </Suspense> */}
                  {JSON.stringify(activity)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default ActivityViewer
