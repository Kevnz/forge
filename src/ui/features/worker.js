import React, { useReducer } from 'react'
import {
  Section,
  Title,
  SubTitle,
  Container,
  Button,
} from '@brightleaf/elements'

const random = (min = 0, max = 20) =>
  Math.round(Math.random() * (max - min) + min)
const reducer = (state, action) => {
  const newData = [].concat(state.data).concat([action.payload.data])
  switch (action.type) {
    case 'message':
      return {
        ...state,
        data: newData,
        error: null,
      }
    case 'error':
      return {
        ...state,
        error: true,
        errorDetails: action.payload.error.message,
      }
    default:
      return state
  }
}

const useWorker = srcFile => {
  const theWorker = new Worker(srcFile)
  const [state, dispatch] = useReducer(reducer, {
    data: [],
    error: null,
    errorDetails: null,
  })

  theWorker.onmessage = function(e) {
    console.info('Message received from worker', e)
    dispatch({ type: 'message', payload: { data: e.data } })
  }

  theWorker.onmessageerror = function(e) {
    console.info('Message Error received from worker', e)
    dispatch({ type: 'error', payload: { data: e.data } })
  }
  theWorker.onerror = function(e) {
    console.info('Error received from worker', e)
    dispatch({ type: 'error', payload: { error: e } })
  }
  const postMessage = message => {
    console.log('message to post', message)
    theWorker.postMessage(message)
  }

  return { postMessage, ...state }
}
export default () => {
  const { data, error, errorDetails, postMessage } = useWorker(
    '/workers/simple.worker.js'
  )
  console.info('data from worker', data)
  if (error) {
    console.error(error)
    console.warn(errorDetails)
  }

  return (
    <Section>
      <Title>Make Things</Title>
      <SubTitle>Create awesome things</SubTitle>
      <Container>
        <br />
        <Button
          onClick={e => {
            e.preventDefault()
            postMessage([random(), random()])
          }}
        >
          Post Message
        </Button>
        <br />
        <Button
          onClick={e => {
            e.preventDefault()
            postMessage([0, 0])
          }}
        >
          Post Message to get Error
        </Button>
      </Container>
    </Section>
  )
}
