import { Component } from 'react'
import { findResultsState } from 'react-vision-dom/server'
import cliniasearch from 'cliniasearch/lite'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash'
import { withRouter } from 'next/router'

import SearchPage from '../../components/search/searchPage'
import { createQuery, getQueryFromPath } from '../../utils'
import { Router } from '../../config/i18n'

interface Props {
  searchState: any
  resultsState: any
  router: any
}

const pathToSearchState = path => getQueryFromPath(path)

const searchStateToURL = searchState => (searchState ? `/search?${createQuery(searchState)}` : '')

// Search client config
const searchClient = cliniasearch('demo-pharmacies', 'KcLxBhVFP8ooPgQODlAxWqfNg657fTz9')

const DEFAULT_PROPS = {
  searchClient,
  indexName: 'health_facility',
}

class SearchWrapper extends Component<Props> {
  debouncedSetState

  static propTypes = {
    router: PropTypes.object.isRequired,
    resultsState: PropTypes.object,
    searchState: PropTypes.object,
  }

  state = {
    searchState: this.props.searchState,
    lastRouter: this.props.router,
  }

  static getInitialProps = async ({ asPath }) => {
    const searchState = pathToSearchState(asPath)

    const resultsState = await findResultsState(SearchWrapper, {
      ...DEFAULT_PROPS,
      searchState,
    })

    return {
      resultsState,
      searchState,
      namespacesRequired: ['common', 'search'],
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(state.lastRouter, props.router)) {
      return {
        searchState: pathToSearchState(props.router.asPath),
        lastRouter: props.router,
      }
    }

    return null
  }

  onSearchStateChange = searchState => {
    clearTimeout(this.debouncedSetState)

    this.debouncedSetState = setTimeout(() => {
      const href = searchStateToURL(searchState)
      console.log(href)
      console.log(searchState)

      Router.push(href)
    }, 700) // Debounce for url creation

    this.setState({ searchState })
  }

  render() {
    return (
      <SearchPage
        {...DEFAULT_PROPS}
        searchState={this.state.searchState}
        resultsState={this.props.resultsState}
        onSearchStateChange={this.onSearchStateChange}
        createURL={createQuery}
      />
    )
  }
}

export default withRouter(SearchWrapper)
