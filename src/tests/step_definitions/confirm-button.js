const { When, Then } = require('cucumber')
const {
  fillOutForm,
  hasText,
  clickLink,
  clickButton,
} = require('../support/actions')

When('I click the {string} link', clickLink)

When('I fill out the form', fillOutForm)

Then('the confirm dialog should be shown', () =>
  hasText('Are you sure you want to send the message?')
)

When('I click the {string} Button', clickButton)
Then('the page should show the Button {string}', hasText)
