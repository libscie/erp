import { resolver } from "@blitzjs/rpc"
import db from "db"

const itemCounter = (array, item) =>
  array.flat(Infinity).filter((currentItem) => currentItem == item).length

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}

function addDay(currentDate: Date) {
  var date = new Date(currentDate.valueOf())
  date.setDate(date.getDate() + 1)
  return date
}

function getDates(startDate: Date, stopDate: Date) {
  var dateArray: Array<string> = new Array()
  var currentDate = startDate
  while (currentDate <= stopDate) {
    const x = new Date(currentDate)
    dateArray.push(currentDate.toISOString().substr(0, 10))
    currentDate = addDay(currentDate)
  }
  return dateArray
}

export default async function getActivitySparklineData() {
  let dateSelect = new Date()
  dateSelect.setMonth(dateSelect.getMonth() - 12)
  const activities = await db.activity.findMany({
    where: {
      startDate: {
        gte: dateSelect,
      },
    },
    orderBy: [
      {
        startDate: "asc",
      },
    ],
  })

  let activityData: Array<object> = []

  if (activities.length > 0) {
    let allDates: Array<any> = activities.map((module) => {
      if (module.endDate) {
        return getDates(module.startDate, module.endDate)
      }
      return module.startDate.toISOString().substr(0, 10)
    })
    allDates = allDates.reduce((elem1, elem2) => elem1.concat(elem2))

    const uniqDates = allDates.filter(onlyUnique)
    uniqDates.forEach((date, index) => {
      const epochTime = new Date(date)
      activityData.push({
        group: "Activities",
        date: epochTime.getTime(),
        value: itemCounter(allDates, date),
      })
    })
  }

  // transactions

  const transactionsCredit = await db.transaction.findMany({
    where: {
      transactionDate: {
        gte: dateSelect,
      },
      account: "CREDIT",
    },
    orderBy: [
      {
        transactionDate: "asc",
      },
    ],
  })
  if (transactionsCredit.length > 0) {
    let allDates: Array<any> = transactionsCredit.map((module) => {
      return module.transactionDate!.toISOString().substr(0, 10)
    })

    const uniqDatesTrans = allDates.filter(onlyUnique)
    uniqDatesTrans.forEach((date, index) => {
      const epochTime = new Date(date)
      activityData.push({
        group: "transactionsCredit",
        date: epochTime.getTime(),
        value: itemCounter(allDates, date),
      })
    })
  }
  const transactionsDebit = await db.transaction.findMany({
    where: {
      transactionDate: {
        gte: dateSelect,
      },
      account: "DEBIT",
    },
    orderBy: [
      {
        transactionDate: "asc",
      },
    ],
  })
  if (transactionsDebit.length > 0) {
    let allDates: Array<any> = transactionsDebit.map((module) => {
      return module.transactionDate!.toISOString().substr(0, 10)
    })

    const uniqDatesTrans = allDates.filter(onlyUnique)
    uniqDatesTrans.forEach((date, index) => {
      const epochTime = new Date(date)
      activityData.push({
        group: "transactionsDebit",
        date: epochTime.getTime(),
        value: itemCounter(allDates, date),
      })
    })
  }

  return { activityData }
}
