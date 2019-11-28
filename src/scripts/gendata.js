const fs = require('fs').promises
const path = require('path')
const { each } = require('@kev_nz/async-tools')
const fetch = require('node-fetch')
const myModules = require('./data')

const url = 'https://kev-pi.herokuapp.com/api/package/'

console.info('gonna get')
;(async () => {
  await each(myModules, async mod => {
    const slug = mod.name
      .replace('@', '')
      .replace('/', '-')
      .replace('.', '-')
    const result = await fetch(`${url}daily?pkg=${mod.name}`)
    const data = await result.json()
    await fs.writeFile(
      path.join(process.cwd(), 'src/mockdata/daily/', `${slug}.json`),
      JSON.stringify(data, null, 2)
    )
  })
  await each(myModules, async mod => {
    const slug = mod.name
      .replace('@', '')
      .replace('/', '-')
      .replace('.', '-')
    const result = await fetch(`${url}weekly?pkg=${mod.name}`)
    const data = await result.json()
    await fs.writeFile(
      path.join(process.cwd(), 'src/mockdata/weekly/', `${slug}.json`),
      JSON.stringify(data, null, 2)
    )
  })
  await each(myModules, async mod => {
    const slug = mod.name
      .replace('@', '')
      .replace('/', '-')
      .replace('.', '-')
    const result = await fetch(`${url}monthly?pkg=${mod.name}`)
    const data = await result.json()
    await fs.writeFile(
      path.join(process.cwd(), 'src/mockdata/monthly/', `${slug}.json`),
      JSON.stringify(data, null, 2)
    )
  })
  await each(myModules, async mod => {
    const slug = mod.name
      .replace('@', '')
      .replace('/', '-')
      .replace('.', '-')
    const result = await fetch(`${url}yearly?pkg=${mod.name}`)
    const data = await result.json()
    await fs.writeFile(
      path.join(process.cwd(), 'src/mockdata/yearly/', `${slug}.json`),
      JSON.stringify(data, null, 2)
    )
  })
  // bimonthly
  await each(myModules, async mod => {
    const slug = mod.name
      .replace('@', '')
      .replace('/', '-')
      .replace('.', '-')
    const result = await fetch(`${url}bimonthly?pkg=${mod.name}`)
    const data = await result.json()
    await fs.writeFile(
      path.join(process.cwd(), 'src/mockdata/bimonthly/', `${slug}.json`),
      JSON.stringify(data, null, 2)
    )
  })
})()
