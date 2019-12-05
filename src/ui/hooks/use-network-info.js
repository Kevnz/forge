import { useEffect, useReducer } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'info':
      return { network: action.payload.data }
    case 'visible':
      return { visible: true, hidden: false }
    default:
      return state
  }
}

const useNetworkInfo = () => {
  var connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection

  if (!connection) {
    return [{ effectiveType: 'unknown' }]
  }
  const [state, dispatch] = useReducer(reducer, {
    network: {},
  })
  function updateConnectionStatus() {
    console.log('Connection type changed to ' + connection)
    dispatch({ type: 'info', payload: { data: connection } })
  }

  connection.addEventListener('change', updateConnectionStatus)
  useEffect(() => {
    updateConnectionStatus()
  }, [])

  return [state.network]
}

export { useNetworkInfo }

export default useNetworkInfo
