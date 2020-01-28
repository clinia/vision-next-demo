import { Component } from 'react'
import moment from 'moment'
import { WithTranslation, withTranslation } from 'react-i18next'
import classNames from 'classnames'

const hoursFormat = 'HH:mm'

interface Props extends WithTranslation {
  openingHours: any
  compact?: boolean
  style?: React.CSSProperties
  className?: string
}

class OpeningHours extends Component<Props> {
  render() {
    const { openingHours, compact, style, t, className } = this.props

    let openingHoursText

    if (!openingHours) {
      openingHoursText = <span>{t('common:openingHours.noOpeningHours')}</span>
    } else {
      const now = moment()

      const todayOpeningHourIntervals = openingHours[now.isoWeekday()]

      // No opening hours for today (null)
      if (!todayOpeningHourIntervals)
        openingHoursText = <span>{t('common:openingHours.noOpeningHours')}</span>

      // Closed today
      if (todayOpeningHourIntervals.length === 0) {
        openingHoursText = (
          <>
            {!compact && <span className="dot dot--closed" />}
            <span>{t('common:openingHours.closedToday')}</span>
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
              <span className="open">{t('common:openingHours.open24Today')}</span>
            </>
          )
        } else if (now.isBefore(startHour)) {
          openingHoursText = (
            <>
              {!compact && <span className="dot" />}
              <span className="open">{t('common:openingHours.openToday')}: </span>
              <span>
                {startHour.format('LT')} - {endHour.format('LT')}
              </span>
            </>
          )
        } else if (now.isAfter(startHour) && now.isAfter(endHour)) {
          openingHoursText = (
            <>
              {!compact && <span className="dot dot--closed" />}
              <span className="open">{t('common:openingHours.closedNow')}</span>
            </>
          )
        } else {
          openingHoursText = (
            <>
              {!compact && <span className="dot" />}
              <span className="open">{t('common:openingHours.openNow')} </span>
              <span>
                {t('common:openingHours.until')} {endHour.format('LT')}
              </span>
            </>
          )
        }
      }
    }

    return (
      <div style={style} className={classNames(className, 'opening-hours')}>
        <span>{openingHoursText}</span>
      </div>
    )
  }
}

export default withTranslation(['common'])(OpeningHours)
