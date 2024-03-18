export default async (req, context) => {
  const params = new URL(req.url).searchParams
  const pkg = params.get('pkg')
  const gotten = await fetch(`https://registry.npmjs.org/${pkg}`, {
    credentials: 'include',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:70.0) Gecko/20100101 Firefox/70.0',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Upgrade-Insecure-Requests': '1',
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache',
    },
    method: 'GET',
    mode: 'cors',
  })

  const results = await gotten.json()
  return new Response(JSON.stringify(results), {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'public, max-age=600, must-revalidate', // Tell browsers to cache 10 minutes
      'Netlify-CDN-Cache-Control': 'public, max-age=86400, must-revalidate', // Tell Edge to cache asset for up to a day,
      'Cache-Tag': `${pkg},package-details-api-response`,
    },
  })
  // return new Response(JSON.stringify(results))
}
