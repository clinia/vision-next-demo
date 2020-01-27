import { NextSeo } from 'next-seo'
import { WithTranslation, withTranslation } from 'react-i18next'
import { Component } from 'react'

import HomeSearchBar from '../../components/home/homeSearchBar'

interface Props extends WithTranslation {}

class HomePage extends Component<Props> {
  render() {
    const { t } = this.props
    return (
      <>
        <NextSeo title={t('home:seo.title')} description={t('home:seo.description')} />
        <div className="home-container" style={{ backgroundImage: "url('img/home_hero.jpg')" }}>
          <div className="uk-container">
            <div className="uk-flex uk-flex-middle">
              <div className="uk-margin-large-bottom home-container__search-bar-content">
                <h1 dangerouslySetInnerHTML={{ __html: t('home:hero.title') }} />
                <p>{t('home:hero.subtitle')}</p>
                <div className="uk-flex">
                  <div className="uk-width-2-3@m">
                    <HomeSearchBar />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withTranslation(['common', 'home'])(HomePage)
