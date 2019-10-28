import React, { useEffect } from 'react'
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
  useToggle,
  Modal,
  ModalCard,
  ModalCardBody,
  ModalCardFoot,
  ModalCardHead,
} from '@brightleaf/elements'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

import { useTitle, useGet } from '@brightleaf/react-hooks'

const useStatsGet = pkg => {
  const { data, getUrl } = useGet(
    `https://kev-pi.herokuapp.com/api/package/monthly?pkg=${pkg}`
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

  if (data && data.breakdown) {
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
  }
  // name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  return [downs]
}
const StatsPage = () => {
  useTitle('downloaded packages')
  const [elements] = useStatsGet('@brightleaf/elements')
  const [hooks] = useStatsGet('@brightleaf/react-hooks')
  const [rfe] = useStatsGet('react-form-elements')
  const [creatureFeatures] = useStatsGet('creature-features')
  const [asyncTools] = useStatsGet('@kev_nz/async-tools')
  const [backOff] = useStatsGet('back-off')
  const [pxpay] = useStatsGet('pxpay')
  const [pxpost] = useStatsGet('pxpost')
  const [isom] = useStatsGet('isom')
  const [ymd] = useStatsGet('year-month-day')
  const [first] = useStatsGet('1stand15th')
  const [xtconf] = useStatsGet('xtconf')
  const [fuxor] = useStatsGet('fuxor')
  const [ndp] = useStatsGet('nom-de-plume')
  const [altFacts] = useStatsGet('alternative-facts')
  const [diar] = useStatsGet('days-in-a-row')
  const [loki] = useStatsGet('@kev_nz/lokijs')

  const o = elements.map((el, index) => {
    return {
      ...el,
      ...hooks[index],
      ...rfe[index],
      ...creatureFeatures[index],
      ...asyncTools[index],
      ...backOff[index],
      ...pxpay[index],
      ...pxpost[index],
      ...isom[index],
      ...ymd[index],
      ...first[index],
      ...xtconf[index],
      ...fuxor[index],
      ...ndp[index],
      ...altFacts[index],
      ...diar[index],
      ...loki[index],
    }
  })
  return (
    <>
      <br />
      <Columns>
        <Column is="12">
          <LineChart
            width={900}
            height={700}
            data={o}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={`@brightleaf/elements-downloads`}
              stroke="#00d1b2"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`@brightleaf/react-hooks-downloads`}
              stroke="#1c8cdc"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`react-form-elements-downloads`}
              stroke="#ea485c"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`creature-features-downloads`}
              stroke="#fa7e17"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`@kev_nz/async-tools-downloads`}
              stroke="#7a9792"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`back-off-downloads`}
              stroke="#1957fb"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`pxpay-downloads`}
              stroke="#c495f0"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`pxpost-downloads`}
              stroke="#fb4c19"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`isom-downloads`}
              stroke="#8f98ff"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`year-month-day-downloads`}
              stroke="#ff4674"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`1stand15th-downloads`}
              stroke="#c8fb19"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`xtconf-downloads`}
              stroke="#0c837f"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`fuxor-downloads`}
              stroke="#ffe31d"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`nom-de-plume-downloads`}
              stroke="#63323e"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`alternative-facts-downloads`}
              stroke="#b43e32"
              activeDot={{ r: 4 }}
            />

            <Line
              type="monotone"
              dataKey={`@kev_nz/lokijs-downloads`}
              stroke="#387d32"
              activeDot={{ r: 4 }}
            />

            <Line
              type="monotone"
              dataKey={`days-in-a-row-downloads`}
              stroke="#74d600"
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </Column>
      </Columns>
    </>
  )
}

export default StatsPage
