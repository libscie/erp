import { BlitzPage } from "@blitzjs/next"
import { gSSP } from "src/blitz-server"
import { Tag } from "carbon-components-react"

import getActivity from "../../core/queries/getActivity"
import Layout from "src/core/layouts/Layout"
import Editor from "../../core/lexical/Editor"
import { useEffect, useState } from "react"
import { Button, DatePicker, Heading, Section } from "@carbon/react"
import updateActivity from "../../core/mutations/updateActivity"
import { useMutation } from "@blitzjs/rpc"

export const getServerSideProps = gSSP(async ({ params }) => {
  const activity = await getActivity(parseInt(params!.id as any), undefined as any)

  return { props: { activity } }
})

const ActivityViewer: BlitzPage = (activity) => {
  const [description, setDescription] = useState(
    `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"dfsafsdf","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`
  )
  const [updateActivityMutation] = useMutation(updateActivity)

  // useEffect(() => {
  //   setDescription(JSON.stringify(activity["activity"]["description"]))
  // }, [])
  console.log(activity["activity"])
  return (
    <Layout title="Home">
      <main>
        <div className="cds--grid marginal">
          <div className="cds--row">
            <div className="cds--col">
              <div className="outside">
                <div className="inside">
                  <Heading>{activity["activity"]["title"]}</Heading>
                  <Tag>{activity["activity"]["startDate"]}</Tag>
                  <Tag>{activity["activity"]["endDate"]}</Tag>
                </div>
              </div>
            </div>
            <div className="cds--col">
              <Editor
                onChange={(editorState) => {
                  setDescription(JSON.stringify(editorState))
                }}
                // state={description}
              />
            </div>
          </div>
          {/* <Button
            // disabled
            onClick={async () => {
              await updateActivityMutation({
                id: activity["activity"]["id"],
                description: description,
              })
            }}
          >
            Update
          </Button> */}
        </div>
      </main>
    </Layout>
  )
}

ActivityViewer.authenticate = { redirectTo: "/", role: ["ADMIN"] }

export default ActivityViewer
