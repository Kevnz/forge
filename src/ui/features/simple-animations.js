import React from 'react'
import {
  Section,
  Title,
  SubTitle,
  Container,
  BreadcrumbItem,
  Breadcrumb,
} from '@brightleaf/elements'
import { Link } from '@reach/router'
import { Animated } from '../components/animated'

export default () => {
  return (
    <Section>
      <Title>Make Things</Title>
      <SubTitle>Create awesome things</SubTitle>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/animation">Animations</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/simple-animations">Example Animations</Link>
        </BreadcrumbItem>
      </Breadcrumb>
      <br />
      <Container>
        <br />
        <Animated animation="lightSpeedIn" delay={2}>
          Hi
        </Animated>
        <Animated animation="lightSpeedOut" delay={3}>
          Bye
        </Animated>
        <Animated animation="hinge" delay={5}>
          Hinge
        </Animated>

        <hr />
      </Container>
    </Section>
  )
}
