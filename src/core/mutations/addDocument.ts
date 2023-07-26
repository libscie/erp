import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Ctx, NotFoundError } from "blitz"

interface Document {
  title: string
  contents: object
}

export default resolver.pipe(
  resolver.authorize(),
  async ({ title, contents }: Document, ctx: Ctx) => {
    await db.document.create({
      data: {
        title,
        contents,
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
