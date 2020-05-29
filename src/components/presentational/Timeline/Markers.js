import React from 'react'
import colors, { sizes } from '../../../common/global'

const TimelineMarkers = ({
  styles,
  getEventX,
  getCategoryY,
  transitionDuration,
  selected,
  dims,
  features
}) => {
  function renderMarker (event) {
    function renderCircle () {
      const yVal = (features.GRAPH_NONLOCATED && !event.latitude && !event.longitude)
        ? event.projectOffset >= 0 ? dims.trackHeight - event.projectOffset : dims.marginTop
        : getCategoryY ? getCategoryY(event.category) : () => null

      return <circle
        className='timeline-marker'
        cx={0}
        cy={0}
        stroke={styles ? styles.stroke : colors.primaryHighlight}
        stroke-opacity='1'
        stroke-width={styles ? styles['stroke-width'] : 1}
        stroke-linejoin='round'
        stroke-dasharray={styles ? styles['stroke-dasharray'] : '2,2'}
        style={{
          'transform': `translate(${getEventX(event.timestamp)}px, ${yVal}px)`,
          '-webkit-transition': `transform ${transitionDuration / 1000}s ease`,
          '-moz-transition': 'none',
          'opacity': 0.9
        }}
        r={sizes.eventDotR * 2}
      />
    }
    function renderBar () {
      return <rect
        className='timeline-marker'
        x={0}
        y={0}
        width={sizes.eventDotR / 3}
        height={dims.contentHeight - 55}
        stroke={styles ? styles.stroke : colors.primaryHighlight}
        stroke-opacity='1'
        stroke-width={styles ? styles['stroke-width'] : 1}
        stroke-dasharray={styles ? styles['stroke-dasharray'] : '2,2'}
        style={{
          'transform': `translate(${getEventX(event.timestamp)}px)`,
          'opacity': 0.7
        }}
      />
    }
    const isDot = (!features.GRAPH_NONLOCATED && !!event.latitude && !!event.longitude) || (features.GRAPH_NONLOCATED && (event.projectOffset !== -1 || (!!event.latitude && !!event.longitude)))
    switch (event.shape) {
      case 'circle':
        return renderCircle()
      case 'bar':
        return renderBar()
      case 'diamond':
        return renderCircle()
      case 'star':
        return renderCircle()
      default:
        return isDot ? renderCircle() : renderBar()
    }
  }

  return (
    <g
      clipPath={'url(#clip)'}
    >
      {selected.map(event => renderMarker(event))}
    </g>
  )
}

export default TimelineMarkers
