import React from 'react'
import {
  Section,
  Title,
  SubTitle,
  Container,
  Button,
  Loader,
  Notification,
} from '@brightleaf/elements'
import fnf from '1stand15th'
import ymd from 'year-month-day'
import days from 'days-in-a-row'
import daylight from '@kev_nz/daylight'
export default () => {
  const twoWeeks = days(new Date('01/01/2017'), 14)

  const allTheDates = twoWeeks.map(day => new Date(day))
  const day = new Date('01/01/2015')
  const ymdResult = ymd(day)
  const prettyDates = allTheDates.map(day => {
    return <li key={`${day.toString()}`}>{daylight('l, F jS', day)}</li>
  })
  const year2018 = fnf(2018).map(day => {
    return <li key={`${day}`}>{day}</li>
  })

  return (
    <Section>
      <Title>Make Things</Title>
      <SubTitle as="p">Create awesome things</SubTitle>
      <Container>
        <br />
        <Title>Days in a Row</Title>
        <ul>{prettyDates}</ul>
        <hr />
        <Title>1st and 15th</Title>
        <ul>{year2018}</ul>
        <hr />
        <Title>Year Month Day</Title>
        <ul>
          <li>Year: {ymdResult.year}</li>
          <li>Month: {ymdResult.month}</li>
          <li>Day: {ymdResult.day}</li>
        </ul>
      </Container>
    </Section>
  )
}
