import OpeningHours from '../../shared/openingHours'
import { phoneFormatter, getGoogleMapItinearyLink } from '../../../utils'

const Tooltip = ({ record }) => {
  const mapLink = getGoogleMapItinearyLink(record.address.streetAddress)

  return (
    <div className="example-tooltip">
      <div className="card-badge">
        <span>{record.type}</span>
      </div>
      {record.distance && <div>{record.distance}</div>}
      <h3>{record.name}</h3>
      <div>
        {mapLink && (
          <a href={mapLink} target="_blank" rel="noopener noreferrer">
            Get directions
          </a>
        )}
        <OpeningHours openingHours={record.openingHours} compact={true} style={{ marginTop: 5 }} />
        {Array.isArray(record.phones) && record.phones.length > 0 && (
          <a
            href={`tel:${record.phones[0].countryCode}${record.phones[0].number}`}
            style={{ marginTop: 5, display: 'block' }}
          >
            <img src="/icons/phone.png" className="phone-icon" />
            {phoneFormatter(record.phones[0].number)}
          </a>
        )}
      </div>
    </div>
  )
}

export default Tooltip
