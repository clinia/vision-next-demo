import { Component } from 'react'
import qs from 'qs'
import { findResultsState } from 'react-vision-dom/server'
import cliniasearch from 'cliniasearch/lite'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash'
import { withRouter } from 'next/router'

import SearchPage from '../../components/search/searchPage'

interface Props {
  searchState: any
  resultsState: any
  router: any
}

// Debounce for url creation
const updateAfter = 700

const createURL = state => `?${qs.stringify(state)}`

const pathToSearchState = path => {
  const state = path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {}
  console.log(`pathToSearchState`, state)
  return state
}

const searchStateToURL = searchState => {
  const url = searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : ''
  console.log(`searchStateToURL`, url)
  return url
}

// Search client config
const searchClient = cliniasearch('demo-pharmacies', 'KcLxBhVFP8ooPgQODlAxWqfNg657fTz9')

const createUrl = state => {
  return `?${qs.stringify(state)}`
}

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
      console.log(`getDerivedStateFromProps`)
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

      this.props.router.push(href, href, {
        shallow: true,
      })
    }, updateAfter)

    this.setState({ searchState })
  }

  render() {
    return (
      <SearchPage
        {...DEFAULT_PROPS}
        searchState={this.state.searchState}
        resultsState={this.props.resultsState}
        onSearchStateChange={this.onSearchStateChange}
        createURL={createURL}
      />
    )
  }
}

export default withRouter(SearchWrapper)
