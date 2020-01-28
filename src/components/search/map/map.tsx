import { Component, Fragment } from 'react'
import { GoogleMapsLoader } from 'react-vision-dom-maps'
import * as ReactDOMServer from 'react-dom/server'
import getConfig from 'next/config'
import { WithTranslation, withTranslation } from 'react-i18next'
import { GeoSearch, CustomMarker, Control } from 'react-vision-dom-maps'
import classNames from 'classnames'

import mapStyles from './config/mapStyle.json'
import Tooltip from './tooltip'

const {
  publicRuntimeConfig: { googleMapApi },
} = getConfig()

interface Props extends WithTranslation {
  selectedRecord?: any
  defaultRefinement?: any
}

class Map extends Component<Props> {
  InfoWindow

  onClickMarker = (record, marker) => {
    const { t } = this.props
    if (!this.InfoWindow) {
      this.InfoWindow = new google.maps.InfoWindow({ maxWidth: 300 })
    }

    if (this.InfoWindow.getMap()) {
      this.InfoWindow.close()
    }

    // downside: If language change without a page reload, the html here won't change
    const html = ReactDOMServer.renderToString(<Tooltip record={record} t={t} />)
    this.InfoWindow.setContent(html)
    this.InfoWindow.open(marker.getMap(), marker)
  }

  renderGeoHit = record => {
    const { selectedRecord } = this.props

    return (
      <CustomMarker
        key={record.id}
        record={record}
        anchor={{ x: 0, y: 0 }}
        onClick={({ marker }) => this.onClickMarker(record, marker)}
      >
        <div
          className={classNames('custom-marker', {
            'custom-marker-active': selectedRecord && record.id === selectedRecord.id,
          })}
        />
      </CustomMarker>
    )
  }

  render() {
    const { defaultRefinement, t } = this.props
    return (
      <GoogleMapsLoader apiKey={googleMapApi}>
        {google => (
          <GeoSearch
            google={google}
            initialZoom={6}
            styles={mapStyles}
            defaultRefinement={defaultRefinement}
            gestureHandling={'greedy'}
            zoomControl={false}
          >
            {({ records }) => (
              <Fragment>
                <Control
                  translations={{
                    control: t('search:map.controls.moveSearch'),
                    redo: t('search:map.controls.redoSearch'),
                  }}
                />
                {records.map(this.renderGeoHit)}
              </Fragment>
            )}
          </GeoSearch>
        )}
      </GoogleMapsLoader>
    )
  }
}

export default withTranslation(['common', 'search'])(Map)
