import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Ctx, NotFoundError } from "blitz"

interface Activity {
  title: string
  description: object
  startDate: string
  endDate: string
  location: string
}

export default resolver.pipe(
  resolver.authorize(),
  async ({ title, description, startDate, endDate, location }: Activity, ctx: Ctx) => {
    await db.activity.create({
      data: {
        title,
        description,
        startDate,
        endDate,
        location,
        authors: {
          connect: {
            id: ctx.session.$publicData.userId as any,
          },
        },
      },
    })

    return true
  }
)
