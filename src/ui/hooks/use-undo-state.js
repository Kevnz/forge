import { useState } from 'react'



const useUndoState = (initialValue) => {
  const states = []
  states.push(initialValue)
  const [state, setStateVar] = useState(initialValue)
  const setState = newValue => {
    states.push(newValue)
    setStateVar(newValue)
  }
  const undoState = () => {
    states.pop()
    setStateVar(states[states.length])
  }

  return [ state, setState, undoState ]
}

export { useUndoState }

export default useUndoState
