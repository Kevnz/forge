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
  Notification,
  Panel,
  PanelBlock,
  Heading,
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
  bimonthly: ['Four months ago', 'Two months ago', 'The past two months'],
}

const usePkgDetails = pkg => {
  const { data, loading, getUrl } = useGet(
    `https://kev-pi.herokuapp.com/api/package/details?pkg=${pkg}`
  )

  useEffect(() => {
    getUrl()
  }, [pkg])
  return [data, loading]
}
const usePkgDownloads = (pkg, duration, color) => {
  const { data, loading, getUrl } = useGet(
    `https://kev-pi.herokuapp.com/api/package/yearly?pkg=${pkg}`
  )
  useEffect(() => {
    getUrl()
  }, [pkg])

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

  const breakdownMapper = down => {
    return {
      date: down.end,
      [`${pkg}-downloads`]: down.downloads,
      downloads: down.downloads,
      name: pkg,
    }
  }
  if (data && data.breakdown) {
    downs = data.breakdown
      .slice(data.breakdown.length - backs[duration])
      .map(breakdownMapper)

    previousDowns = data.breakdown
      .slice(
        data.breakdown.length - backsBack[duration],
        data.breakdown.length - backs[duration]
      )
      .map(breakdownMapper)
    furtherBackDowns = data.breakdown
      .slice(
        data.breakdown.length - backsBack[duration] - backs[duration] + 2,
        data.breakdown.length - backsBack[duration]
      )
      .map(breakdownMapper)

    totals = {
      name: pkg,
      downloads: {
        current: downs.reduce((acc, current) => {
          acc = acc + current.downloads
          return acc
        }, 0),
        previous: previousDowns.reduce((acc, current) => {
          acc = acc + current.downloads
          return acc
        }, 0),
        further: furtherBackDowns.reduce((acc, current) => {
          acc = acc + current.downloads
          return acc
        }, 0),
      },
      color,
    }
  }

  const uniq = [
    ...new Set(previousDowns.concat(downs).concat(furtherBackDowns)),
  ].sort((a, b) => {
    if (new Date(a.date) > new Date(b.date)) {
      return 1
    }
    if (new Date(a.date) < new Date(b.date)) {
      return -1
    }
    // a must be equal to b
    return 0
  })
  return [uniq, totals, loading]
}
const StatsPage = ({ module }) => {
  const [duration, setDuration] = useState('monthly')
  const [moduleSlug, setModuleSlug] = useState(module)

  const mod = modules.find(pkg => pkg.slug === moduleSlug)

  useTitle(`NPM Download Stats for ${mod.name}`)
  const [downloads, totals, isLoading] = usePkgDownloads(
    mod.name,
    duration,
    mod.color
  )

  const [pkgDetails, isLoadingDetails] = usePkgDetails(mod.name)
  console.log('details', { pkgDetails, isLoadingDetails })

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

  const min = Math.min(...data)
  const max = Math.max(...data)
  const minDays = downloads.filter(d => {
    return d[`${mod.name}-downloads`] === min
  })
  const maxDays = downloads.filter(d => {
    return d[`${mod.name}-downloads`] === max
  })
  console.log('min days', minDays)
  console.log('max days', maxDays)
  return (
    <>
      <Hero>
        <HeroBody>
          <Title>@kev_nz</Title>
          <SubTitle>NPM Stats - {mod.title}</SubTitle>
        </HeroBody>
      </Hero>
      <Tabs isToggle isFullWidth>
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
              Bi-Monthly
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
        <Column isOneThird>
          <Notification isShown isDismissible={false} isPrimary>
            <Heading>{HEADING[duration][0]}:</Heading>
            <Title as="div">{!isLoading && totals?.downloads?.further}</Title>
          </Notification>
        </Column>
        <Column isOneThird>
          <Notification isShown isDismissible={false} isPrimary>
            <Heading> {HEADING[duration][1]}: </Heading>
            <Title as="div">{!isLoading && totals?.downloads?.previous}</Title>
          </Notification>
        </Column>
        <Column isOneThird>
          <Notification isShown isDismissible={false} isPrimary>
            <Heading> {HEADING[duration][2]}:</Heading>
            <Title as="div">{!isLoading && totals?.downloads?.current}</Title>
          </Notification>
        </Column>
      </Columns>
      <Columns>
        <Column isFull>
          <Panel heading="Daily Downloads">
            <PanelBlock as="div">
              <SparkLine data={data} color={mod.color} width={400}></SparkLine>
            </PanelBlock>
          </Panel>
        </Column>
      </Columns>
      <Columns>
        <Column isOneQuarter>
          <Notification isShown isDismissible={false} isWarning>
            <Heading>Least Downloads:</Heading>
            <Title as="div">{!isLoading && min}</Title>
          </Notification>
        </Column>
        <Column isOneQuarter>
          <Notification isShown isDismissible={false} isWarning>
            <Heading>Times Least Hit:</Heading>
            <Title as="div">{!isLoading && minDays.length}</Title>
          </Notification>
        </Column>
        <Column isOneQuarter>
          <Notification isShown isDismissible={false} isSuccess isBold>
            <Heading> Most Downloads: </Heading>
            <Title as="div">{!isLoading && max}</Title>
          </Notification>
        </Column>
        <Column isOneQuarter>
          <Notification isShown isDismissible={false} isSuccess>
            <Heading>Times Most Hit:</Heading>
            <Title as="div">{!isLoading && maxDays.length}</Title>
          </Notification>
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
