import React from 'react'
import {
  Section,
  Title,
  SubTitle,
  Container,
  Control,
  Icon,
  Button,
  Column,
  Columns,
} from '@brightleaf/elements'
import { Link } from '@reach/router'
import { useTriggerEvent, useBindToEvent } from '../hooks/use-events'
export default () => {
  const fireEvent = useTriggerEvent('forge-event')
  useBindToEvent('forge-event', payload => {
    console.info('custom event handler', payload)
  })

  return (
    <Section>
      <Title>Make Things</Title>
      <SubTitle as="p">Create awesome things</SubTitle>
      <Container>
        <Columns>
          <Column>
            <Button
              onClick={e => {
                e.preventDefault()
                fireEvent({ data: 'Hi' })
              }}
            >
              Fire
            </Button>
          </Column>
        </Columns>
      </Container>
    </Section>
  )
}
