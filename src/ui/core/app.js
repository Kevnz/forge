import React, { Component, Fragment } from 'react'
import {
  Router,
  LocationProvider,
  createHistory,
  Link,
  Location,
} from '@reach/router'
import {
  Hero,
  HeroBody,
  Section,
  Title,
  SubTitle,
  NavBar,
  NavBarBrand,
  NavigationView,
  Menu,
  MenuLabel,
  MenuList,
  MenuListItem,
  Icon,
} from '@brightleaf/elements'
import createHashSource from 'hash-source'
import { NavMenu } from '../components/nav-menu'
import './app.scss'

const source = createHashSource()
const history = createHistory(source)

const About = React.lazy(() => import('../features/about'))
const Home = React.lazy(() => import('../features/home'))
const Contact = React.lazy(() => import('../features/contact'))
const Confirm = React.lazy(() => import('../features/confirms'))
const Hidden = React.lazy(() => import('../features/hidden'))
const Stats = React.lazy(() => import('../features/stats'))

const UpLink = props => {
  return (
    <Location>
      {({ location }) => {
        return (
          <Link
            {...props}
            getProps={prop => {
              const { isCurrent } = prop
              return {
                className: isCurrent
                  ? props.className + ' is-active'
                  : props.className,
              }
            }}
          />
        )
      }}
    </Location>
  )
}
export default class App extends Component {
  render() {
    return (
      <LocationProvider history={history}>
        <Fragment>
          <NavMenu>
            <Menu>
              <MenuLabel>General</MenuLabel>
              <MenuList className="menu-list">
                <MenuListItem>
                  <Link to="/">
                    <Icon fas icon="home" /> Home
                  </Link>
                </MenuListItem>
                <MenuListItem>
                  <Link to="/contact">
                    <Icon fas icon="inbox" /> Contact
                  </Link>
                </MenuListItem>
                <MenuListItem>
                  <UpLink to="/confirm">
                    <Icon fas icon="check-circle" /> Confirm
                  </UpLink>
                </MenuListItem>
                <MenuListItem>
                  <UpLink to="/stats">
                    <Icon fas icon="chart-line" /> NPM Stats
                  </UpLink>
                </MenuListItem>
              </MenuList>
              <MenuLabel>Documentation</MenuLabel>
              <MenuList className="menu-list">
                <MenuListItem>
                  <UpLink to="/layouts">
                    <Icon fas icon="warehouse" /> Layout
                  </UpLink>
                </MenuListItem>
                <MenuListItem>
                  <UpLink to="/forms">
                    <Icon fab icon="wpforms" /> Forms
                  </UpLink>
                </MenuListItem>
                <MenuListItem>
                  <UpLink to="/elements">
                    <Icon fas icon="cube" /> Elements
                  </UpLink>
                </MenuListItem>
                <MenuListItem>
                  <UpLink to="/components">
                    <Icon fas icon="cubes" /> Components
                  </UpLink>
                </MenuListItem>
              </MenuList>
            </Menu>
          </NavMenu>

          <NavBar isPrimary isFixedTop>
            <NavBarBrand
              src="/flames.png"
              href="https://brightleaf.dev"
              target="navbarBasicExample"
              width="32"
              height="32"
            />
          </NavBar>

          <Section>
            <React.Suspense fallback={<div>Loading</div>}>
              <Router>
                <Home path="/" />
                <About path="/about" />
                <Contact path="/contact" />
                <Hidden path="/hidden/contact" />
                <Confirm path="/confirm" />
                <Stats path="/stats" />
              </Router>
            </React.Suspense>
          </Section>
        </Fragment>
      </LocationProvider>
    )
  }
}
