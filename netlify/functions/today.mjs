const dateMath = require('date-arithmetic')
const ymd = require('year-month-day')
const pkgDownloads = async (pkgName, range) => {
  const api = 'https://api.npmjs.org/downloads'
  const down = await fetch(`${api}/range/${range}/${pkgName}`)
  const data = await down.json()
  console.log('the download', data)
  return data
}

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
