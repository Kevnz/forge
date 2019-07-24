import React, { useReducer } from 'react'
import classnames from 'classnames'
import { useFormElement } from 'react-form-elements'

const reducer = (state, action) => {
  console.log('state of re', state)
  console.log('action', action)
  switch (action.type) {
    case 'set':
      return { ...state, valid: false, reasons: [] }
    case 'invalid':
      return { ...state, valid: false, reasons: action.payload.reasons }
    case 'valid':
      return {
        ...state,
        valid: true,
        reasons: null,
      }
    case 'error':
      return {
        ...state,
        reasons: null,
        error: action.payload.error,
        valid: false,
      }
    default:
      return state
  }
}

const useValidation = (func, ref) => {
  const [state, dispatcher] = useReducer(reducer, {
    valid: true,
    reasons: null,
  })
  const el = ref.current
  useEffect(() => {
    console.info('use eff', el)

    const change = e => {
      console.log('change called')
      const validationResult = func(e.target.value)
      console.log('validationResult', validationResult)
      if (validationResult && validationResult.valid) {
        dispatcher({ type: 'valid' })
        return
      }
      dispatcher({ type: 'invalid', payload: validationResult })
    }
    if (el) {
      el.addEventListener('change', change)
    }
    return () => {
      if (el) {
        el.removeEventListener('change', change)
      }
    }
  }, [el, func])
  return { ...state }
}

export const TextBoxRow = forwardRef(
  (
    {
      name,
      initialValue,
      label,
      type,
      className,
      labelClassName,
      inputClassName,
      controlClassName,
      children,
      ...otherProps
    },
    ref
  ) => {
    const { id, value, handleChange, inputRef } = useFormElement(
      initialValue,
      ref
    )
    const { valid, ...o } = useValidation(val => {
      console.log('function call')
      if (val && val.length > 4) {
        return {
          valid: true,
        }
      }
      return {
        valid: false,
        reasons: ['The value needs to be greater than 4 characters'],
      }
    }, inputRef)

    const labelStyleProp =
      labelClassName === ''
        ? {}
        : {
            className: labelClassName,
          }
    const inputStyleProp =
      inputClassName === ''
        ? {}
        : {
            className: classnames(inputClassName, { 'is-danger': !valid }),
          }
    const hasLabel = label.length > 0

    console.log('valid', valid)
    console.log('state of v', o)
    return (
      <div className={classnames(`rfe-form__row`, className)}>
        {hasLabel && (
          <label htmlFor={id} {...labelStyleProp}>
            {label || ''}
          </label>
        )}
        <p className={classnames(`control`, controlClassName)}>
          <input
            type={type}
            id={id}
            ref={inputRef}
            name={name}
            onChange={handleChange}
            value={value}
            {...inputStyleProp}
            {...otherProps}
          />
          {children}
        </p>
      </div>
    )
  }
)
