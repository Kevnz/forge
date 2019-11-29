const config = {
  root: './dist',
  port: 8080,
  filename: 'index.html',
}

const cling = require('static-cling')

cling(config)
