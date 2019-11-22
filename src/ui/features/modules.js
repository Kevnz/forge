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
  Breadcrumb,
  BreadcrumbItem,
} from '@brightleaf/elements'
import { Link } from '@reach/router'
import modules from '../data/my-packages'
export default () => (
  <Section>
    <Title>Make Things</Title>
    <SubTitle as="p">Create awesome things</SubTitle>
    <Container>
      <br />
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/modules">Modules</Link>
        </BreadcrumbItem>
      </Breadcrumb>
      <Menu>
        <MenuLabel>
          <SubTitle as="p">Module Info</SubTitle>
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
