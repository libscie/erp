import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Ctx, NotFoundError } from "blitz"

export default resolver.pipe(resolver.authorize(), async (transactions, ctx: Ctx) => {
  await db.transaction.createMany({
    data: transactions as any,
  })

  return true
})
