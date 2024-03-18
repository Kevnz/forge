import r2 from 'r2'
// const { delay, mapper } = require('@kev_nz/async-tools')
// const dateMath = require('date-arithmetic')
// const ymd = require('year-month-day')

export default async (req, context) => {
  const params = new URL(req.url).searchParams
  const pkg = params.get('pkg')
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

  return new Response(
    JSON.stringify(
      {
        breakdown,
        totals: {
          downloads: reduced,
          start: results.downloads[0].day,
          end: results.downloads[results.downloads.length - 1].day,
          package: pkg,
        },
        addedUp: reduced,
      },
      {
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'public, max-age=600, must-revalidate', // Tell browsers to cache 10 minutes
          'Netlify-CDN-Cache-Control': 'public, max-age=86400, must-revalidate', // Tell Edge to cache asset for up to a day,
          'Cache-Tag': `${pkg},package-yearly-api-response`,
        },
      }
    )
  )
}
