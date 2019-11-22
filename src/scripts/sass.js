const fs = require('fs')
const path = require('path')
var sass = require('node-sass')
const { importer } = require('sass-import-modules')
const packageImporter = require('node-sass-package-importer')

const getData = name => {
  return `
@charset "utf-8";

@import "~bulma/sass/utilities/initial-variables";

@import "~bulmaswatch/${name}/variables";

@import "~bulma/bulma";

@import "~bulmaswatch/${name}/overrides";

.flame-log {
  width: 62px;
  vertical-align: middle;
}
`
}

const getOut = name => path.resolve(`./dist/${name}.css`)

const swatches = {
  default: {
    title: 'Default',
    description: 'Bulma as is',
  },
  cerulean: {
    title: 'Cerulean',
    description: 'A calm blue sky',
  },
  cosmo: {
    title: 'Cosmo',
    description: 'An ode to metro',
  },
  cyborg: {
    title: 'Cyborg',
    description: 'Jet black and electric blue ',
  },
  darkly: {
    title: 'Darkly',
    description: 'Flatly in night mode',
  },
  flatly: {
    title: 'Flatly',
    description: 'Flat and think',
  },
  journal: {
    title: 'Journal',
    description: 'Crisp like a new sheet of paper ',
  },
  litera: {
    title: 'Litera',
    description: 'The medium is the message ',
  },
  lumen: {
    title: 'Lumen',
    description: 'Light and shadow ',
  },
  lux: {
    title: 'Lux',
    description: 'A touch of class',
  },
  materia: {
    title: 'Materia',
    description: 'Material is the metaphor',
  },
  minty: {
    title: 'Minty',
    description: 'A fresh feel',
  },
  nuclear: {
    title: 'Nuclear',
    description: 'A dark theme with irradiated highlights',
  },
  pulse: {
    title: 'Pulse',
    description: 'A trace of purple',
  },
  sandstone: {
    title: 'Sandstone',
    description: 'A touch of warmth',
  },
  simplex: {
    title: 'Simplex',
    description: 'Mini and minimalist',
  },
  slate: {
    title: 'Slate',
    description: 'Shades of gunmetal gray ',
  },
  solar: {
    title: 'Solar',
    description: 'A spin on Solarized ',
  },
  spacelab: {
    title: 'Spacelab',
    description: 'Silvery and sleek ',
  },
  superhero: {
    title: 'Superhero',
    description: 'The brave and the blue',
  },
  united: {
    title: 'United',
    description: 'Ubuntu orange and unique font',
  },
  yeti: {
    title: 'Yeti',
    description: 'A friendly foundation',
  },
}
const keys = Object.keys(swatches)
console.log('keys', keys)

keys.forEach(key => {
  console.log('render', key)
  const d = getData(key)
  const o = getOut(key)

  sass.renderSync({
    data: d,
    outputStyle: 'compressed',
    includePaths: [path.join(process.cwd(), 'node_modules')],
    outFile: o,
    sourceMap: true,
    importer: packageImporter,
  })
})

const result = sass.renderSync({
  file: './src/ui/core/themes/lux.scss',
  outputStyle: 'compressed',

  outFile: './dist/swatch.scss',
  sourceMap: true,
  importer: packageImporter,
})
console.log(result.css.toString())
