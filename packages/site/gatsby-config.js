const path = require('path');
const assets = require('@massds/mayflower-assets');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  pathPrefix: process.env.GATSBY_PATH_PREFIX,
  siteMetadata: {
    title: 'Mayflower',
    description: 'A design system for the Commonwealth of Massachusetts',
    url: 'https://mayflower.digital.mass.gov/'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-pnpm',
      options: {
        include: [
          'gatsby',
          'gatsby-image',
          'gatsby-source-filesystem',
          'gatsby-plugin-sharp',
          'gatsby-plugin-sass',
          'gatsby-transformer-sharp',
          'react',
          'react-dom',
          'prop-types'
        ],
        strict: true
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.resolve(__dirname, './src/images/')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: path.resolve(__dirname, './src/data/')
      }
    },
    'gatsby-transformer-json',
    'gatsby-plugin-create-data-nodes',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        display: 'minimal-ui',
        icon: 'src/images/stateseal.png' // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        sourceMap: true,
        useResolveUrlLoader: {
          sourceMap: true
        },
        cssLoaderOptions: {
          sourceMap: true,
          esModule: true
        },
        includePaths: [
          'src',
          'node_modules',
          `${path.dirname(require.resolve('@massds/mayflower-react'))}/dist`,
          `${path.dirname(require.resolve('@massds/mayflower-react'))}/styles`
        ].concat(assets.includePaths)
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
};
