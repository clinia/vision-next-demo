import { WithTranslation, withTranslation } from 'react-i18next'
import { Component } from 'react'
import { AutoComplete, Location } from 'react-vision-dom'
import classNames from 'classnames'

import DirectionIcon from '../../assets/icons/direction.svg'

interface Props extends WithTranslation {
  errors: {
    autocompleteError: boolean
    locationError: boolean
  }
  onAutocompleteChange?: (value) => void
  onLocationChange?: (value) => void
}

class SearchBar extends Component<Props> {
  handleAutocompleteChange = e => {
    const { onAutocompleteChange } = this.props
    if (onAutocompleteChange) {
      const {
        target: { value },
      } = e
      onAutocompleteChange(value)
    }
  }

  handleLocationChange = e => {
    const { onLocationChange } = this.props
    if (onLocationChange) {
      const {
        target: { value },
      } = e
      onLocationChange(value)
    }
  }

  handleLocationSelected = suggestion => {
    const { onLocationChange } = this.props
    if (onLocationChange) {
      const value = this.getSuggestionValue(suggestion)
      onLocationChange(value)
    }
  }

  ///
  // Transpose suggestion to desired format (display in autocomplete and input value on selection)
  ///
  getSuggestionValue = suggestion => {
    if (!suggestion) return

    switch (suggestion.type) {
      case 'postcode':
        return suggestion.postalCode
      case 'place':
        if (suggestion.regionCode) {
          return `${suggestion.place}, ${suggestion.regionCode}`
        }
        return suggestion.place
      case 'neighborhood':
        if (suggestion.regionCode && suggestion.place) {
          return `${suggestion.neighborhood}, ${suggestion.place}, ${suggestion.regionCode}`
        }
        return suggestion.neighborhood
    }
  }

  renderLocationSuggestion = suggestion => {
    if (!suggestion) return

    const { t } = this.props

    if (suggestion.type == 'user') {
      return (
        <div className="user-position">
          <DirectionIcon />
          {t('search:locationAutocomplete.userPosition')}
        </div>
      )
    }

    const value = this.getSuggestionValue(suggestion)

    if (value) {
      return <div>{value}</div>
    }
  }

  render() {
    const {
      t,
      i18n: { language },
      errors: { autocompleteError, locationError },
    } = this.props
    return (
      <div className="uk-grid">
        <div className="example-autocomplete uk-width-1-1 uk-width-1-2@s">
          <div style={{ position: 'relative', width: '100%' }}>
            <div className="autocomplete-label">{t('common:autocomplete.label')}</div>
            <AutoComplete
              translations={{ placeholder: t('common:autocomplete.placeholder') }}
              onChange={this.handleAutocompleteChange}
              className={classNames({ 'with-error': autocompleteError })}
            />
          </div>
        </div>
        <div className="example-location uk-width-1-1 uk-width-1-2@s">
          <div style={{ position: 'relative', width: '100%' }}>
            <div className="autocomplete-label">{t('common:location.label')}</div>
            <Location
              translations={{ placeholder: t('common:location.placeholder') }}
              types={['postcode', 'place', 'neighborhood']}
              country={['CA']}
              locale={language}
              onChange={this.handleLocationChange}
              className={classNames({ 'with-error': locationError })}
              renderSuggestion={this.renderLocationSuggestion}
              suggestionValue={this.getSuggestionValue}
              onSuggestionSelected={this.handleLocationSelected}
              enableUserLocation
              triggerSubmitOnSuggestionSelected
            />
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation(['common', 'search'])(SearchBar)
