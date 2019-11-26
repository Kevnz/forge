// Dependencies
const assert = require('assert')

const pages = require('./pages')

const scope = require('./scope')

// Defines whether puppeteer runs Chrome in headless mode.
const headless = true
const slowMo = 5

// Chrome is set to run headlessly and with no slowdown in CircleCI
// if (process.env.CIRCLECI) headless = true
// if (process.env.CIRCLECI) slowMo = 0

const goToPage = async page => {
  if (!scope.browser) {
    scope.browser = await scope.driver.launch({ headless, slowMo })
  }

  scope.context.currentPage = await scope.browser.newPage()
  scope.context.currentPage.setViewport({ width: 1280, height: 1024 })
  const url = scope.host + pages.home
  return scope.context.currentPage.goto(url, {
    waitUntil: 'networkidle2',
  })
}

const hasTitle = async text => {
  const selector = 'h1.title'
  const page = scope.context.currentPage
  const title = await page.$eval(selector, el => el.innerHTML)
  assert(title === text)
}

const clickLink = async text => {
  console.log('text of link', text)
  const page = scope.context.currentPage
  return scope.expect(page).toClick('a', { text: text })
}

const fillOutForm = async () => {
  const page = scope.context.currentPage
  await scope.expect(page).toFillForm('form', {
    userName: 'user',
    userEmail: 'user@example.net',
    message: 'hi there dude',
  })
}

const hasText = async text => {
  const page = scope.context.currentPage
  return scope.expect(page).toMatch(text)
}

const clickButton = async text => {
  const page = scope.context.currentPage
  return scope.expect(page).toClick('button', { text: text })
}

module.exports = {
  clickButton,
  clickLink,
  fillOutForm,
  goToPage,
  hasText,
  hasTitle,
}
