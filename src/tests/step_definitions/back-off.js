const { Then } = require('cucumber')
const { hasText } = require('../support/actions')

Then('the page should show the text {string}', hasText)
