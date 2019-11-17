import React from 'react'
import { Section, Title, SubTitle } from '@brightleaf/elements'
import { Link } from '@reach/router'
import modules from '../data/my-packages'
export default () => (
  <Section>
    <Title>Make Things</Title>
    <SubTitle as="p">Create awesome</SubTitle>
    <Link to="/contact">Contact Me</Link>
    <br />
    <Link to="/confirm">Confirm Me</Link>
    <br />
    <Link to={`/package/${modules[0].slug}`}>{modules[0].title}</Link>
  </Section>
)
