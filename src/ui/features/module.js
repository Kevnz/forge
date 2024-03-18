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
import { navigate } from '@reach/router'

import { useTitle, useGet } from '@brightleaf/react-hooks'
import classnames from 'classnames'
import modules from '../data/my-packages'
import SparkLine from '../components/spark-line'
import SparkLineBar from '../components/spark-line-bar'
import './tracking.scss'

const backs = {
  daily: 1,
  weekly: 7,
  fortnightly: 14,
  monthly: 31,
  bimonthly: 62,
  quarterly: 91,
}

const backsBack = {
  daily: 2,
  weekly: 14,
  fortnightly: 28,
  monthly: 62,
  bimonthly: 124,
  quarterly: 182,
}

const units = {
  daily: 1,
  weekly: 7,
  fortnightly: 14,
  monthly: 31,
  bimonthly: 62,
}

const HEADING = {
  daily: ['Three days ago', 'Two days ago', 'Yesterday'],
  weekly: ['Two weeks ago', 'One week ago', 'This week'],
  fortnightly: ['Two fortnights ago', 'One fortnight ago', 'This fortnightly'],
  monthly: ['Two months ago', 'One month ago', 'This month'],
  bimonthly: ['Four months ago', 'Two months ago', 'The past two months'],
  quarterly: ['Nine months ago', 'Six months ago', 'The past thre months'],
}

