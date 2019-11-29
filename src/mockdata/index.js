const fs = require('fs')
const http = require('http')
const qs = require('qs')
const port = 3000
const getDuration = url => {
  if (url.indexOf('daily') > -1) return 'daily'
  if (url.indexOf('weekly') > -1) return 'weekly'
  if (url.indexOf('monthly') > -1) return 'monthly'
  if (url.indexOf('yearly') > -1) return 'yearly'
  return 'yearly'
}
const requestHandler = (request, response) => {
  console.log(request.method)

  if (request.method === 'OPTIONS') {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    response.setHeader('Connection', 'keep-alive')
    response.setHeader(
      'Access-Control-Allow-Headers',
      'Accept,Authorization,Content-Type,If-None-Match,x-kpi-server,content-type,schema,page,total'
    )
    response.setHeader('Access-Control-Max-Age', '86400')
    response.setHeader(
      'Access-Control-Expose-Headers',
      'WWW-Authenticate,Server-Authorization'
    )
    response.setHeader('Cache-Control', 'no-cache')

    return response.end('OK')
  }
  const qstring = request.url.split('?')[1]

  const query = qs.parse(qstring)

  const pkgName = query.pkg
    .replace('@', '')
    .replace('/', '-')
    .replace('.', '-')

  const duration = getDuration(request.url.split('?')[0])

  const data = fs.readFileSync(`./src/mockdata/${duration}/${pkgName}.json`)
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Content-Type', 'application/json; charset=utf-8')

  response.end(data)
}

const server = http.createServer(requestHandler)

server.listen(port, err => {
  if (err) {
    return console.error('something bad happened', err)
  }

  console.info(`server is listening on ${port}`)
})
