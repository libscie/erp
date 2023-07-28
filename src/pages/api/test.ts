import db from "db"
import { NextApiRequest, NextApiResponse } from "next"
import { api } from "../../blitz-server"

const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  const budgets = await db.budget.aggregate({
    _sum: {
      lineValues: true,
    },
  })
  console.log(budgets)
  res.statusCode = 200
  // res.setHeader("Content-Type", currentModule?.main!["mimeType"])
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(budgets))
}

export default api(webhook)
