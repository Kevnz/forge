import { useReducer } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'info':
      return { battery: action.payload.data }
    case 'visible':
      return { visible: true, hidden: false }
    default:
      return state
  }
}

const useBattery = () => {
  if (!navigator.getBattery) return { battery: false, getInfo: () => {} }

  const [state, dispatch] = useReducer(reducer, {
    battery: {},
  })

  const getInfo = () => {
    navigator.getBattery().then(function(battery) {
      console.log('the battery', battery)

      battery.addEventListener('chargingchange', function() {
        console.info('chargingchange')
        dispatch({ type: 'info', payload: { data: battery } })
      })

      battery.addEventListener('levelchange', function() {
        console.info('levelchange')
        dispatch({ type: 'info', payload: { data: battery } })
      })

      battery.addEventListener('chargingtimechange', function() {
        console.info('chargingtimechange')
        dispatch({ type: 'info', payload: { data: battery } })
      })

      battery.addEventListener('dischargingtimechange', function() {
        console.info('dischargingtimechange')
        dispatch({ type: 'info', payload: { data: battery } })
      })
      dispatch({ type: 'info', payload: { data: battery } })
    })
  }

  // dispatch({ type: 'success', payload: { data: {} } })
  return { ...state, getInfo }
}

export { useBattery }

export default useBattery
