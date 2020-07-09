const fs = require('fs')
const parseMarkdown = require('front-matter-markdown')
const files = fs.readdirSync('./_posts/blog')

const posts = files.filter(f => f.indexOf('.') > 0)

console.log(
  'files',
  posts
    .map(f => `'${f}'`)
    .join(',')
    .toString()
)

const deets = posts.reduce((filesObj, currentFile) => {
  const contents = fs.readFileSync(`./_posts/blog/${currentFile}`, {
    encoding: 'utf-8',
  })
  console.log(contents)
  const parsed = parseMarkdown(contents)
  filesObj[currentFile] = parsed
  return filesObj
}, {})
console.log('the deets', deets)
const details = posts
  .map(f => `'${f}'`)
  .join(',')
  .toString()
const template = `export default [${details}]
`
const fullTemplate = `export default ${JSON.stringify(deets, null, 2)}`
console.log('template', fullTemplate)

fs.writeFileSync('./src/ui/posts.js', fullTemplate)