const usePkgDetails = pkg => {
  const { data, loading, getUrl } = useGet(
    `${process.env.API}/.netlify/functions/details?pkg=${pkg}`
  )

  useEffect(() => {
    getUrl()
  }, [pkg])
  return [data, loading]
}
const usePkgDownloads = (pkg, duration, color) => {
  const { data, loading, getUrl } = useGet(
    `${process.env.API}/.netlify/functions/yearly?pkg=${pkg}`
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
  let totals = {
    name: pkg,
    downloads: {
      current: 0,
      previous: 0,
      further: 0,
      breakdown: [],
    },
  }

  const breakdownMapper = down => {
    return {
      date: down.end,
      [`${pkg}-downloads`]: down.downloads,
      downloads: down.downloads,
      name: pkg,
    }
  }
  if (data && data.breakdown) {
    downs = []
      .concat(data.breakdown)
      .slice(data.breakdown.length - backs[duration])
      .map(breakdownMapper)

    previousDowns = []
      .concat(data.breakdown)
      .slice(
        data.breakdown.length - backsBack[duration],
        data.breakdown.length - backs[duration]
      )
      .map(breakdownMapper)

    const fbdDuece = [].concat(data.breakdown)

    furtherBackDowns = []
      .concat(data.breakdown)
      .slice(
        fbdDuece.length - (backsBack[duration] + backs[duration]),
        fbdDuece.length - backsBack[duration]
      )
      .map(breakdownMapper)

    const further = furtherBackDowns.reduce((acc, current) => {
      acc = acc + current.downloads
      return acc
    }, 0)

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
        further: further,
        breakdown: data.breakdown.map(breakdownMapper),
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
  console.info('totals', totals.downloads.breakdown)
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

  const currentVersion = pkgDetails['dist-tags']
    ? pkgDetails['dist-tags'].latest
    : '0.0.0'
  const versions = pkgDetails.versions ? Object.keys(pkgDetails.versions) : []

  const createdOn = pkgDetails.time
    ? new Date(pkgDetails.time.created)
    : new Date()
  const lastPublishedOn = pkgDetails.time
    ? new Date(pkgDetails.time[currentVersion])
    : new Date()
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
  const fullData = totals.downloads.breakdown
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

  const min = Math.min(...data) || 0
  const max = Math.max(...data) || 0
  const minDays = downloads.filter(d => {
    return d[`${mod.name}-downloads`] === min
  })
  const maxDays = downloads.filter(d => {
    return d[`${mod.name}-downloads`] === max
  })

  const isAnyLoading = isLoading || isLoadingDetails
  console.log(
    []
      .concat(fullData)
      .slice(fullData.length - 14)
      .join(',')
  )
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
          <TabItem isActive={duration === 'bimonthly' && !isAnyLoading}>
            <a
              className={classnames('tab-link', {
                'is-loading': isAnyLoading && duration === 'bimonthly',
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
          <TabItem isActive={duration === 'monthly' && !isAnyLoading}>
            <a
              className={classnames('tab-link', {
                'is-loading': isAnyLoading && duration === 'monthly',
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
          <TabItem isActive={duration === 'fortnightly' && !isAnyLoading}>
            <a
              href="#"
              className={classnames('tab-link', {
                'is-loading': isAnyLoading && duration === 'fortnightly',
              })}
              onClick={e => {
                e.preventDefault()
                setDuration('fortnightly')
              }}
            >
              Fortnightly
            </a>
          </TabItem>
          <TabItem isActive={duration === 'weekly' && !isAnyLoading}>
            <a
              href="#"
              className={classnames('tab-link', {
                'is-loading': isAnyLoading && duration === 'weekly',
              })}
              onClick={e => {
                e.preventDefault()
                setDuration('weekly')
              }}
            >
              Weekly
            </a>
          </TabItem>
          <TabItem isActive={duration === 'daily' && !isAnyLoading}>
            <a
              className={classnames('tab-link', {
                'is-loading': isAnyLoading && duration === 'daily',
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
            <Title as="div">
              {!isAnyLoading && totals?.downloads?.further}
            </Title>
          </Notification>
        </Column>
        <Column isOneThird>
          <Notification isShown isDismissible={false} isPrimary>
            <Heading> {HEADING[duration][1]}: </Heading>
            <Title as="div">
              {!isAnyLoading && totals?.downloads?.previous}
            </Title>
          </Notification>
        </Column>
        <Column isOneThird>
          <Notification isShown isDismissible={false} isPrimary>
            <Heading> {HEADING[duration][2]}:</Heading>
            <Title as="div">
              {!isAnyLoading && totals?.downloads?.current}
            </Title>
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
        <Column isFull>
          <Panel heading="Downloads in the last two weeks">
            <PanelBlock as="div">
              <SparkLineBar
                data={[].concat(fullData).slice(fullData.length - 14)}
                color={mod.color}
                width={300}
              ></SparkLineBar>
            </PanelBlock>
          </Panel>
        </Column>
      </Columns>
      <Columns>
        <Column isOneQuarter>
          <Notification isShown isDismissible={false} isWarning>
            <Heading>Least Downloads:</Heading>
            <Title as="div">{!isAnyLoading && min}</Title>
          </Notification>
        </Column>
        <Column isOneQuarter>
          <Notification isShown isDismissible={false} isWarning>
            <Heading>Times Least Hit:</Heading>
            <Title as="div">{!isAnyLoading && minDays.length}</Title>
          </Notification>
        </Column>
        <Column isOneQuarter>
          <Notification isShown isDismissible={false} isSuccess isBold>
            <Heading> Most Downloads: </Heading>
            <Title as="div">{!isAnyLoading && max}</Title>
          </Notification>
        </Column>
        <Column isOneQuarter>
          <Notification isShown isDismissible={false} isSuccess>
            <Heading>Times Most Hit:</Heading>
            <Title as="div">{!isAnyLoading && maxDays?.length}</Title>
          </Notification>
        </Column>
      </Columns>
      <Columns>
        <Column isOneQuarter>
          <Notification isShown isDismissible={false} isInfo>
            <Heading>Current Version:</Heading>
            <Title as="div">{!isAnyLoading && currentVersion}</Title>
          </Notification>
        </Column>
        <Column isOneQuarter>
          <Notification isShown isDismissible={false} isInfo>
            <Heading>Total Versions</Heading>
            <Title as="div">{!isAnyLoading && versions.length}</Title>
          </Notification>
        </Column>
        <Column isOneQuarter>
          <Notification isShown isDismissible={false} isInfo>
            <Heading>Created On</Heading>
            <Title as="div" is="4">
              {!isAnyLoading && createdOn.toDateString()}
            </Title>
          </Notification>
        </Column>
        <Column isOneQuarter>
          <Notification isShown isDismissible={false} isInfo>
            <Heading>Last Published On</Heading>
            <Title as="div" is="4">
              {!isAnyLoading && lastPublishedOn.toDateString()}
            </Title>
          </Notification>
        </Column>
      </Columns>
      <Columns>
        <Column>
          <DropDownMenu label="Pick Module" isUp>
            {moduleItems}
          </DropDownMenu>
        </Column>
      </Columns>
    </>
  )
}

export default StatsPage
