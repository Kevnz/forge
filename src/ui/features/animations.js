import React, { useState } from 'react'
import {
  Section,
  Title,
  SubTitle,
  Container,
  Message,
  MessageBody,
} from '@brightleaf/elements'

import { Animated } from '../components/animated'
import { AnimatedConfig } from '../components/animated-config'

export default () => {
  const animations = Object.keys(AnimatedConfig).map(animationType => {
    return Object.keys(AnimatedConfig[animationType])
  })
  const allAnimations = [].concat(...animations)

  const [anim, setAnim] = useState(0)

  return (
    <Section>
      <Title>Make Things</Title>
      <SubTitle>Create awesome things</SubTitle>
      <Container>
        <br />
        <Animated
          delay={2}
          animation={allAnimations[anim]}
          onAnimationEnd={() => {
            setTimeout(() => {
              setAnim(anim + 1)
            }, 50)
          }}
        >
          <Message isLink>
            <MessageBody>Animation: {allAnimations[anim]}</MessageBody>
          </Message>
        </Animated>

        <hr />
      </Container>
    </Section>
  )
}
