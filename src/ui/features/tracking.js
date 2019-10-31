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
} from '@brightleaf/elements'

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

const StatsPage = () => {
  const [duration, setDuration] = useState('monthly')
  const useStatsGet = (pkg, color) => {
    const { data, getUrl } = useGet(
      `https://kev-pi.herokuapp.com/api/package/${duration}?pkg=${pkg}`
    )
    useEffect(() => {
      getUrl()
    }, [pkg, duration])

    let downs = [
      {
        downloads: 0,
        date: '2019-09-27',
      },
    ]
    let totals = { name: pkg, downloads: 0 }
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
      totals = { name: pkg, downloads: data.totals.downloads, color }
    }
    if (data && data.downloads) {
      downs = [
        {
          date: data.end,
          [`${pkg}-downloads`]: data.downloads,
          name: pkg,
        },
      ]
      totals = { name: pkg, downloads: data.downloads, color }
    }
    // name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    return [downs, totals]
  }
  useTitle('downloaded packages')
  const [elements, elementsTotal] = useStatsGet(
    '@brightleaf/elements',
    COLORS[0]
  )
  const [hooks, hooksTotal] = useStatsGet('@brightleaf/react-hooks', COLORS[1])
  const [rfe, rfeTotal] = useStatsGet('react-form-elements', COLORS[2])
  const [creatureFeatures, creatureFeaturesTotal] = useStatsGet(
    'creature-features',
    COLORS[3]
  )
  const [asyncTools, asyncToolsTotal] = useStatsGet(
    '@kev_nz/async-tools',
    COLORS[4]
  )
  const [backOff, backOffTotal] = useStatsGet('back-off', COLORS[5])
  const [pxpay, pxpayTotals] = useStatsGet('pxpay', COLORS[6])
  const [pxpost, pxpostTotals] = useStatsGet('pxpost', COLORS[7])
  const [isom, isomTotals] = useStatsGet('isom', COLORS[8])
  const [ymd, ymdTotals] = useStatsGet('year-month-day', COLORS[9])
  const [first, firstTotals] = useStatsGet('1stand15th', COLORS[10])
  const [xtconf, xtconfTotals] = useStatsGet('xtconf', COLORS[11])
  const [fuxor, fuxorTotals] = useStatsGet('fuxor', COLORS[12])
  const [ndp, ndpTotals] = useStatsGet('nom-de-plume', COLORS[13])
  const [altFacts, altFactsTotals] = useStatsGet(
    'alternative-facts',
    COLORS[14]
  )
  const [diar, diarTotals] = useStatsGet('days-in-a-row', COLORS[16])
  const [loki, lokiTotals] = useStatsGet('@kev_nz/lokijs', COLORS[15])

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
  const pie = [
    elementsTotal,
    hooksTotal,
    rfeTotal,
    creatureFeaturesTotal,
    asyncToolsTotal,
    backOffTotal,
    pxpayTotals,
    pxpostTotals,
    isomTotals,
    ymdTotals,
    firstTotals,
    xtconfTotals,
    fuxorTotals,
    ndpTotals,
    altFactsTotals,
    lokiTotals,
    diarTotals,
  ]
  const totalPie = pie.reduce(
    (accumulator, current) => accumulator + current.downloads,
    0
  )
  const stacked = duration !== 'daily' ? { stackId: 'a' } : {}
  return (
    <>
      <Hero>
        <HeroBody>
          <Title>@kev_nz</Title>
          <SubTitle>NPM Stats</SubTitle>
        </HeroBody>
      </Hero>
      <Tabs isToggle isToggleRounded>
        <TabList>
          <TabItem isActive={duration === 'monthly'}>
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                setDuration('monthly')
              }}
            >
              Montly
            </a>
          </TabItem>
          <TabItem isActive={duration === 'weekly'}>
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                setDuration('weekly')
              }}
            >
              Weekly
            </a>
          </TabItem>
          <TabItem isActive={duration === 'daily'}>
            <a
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
        <Column>
          <PieChart
            width={600}
            height={600}
            margin={{
              top: 5,
              right: 30,
              left: 30,
              bottom: 5,
            }}
          >
            <Pie
              dataKey="downloads"
              isAnimationActive={false}
              data={pie}
              cx={200}
              cy={200}
              outerRadius={160}
              fill="#8884d8"
              label
            >
              {pie.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Pie />
            <Tooltip />
          </PieChart>
        </Column>
        <Column>Downloads: {totalPie}</Column>
      </Columns>
      <Columns>
        <Column is="12">
          <LineChart
            width={900}
            height={400}
            data={o}
            margin={{
              top: 5,
              right: 30,
              left: 30,
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
              name="@brightleaf/elements"
              stroke="#00d1b2"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`@brightleaf/react-hooks-downloads`}
              name="@brightleaf/react-hooks"
              stroke="#1c8cdc"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`react-form-elements-downloads`}
              name="react-form-elements"
              stroke="#ea485c"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`creature-features-downloads`}
              name="creature-features"
              stroke="#fa7e17"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`@kev_nz/async-tools-downloads`}
              name="@kev_nz/async-tools"
              stroke="#7a9792"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`back-off-downloads`}
              name="back-off"
              stroke="#1957fb"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`pxpay-downloads`}
              name="pxpay"
              stroke="#c495f0"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`pxpost-downloads`}
              name="pxpost"
              stroke="#fb4c19"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`isom-downloads`}
              name="isom"
              stroke="#8f98ff"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`year-month-day-downloads`}
              name="year-month-day"
              stroke="#ff4674"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`1stand15th-downloads`}
              name="1stand15th"
              stroke="#c8fb19"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`xtconf-downloads`}
              name="xtconf"
              stroke="#0c837f"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={`fuxor-downloads`}
              name="fuxor"
              stroke="#ffe31d"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              name="nom-de-plume"
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
              name="@kev_nz/lokijs"
              stroke="#387d32"
              activeDot={{ r: 4 }}
            />

            <Line
              type="monotone"
              dataKey={`days-in-a-row-downloads`}
              name="days-in-a-row"
              stroke="#74d600"
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </Column>
      </Columns>
      <Columns>
        <Column is="12">
          {duration && (
            <BarChart
              width={900}
              height={400}
              data={o}
              margin={{
                top: 5,
                right: 30,
                left: 30,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar
                type="monotone"
                dataKey={`@brightleaf/elements-downloads`}
                name="@brightleaf/elements"
                fill="#00d1b2"
                {...stacked}
              />
              <Bar
                type="monotone"
                dataKey={`@brightleaf/react-hooks-downloads`}
                name="@brightleaf/react-hooks"
                fill="#1c8cdc"
                {...stacked}
              />
              <Bar
                type="monotone"
                dataKey={`react-form-elements-downloads`}
                name="react-form-elements"
                fill="#ea485c"
                {...stacked}
              />
              <Bar
                type="monotone"
                dataKey={`creature-features-downloads`}
                name="creature-features"
                fill="#fa7e17"
                {...stacked}
              />
              <Bar
                type="monotone"
                dataKey={`@kev_nz/async-tools-downloads`}
                name="@kev_nz/async-tools"
                fill="#7a9792"
                {...stacked}
              />
              <Bar
                type="monotone"
                dataKey={`back-off-downloads`}
                name="back-off"
                fill="#1957fb"
                {...stacked}
              />
              <Bar
                type="monotone"
                dataKey={`pxpay-downloads`}
                name="pxpay"
                fill="#c495f0"
                {...stacked}
              />
              <Bar
                type="monotone"
                dataKey={`pxpost-downloads`}
                name="pxpost"
                fill="#fb4c19"
                {...stacked}
              />
              <Bar
                type="monotone"
                dataKey={`isom-downloads`}
                name="isom"
                fill="#8f98ff"
                {...stacked}
              />
              <Bar
                type="monotone"
                dataKey={`year-month-day-downloads`}
                name="year-month-day"
                fill="#ff4674"
                {...stacked}
              />
              <Bar
                type="monotone"
                dataKey={`1stand15th-downloads`}
                name="1stand15th"
                fill="#c8fb19"
                {...stacked}
              />
              <Bar
                type="monotone"
                dataKey={`xtconf-downloads`}
                name="xtconf"
                fill="#0c837f"
                {...stacked}
              />
              <Bar
                type="monotone"
                dataKey={`fuxor-downloads`}
                name="fuxor"
                fill="#ffe31d"
                {...stacked}
              />
              <Bar
                type="monotone"
                name="nom-de-plume"
                dataKey={`nom-de-plume-downloads`}
                fill="#63323e"
                {...stacked}
              />
              <Bar
                type="monotone"
                dataKey={`alternative-facts-downloads`}
                fill="#b43e32"
                {...stacked}
              />

              <Bar
                type="monotone"
                dataKey={`@kev_nz/lokijs-downloads`}
                name="@kev_nz/lokijs"
                fill="#387d32"
                {...stacked}
              />

              <Bar
                type="monotone"
                dataKey={`days-in-a-row-downloads`}
                name="days-in-a-row"
                fill="#74d600"
                {...stacked}
              />
            </BarChart>
          )}
          <br />
          <br />
          <br />
          <br />
        </Column>
      </Columns>
    </>
  )
}

export default StatsPage