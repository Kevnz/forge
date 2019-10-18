import React, { Component, Fragment } from 'react'
import { Router, LocationProvider, createHistory } from '@reach/router'
import {
  Hero,
  HeroBody,
  Section,
  Title,
  SubTitle,
  NavBar,
  NavBarBrand,
} from '@brightleaf/elements'
import createHashSource from 'hash-source'
import { NavMenu } from '../components/menu'
import './app.scss'

const source = createHashSource()
const history = createHistory(source)

const About = React.lazy(() => import('../features/about'))
const Home = React.lazy(() => import('../features/home'))
const Contact = React.lazy(() => import('../features/contact'))
const Confirm = React.lazy(() => import('../features/confirms'))
const Hidden = React.lazy(() => import('../features/hidden'))

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar isPrimary isFixedTop>
          <NavBarBrand
            src="/flames.png"
            href="https://brightleaf.dev"
            target="navbarBasicExample"
            width="32"
            height="32"
          />
        </NavBar>
        <NavMenu />
        <Section>
          <LocationProvider history={history}>
            <React.Suspense fallback={<div>Loading</div>}>
              <Router>
                <Home path="/" />
                <About path="/about" />
                <Contact path="/contact" />
                <Hidden path="/hidden/contact" />
                <Confirm path="/confirm" />
              </Router>
            </React.Suspense>
          </LocationProvider>
        </Section>
      </Fragment>
    )
  }
}
