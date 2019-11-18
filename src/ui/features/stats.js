import React, { useEffect } from 'react'
import { Column, Columns, Title, SubTitle } from '@brightleaf/elements'

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
    <Columns>
      <Column is="4">
        <SparkLine data={data} color={color}></SparkLine>
      </Column>
      <Column>
        <Title is="4">{title}</Title>
        <SubTitle is="5">Total: {total}</SubTitle>
      </Column>
    </Columns>
  )
}

const StatsPage = () => {
  useTitle('downloaded packages')

  const lines = modules.map(m => <SingleModule key={m.slug} {...m} />)

  return (
    <>
      <br />
      {lines}
    </>
  )
}

export default StatsPage
