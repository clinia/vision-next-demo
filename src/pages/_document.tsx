import Document, { Head, Main, NextScript, DocumentContext } from 'next/document'
import { lngFromReq } from 'next-i18next/dist/commonjs/utils'

type Props = {
  lng: string
}

export default class _Document extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    const lng = lngFromReq(ctx.req)
    const additionalProps = {
      lng,
    }

    return { ...initialProps, ...additionalProps }
  }

  render() {
    const { lng } = this.props

    return (
      <html lang={lng}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />

          {/* Favicon - Icon and Meta */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#a2bfd9" />
          <meta name="apple-mobile-web-app-title" content="Clinia" />
          <meta name="application-name" content="Clinia" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
