import { useEffect } from 'react'

const useTriggerEvent = eventName => {
  let event
  return payload => {
    if (window.CustomEvent && typeof window.CustomEvent === 'function') {
      event = new CustomEvent(eventName, { bubbles: true, detail: payload })
    } else {
      event = document.createEvent('CustomEvent')
      event.initCustomEvent(eventName, true, true, payload)
    }
    document.dispatchEvent(event)
  }
}

const useBindToEvent = (eventName, handler) => {
  useEffect(() => {
    document.addEventListener(eventName, handler)
    return () => {
      document.removeEventListener(eventName, handler)
    }
  }, [eventName])
}

export { useTriggerEvent, useBindToEvent }
