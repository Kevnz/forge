import React from 'react'
import {
  Section,
  Title,
  SubTitle,
  Container,
  Control,
  Icon,
  Panel,
  PanelBlock,
  PanelTabs,
  Notification,
  Column,
  Columns,
} from '@brightleaf/elements'
import { Link } from '@reach/router'
import modules from '../data/my-packages'
export default () => (
  <Section>
    <Title>Make Things</Title>
    <SubTitle as="p">Create awesome things</SubTitle>
    <Container>
      <Columns>
        <Column>
          <Notification isShown isDismissible={false} isPrimary>
            <div className="header">?</div>
          </Notification>
        </Column>
        <Column>
          <Notification isShown isDismissible={false}>
            ?
          </Notification>
        </Column>
      </Columns>

      <Panel heading="repositories">
        <PanelBlock as="a">What?</PanelBlock>
      </Panel>
    </Container>
  </Section>
)
