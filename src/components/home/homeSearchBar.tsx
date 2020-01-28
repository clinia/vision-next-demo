import { Component } from 'react'
import { Vision, Configure } from 'react-vision-dom'
import cliniasearch from 'cliniasearch/lite'
import getConfig from 'next/config'

import { Router } from '../../config/i18n'
import SearchBar from '../shared/searchBar'
import { createQuery } from '../../utils'

interface State {
  errors: {
    autocompleteError: boolean
    locationError: boolean
  }
  values: {
    autocomplete: string
  }
}

// Search client config
const {
  publicRuntimeConfig: { clientName, clientApiKey },
} = getConfig()
interface Props {}
const searchClient = cliniasearch(clientName, clientApiKey)

class HomeSearchBar extends Component<Props, State> {
  state = {
    errors: {
      autocompleteError: false,
      locationError: false,
    },
    values: {
      autocomplete: null,
    },
  }

  ////
  //  Check if autocomple value is set
  //  Keep value in case that user did not select in dropdown (value will not be set in context)
  ////
  handleAutocompleteChange = e => {
    const {
      target: { value },
    } = e
    this.setState({
      errors: { ...this.state.errors, autocompleteError: !value },
      values: { autocomplete: value },
    })
  }

  handleLocationChange = e => {
    const {
      target: { value },
    } = e
    this.setState({
      errors: { ...this.state.errors, locationError: !value },
    })
  }

  handleSearchStateChange = e => {
    const {
      errors: { locationError, autocompleteError },
      values: { autocomplete },
    } = this.state

    var { location } = e

    // Check if fields have error
    if (locationError || autocompleteError) {
      return
    }

    // Check values and set error if fields are missing
    if (!location || !autocomplete) {
      this.setState({
        errors: { autocompleteError: !autocomplete, locationError: !location },
      })
      return
    }

    // All params are set, trigger search
    Router.push(`/search?${createQuery({ location, query: autocomplete })}`)
  }

  render() {
    const {
      errors: { autocompleteError, locationError },
    } = this.state
    return (
      <Vision
        searchClient={searchClient}
        indexName="health_facility" // only search in "health_facility" index
        onSearchStateChange={this.handleSearchStateChange}
      >
        {/* Add search configuration */}
        <Configure perPage={20} queryType="prefix_last" />
        <SearchBar
          errors={{ autocompleteError, locationError }}
          onAutocompleteChange={this.handleAutocompleteChange}
          onLocationChange={this.handleLocationChange}
        />
      </Vision>
    )
  }
}

export default HomeSearchBar
