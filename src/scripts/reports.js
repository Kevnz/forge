const reporter = require('cucumber-html-reporter')
const cucumberJunitConvert = require('cucumber-junit-convert')

const junitOpts = {
  inputJsonFile: 'reports/cucumber_report.json',
  outputXmlFile: 'reports/cucumber_report.xml',
}

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber_report.json',
  output: 'reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': 'Prod',
  },
}

reporter.generate(options)
cucumberJunitConvert.convert(junitOpts)
