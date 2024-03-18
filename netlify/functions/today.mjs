const dateMath = require('date-arithmetic')
const ymd = require('year-month-day')
const pkgDownloads = require('../../src/utils/package')

export default async (req, context) => {
  const today = dateMath.subtract(new Date(), 1, 'day')
  const yesterday = dateMath.subtract(today, 1, 'day')
  const start = ymd(yesterday)
  const end = ymd(today)
  const dateRange = `${start.year}-${start.month}-${start.day}:${end.year}-${end.month}-${end.day}`
  console.info('date-range', dateRange)
  const result = await pkgDownloads(req.query.pkg, dateRange)
  console.info('result', result)
  return new Response(result)
}
