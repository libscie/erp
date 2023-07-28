import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Ctx, NotFoundError } from "blitz"
import { Decimal } from "@prisma/client/runtime"

interface Activity {
  title: string
  startDate: string
  endDate: string
  lineItems: Array<string>
  lineValues: Array<string>
  lineEmissions: Array<string>
  parentId?: number
}

export default resolver.pipe(
  resolver.authorize(),
  async (
    { title, startDate, endDate, lineItems, lineValues, lineEmissions, parentId }: Activity,
    ctx: Ctx
  ) => {
    if (parentId) {
      await db.budget.create({
        data: {
          title,
          startDate,
          endDate,
          lineItems,
          lineValues,
          lineEmissions,
          authors: {
            connect: {
              id: ctx.session.$publicData.userId as any,
            },
          },
          parents: {
            connect: {
              id: parentId,
            },
          },
        },
      })
    } else {
      await db.budget.create({
        data: {
          title,
          startDate,
          endDate,
          lineItems,
          lineValues,
          lineEmissions,
          authors: {
            connect: {
              id: ctx.session.$publicData.userId as any,
            },
          },
        },
      })
    }

    return true
  }
)
