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
import Highlight from '../components/hightlight'

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
              if (anim === allAnimations.length) {
                setAnim(0)
              } else {
                setAnim(anim + 1)
              }
            }, 50)
          }}
        >
          <Message isLink>
            <MessageBody>Animation: {allAnimations[anim]}</MessageBody>
          </Message>
        </Animated>

        <hr />
        <Highlight className="javascript" languages={['javascript']}>
          {`
import React from 'react'
import { Message, MessageBody } from '@brightleaf/elements'
import { Animated } from 'animated'
import { allAnimations } from 'animations'

export default () => {

  const [anim, setAnim] = useState(0)
  return (
    <Container>
      <br />
      <Animated
        delay={2}
        animation={allAnimations[anim]}
        onAnimationEnd={() => {
          setTimeout(() => {
            if (anim === allAnimations.length) {
              setAnim(0)
            } else {
              setAnim(anim + 1)
            }
          }, 50)
        }}
      >
        <Message isLink>
          <MessageBody>Animation: {allAnimations[anim]}</MessageBody>
        </Message>
      </Animated>
    </Container>
  )
}
`}
        </Highlight>
      </Container>
    </Section>
  )
}
