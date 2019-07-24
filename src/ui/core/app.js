import React, { Component, Fragment } from 'react'
import { Router } from '@reach/router'
import { Hero, HeroBody, Section, Title, SubTitle } from '@brightleaf/elements'
import './app.scss'

const About = React.lazy(() => import('../features/about'))
const Home = React.lazy(() => import('../features/home'))
const Contact = React.lazy(() => import('../features/contact'))

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Hero isPrimary isBold>
          <HeroBody>
            <Title>Forge</Title>
            <SubTitle>Web App Development</SubTitle>
          </HeroBody>
        </Hero>
        <Section>
          <React.Suspense fallback={<div>Loading</div>}>
            <Router>
              <Home path="/" />
              <About path="/about" />
              <Contact path="/contact" />
            </Router>
          </React.Suspense>
        </Section>
      </Fragment>
    )
  }
}
