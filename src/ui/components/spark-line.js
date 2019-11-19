import React from 'react'

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

const SparkLine = ({ data, color, width, height, margin, limit }) => {
  const points = convertDataToPoints({
    data,
    width,
    height,
    margin,
    limit,
  })

  const linePoints = points.map(p => [p.x, p.y]).reduce((a, b) => a.concat(b))

  const closingPoints = [
    points[points.length - 1].x,
    height - margin,
    margin,
    height - margin,
    margin,
    points[0].y,
  ]

  const fillPoints = linePoints.concat(closingPoints)

  const lineStyle = {
    stroke: color,
    strokeWidth: '1',
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
    fill: 'none',
  }

  const fillStyle = {
    stroke: 'none',
    strokeWidth: '0',
    fillOpacity: '.1',
    fill: color,
    pointerEvents: 'auto',
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <polyline points={fillPoints.join(' ')} style={fillStyle}></polyline>
      <polyline points={linePoints.join(' ')} style={lineStyle}></polyline>
    </svg>
  )
}

SparkLine.defaultProps = {
  height: 60,
  width: 240,
  margin: 2,
  color: '#00d1b2',
}

export default SparkLine
