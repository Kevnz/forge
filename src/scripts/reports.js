const reporter = require('cucumber-html-reporter')
const cucumberJunitConvert = require('cucumber-junit-convert')

const junitOpts = {
  inputJsonFile: '~/forge/reports/cucumber_report.json',
  outputXmlFile: '~/forge/reports/cucumber_report.xml',
}

const options = {
  theme: 'bootstrap',
  jsonFile: '~/forge/reports/cucumber_report.json',
  output: '~/forge/reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': 'Prod',
  },
}

reporter.generate(options)
console.info('process', process.cwd())
console.info('__dirname', __dirname)
cucumberJunitConvert.convert(junitOpts)
