import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

const HomePage: NextPage = () => {
  return (
    <>
      <NextSeo />
      <h1>Homepage</h1>
    </>
  )
}

HomePage.getInitialProps = async () => {
  return { namespacesRequired: ['common'] }
}

export default HomePage
