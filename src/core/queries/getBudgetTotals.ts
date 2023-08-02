import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(async () => {
  const budgets = await db.budget.aggregate({
    _sum: {
      totalValue: true,
      totalEmissions: true,
    },
    where: {
      startDate: {
        lte: new Date("2024-01-01").toISOString(),
        gte: new Date("2022-12-31").toISOString(),
      },
    },
  })

  return { budgets }
})
