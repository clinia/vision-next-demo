const withSass = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins')

const plugins = [
  [
    withSass,
    {
      cssModules: false,
    },
  ],
]

const config = {
  publicRuntimeConfig: {
    googleMapApi: process.env.GOOGLE_MAP_API,
  },
}

module.exports = withPlugins(plugins, config)
