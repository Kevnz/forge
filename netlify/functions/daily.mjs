import dateMath from 'date-arithmetic'
import ymd from 'year-month-day'

const pkgDownloads = async (pkgName, range) => {
  const api = 'https://api.npmjs.org/downloads'
  const down = await fetch(`${api}/range/${range}/${pkgName}`)
  const data = await down.json()
  console.log('the download', data)
  return data
}

export default async (req, context) => {
  const params = new URL(req.url).searchParams
  const pkg = params.get('pkg')

  const backq = params.get('back')
  const back = parseInt(backq || '1', 10)

  const today = dateMath.subtract(new Date(), back, 'day')

  const end = ymd(today)
  const dateRange = `${end.year}-${end.month}-${end.day}:${end.year}-${end.month}-${end.day}`

  const result = await pkgDownloads(pkg, dateRange)

  return new Response(JSON.stringify(result), {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'public, max-age=600, must-revalidate', // Tell browsers to cache 10 minutes
      'Netlify-CDN-Cache-Control': 'public, max-age=86400, must-revalidate', // Tell Edge to cache asset for up to a day,
      'Cache-Tag': `${pkg},package-daily-api-response`,
    },
  })
}
