import React, { Component } from 'react'
import { Router } from '@reach/router'

const About = React.lazy(() => import('../features/about'))
const BackOff = React.lazy(() => import('../features/back-off'))
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
const Dates = React.lazy(() => import('../features/dates'))
const Working = React.lazy(() => import('../features/worker'))
const Flags = React.lazy(() => import('../features/flags'))
const NetworkInfo = React.lazy(() => import('../features/network-info'))
const EventPage = React.lazy(() => import('../features/events'))
const BlogPost = React.lazy(() => import('../features/post'))
const Missing = React.lazy(() => import('../features/missing'))

export default class App extends Component {
  render() {
    return (
      <Router>
        <Home path="/" />
        <About path="/about" />
        <Contact path="/contact" />
        <Hidden path="/hidden/contact" />
        <Confirm path="/confirm" />
        <Modules path="/modules" />
        <Stats path="/stats" />
        <Tracking path="/tracking" />
        <TheModule path="/package/:module" />
        <Dashboard path="/dashboard" />
        <SignUp path="/register" />
        <Login path="/login" />
        <LoaderPage path="/loader" />
        <Animations path="/animations" />
        <ChainAnimations path="/chained-animations" />
        <SimpleAnimations path="/demo-animations" />
        <Working path="/workers" />
        <BackOff path="/backoff" />
        <Dates path="/dates" />
        <Flags path="/feature-flags" />
        <NetworkInfo path="/network-info" />
        <EventPage path="/events" />
        <BlogPost path="/posts/:slug" />
        <Missing default />
      </Router>
    )
  }
}
