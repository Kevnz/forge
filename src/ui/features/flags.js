import React from 'react'
import {
  Section,
  Title,
  SubTitle,
  Icon,
  BreadcrumbItem,
  Breadcrumb,
  Container,
} from '@brightleaf/elements'
import { Link } from '@reach/router'

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
          <Link to="/modules">Modules</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/flags">Feature Flags</Link>
        </BreadcrumbItem>
      </Breadcrumb>
      <br />
      {FEATURES && FEATURES.FeatureFlags && (
        <Title>
          <Icon fas icon="flag" hasTextSuccess /> {'  '} Feature Flags
        </Title>
      )}
      {FEATURES && FEATURES.DisabledFlag && (
        <Title>
          {'  '}
          <Icon fab icon="font-awesome" hasTextWarning /> Disabled Flag
        </Title>
      )}
      {FEATURES && FEATURES.EnabledFlag && (
        <Title>
          {'  '}
          <Icon fab icon="font-awesome" hasTextInfo />
          {'  '}
          Enabled Flag
        </Title>
      )}
      <Container>
        <ul>
          <li>Feature Flag: {FEATURES.FeatureFlags.toString()}</li>
          <li>Disabled Flag: {FEATURES.DisabledFlag.toString()}</li>
          <li>Enabled Flag: {FEATURES.EnabledFlag.toString()}</li>
        </ul>
      </Container>
    </Section>
  )
}
