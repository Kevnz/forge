import React from 'react'
import {
  Section,
  Title,
  SubTitle,
  Container,
  Menu,
  MenuLabel,
  MenuList,
  MenuListItem,
} from '@brightleaf/elements'
import { Link } from '@reach/router'
import modules from '../data/my-packages'
export default () => (
  <Section>
    <Title>Make Things</Title>
    <SubTitle as="p">Create awesome things</SubTitle>
    <Container>
      <br />
      <Menu>
        <MenuLabel>
          <SubTitle as="p">Items</SubTitle>
        </MenuLabel>
        <MenuList className="menu-list">
          <MenuListItem>
            <Link to="/contact">Contact Form</Link>
          </MenuListItem>
          <MenuListItem>
            <Link to="/confirm">Confirm Button Example</Link>
          </MenuListItem>
          <MenuListItem>
            <Link to={`/package/${modules[0].slug}`}>
              View stats for {modules[0].title}
            </Link>
          </MenuListItem>
        </MenuList>

        <MenuLabel>
          <SubTitle as="p">Graphing</SubTitle>
        </MenuLabel>
        <MenuList className="menu-list">
          <MenuListItem>
            <Link to="/stats">Sparklines</Link>
          </MenuListItem>
          <MenuListItem>
            <Link to="/tracking">Charting NPM Packages</Link>
          </MenuListItem>
          <MenuListItem>
            <Link to={`/package/${modules[0].slug}`}>
              Stats for {modules[0].title}
            </Link>
          </MenuListItem>
        </MenuList>
      </Menu>
    </Container>
  </Section>
)
