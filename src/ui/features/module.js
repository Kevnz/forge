import React, { useEffect, useState } from 'react'
import {
  Button,
  Container,
  Section,
  Column,
  Columns,
  Hero,
  HeroBody,
  Content,
  Title,
  SubTitle,
  TabItem,
  TabList,
  Tabs,
  DropDownItem,
  DropDownMenu,
} from '@brightleaf/elements'
import { navigate, Link } from '@reach/router'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Sector,
  Cell,
  BarChart,
  Bar,
} from 'recharts'

import { useTitle, useGet } from '@brightleaf/react-hooks'
import classnames from 'classnames'
import modules from '../data/my-packages'
import SparkLine from '../components/spark-line'
import './tracking.scss'

const COLORS = [
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
]

const backs = {
  daily: 2,
  weekly: 8,
  fortnightly: 15,
  monthly: 33,
  bimonthly: 63,
}
const backsBack = {
  daily: 3,
  weekly: 15,
  fortnightly: 29,
  monthly: 64,
  bimonthly: 126,
}
const HEADING = {
  daily: ['Three days ago', 'Two days ago', 'Yesterday'],
  weekly: ['Two weeks ago', 'One week ago', 'This week'],
  fortnightly: ['Two fortnights ago', 'One fortnight ago', 'This fortnightly'],
  monthly: ['Two months ago', 'One month ago', 'This month'],
  bimonthly: ['Two months ago', 'One month ago', 'This month'],
}
const StatsPage = ({ module }) => {
  const [duration, setDuration] = useState('monthly')
  const [moduleSlug, setModuleSlug] = useState(module)

  const mod = modules.find(pkg => pkg.slug === moduleSlug)

  const useStatsGet = (pkg, color) => {
    const { data, loading, getUrl } = useGet(
      `https://kev-pi.herokuapp.com/api/package/${duration}?pkg=${pkg}`
    )
    const { data: backData, loading: backLoading, getUrl: getBackUrl } = useGet(
      `https://kev-pi.herokuapp.com/api/package/${duration}?pkg=${pkg}&back=${backs[duration]}`
    )
    const {
      data: backBackData,
      loading: backBackLoading,
      getUrl: getBackBackUrl,
    } = useGet(
      `https://kev-pi.herokuapp.com/api/package/${duration}?pkg=${pkg}&back=${backsBack[duration]}`
    )
    useEffect(() => {
      getUrl()
      getBackUrl()
      getBackBackUrl()
    }, [pkg, duration])

    let downs = [
      {
        downloads: 0,
        date: '2019-09-27',
      },
    ]
    let previousDowns = [
      {
        downloads: 0,
        date: '2019-09-26',
      },
    ]
    let furtherBackDowns = [
      {
        downloads: 0,
        date: '2019-09-25',
      },
    ]
    let totals = { name: pkg, downloads: 0 }
    const previousTotals = { name: pkg, downloads: 0 }
    const doubleBackTotals = { name: pkg, downloads: 0 }
    if (
      data &&
      data.breakdown &&
      backData &&
      backData.breakdown &&
      backBackData &&
      backBackData.breakdown
    ) {
      // data.breakdown.pop()
      downs = data.breakdown.map(down => {
        // downloads	101
        // start	2019-09-26
        // end	2019-09-26
        // package	back-off

        return {
          date: down.end,
          [`${pkg}-downloads`]: down.downloads,
          name: pkg,
        }
      })
      previousDowns = backData.breakdown.map(down => {
        // downloads	101
        // start	2019-09-26
        // end	2019-09-26
        // package	back-off

        return {
          date: down.end,
          [`${pkg}-downloads`]: down.downloads,
          name: pkg,
        }
      })
      furtherBackDowns = backBackData.breakdown.map(down => {
        return {
          date: down.end,
          [`${pkg}-downloads`]: down.downloads,
          name: pkg,
        }
      })
      totals = {
        name: pkg,
        downloads: {
          current: data.totals.downloads,
          previous: backData.totals.downloads,
          further: backBackData.totals.downloads,
        },
        color,
      }
    }
    if (data && data.downloads && backData && backData.downloads) {
      console.log('the other one setting totals', data)
      downs = [
        {
          date: data.end,
          [`${pkg}-downloads`]: data.downloads,
          name: pkg,
        },
      ]
      previousDowns = [
        {
          date: backData.end,
          [`${pkg}-downloads`]: backData.downloads,
          name: pkg,
        },
      ]
      furtherBackDowns = [
        {
          date: backBackData.end,
          [`${pkg}-downloads`]: backBackData.downloads,
          name: pkg,
        },
      ]

      totals = {
        name: pkg,
        downloads: {
          current:
            data.totals && data.totals.downloads
              ? data.totals.downloads
              : data.downloads,
          previous:
            backData.totals && backData.totals.downloads
              ? backData.totals.downloads
              : backData.downloads,
          further:
            backBackData.totals && backBackData.totals.downloads
              ? backBackData.totals.downloads
              : backBackData.downloads,
        },
        color,
      }
    }

    const uniq = [
      ...new Set(previousDowns.concat(downs).concat(furtherBackDowns)),
    ]
    return [uniq, totals, loading && backLoading && backBackLoading]
  }

  useTitle(`NPM Download Stats for ${mod.name}`)

  const [downloads, totals, isLoading] = useStatsGet(mod.name, COLORS[0])
  console.info('results', {
    downloads,
    totals,
  })

  const stacked = duration !== 'daily' ? { stackId: 'a' } : {}

  const moduleItems = modules.map(m => {
    return (
      <DropDownItem
        key={`dd-${m.slug}`}
        onClick={e => {
          navigate(`#/package/${m.slug}`)
          setModuleSlug(`${m.slug}`)
        }}
      >
        {m.title}
      </DropDownItem>
    )
  })

  const data = downloads
    .sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) {
        return 1
      }
      if (new Date(a.date) < new Date(b.date)) {
        return -1
      }
      // a must be equal to b
      return 0
    })
    .map(d => d[`${mod.name}-downloads`])

  return (
    <>
      <Hero>
        <HeroBody>
          <Title>@kev_nz</Title>
          <SubTitle>NPM Stats - {mod.title}</SubTitle>
        </HeroBody>
      </Hero>
      <Tabs isToggle isToggleRounded>
        <TabList>
          <TabItem isActive={duration === 'bimonthly' && !isLoading}>
            <a
              className={classnames('tab-link', {
                'is-loading': isLoading && duration === 'bimonthly',
              })}
              href="#"
              onClick={e => {
                e.preventDefault()
                setDuration('bimonthly')
              }}
            >
              BiMonthly
            </a>
          </TabItem>
          <TabItem isActive={duration === 'monthly' && !isLoading}>
            <a
              className={classnames('tab-link', {
                'is-loading': isLoading && duration === 'monthly',
              })}
              href="#"
              onClick={e => {
                e.preventDefault()
                setDuration('monthly')
              }}
            >
              Monthly
            </a>
          </TabItem>
          <TabItem isActive={duration === 'fortnightly' && !isLoading}>
            <a
              href="#"
              className={classnames('tab-link', {
                'is-loading': isLoading && duration === 'fortnightly',
              })}
              onClick={e => {
                e.preventDefault()
                setDuration('fortnightly')
              }}
            >
              Fortnightly
            </a>
          </TabItem>
          <TabItem isActive={duration === 'weekly' && !isLoading}>
            <a
              href="#"
              className={classnames('tab-link', {
                'is-loading': isLoading && duration === 'weekly',
              })}
              onClick={e => {
                e.preventDefault()
                setDuration('weekly')
              }}
            >
              Weekly
            </a>
          </TabItem>
          <TabItem isActive={duration === 'daily' && !isLoading}>
            <a
              className={classnames('tab-link', {
                'is-loading': isLoading && duration === 'daily',
              })}
              href="#"
              onClick={e => {
                e.preventDefault()
                setDuration('daily')
              }}
            >
              Daily
            </a>
          </TabItem>
        </TabList>
      </Tabs>

      <Columns>
        <Column is="3">
          <Title is="4">
            {HEADING[duration][0]}: {!isLoading && totals?.downloads?.further}
          </Title>
        </Column>
        <Column is="3">
          <Title is="4">
            {HEADING[duration][1]}: {!isLoading && totals?.downloads?.previous}
          </Title>
        </Column>
        <Column is="3">
          <Title is="4">
            {HEADING[duration][2]}: {!isLoading && totals?.downloads?.current}
          </Title>
        </Column>
      </Columns>
      <Columns>
        <Column isFull>
          <SparkLine data={data} color={mod.color} width={400}></SparkLine>
        </Column>
      </Columns>
      <Columns>
        <Column>
          {' '}
          <DropDownMenu label="Pick Module">{moduleItems}</DropDownMenu>
        </Column>
      </Columns>
    </>
  )
}

export default StatsPage
