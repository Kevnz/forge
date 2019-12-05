import { useReducer } from 'react'

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

export { useWorker }

export default useWorker
