import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Ctx, NotFoundError } from "blitz"

interface Activity {
  id: number
  description: string
}

export default resolver.pipe(
  resolver.authorize(),
  async ({ id, description }: Activity, ctx: Ctx) => {
    await db.activity.update({
      where: {
        id,
      },
      data: {
        description,
      },
    })

    return true
  }
)
