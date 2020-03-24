const path = require('path');

module.exports = {
  pathPrefix: `/home`,
  siteMetadata: {
    title: `Mayflower`,
    description: `A design system for the Commonwealth of Massachusetts`,
    url: 'https://mayflower.digital.mass.gov/'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.resolve(__dirname, './src/images/'),
      },
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        display: `minimal-ui`,
        icon: `src/images/stateseal.png` // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [
          path.resolve(__dirname, './node_modules/@massds/mayflower-react/es/assets/scss'),
          path.resolve(__dirname, './node_modules'),
          path.resolve(__dirname, './src')
        ]
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
