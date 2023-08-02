import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Ctx, NotFoundError } from "blitz"
import { Decimal } from "@prisma/client/runtime"

interface Budget {
  title: string
  startDate: string
  endDate: string
  lineItems: Array<string>
  lineValues: Array<string>
  lineEmissions: Array<string>
  totalValue: number
  totalEmissions: number
  parentId?: number
}

export default resolver.pipe(
  resolver.authorize(),
  async (
    {
      title,
      startDate,
      endDate,
      lineItems,
      lineValues,
      lineEmissions,
      totalValue,
      totalEmissions,
      parentId,
    }: Budget,
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
          totalValue,
          totalEmissions,
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
          totalValue,
          totalEmissions,
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
