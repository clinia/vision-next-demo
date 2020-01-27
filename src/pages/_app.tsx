import App, { AppContext } from 'next/app'

import { appWithTranslation } from '../config/i18n'
import ErrorPage from './_error'
import Layout from '../layout/default'

import '../assets/index.scss'

type Props = {}
type State = {}

class _App extends App<Props, State> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {}

    // call get initial props on component or on the wrapped component (if HOC is used)
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    if (pageProps.statusCode) {
      return <ErrorPage {...pageProps} />
    }

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

// Wrap I18Next HOC
export default appWithTranslation(_App)
