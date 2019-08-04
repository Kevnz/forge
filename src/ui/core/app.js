import React, { Component, Fragment } from 'react'
import { Router, LocationProvider, createHistory } from '@reach/router'
import { Hero, HeroBody, Section, Title, SubTitle } from '@brightleaf/elements'
import createHashSource from 'hash-source'
import { NavMenu } from '../components/menu'
import './app.scss'

const source = createHashSource()
const history = createHistory(source)

const About = React.lazy(() => import('../features/about'))
const Home = React.lazy(() => import('../features/home'))
const Contact = React.lazy(() => import('../features/contact'))
const Hidden = React.lazy(() => import('../features/hidden'))

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Hero isPrimary isBold>
          <HeroBody>
            <Title>
              <img
                className="flame-log"
                src="/flames.png"
                alt="Forged in fire"
              />
              Forge
            </Title>
            <SubTitle>Web App Development</SubTitle>
          </HeroBody>
        </Hero>
        <NavMenu />
        <Section>
          <LocationProvider history={history}>
            <React.Suspense fallback={<div>Loading</div>}>
              <Router>
                <Home path="/" />
                <About path="/about" />
                <Contact path="/contact" />
                <Hidden path="/hidden/contact" />
              </Router>
            </React.Suspense>
          </LocationProvider>
        </Section>
      </Fragment>
    )
  }
}
