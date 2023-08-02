import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(async () => {
  const activities = await db.budget.findMany({})

  return activities
})
