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

import { Animated } from '../components/animated'
import modules from '../data/my-packages'

import posts from '../posts'

export default () => {
  console.log('posts', posts)
  const blogPosts = Object.keys(posts).map(p => (
    <a href="#" key={p}>
      {p}
    </a>
  ))
  return (
    <Section>
      <Title>Make Things</Title>
      <SubTitle>Create awesome things</SubTitle>
      <Container>
        <br />
        <Menu>
          <MenuLabel>
            <SubTitle as="span">Items</SubTitle>
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
            <SubTitle as="span">Graphing</SubTitle>
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
          <MenuLabel>
            <SubTitle as="span">Animation</SubTitle>
          </MenuLabel>
          <MenuList className="menu-list">
            <MenuListItem>
              <Link to="/demo-animations">Demo</Link>
            </MenuListItem>
            <MenuListItem>
              <Link to="/chained-animations">Chained Animations</Link>
            </MenuListItem>
            <MenuListItem>
              <Link to="/animations">All Animations</Link>
            </MenuListItem>
          </MenuList>
        </Menu>
      </Container>
    </Section>
  )
}
