import { withTranslation } from 'react-i18next'
import { NextSeo } from 'next-seo'
import PropTypes from 'prop-types'
import { Vision, Configure, InfiniteHits } from 'react-vision-dom'
import { WithTranslation } from 'next-i18next'
import { Component } from 'react'

import Map from './map/map'

interface Props extends WithTranslation {
  searchState: any
  resultsState: any
  onSearchStateChange: Function
  createURL: Function
  indexName: string
  searchClient: any
}

interface State {
  selectedRecord: any
}

class SearchContent extends Component<Props, State> {
  static propTypes = {
    searchState: PropTypes.object,
    resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSearchStateChange: PropTypes.func,
    createURL: PropTypes.func,
    indexName: PropTypes.string,
    searchClient: PropTypes.object,
  }

  state = {
    selectedRecord: null,
  }

  setSelectedRecord = record => {
    this.setState({ selectedRecord: record })
  }

  render() {
    const { t, searchState } = this.props
    const { selectedRecord } = this.state

    return (
      <>
        <NextSeo title={t('search:seo.title')} description={t('search:seo.description')} />
        <Vision
          searchClient={this.props.searchClient}
          resultsState={this.props.resultsState}
          onSearchStateChange={this.props.onSearchStateChange}
          searchState={this.props.searchState}
          createURL={this.props.createURL}
          indexName={this.props.indexName}
          {...this.props}
        >
          {/* Add search configuration */}
          <Configure perPage={20} queryType="prefix_last" />
          <div className="search-container">
            <div className="uk-flex">
              <div className="uk-width-2-5">
                <InfiniteHits />
              </div>
              <div className="uk-width-3-5">
                <Map
                  selectedRecord={selectedRecord}
                  defaultRefinement={searchState?.boundingBox ? searchState.boundingBox : {}}
                />
              </div>
            </div>
          </div>
        </Vision>
      </>
    )
  }
}

export default withTranslation(['common', 'search'])(SearchContent)
