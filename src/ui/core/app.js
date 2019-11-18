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
import modules from '../data/my-packages'
import './app.scss'

const source = createHashSource()
const history = createHistory(source)

const About = React.lazy(() => import('../features/about'))
const Home = React.lazy(() => import('../features/home'))
const Contact = React.lazy(() => import('../features/contact'))
const Confirm = React.lazy(() => import('../features/confirms'))
const Hidden = React.lazy(() => import('../features/hidden'))
const Stats = React.lazy(() => import('../features/stats'))
const Tracking = React.lazy(() => import('../features/tracking'))
const TheModule = React.lazy(() => import('../features/module'))
const Dashboard = React.lazy(() => import('../features/dashboard'))
console.log('Tracking', Tracking)

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
                <MenuListItem>
                  <UpLink to="/tracking">
                    <Icon fas icon="chart-pie" /> NPM Stats2
                  </UpLink>
                </MenuListItem>
                <MenuListItem>
                  <UpLink to={`/package/${modules[0].slug}`}>
                    <Icon fas icon="cogs" /> Module Stats
                  </UpLink>
                </MenuListItem>
              </MenuList>
              <br />

              <MenuLabel>
                <Icon fas icon="book" /> Documentation
              </MenuLabel>
              <MenuList className="menu-list">
                <MenuListItem>
                  <a href="https://brightleaf.dev/elements">
                    <Icon fas icon="lightbulb" /> Brightleaf Elements
                  </a>
                </MenuListItem>
                <MenuListItem>
                  <a href="https://brightleaf.dev/hooks">
                    <Icon fas icon="sun" /> React Hooks
                  </a>
                </MenuListItem>
                <MenuListItem>
                  <a href="https://kevinisom.info/react-form-elements">
                    <Icon fas icon="cubes" /> Form Elements
                  </a>
                </MenuListItem>
                <MenuListItem>
                  <a href="https://kevinisom.info/creature-features">
                    <Icon fas icon="pastafarianism" /> Creature Features
                  </a>
                </MenuListItem>
                <MenuListItem>
                  <a href="https://kevinisom.info/back-off">
                    <Icon fas icon="redo" /> Back-Off
                  </a>
                </MenuListItem>
                <MenuListItem>
                  <a href="https://kevinisom.info/async-tools">
                    <Icon fas icon="tools" /> Async Tools
                  </a>
                </MenuListItem>
                <MenuListItem>
                  <a href="https://github.com/kevnz/">
                    <Icon fab icon="github" /> GitHub
                  </a>
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
                <Tracking path="/tracking" />
                <TheModule path="/package/:module" />
                <Dashboard path="/dashboard" />
              </Router>
            </React.Suspense>
          </Section>
        </Fragment>
      </LocationProvider>
    )
  }
}
