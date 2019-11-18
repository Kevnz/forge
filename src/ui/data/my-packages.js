const slugify = require('slugify')
/*
  '#00d1b2',
  '#1c8cdc',
  '#ea485c',
  '#fa7e17',
  '#7a9792',
  '#1957fb',
  '#c495f0',
  '#fb4c19',
  '#8f98ff',
  '#ff4674',
  '#c8fb19',
  '#0c837f',
  '#ffe31d',
  '#63323e',
  '#b43e32',
  '#387d32',
  '#74d600',




  */

const myPackages = [
  {
    slug: 'elements',
    name: '@brightleaf/elements',
    title: 'Brightleaf Elements',
    color: '#00d1b2',
  },
  {
    slug: 'hooks',
    name: '@brightleaf/react-hooks',
    title: 'Brightleaf Hooks',
    color: '#1c8cdc',
  },
  {
    slug: slugify('react-form-elements'),
    name: 'react-form-elements',
    title: 'React Form Elements',
    color: '#ea485c',
  },
  {
    slug: slugify('async-tools'),
    name: '@kev_nz/async-tools',
    title: 'Async Tools',
    color: '#7a9792',
  },
  {
    slug: slugify('back-off'),
    name: 'back-off',
    title: 'Back-Off',
    color: '#1957fb',
  },
  {
    slug: slugify('creature-features'),
    name: 'creature-features',
    title: 'Creature Features',
    color: '#fa7e17',
  },
  {
    slug: 'isom',
    name: 'isom',
    title: 'Isom Task Runner',
    color: '#8f98ff',
  },
  {
    slug: 'year-month-day',
    name: 'year-month-day',
    title: 'Year Month Day',
    color: '#ff4674',
  }, //
  {
    slug: '1stand15th',
    name: '1stand15th',
    title: '1st and 15th',
    color: '#c8fb19',
  },
  {
    slug: 'pxpay',
    name: 'pxpay',
    title: 'PxPay',
    color: '#c495f0',
  },
  {
    slug: 'pxpost',
    name: 'pxpost',
    title: 'PxPost',
    color: '#fb4c19',
  },
  {
    slug: 'fuxor',
    name: 'fuxor',
    title: 'Fuxor',
    color: '#ffe31d',
  },
  {
    slug: 'nom-de-plume',
    name: 'nom-de-plume',
    title: 'Nom De Plume',
    color: '#63323e',
  },
  {
    slug: 'xtconf',
    name: 'xtconf',
    title: 'XT Conf',
    color: '#0c837f',
  },
  {
    slug: 'alternative-facts',
    name: 'alternative-facts',
    title: 'Alternative Facts',
    color: '#b43e32',
  },
  {
    slug: 'lokijs',
    name: '@kev_nz/lokijs',
    title: 'Loki JS',
    color: '#387d32',
  },
]

export default myPackages
