import { Component } from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'

import { getGoogleMapItinearyLink, distanceFormatter } from '../../../utils'
import OpeningHours from '../../shared/openingHours'
import Record from '../../../types/record'

import PhoneIcon from '../../../assets/icons/phone.svg'
import DirectionIcon from '../../../assets/icons/direction.svg'

interface Props extends WithTranslation {
  record: Record
  onRecordOver?: (record: Record) => void
}

class SearchCard extends Component<Props> {
  handleRecordHovered = (reset: boolean = false) => {
    const { onRecordOver, record } = this.props
    if (onRecordOver) {
      onRecordOver(reset ? null : record)
    }
  }

  render() {
    const { t, record } = this.props
    const {
      type,
      address: { streetAddress, place, regionCode },
      phones,
      openingHours,
    } = record

    const mapLink = getGoogleMapItinearyLink(streetAddress)

    return (
      <div
        className="search-card"
        key={record.id}
        onMouseEnter={() => this.handleRecordHovered()}
        onMouseLeave={() => this.handleRecordHovered(true)}
      >
        <div className="search-card-body">
          <div className="search-card-badge">
            <span>{type}</span>
          </div>
          {record.distance && (
            <div className="record-distance">{distanceFormatter(record.distance)}</div>
          )}
          <h3>{record.name}</h3>
          <div>
            <p>{`${streetAddress}, ${place} - ${regionCode}`}</p>
            <OpeningHours openingHours={openingHours} className="search-card-hours" />
          </div>
        </div>
        <div className="search-card-footer">
          {Array.isArray(phones) && phones.length > 0 && (
            <a href={`tel://${phones[0].countryCode}${phones[0].number}`} className="footer-button">
              <span className="phone-icon">
                <PhoneIcon />
              </span>
              {t('search:results.call')}
            </a>
          )}
          <a href={mapLink} target="_blank" rel="noopener noreferrer" className="footer-button">
            <span className="direction-icon">
              <DirectionIcon />
            </span>
            {t('search:results.direction')}
          </a>
        </div>
      </div>
    )
  }
}

export default withTranslation(['search'])(SearchCard)
