import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Ctx, NotFoundError } from "blitz"

interface Images {
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
}

export default resolver.pipe(
  resolver.authorize(),
  async ({ title, description, startDate, endDate, location }: Images, ctx: Ctx) => {
    await db.activity.create({
      data: {
        title,
        description,
        startDate,
        endDate,
        location,
      },
    })

    return true
  }
)
