import { Component } from 'react'
import { NextSeo } from 'next-seo'

import HomeSearchBar from '../components/home/homeSearchBar'
import Layout from '../layout/default'
import { i18n } from '../config/i18n'

interface Props {}

const namespacesRequired = ['common', 'home']

class HomeWrapper extends Component<Props> {
  getInitialProps = async () => {
    return { namespacesRequired }
  }

  render() {
    // this is a fix for ssr + translations. Using next-i18next withTranslation do not expose required getInitialProps function
    const t = i18n.getFixedT(i18n.language, namespacesRequired)

    return (
      <Layout>
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
      </Layout>
    )
  }
}

export default HomeWrapper
