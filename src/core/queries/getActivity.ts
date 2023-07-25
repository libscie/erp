import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(async (id: number) => {
  const activities = await db.activity.findFirstOrThrow({
    where: {
      id,
    },
  })

  console.log(activities)
  return activities
})
