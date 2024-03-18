import dateMath from 'date-arithmetic'
import ymd from 'year-month-day'
import { delay, mapper } from '@kev_nz/async-tools'

const pkgDownloads = async (pkgName, range) => {
  const api = 'https://api.npmjs.org/downloads'
  const down = await fetch(`${api}/range/${range}/${pkgName}`)
  const data = await down.json()
  console.log('the download', data)
  return data
}

export default async req => {
  const params = new URL(req.url).searchParams
  const pkg = params.get('pkg')

  const backq = params.get('back')
  const back = parseInt(backq || '1', 10)
  const today = dateMath.subtract(new Date(), back, 'day')
  const lastMonth = dateMath.subtract(today, 2, 'month')
  const diff = dateMath.diff(lastMonth, today, 'day', false)
  console.info('Monthly Diff', diff)
  const holder = new Array(diff + 1).fill(0)
  const ranges = holder.map((v, index) => {
    const dt = ymd(dateMath.subtract(today, index, 'day'))

    return `${dt.year}-${dt.month}-${dt.day}`
  })

  const mappedRanges = ranges.map((d, i) => {
    if (i === ranges.length) return ''
    return `${d}:${d}`
  })
  // mappedRanges.pop()

  const start = ymd(lastMonth)
  const end = ymd(today)
  const dateRange = `${start.year}-${start.month}-${start.day}:${end.year}-${end.month}-${end.day}`
  const result = await pkgDownloads(pkg, dateRange)

  const monthlyResults = await mapper(
    mappedRanges.reverse(),
    async range => {
      const result = await pkgDownloads(pkg, range)
      await delay(110)

      return {
        downloads: result.downloads[0].downloads,
        start: result.downloads[0].day,
        end: result.downloads[0].day,
        package: pkg,
      }
    },
    10
  )
  const reduced = monthlyResults.reduce((accumulator, current) => {
    return accumulator + current.downloads
  }, 0)

  return new Response(
    JSON.stringify(
      {
        breakdown: monthlyResults,
        totals: result,
        addedUp: reduced,
      },
      {
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'public, max-age=600, must-revalidate', // Tell browsers to cache 10 minutes
          'Netlify-CDN-Cache-Control': 'public, max-age=86400, must-revalidate', // Tell Edge to cache asset for up to a day,
          'Cache-Tag': `${pkg},package-bimonthly-api-response`,
        },
      }
    )
  )
}
