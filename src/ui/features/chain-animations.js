import React, { useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  Section,
  Title,
  SubTitle,
  Container,
  Message,
  MessageBody,
} from '@brightleaf/elements'
import { Link } from '@reach/router'
import { Animated } from '../components/animated'

const sequence = ['bounceIn', 'wobble', 'lightSpeedOut']
export default () => {
  const [anim, setAnim] = useState(0)

  return (
    <Section>
      <Title>Make Things</Title>
      <SubTitle>Create awesome things</SubTitle>
      <Container>
        <br />
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/animation">Animations</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/chained-animations">Chained Animations</Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <br />
        <Animated
          delay={2}
          animation={sequence[anim]}
          onAnimationEnd={() => {
            setTimeout(() => {
              if (sequence.length > anim) {
                setAnim(anim + 1)
              } else {
                setAnim(0)
              }
            }, 50)
          }}
        >
          <Message isLink>
            <MessageBody>Animation: {sequence[anim]}</MessageBody>
          </Message>
        </Animated>

        <hr />
      </Container>
    </Section>
  )
}
