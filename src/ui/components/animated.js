import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import propTypes from 'prop-types'
import styles from './animated.module.scss'

console.log('styles', styles)
export const Animated = ({
  children,
  animation,
  className,
  speed,
  onAnimationEnd,
  onAnimationStart,
  hideOnOut,
  delay,
}) => {
  const container = useRef()

  useEffect(() => {
    const onEnd = ({ target, animationName }) => {
      if (
        hideOnOut &&
        (animationName.indexOf('Out') > -1 || animationName === 'hinge')
      ) {
        target.classList.add('is-hidden')
      }
      onAnimationEnd()
    }
    const onStart = ({ target, animationName }) => {
      target.classList.remove('is-hidden')
      onAnimationStart()
    }
    const current = container.current
    if (current) {
      current.addEventListener('animationend', onEnd)
      current.addEventListener('animationstart', onStart)
      return () => {
        current.removeEventListener('animationend', onEnd)
        current.removeEventListener('animationstart', onStart)
      }
    }
  }, [animation])

  return (
    <div
      ref={container}
      className={classnames(
        styles.animated,
        className,
        styles[animation],

        {
          [styles[speed]]: !!speed,
          [styles[`delay-${delay}s`]]: !!delay,
        }
      )}
    >
      {children}
    </div>
  )
}

export default Animated

Animated.propTypes = {
  className: propTypes.string,
  animation: propTypes.string,
  speed: propTypes.string,
  onAnimationEnd: propTypes.func,
  onAnimationStart: propTypes.func,
  hideOnOut: propTypes.bool,
  delay: propTypes.number,
}

Animated.defaultProps = {
  animation: 'bounce',
  speed: '',
  onAnimationEnd: () => {},
  onAnimationStart: () => {},
  hideOnOut: true,
}
