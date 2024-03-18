const dateMath = require('date-arithmetic')
const ymd = require('year-month-day')
const { delay, mapper } = require('@kev_nz/async-tools')
const pkgDownloads = require('../../src/utils/package')

export default async req => {
  const today = dateMath.subtract(new Date(), 1, 'day')
  const holder = new Array(8).fill(0)
  const ranges = holder.map((v, index) => {
    const dt = ymd(dateMath.subtract(today, index, 'day'))

    return `${dt.year}-${dt.month}-${dt.day}`
  })

  const mappedRanges = ranges.map((d, i) => {
    if (i === ranges.length) return ''
    return `${ranges[i + 1]}:${d}`
  })
  mappedRanges.pop()

  const lastWeek = dateMath.subtract(today, 1, 'week')
  const start = ymd(lastWeek)
  const end = ymd(today)
  const dateRange = `${start.year}-${start.month}-${start.day}:${end.year}-${end.month}-${end.day}`
  const result = await pkgDownloads(r.query.pkg, dateRange)

  const weeklyResults = await mapper(mappedRanges.reverse(), async range => {
    const result = await pkgDownloads(r.query.pkg, range)
    await delay(100)
    return {
      downloads: result.downloads[0].downloads,
      start: result.downloads[0].day,
      end: result.downloads[0].day,
      package: req.query.pkg,
    }
  })

  return new Response({ breakdown: weeklyResults, totals: result })
}
