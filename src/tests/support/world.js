const { setWorldConstructor } = require('cucumber')

const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')

const expect = require('expect-puppeteer')
// expect.extend({ toMatchImageSnapshot })

const scope = require('./scope')

const World = function({ attach, parameters }) {
  this.attach = attach
  this.parameters = parameters
  scope.driver = puppeteer
  scope.host = 'http://localhost:8080'
  scope.context = {}
  scope.expect = expect
}

setWorldConstructor(World)
