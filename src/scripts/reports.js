const reporter = require('cucumber-html-reporter')
const cucumberJunitConvert = require('cucumber-junit-convert')

const junitOpts = {
  inputJsonFile: '/home/circleci/forge/reports/cucumber_report.json',
  outputXmlFile: '/home/circleci/forge/reports/cucumber_report.xml',
}

const options = {
  theme: 'foundation',
  jsonFile: '/home/circleci/forge/reports/cucumber_report.json',
  output: '/home/circleci/forge/reports/cucumber_report.html',
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
