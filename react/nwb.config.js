module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false
  },
  babel: {
    stage: 1,
    plugins: [
      ['module-resolver', {
        root: ['./src'],
        alias: {
          SharedAssets: './src/assets'
        }
      }],
      'babel-plugin-dynamic-import-node'
    ]
  },
  webpack: {
    extractCSS: {
      esModule: true,
      filename: '[name].css',
      chunkFilename: '[id].css'
    },
    rules: {
      'sass-css': {
        modules: true
      }
    //   // sass: {
    //   //   implementation: require('sass')
    //   // }
    }
  }
};
