import * as React from 'react'
import Error from 'next/error'

type ErrorPageProps = {
  statusCode: number
}

class ErrorPage extends React.PureComponent<ErrorPageProps> {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return {
      namespacesRequired: ['common'],
      statusCode,
    }
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <Error statusCode={this.props.statusCode} />
      </div>
    )
  }
}

export default ErrorPage
