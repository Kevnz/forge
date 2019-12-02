// Dependencies
const assert = require('assert')
const readlineSync = require('readline-sync')
const fs = require('fs-extra')
const equal = require('image-equal')
const pixels = require('image-pixels')
const output = require('image-output')
const pages = require('./pages')

const scope = require('./scope')

// Defines whether puppeteer runs Chrome in headless mode.
let headless = true
let slowMo = 15

// Chrome is set to run headlessly and with no slowdown in CircleCI
if (process.env.CIRCLECI) headless = true
if (process.env.CIRCLECI) slowMo = 0

const goToPage = async page => {
  if (!scope.browser) {
    scope.browser = await scope.driver.launch({ headless, slowMo })
  }

  scope.context.currentPage = await scope.browser.newPage()
  scope.context.currentPage.setViewport({ width: 1280, height: 1024 })
  const url = scope.host + pages[page]

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

const matchScreenshot = async function(name, world) {
  const screenShotName = `./src/tests/screenshots/approved/${name}.png`
  const testImageName = `./src/tests/screenshots/test/${name}.png`
  const diffImageName = `./src/tests/screenshots/diff/${name}.png`
  const diffImageName2 = `./reports${name}.png`
  const page = scope.context.currentPage
  const screenshotExists = await fs.pathExists(screenShotName)
  if (!screenshotExists) {
    console.warn('Screenshot Does Not Exist - Creating')
    await page.screenshot({ path: screenShotName })
  }

  const testshot = await page.screenshot()
  await page.screenshot({ path: testImageName })
  world.attach(testshot, 'image/png')
  let shot = await pixels(screenShotName)
  const testShot = await pixels(testImageName)
  const areEqual = equal(shot, testShot, diffImageName, { threshold: 0.85 })
  // return true

  if (!areEqual) {
    if (!process.env.CIRCLECI) {
      var takeSnapshot = readlineSync.question('Do you want to update? ')

      if (takeSnapshot == 'yes') {
        await page.screenshot({ path: screenShotName })
        shot = await pixels(screenShotName)
        return true
      }
    }

    const sshot = await scope.context.currentPage.screenshot()
    world.attach(sshot, 'image/png')
    const d = await fs.readFile(diffImageName)
    world.attach(d, 'image/png')
  }

  return assert(equal(shot, testShot, diffImageName2, { threshold: 0.85 }))
}

module.exports = {
  clickButton,
  clickLink,
  fillOutForm,
  goToPage,
  hasText,
  hasTitle,
  matchScreenshot,
  shouldShowText: hasText,
}
