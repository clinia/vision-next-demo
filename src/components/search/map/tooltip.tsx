import { Component } from 'react'
import { TFunction } from 'next-i18next'

import OpeningHours from '../../shared/openingHours'
import { phoneFormatter, getGoogleMapItinearyLink, distanceFormatter } from '../../../utils'
import Record from '../../../types/record'

import PhoneIcon from '../../../assets/icons/phone.svg'

interface Props {
  record: Record
  t: TFunction
  onRecordOver?: (record: Record) => void
}

class Tooltip extends Component<Props> {
  render() {
    const { t, record } = this.props
    const mapLink = getGoogleMapItinearyLink(record.address.streetAddress)

    return (
      <div className="map-tooltip">
        <div className="card-badge">
          <span>{record.type}</span>
        </div>
        {record.distance && (
          <div className="record-distance">{distanceFormatter(record.distance)}</div>
        )}
        <h3>{record.name}</h3>
        <div>
          {mapLink && (
            <a href={mapLink} target="_blank" rel="noopener noreferrer">
              {t('search:map.tooltip.getDirections')}
            </a>
          )}
          <OpeningHours
            openingHours={record.openingHours}
            compact={true}
            style={{ marginTop: 5 }}
          />
          {Array.isArray(record.phones) && record.phones.length > 0 && (
            <a
              href={`tel:${record.phones[0].countryCode}${record.phones[0].number}`}
              style={{ marginTop: 5, display: 'block' }}
            >
              <span className="phone-icon">
                <PhoneIcon />
              </span>
              {phoneFormatter(record.phones[0].number)}
            </a>
          )}
        </div>
      </div>
    )
  }
}

export default Tooltip
