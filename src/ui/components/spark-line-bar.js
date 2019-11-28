import React from 'react'
import PropTypes from 'prop-types'
const convertDataToPoints = ({
  data,
  limit,
  width = 1,
  height = 1,
  margin = 0,
  max = Math.max(...data),
  min = Math.min(...data),
}) => {
  const length = data.length

  if (limit && limit < length) {
    data = data.slice(length - limit)
  }

  const verticalFactor = (height - margin * 2) / (max - min || 2)
  const horizontalFactor =
    (width - margin * 2) / ((limit || length) - (length > 1 ? 1 : 0))

  return data.map((d, i) => ({
    x: i * horizontalFactor + margin,
    y: (max === min ? 1 : max - d) * verticalFactor + margin,
  }))
}
const Bars = ({ points, height, style, margin, barWidth }) => {
  console.log('points', points)
  const strokeWidth = 1 * ((style && style.strokeWidth) || 0)
  const marginWidth = margin ? 2 * margin : 0
  const theWidth =
    barWidth || (points && points.length >= 2)
      ? Math.max(0, points[1].x - points[0].x - strokeWidth - marginWidth)
      : 0
  console.log(
    points && points.length >= 2
      ? Math.max(0, points[1].x - points[0].x - strokeWidth - marginWidth)
      : 0
  )
  console.log('thewidth', theWidth)
  console.log('strokeWidth', strokeWidth)
  console.log('(theWidth + strokeWidth) / 2', (theWidth + strokeWidth) / 2)
  if (points.length > 2) {
    console.warn(
      Math.max(0, points[1].x - points[0].x - strokeWidth - marginWidth)
    )
  }

  return (
    <g transform="scale(1,-1)">
      {points.map((p, i) => {
        console.info('p', p)
        console.log('the width?', theWidth)
        return (
          <rect
            key={i}
            x={p.x - (theWidth + strokeWidth) / 2}
            y={-height}
            width={theWidth}
            height={Math.max(0, height - p.y)}
            style={style}
          />
        )
      })}
    </g>
  )
}
const SparkLineBar = ({
  data,
  color,
  width,
  height,
  margin,
  limit,
  style,
  svgWidth,
  svgHeight,
  preserveAspectRatio,
}) => {
  const points = convertDataToPoints({
    data,
    width,
    height,
    margin,
    limit,
  })

  const fullStyle = { ...{ fill: color }, ...style }
  console.log('full style', fullStyle)
  console.log('width', width)
  const barProps = { height, margin, style: fullStyle }
  const svgOpts = {
    style: style,
    viewBox: `0 0 ${width} ${height}`,
    preserveAspectRatio: preserveAspectRatio,
  }
  if (svgWidth > 0) svgOpts.width = svgWidth
  if (svgHeight > 0) svgOpts.height = svgHeight
  console.log('svg opts', svgOpts)
  return (
    <svg {...svgOpts}>
      <Bars points={points} {...barProps} />
    </svg>
  )
}

SparkLineBar.propTypes = {
  svgWidth: PropTypes.number,
  svgHeight: PropTypes.number,
}
SparkLineBar.defaultProps = {
  height: 60,
  width: 240,
  margin: 2,
  color: '#00d1b2',
}

export default SparkLineBar
