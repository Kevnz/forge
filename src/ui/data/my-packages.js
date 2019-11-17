const slugify = require('slugify')
const myPackages = [
  {
    slug: slugify('elements'),
    name: '@brightleaf/elements',
    title: 'Brightleaf Elements',
  },
  {
    slug: 'hooks',
    name: '@brightleaf/react-hooks',
    title: 'Brightleaf Hooks',
  },
  {
    slug: slugify('react-form-elements'),
    name: 'react-form-elements',
    title: 'React Form Elements',
  },
  {
    slug: slugify('async-tools'),
    name: '@kev_nz/async-tools',
    title: 'Async Tools',
  },
  {
    slug: slugify('back-off'),
    name: 'back-off',
    title: 'Back-Off',
  },
  {
    slug: slugify('creature-features'),
    name: 'creature-features',
    title: 'Creature Features',
  },
  {
    slug: 'isom',
    name: 'isom',
    title: 'Isom Task Runner',
  },
  {
    slug: 'year-month-day',
    name: 'year-month-day',
    title: 'Year Month Day',
  }, //
  {
    slug: '1stand15th',
    name: '1stand15th',
    title: '1st and 15th',
  },
  {
    slug: 'pxpay',
    name: 'pxpay',
    title: 'PxPay',
  },
  {
    slug: 'pxpost',
    name: 'pxpost',
    title: 'PxPost',
  },
  {
    slug: 'fuxor',
    name: 'fuxor',
    title: 'Fuxor',
  },
  {
    slug: 'nom-de-plume',
    name: 'nom-de-plume',
    title: 'Nom De Plume',
  },
  {
    slug: 'xtconf',
    name: 'xtconf',
    title: 'XT Conf',
  },
]

export default myPackages
