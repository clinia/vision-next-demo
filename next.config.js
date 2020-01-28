const withSass = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins')
const withSvgr = require('next-svgr')

const plugins = [
  withSvgr,
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
    clientName: process.env.CLIENT_NAME,
    clientApiKey: process.env.CLIENT_API_KEY,
  },
}

module.exports = withPlugins(plugins, config)
