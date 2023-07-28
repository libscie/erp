import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(async () => {
  const budgets = await db.budget.findMany({})
  let res = [{ id: undefined as undefined | string, text: "" }]

  budgets.map((budget) => {
    res.push({ id: budget.id.toString(), text: budget.title })
  })

  return res
})
