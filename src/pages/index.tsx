import { Component } from 'react'
import HomePage from './home/homePage'

interface Props {}

class HomeWrapper extends Component<Props> {
  getInitialProps = async () => {
    return { namespacesRequired: ['common', 'home'] }
  }

  render() {
    return <HomePage />
  }
}

export default HomeWrapper
