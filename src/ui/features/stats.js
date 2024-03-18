import React, { useEffect } from 'react'
import {
  Column,
  Columns,
  Title,
  Container,
  Panel,
  PanelBlock,
  BreadcrumbItem,
  Breadcrumb,
  Notification,
  Heading,
} from '@brightleaf/elements'

import { useTitle, useGet } from '@brightleaf/react-hooks'
import { Link } from '@reach/router'
import modules from '../data/my-packages'
import SparkLine from '../components/spark-line'

const useStatsGet = pkg => {
  // https://forge.kevnz.xyz/.netlify/functions/hello
  const { data, getUrl } = useGet(
    `${process.env.API}/.netlify/functions/yearly?pkg=${pkg}`
  )
  useEffect(() => {
    getUrl()
  }, [pkg])

  let downs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  let totalDownloads = 'Loading'
  const breakdown = []
  if (data && data.breakdown) {
    downs = data.breakdown.map(ds => ds.downloads)
    totalDownloads = data.totals.downloads
    breakdown.push(...data.breakdown)
  }
  return [downs, totalDownloads, breakdown]
}

const SingleModule = ({ name, title, color }) => {
  const [data, total, breakdown] = useStatsGet(name)
  return (
    <Column is="4">
      <Panel heading={`${title} Total: ${total}`}>
        <PanelBlock>
          <Container>
            <SparkLine data={data} color={color}></SparkLine>
          </Container>
        </PanelBlock>
      </Panel>
      <Notification isShown isDismissible={false} isInfo>
        <Heading>{title} Yesterday:</Heading>
        <Title as="div" is="5">
          {breakdown.length > 300 && breakdown[364].downloads}
        </Title>
      </Notification>
      <Notification isShown isDismissible={false} isWarning>
        <Heading>{title} 7 Days:</Heading>
        <Title as="div" is="5">
          {breakdown.length > 300 && breakdown[357].downloads} -{' '}
          {breakdown.length > 300 && breakdown[358].downloads} -{' '}
          {breakdown.length > 300 && breakdown[359].downloads} -{' '}
          {breakdown.length > 300 && breakdown[360].downloads} -{' '}
          {breakdown.length > 300 && breakdown[361].downloads} -{' '}
          {breakdown.length > 300 && breakdown[362].downloads} -{' '}
          {breakdown.length > 300 && breakdown[363].downloads}
        </Title>
      </Notification>
    </Column>
  )
}

const StatsPage = () => {
  useTitle('Tracking NPM module downloads')

  const lines = modules.map(m => <SingleModule key={m.slug} {...m} />)

  return (
    <>
      <br />
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/modules">Modules</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <a>Overview</a>
        </BreadcrumbItem>
      </Breadcrumb>
      <Columns isMultiline>{lines}</Columns>
    </>
  )
}

export default StatsPage
