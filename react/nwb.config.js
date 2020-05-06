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
          SharedAssets: '@massds/mayflower-assets/static'
        }
      }],
      'babel-plugin-dynamic-import-node'
    ]
  }
};
