import React from 'react'
import {
  Section,
  Title,
  SubTitle,
  Container,
  Icon,
  BaseIcon,
  StackedIcons,
} from '@brightleaf/elements'

import Highlight from '../components/hightlight'
import useNetworkInfo from '../hooks/use-network-info'

const NoNetworkIcon = () => {
  return (
    <StackedIcons isLarge isLargeFA>
      <BaseIcon icon="wifi" fas className="fa-stack-1x" />
      <BaseIcon icon="ban" fas className="fa-stack-2x" hasTextDanger />
    </StackedIcons>
  )
}
const NetworkUnknownIcon = () => {
  return <Icon isLarge isLargeFA icon="question-circle" fas></Icon>
}

const Network2GIcon = () => {
  return (
    <Icon isLarge isLargeFA icon="mobile-alt" fas hasTextGreyLighter></Icon>
  )
}
const Network3GIcon = () => {
  return <Icon isLarge isLargeFA icon="mobile-alt" fas hasTextGrey></Icon>
}
const Network4GIcon = () => {
  return <Icon isLarge isLargeFA icon="mobile-alt" fas></Icon>
}
export default () => {
  const [network] = useNetworkInfo()
  console.info({ network })

  return (
    <Section>
      <Title>Make Things</Title>
      <SubTitle as="p">Create awesome things - Network Info</SubTitle>
      <Container>
        <br />
        {network.effectiveType === 'unknown' && <NetworkUnknownIcon />}
        {network.effectiveType === '2g' && <Network2GIcon />}
        {network.effectiveType === '3g' && <Network3GIcon />}
        {network.effectiveType === '4g' && <Network4GIcon />}
        <br />
        Current Network Status: {network && network.effectiveType} <hr />
        <Highlight className="javascript" languages={['javascript']}>
          {`


`}
        </Highlight>
      </Container>
    </Section>
  )
}
