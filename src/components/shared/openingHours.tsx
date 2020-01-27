import React from 'react'
import moment from 'moment'

const hoursFormat = 'HH:mm'

const OpeningHours = ({ openingHours, compact, style }) => {
  let openingHoursText

  if (!openingHours) {
    openingHoursText = <span>No opening hours specified</span>
  } else {
    const now = moment()

    const todayOpeningHourIntervals = openingHours[now.isoWeekday()]

    // No opening hours for today (null)
    if (!todayOpeningHourIntervals) openingHoursText = <span>No opening hours specified</span>

    // Closed today
    if (todayOpeningHourIntervals.length === 0) {
      openingHoursText = (
        <>
          {!compact && <span className="dot dot--closed" />}
          <span>Closed today</span>
        </>
      )
    }

    // Opened today in one intervals
    else if (todayOpeningHourIntervals.length === 1) {
      const firstInterval = todayOpeningHourIntervals[0]

      const startHour = moment(firstInterval.start, hoursFormat)
      const endHour = moment(firstInterval.end, hoursFormat)

      if (firstInterval.start === '00:00' && firstInterval.end === '00:00') {
        openingHoursText = (
          <>
            {!compact && <span className="dot" />}
            <span className="open">Open 24 hours today</span>
          </>
        )
      } else if (now.isBefore(startHour)) {
        openingHoursText = (
          <>
            {!compact && <span className="dot" />}
            <span className="open">Open today: </span>
            <span>
              {startHour.format('LT')} - {endHour.format('LT')}
            </span>
          </>
        )
      } else if (now.isAfter(startHour) && now.isAfter(endHour)) {
        openingHoursText = (
          <>
            {!compact && <span className="dot dot--closed" />}
            <span className="open">Closed now</span>
          </>
        )
      } else {
        openingHoursText = (
          <>
            {!compact && <span className="dot" />}
            <span className="open">Open now </span>
            <span>until {endHour.format('LT')}</span>
          </>
        )
      }
    }
  }

  return (
    <div style={style}>
      <span>{openingHoursText}</span>
    </div>
  )
}

export default OpeningHours
