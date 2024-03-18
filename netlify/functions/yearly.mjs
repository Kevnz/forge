const r2 = require('r2')
// const { delay, mapper } = require('@kev_nz/async-tools')
// const dateMath = require('date-arithmetic')
// const ymd = require('year-month-day')

export default async (req, context) => {
  const { pkg } = req.query
  const results = await r2.get(
    `https://api.npmjs.org/downloads/range/last-year/${pkg}`
  ).json
  console.log('results', results)
  const breakdown = results.downloads.map(r => {
    return {
      downloads: r.downloads,
      start: r.day,
      end: r.day,
      package: pkg,
    }
  })

  const reduced = breakdown.reduce((accumulator, current) => {
    return accumulator + current.downloads
  }, 0)

  return new Response({
    breakdown,
    totals: {
      downloads: reduced,
      start: results.downloads[0].day,
      end: results.downloads[results.downloads.length - 1].day,
      package: pkg,
    },
    addedUp: reduced,
  })
}
