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
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from 'react-sparklines'

import { useTitle, useGet } from '@brightleaf/react-hooks'

const useStatsGet = pkg => {
  const { data, getUrl } = useGet(
    `https://kev-pi.herokuapp.com/api/package/monthly?pkg=${pkg}`
  )
  useEffect(() => {
    getUrl()
  }, [pkg])

  let downs = [0, 0, 0, 0, 0, 0]
  let totalDownloads = 0
  if (data && data.breakdown) {
    data.breakdown.pop()
    downs = data.breakdown.map(ds => ds.downloads)
    totalDownloads = data.totals.downloads
  }
  return [downs, totalDownloads]
}
const StatsPage = () => {
  useTitle('downloaded packages')
  const [elements, elementsTotal] = useStatsGet('@brightleaf/elements')
  const [hooks, hooksTotal] = useStatsGet('@brightleaf/react-hooks')
  const [rfe, rfeTotal] = useStatsGet('react-form-elements')
  const [creatureFeatures, creatureFeaturesTotal] = useStatsGet(
    'creature-features'
  )
  const [asyncTools, asyncToolsTotal] = useStatsGet('@kev_nz/async-tools')
  const [backOff, backOffTotal] = useStatsGet('back-off')
  const [pxpay, pxpayTotals] = useStatsGet('pxpay')
  const [pxpost, pxpostTotals] = useStatsGet('pxpost')
  const [isom, isomTotals] = useStatsGet('isom')
  const [ymd, ymdTotals] = useStatsGet('year-month-day')
  const [first, firstTotals] = useStatsGet('1stand15th')
  const [xtconf, xtconfTotals] = useStatsGet('xtconf')
  const [fuxor, fuxorTotals] = useStatsGet('fuxor')
  const [ndp, ndpTotals] = useStatsGet('nom-de-plume')
  const [altFacts, altFactsTotals] = useStatsGet('alternative-facts')
  const [diar, diarTotals] = useStatsGet('days-in-a-row')
  const [loki, lokiTotals] = useStatsGet('@kev_nz/lokijs')

  return (
    <>
      <br />
      <Columns>
        <Column is="4">
          <Sparklines data={elements}>
            <SparklinesLine color="#00d1b2" />
          </Sparklines>
        </Column>
        <Column>
          <Title is="4">Brightleaf Elements</Title>
          <SubTitle is="5">Total: {elementsTotal}</SubTitle>
        </Column>
      </Columns>
      <Columns>
        <Column is="4">
          <Sparklines data={hooks}>
            <SparklinesLine color="#1c8cdc" />
          </Sparklines>
        </Column>
        <Column>
          <Title is="4">Brightleaf React-Hooks</Title>
          <SubTitle is="5">Total: {hooksTotal}</SubTitle>
        </Column>
      </Columns>
      <Columns>
        <Column is="4">
          <Sparklines data={rfe}>
            <SparklinesLine color="#ea485c" />
          </Sparklines>
        </Column>
        <Column>
          <Title is="4">React-Form-Elements</Title>
          <SubTitle is="5">Total: {rfeTotal}</SubTitle>
        </Column>
      </Columns>
      <Columns>
        <Column is="4">
          <Sparklines data={creatureFeatures}>
            <SparklinesLine color="#fa7e17" />
          </Sparklines>
        </Column>
        <Column>
          <Title is="4">Creature-Features</Title>
          <SubTitle is="5">Total: {creatureFeaturesTotal}</SubTitle>
        </Column>
      </Columns>
      <Columns>
        <Column is="4">
          <Sparklines data={asyncTools}>
            <SparklinesLine color="#7a9792" />
          </Sparklines>
        </Column>
        <Column>
          <Title is="4">@kev_nz/async-tools</Title>
          <SubTitle is="5">Total: {asyncToolsTotal}</SubTitle>
        </Column>
      </Columns>
      <Columns>
        <Column is="4">
          <Sparklines data={backOff}>
            <SparklinesLine color="#1957fb" />
          </Sparklines>
        </Column>
        <Column>
          <Title is="4">Back-Off</Title>
          <SubTitle is="5">Total: {backOffTotal}</SubTitle>
        </Column>
      </Columns>

      <Columns>
        <Column is="4">
          <Sparklines data={pxpay}>
            <SparklinesLine color="#c495f0" />
          </Sparklines>
        </Column>
        <Column>
          <Title is="4">PxPay</Title>
          <SubTitle is="5">Total: {pxpayTotals}</SubTitle>
        </Column>
      </Columns>
      <Columns>
        <Column is="4">
          <Sparklines data={pxpost}>
            <SparklinesLine color="#fb4c19" />
          </Sparklines>
        </Column>
        <Column>
          <Title is="4">PxPost</Title>
          <SubTitle is="5">Total: {pxpostTotals}</SubTitle>
        </Column>
      </Columns>

      <Columns>
        <Column is="4">
          <Sparklines data={isom}>
            <SparklinesLine color="#8f98ff" />
          </Sparklines>
        </Column>
        <Column>
          <Title is="4">Isom</Title>
          <SubTitle is="5">Total: {isomTotals}</SubTitle>
        </Column>
      </Columns>
      <Columns>
        <Column is="4">
          <Sparklines data={ymd}>
            <SparklinesLine color="#ff4674" />
          </Sparklines>
        </Column>
        <Column>
          <Title is="4">Year-Month-Day</Title>
          <SubTitle is="5">Total: {ymdTotals}</SubTitle>
        </Column>
      </Columns>

      <Columns>
        <Column is="4">
          <Sparklines data={first}>
            <SparklinesLine color="#c8fb19" />
          </Sparklines>
        </Column>
        <Column>
          <Title is="4">1st and 15th</Title>
          <SubTitle is="5">Total: {firstTotals}</SubTitle>
        </Column>
      </Columns>

      <Columns>
        <Column is="4">
          <Sparklines data={xtconf}>
            <SparklinesLine color="#0c837f" />
          </Sparklines>
        </Column>
        <Column>
          <Title is="4">XTConf</Title>
          <SubTitle is="5">Total: {xtconfTotals}</SubTitle>
        </Column>
      </Columns>
      <Columns>
        <Column is="4">
          <Sparklines data={diar}>
            <SparklinesLine color="#74d600" />
          </Sparklines>
        </Column>
        <Column>
          <Title is="4">Days in a row</Title>
          <SubTitle is="5">Total: {diarTotals}</SubTitle>
        </Column>
      </Columns>
      <Columns>
        <Column is="4">
          <Sparklines data={fuxor}>
            <SparklinesLine color="#ffe31d " />
          </Sparklines>
        </Column>
        <Column>
          <Title is="4">Fuxor</Title>
          <SubTitle is="5">Total: {fuxorTotals}</SubTitle>
        </Column>
      </Columns>
      <Columns>
        <Column is="4">
          <Sparklines data={loki}>
            <SparklinesLine color="#387d32" />
          </Sparklines>
        </Column>
        <Column>
          <Title is="4">@kev_nz/lokijs</Title>
          <SubTitle is="5">Total: {lokiTotals}</SubTitle>
        </Column>
      </Columns>
      <Columns>
        <Column is="4">
          <Sparklines data={altFacts}>
            <SparklinesLine color="#b43e32" />
          </Sparklines>
        </Column>
        <Column>
          <Title is="4">Alternative Facts</Title>
          <SubTitle is="5">Total: {altFactsTotals}</SubTitle>
        </Column>
      </Columns>
      <Columns>
        <Column is="4">
          <Sparklines data={ndp}>
            <SparklinesLine color="#63323e" />
          </Sparklines>
        </Column>
        <Column>
          <Title is="4">Nom De Plume</Title>
          <SubTitle is="5">Total: {ndpTotals}</SubTitle>
        </Column>
      </Columns>
    </>
  )
}

export default StatsPage
