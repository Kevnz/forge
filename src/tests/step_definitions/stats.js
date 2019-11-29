const { When, Then } = require('cucumber')
const { delay } = require('@kev_nz/async-tools')
const { hasText, matchScreenshot } = require('../support/actions')

Then(
  'the page should display the correct totals',
  { timeout: 60 * 1000 },
  async function() {
    // Write code here that turns the phrase above into concrete actions
    await delay(800)
    return Promise.all([
      hasText('Brightleaf Elements Total: 17058'),
      hasText('Brightleaf Hooks Total: 19023'),
      hasText('React Form Elements Total: 20640'),
      hasText('Async Tools Total: 17719'),
      hasText('760 - 681 - 766 - 676 - 702 - 737 - 679'),
      hasText('Back-Off Total: 12869'),
      hasText('Creature Features Total: 13276'),
      matchScreenshot('stats'),
    ])
  }
)
