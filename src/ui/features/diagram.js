import React from 'react'
import { Section, Title, SubTitle, Container } from '@brightleaf/elements'
import { Flowpoint, Flowspace } from 'flowpoints'

export default () => {
  return (
    <Section>
      <Title>Make Things</Title>
      <SubTitle>Create awesome things</SubTitle>
      <Container>
        <Flowspace>
          <Flowpoint key="point_a" outputs={['point_b']} theme="indigo">
            Hello world ...
          </Flowpoint>
          <Flowpoint key="point_b" theme="green">
            I am point b ...
          </Flowpoint>
        </Flowspace>
      </Container>
    </Section>
  )
}
