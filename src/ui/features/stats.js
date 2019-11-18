import React, { useEffect } from 'react'
import {
  Column,
  Columns,
  Title,
  SubTitle,
  Panel,
  PanelBlock,
} from '@brightleaf/elements'

import { useTitle, useGet } from '@brightleaf/react-hooks'
import modules from '../data/my-packages'
import SparkLine from '../components/spark-line'

const useStatsGet = pkg => {
  const { data, getUrl } = useGet(
    `https://kev-pi.herokuapp.com/api/package/bimonthly?pkg=${pkg}`
  )
  useEffect(() => {
    getUrl()
  }, [pkg])

  let downs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  let totalDownloads = 'Loading'
  if (data && data.breakdown) {
    downs = data.breakdown.map(ds => ds.downloads)
    totalDownloads = data.totals.downloads
  }
  return [downs, totalDownloads]
}

const SingleModule = ({ name, title, color }) => {
  const [data, total] = useStatsGet(name)
  return (
    <Column is="4">
      <Panel heading={`${title} Total: ${total}`}>
        <PanelBlock>
          <SparkLine data={data} color={color}></SparkLine>
        </PanelBlock>
      </Panel>
    </Column>
  )
}

const StatsPage = () => {
  useTitle('downloaded packages')

  const lines = modules.map(m => <SingleModule key={m.slug} {...m} />)

  return (
    <>
      <br />
      <Columns isMultiline>{lines}</Columns>
    </>
  )
}

export default StatsPage
