import React, { Component, Fragment } from 'react'
import {
  Router,
  LocationProvider,
  createHistory,
  Link,
  Location,
} from '@reach/router'
import {
  Section,
  NavBar,
  NavBarBrand,
  Menu,
  MenuLabel,
  MenuList,
  MenuListItem,
  Icon,
  NavigationView,
  Loader,
} from '@brightleaf/elements'
import createHashSource from 'hash-source'
import modules from '../data/my-packages'
import Routes from './router'
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
const Modules = React.lazy(() => import('../features/modules'))
const SignUp = React.lazy(() => import('../features/signup'))
const Login = React.lazy(() => import('../features/login'))
const LoaderPage = React.lazy(() => import('../features/loading'))
const Animations = React.lazy(() => import('../features/animations'))
const ChainAnimations = React.lazy(() => import('../features/chain-animations'))
const SimpleAnimations = React.lazy(() =>
  import('../features/simple-animations')
)
const Working = React.lazy(() => import('../features/worker'))
const Missing = React.lazy(() => import('../features/missing'))
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
          <NavigationView isStatic>
            <Menu>
              <MenuLabel>General</MenuLabel>
              <MenuList className="menu-list">
                <MenuListItem>
                  <UpLink to="/">
                    <Icon fas icon="home" /> Home
                  </UpLink>
                </MenuListItem>
                <MenuListItem>
                  <UpLink to="/contact">
                    <Icon fas icon="inbox" /> Contact
                  </UpLink>
                </MenuListItem>
                <MenuListItem>
                  <UpLink to="/confirm">
                    <Icon fas icon="check-circle" /> Confirm
                  </UpLink>
                </MenuListItem>
                <MenuListItem>
                  <UpLink to="/backoff">
                    <Icon fas icon="redo" /> Back Off
                  </UpLink>
                </MenuListItem>
                <MenuListItem>
                  <UpLink to="/stats">
                    <Icon fas icon="chart-line" /> NPM Overview
                  </UpLink>
                </MenuListItem>
                <MenuListItem>
                  <UpLink to="/tracking">
                    <Icon fas icon="chart-pie" /> NPM Details
                  </UpLink>
                </MenuListItem>
                <MenuListItem>
                  <UpLink to={`/package/${modules[0].slug}`}>
                    <Icon fas icon="cogs" /> Module Stats
                  </UpLink>
                </MenuListItem>
                <MenuListItem>
                  <UpLink to="/animations">
                    <Icon fas icon="bacon" /> Animation
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
          </NavigationView>

          <NavBar isPrimary isFixedTop>
            <NavBarBrand
              src="/flames.png"
              href="/"
              target="navbarBasicExample"
              title="The Forge"
              width="32"
              height="32"
            />
          </NavBar>

          <Section>
            <React.Suspense
              fallback={
                <div>
                  <br />
                  <br />
                  <Loader isSize1 />
                </div>
              }
            >
              <Routes />
            </React.Suspense>
          </Section>
        </Fragment>
      </LocationProvider>
    )
  }
}
