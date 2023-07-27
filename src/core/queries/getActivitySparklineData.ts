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
  const activities = await db.activity.findMany({
    orderBy: [
      {
        startDate: "asc",
      },
    ],
  })

  let allDates: Array<any> = activities.map((module) => {
    if (module.endDate) {
      return getDates(module.startDate, module.endDate)
    }
    return module.startDate.toISOString().substr(0, 10)
  })
  allDates = allDates.reduce((elem1, elem2) => elem1.concat(elem2))

  let data: Array<object> = []
  const uniqDates = allDates.filter(onlyUnique)
  console.log(uniqDates)
  console.log(uniqDates.length)
  uniqDates.forEach((date, index) => {
    const epochTime = new Date(date)
    data.push({
      group: "Activities",
      date: epochTime.getTime(),
      value: itemCounter(allDates, date),
    })
  })

  return true
}
