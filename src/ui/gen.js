import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './core/app'

ReactDOMServer.renderToString(<App />)
