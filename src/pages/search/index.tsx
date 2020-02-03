import { Component } from 'react'
import { findResultsState } from 'react-vision-dom/server'
import cliniasearch from 'cliniasearch/lite'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash'
import { withRouter } from 'next/router'
import { Vision, Configure, InfiniteHits } from 'react-vision-dom'
import { NextSeo } from 'next-seo'
import getConfig from 'next/config'

import { createQuery, getQueryFromPath } from '../../utils'
import { Router } from '../../config/i18n'
import Layout from '../../layout/search'
import { i18n } from '../../config/i18n'
import Map from '../../components/search/map/map'
import SearchCard from '../../components/search/results/searchCard'

interface Props {
  searchState: any
  resultsState: any
  router: any
}

const pathToSearchState = path => getQueryFromPath(path)

const searchStateToURL = searchState => (searchState ? `/search?${createQuery(searchState)}` : '')

const namespacesRequired = ['common', 'home', 'search']

// Search client config
const {
  publicRuntimeConfig: { clientName, clientApiKey },
} = getConfig()
const searchClient = cliniasearch(clientName, clientApiKey)

const DEFAULT_PROPS = {
  searchClient,
  indexName: 'health_facility',
}

class SearchWrapper extends Component<Props> {
  debouncedSetState

  static propTypes = {
    router: PropTypes.object,
    resultsState: PropTypes.object,
    searchState: PropTypes.object,
  }

  state = {
    searchState: this.props.searchState,
    lastRouter: this.props.router,
    selectedRecord: null,
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
      namespacesRequired,
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
      Router.push(searchStateToURL(searchState))
    }, 700) // Debounce for url creation

    this.setState({ searchState })
  }

  setSelectedRecord = record => {
    this.setState({ selectedRecord: record })
  }

  render() {
    // this is a fix for ssr + translations. Using next-i18next withTranslation do not expose required getInitialProps function
    const t = i18n.getFixedT(i18n.language, namespacesRequired)
    const { selectedRecord } = this.state
    return (
      <>
        <NextSeo title={t('search:seo.title')} description={t('search:seo.description')} />
        <Vision
          searchClient={searchClient}
          // resultsState={this.props.resultsState}
          onSearchStateChange={this.onSearchStateChange}
          // searchState={searchState}
          createURL={createQuery}
          indexName={DEFAULT_PROPS.indexName}
          // {...this.props}
        >
          <Layout>
            {/* Add search configuration */}
            <Configure perPage={20} queryType="prefix_last" />
            <div className="search-container">
              <div className="uk-flex">
                <div className="uk-width-2-5">
                  <InfiniteHits
                    // Custom hit component with more props than default hit (record only)
                    hitComponent={props => {
                      return (
                        <SearchCard record={props.record} onRecordOver={this.setSelectedRecord} />
                      )
                    }}
                  />
                </div>
                <div className="uk-width-3-5">
                  <Map selectedRecord={selectedRecord} />
                </div>
              </div>
            </div>
          </Layout>
        </Vision>
      </>
    )
  }
}

export default withRouter(SearchWrapper)
