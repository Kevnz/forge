import React from 'react'
import {
  Section,
  Title,
  SubTitle,
  Container,
  Loader,
} from '@brightleaf/elements'

export default () => {
  return (
    <Section>
      <Title>Make Things</Title>
      <SubTitle>Create awesome things</SubTitle>
      <Container>
        <br />
        <Loader isSize1 />
        <br />
        <Loader isSize2 />
        <br />
        <Loader isSize3 />
        <br />
        <Loader isSize4 />
        <br />
        <Loader isSize5 />
        <br />
        <Loader isSize6 />
        <br />
        <Loader isSize7 />
      </Container>
    </Section>
  )
}
