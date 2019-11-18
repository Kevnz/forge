import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Button, Welcome } from '@storybook/react/demo'
import SparkLine from '../src/ui/components/spark-line'

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
))

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))

storiesOf('SparkLine', module)
  .add('with just data array', () => (
    <SparkLine data={[4, 5, 7, 8, 8, 2]}></SparkLine>
  ))
  .add('in constrained box', () => (
    <div style={{ width: 300 }}>
      <SparkLine data={[4, 5, 7, 8, 8, 2]}></SparkLine>
    </div>
  ))
  .add('in constrained box with a custom color', () => (
    <div style={{ width: 300 }}>
      <SparkLine data={[4, 5, 7, 8, 8, 2]} color="#1957fb"></SparkLine>
    </div>
  ))
  .add('with more data', () => (
    <div style={{ width: 300 }}>
      <SparkLine
        color="#fb4c19"
        data={[4, 5, 7, 8, 8, 5, 4, 5, 7, 8, 8, 5, 4, 5, 7, 3, 4, 6]}
      />
    </div>
  ))
