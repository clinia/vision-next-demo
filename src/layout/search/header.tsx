import * as React from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import { Router } from '../../config/i18n'

import SearchBar from '../../components/shared/searchBar'

interface Props extends WithTranslation {}
interface State {
  errors: {
    autocompleteError: boolean
    locationError: boolean
  }
  values: {
    autocomplete: string
  }
}
class Header extends React.PureComponent<Props, State> {
  state = {
    errors: {
      autocompleteError: false,
      locationError: false,
    },
    values: {
      autocomplete: null,
    },
  }

  // Handle language transition
  changeLanguage = lng => {
    const { i18n } = this.props
    i18n.changeLanguage(lng)
  }

  handleAutocompleteChange = value => {
    this.setState({
      errors: { ...this.state.errors, autocompleteError: !value },
      values: { autocomplete: value },
    })
  }

  handleLocationChange = value => {
    this.setState({
      errors: { ...this.state.errors, locationError: !value },
    })
  }

  render() {
    const { i18n } = this.props
    const {
      errors: { autocompleteError, locationError },
    } = this.state

    const oppositeLanguage = i18n.language == 'en' ? 'fr' : 'en'
    return (
      <div className="uk-padding-small uk-grid header search-header uk-margin-right uk-margin-left">
        <div className="uk-width-1-5 uk-padding-remove">
          <a onClick={() => Router.push('/')}>
            <img
              src="logo/logo.svg"
              className="uk-align-left search-header__logo uk-margin-remove"
            />
          </a>
        </div>
        <div className="uk-width-3-5 header-search-bar">
          <SearchBar
            errors={{ autocompleteError, locationError }}
            onAutocompleteChange={this.handleAutocompleteChange}
            onLocationChange={this.handleLocationChange}
          />
        </div>
        <div className="uk-width-1-5">
          <div
            onClick={() => this.changeLanguage(oppositeLanguage)}
            className="uk-align-right search-header__language-change"
          >
            {oppositeLanguage}
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation('common')(Header)
