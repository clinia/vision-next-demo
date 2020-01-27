import { WithTranslation, withTranslation } from 'react-i18next'
import { Component } from 'react'
import { AutoComplete, Location } from 'react-vision-dom'
import classNames from 'classnames'

interface Props extends WithTranslation {
  errors: {
    autocompleteError: boolean
    locationError: boolean
  }
  onAutocompleteChange?: (event) => void
  onLocationChange?: (event) => void
}

class HomeSearchBar extends Component<Props> {
  handleAutocompleteChange = e => {
    const { onAutocompleteChange } = this.props
    if (onAutocompleteChange) onAutocompleteChange(e)
  }
  handleLocationChange = e => {
    const { onLocationChange } = this.props
    if (onLocationChange) onLocationChange(e)
  }

  render() {
    const {
      t,
      i18n: { language },
      errors: { autocompleteError, locationError },
    } = this.props
    return (
      <div className="uk-flex">
        <div className="example-autoComplete uk-width-1-2">
          <div className="autocomplete-label">{t('common:autocomplete.label')}</div>
          <AutoComplete
            translations={{ placeholder: t('common:autocomplete.placeholder') }}
            onChange={this.handleAutocompleteChange}
            className={classNames({ 'with-error': autocompleteError })}
          />
        </div>
        <div className="example-location uk-width-1-2">
          <div className="autocomplete-label">{t('common:location.label')}</div>
          <Location
            translations={{ placeholder: t('common:location.placeholder') }}
            types={['postcode', 'place', 'neighborhood']}
            country={['CA']}
            locale={language}
            onChange={this.handleLocationChange}
            className={classNames({ 'with-error': locationError })}
          />
        </div>
      </div>
    )
  }
}

export default withTranslation(['common'])(HomeSearchBar)
